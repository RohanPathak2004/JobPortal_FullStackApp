import {createContext, useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {AuthContext} from "./AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {getAllJobs} from "../api-service/getAllJobs.js";

export const JobContext = createContext({});

const JobContextProvider = ({children}) => {
    const techStacks = ["Core Java", "J2EE", "Hibernate", "Spring Boot", "React js", "PostgresSQL",
        "MongoDB", "Express", "Node js",
        "HTML", "CSS", "JavaScript",
        "Next js", "Tailwind", "Python", "Machine Learning", "Data Analysis",
        "Django", "Networking", "Cisco", "Routing",
        "Switching", "iOS Development",
        "Android Development",
        "Mobile App",
        "Angular", "MySQL",
        "Laravel", "Vue js"]
    const [jobPosts, setJobPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);

    const fetchJobsData = async () => {
        try {
            setLoading(true);
            const data = await getAllJobs(token); // Using the service method here
            console.log(data);
            setJobPosts(data);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchJobsData();
    }, [reload, token]);


    console.log(jobPosts);

    const contextValues =
        {
            jobPosts,
            loading,
            setJobPosts,
            setLoading,
            error,
            setReload,
            techStacks,
        }


    return (
        <JobContext.Provider value={contextValues}>
            {children}
        </JobContext.Provider>
    )


}

export default JobContextProvider;