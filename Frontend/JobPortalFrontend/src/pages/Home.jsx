import React, {useContext} from 'react'
import jobContext, {JobContext} from "../context/JobContext.jsx";

const Home = () => {
    const {jobPosts} = useContext(JobContext);
    console.log(jobPosts);
    return (
        <div>Home</div>
    )
}
export default Home
