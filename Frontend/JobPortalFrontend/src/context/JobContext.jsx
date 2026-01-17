import {createContext, useEffect, useMemo, useState} from "react";
import axios from "axios";

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


    const fetchJobPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/jobPosts");
            const data = response.data;
            setJobPosts(data);
        } catch (error) {
            setError(error.toString());
        }
        setLoading(false);
    }


    useEffect(() => {
        fetchJobPosts();
    }, [reload])


    const contextValues = useMemo(() => (
        {
            jobPosts,
            loading,
            setLoading,
            error,
            setReload,
            techStacks,
        }
    ), [jobPosts, error, loading]);


    return (
        <JobContext.Provider value={contextValues}>
            {children}
        </JobContext.Provider>
    )


}

export default JobContextProvider;