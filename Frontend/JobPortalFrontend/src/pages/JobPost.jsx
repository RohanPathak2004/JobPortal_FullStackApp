import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import axios from "axios";
import ApplyPopUp from "../components/ApplyPopUp.jsx";

const JobPost = () => {
    const [jobPost, setJobPost] = useState(null);
    const {postId} = useParams();
    const {token} = useAuthContext();
    const [open, setOpen] = useState(false);
    const fetchJobPostById = async (postId) => {
        try {
            const res = await axios.get(`http://localhost:8080/jobPost/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => res.data);
            setJobPost(res);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (postId) {
            fetchJobPostById(postId)
        }
    }, [postId]);

    // console.log(open)
    return (
        <div className='bg-taupe-50 min-h-screen w-full flex justify-center items-start  py-10 '>
            <div
                className='bg-white  flex flex-col w-full md:max-w-full shadow-xl shadow-gray-500/50 border border-gray-100 overflow-hidden'>

                {/* Header Section */}
                <div className='bg-linear-to-r from-green-600  to-green-700  p-8  text-white'>
                    <div className='flex justify-between md:px-25 items-start'>
                        <div>
                            <p className='text-blue-100 text-sm font-semibold uppercase tracking-wider mb-1'>Job
                                ID: {jobPost?.postId}</p>
                            <h1 className='text-3xl font-bold'>{jobPost?.postProfile}</h1>
                        </div>
                        <span className='bg-white/20 backdrop-blur-md px-6 py-1 rounded-full text-sm text-center font-medium'>
                    {jobPost?.reqExperience} Exp
                        </span>
                    </div>
                </div>

                {/* Content Body */}
                <div className='p-8 md:px-30 flex flex-col gap-8'>

                    {/* Description */}
                    <section>
                        <h3 className='text-gray-900 font-bold text-lg mb-3 flex items-center gap-2'>
                            <span className='w-1 h-6 bg-blue-500 rounded-full'></span>
                            Job Description
                        </h3>
                        <article className='text-gray-600 leading-relaxed font-normal text-[1.1rem]'>
                            {jobPost?.postDesc}
                        </article>
                    </section>

                    {/* Skills */}
                    <section>
                        <h3 className='text-gray-900 font-bold text-lg mb-4 flex items-center gap-2'>
                            <span className='w-1 h-6 bg-blue-500 rounded-full'></span>
                            Required Skills
                        </h3>
                        <div className='flex flex-wrap gap-2'>
                            {jobPost?.postTechStack.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors cursor-default"
                                >
                            {skill}
                        </span>
                            ))}
                        </div>
                    </section>

                    {/* Footer / CTA */}
                    <div className='pt-6 border-t border-gray-100 mt-4'>
                        <button
                            onClick={()=>setOpen(true)}
                            className='w-full md:w-max mx-auto flex justify-center items-center bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all text-white font-bold py-3 px-12 rounded-xl shadow-lg shadow-blue-200'>
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
            {
                open&&
                <div className={'absolute w-full md:w-[35%] h-full py-5'}>
                    <ApplyPopUp jobId={postId} setOpen={setOpen}/>
                </div>
            }
        </div>
    )
}

export default JobPost;