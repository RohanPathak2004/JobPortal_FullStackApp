import React, {useEffect, useState} from 'react'
import {useAuthContext} from "../../context/AuthContext.jsx";
import JobPostCard from "../../components/JobPostCard.jsx";
import {Link, useNavigate} from "react-router-dom";
import {getJobByAdmin} from "../../api-service/getJobByAdmin.js";

const JobPostedByAdmin = () => {
    // console.log('JobPostedByAdmin');
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const {user,token} = useAuthContext();
    // console.log(user);

    // console.log(posts);
    useEffect(() => {
        const fetchAllPosts = async () => {
            try{
                const data = await getJobByAdmin(token);
                setPosts(data);
            }catch(err){
                console.log(err)
                navigate('/login');
            }
        }
        fetchAllPosts();
    }, [token]);
    return (
        <div className={'flex flex-col gap-4'}>
            {
                posts?.length>0?posts.map((post,)=>(
                    <div className={'flex flex-col items-center gap-1 md:flex-row md:justify-between md:items-center'} key={post.id}>
                        <div className={'md:h-[320px] w-full  mx-3 '}>
                            <JobPostCard  jobPost={post}/>
                        </div>

                        <button className='bg-blue-500 px-4 py-2 hover:bg-blue-600 text-white rounded-lg cursor-pointer'>
                            <Link to={`/action/${post.postId}`} state={post}>
                                Actions
                            </Link>

                        </button>
                    </div>
                )):<div>No Job posts.</div>
            }
        </div>
    )
}
export default JobPostedByAdmin
