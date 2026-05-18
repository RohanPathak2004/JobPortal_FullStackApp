import React, {useContext, useEffect, useState} from 'react'
import jobContext, {JobContext} from "../context/JobContext.jsx";
import JobPostCard from "../components/JobPostCard.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import Search from "./Search.jsx";

function JobPostFilter() {
    return (
        <div>
            <div>

            </div>
        </div>
    );
}

const Home = () => {
    const {jobPosts,setJobPosts, setLoading, loading,reload} = useContext(JobContext);
    const {user} = useAuthContext();

    useEffect(() => {
        if(user==null){
            setJobPosts([]);
        }
    }, [user]);

    const navigate = useNavigate();

    // console.log(jobPosts);



    return (
        <div className="w-full py-4 md:flex md:flex-row md:gap-2 md:justify-center">
            <div>
                <JobPostFilter/>
            </div>
            <div  className={''}>
                {loading && <div>
                    <h2 className="flex items-center justify-center">loading....</h2>
                </div>}
                <div className="flex flex-col gap-4 items-center py-4 overflow-auto mb-5">
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
