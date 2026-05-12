import React, {useEffect, useState} from 'react'
import {useAuthContext} from "../context/AuthContext.jsx";
import axios from "axios";
import JobPostCard from "../components/JobPostCard.jsx";
import {Link, useNavigate} from "react-router-dom";

const JobPostedByAdmin = () => {
    // console.log('JobPostedByAdmin');
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const {token} = useAuthContext();
    const fetchAllPosts = async () => {
        await axios.get('http://localhost:8080/admin/jobPosts',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => setPosts(res.data)).catch((res)=>{
            if(res.status === 401) {
                navigate('/login');
            }
        })
    }
    // console.log(posts);
    useEffect(() => {
        try{
            fetchAllPosts();
        }catch (e){
            console.log(e);
        }
    }, [token]);
    return (
        <div className={'flex flex-col gap-4'}>
            {
                posts?.map((post,)=>(
                    <div className={'flex flex-col items-center gap-1 md:flex-row md:justify-between md:items-center'} key={post.id}>
                        <div className={'md:h-[320px] w-full  mx-3 '}>
                            <JobPostCard  jobPost={post}/>
                        </div>

                        <button className='bg-blue-500 px-4 py-2 hover:bg-blue-600 text-white rounded-lg cursor-pointer'>
                            <Link to={`/jobPost/${post.postId}`} state={post}>
                                Actions
                            </Link>

                        </button>
                    </div>
                ))
            }
        </div>
    )
}
export default JobPostedByAdmin
