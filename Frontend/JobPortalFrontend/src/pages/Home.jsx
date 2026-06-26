import React, {useContext, useEffect} from 'react'
import  {JobContext} from "../context/JobContext.jsx";
import JobPostCard from "../components/JobPostCard.jsx";
import {Link} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";



const Home = () => {
    const {jobPosts,setJobPosts,  loading} = useContext(JobContext);
    const {user} = useAuthContext();

    useEffect(() => {
        if(user==null){
            setJobPosts([]);
        }
    }, [user]);


    return (
        <div className="w-full py-4  md:justify-center">

            <div  className={''}>
                {loading && <div>
                    <h2 className="flex items-center justify-center">loading....</h2>
                </div>}
                <div className="flex flex-col gap-6 items-center py-4 overflow-auto mb-5">
                    {jobPosts.map((job, idx) => (
                        <div className="w-3/4">
                            <Link to={`/jobPost/${job.postId}`} state={job}>
                                <JobPostCard jobPost={job}/>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Home
