import {createContext, useMemo, useState} from "react";

export const JobContext = createContext({});

const JobContextProvider = ({children})=>{
    const [jobPosts,setJobPosts] = useState([]);

   const contextValues = useMemo(()=>(
       {
           jobPosts,
       }
   ),[jobPosts]);


   return (
       <JobContext.Provider value={contextValues}>
           {children}
       </JobContext.Provider>
   )


}

export default JobContextProvider;