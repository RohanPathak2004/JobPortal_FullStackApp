import React, {useContext, useEffect, useState} from 'react'
import jobContext, {JobContext} from "../context/JobContext.jsx";
import JobPostCard from "../components/JobPostCard.jsx";
import {Link} from "react-router-dom";

const Home = () => {
    const {jobPosts,setLoading,loading} = useContext(JobContext);
    const [post,setPosts] = useState([]);
    useEffect(()=>{
        setLoading(prev=>true);
        setPosts(jobPosts);
        setLoading(prev=>false);
    },[jobPosts]);
    console.log(jobPosts);
    return (
        <div>
            {loading&&<div>
                <h2 className="flex items-center justify-center">loading....</h2>
            </div>}
            <div className="flex flex-col gap-4 items-center mt-20 overflow-y-auto mb-5">
                {post.map((job,idx)=>(
                    <div className="max-w-3/4 min-w-[60%]">
                        <Link to={`/jobPost/${job.postId}`} state={job}>
                        <JobPostCard jobPost={job} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home
