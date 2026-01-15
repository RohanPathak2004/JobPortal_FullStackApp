import {createContext, useEffect, useMemo, useState} from "react";
import axios from "axios";

export const JobContext = createContext({});

const JobContextProvider = ({children})=>{
    const [jobPosts,setJobPosts] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [reload,setReload] = useState(false);
    const fetchJobPosts = async ()=>{
        setLoading(true);
        try{
            const response = await axios.get("http://localhost:8080/jobPosts");
            const data = response.data;
            setJobPosts(data);
        }catch (error) {
            setError(error.toString());
        }
        setLoading(false);
    }
    useEffect(()=>{
        fetchJobPosts();
    },[reload])
   const contextValues = useMemo(()=>(
       {
           jobPosts,
           loading,
           setLoading,
           error,
           setReload,
       }
   ),[jobPosts, error, loading]);


   return (
       <JobContext.Provider value={contextValues}>
           {children}
       </JobContext.Provider>
   )


}

export default JobContextProvider;