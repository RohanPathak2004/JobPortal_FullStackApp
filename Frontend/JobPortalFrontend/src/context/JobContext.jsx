import {createContext, useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {AuthContext} from "./AuthContext.jsx";
import {useNavigate} from "react-router-dom";

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


    const fetchJobPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/jobPosts",{
                headers:{
                    'Authorization': `Bearer ${token?token:null}`
                }
            }).then(res=>setJobPosts(res.data))
                .catch(err=>{
                    if (err.response.status === 401) {
                        navigate("/login");
                    }
                });

        } catch (error) {
            setError(error.toString());
        }
        setLoading(false);
    }


    useEffect(() => {
        fetchJobPosts();
    }, [reload, token,])


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