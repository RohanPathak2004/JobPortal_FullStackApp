import React, {useContext, useEffect, useState} from 'react'
import jobContext, {JobContext} from "../context/JobContext.jsx";
import JobPostCard from "../components/JobPostCard.jsx";

const Home = () => {
    const {jobPosts,setLoading,loading} = useContext(JobContext);
    const [post,setPosts] = useState([]);
    useEffect(()=>{
        setLoading(true);
        setPosts(jobPosts);
        setLoading(false);
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
                        <JobPostCard jobPost={job} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home
