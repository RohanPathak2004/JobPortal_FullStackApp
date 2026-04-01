import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import JobPost from "./JobPost.jsx";
import JobPostCard from "../components/JobPostCard.jsx";
import ResumePreview from "../components/ResumePreview.jsx";

const ApplicationReview = () => {
    const [file, setFile] = useState({
        filename: "",
        fileData: "",
        filetype: "",
    })
    const  location = useLocation();
    const data = location.state;

    useEffect(()=>{
        setFile({
            filename: data.resumeName,
            fileData: data.resumeFile,
            filetype: data.resumeType
        })
    },[])

    console.log(data);
    return (
        <div className={'bg-zinc-200 flex flex-col  justify-start gap-1'}>
            <div className='flex flex-col gap-2 md:grid md:grid-cols-2 px-2 py-2 '>
                <div className={'bg-white px-2 py-2 '}>
                    <h2 className=' font-bold text-2xl'>Candidate Information</h2>
                    <div className='px-2 py-2'>
                        <div className='flex gap-2 items-center text-[1.1rem]'>
                            <p className='font-medium '>Name:</p>
                            <p className='italic'>{data.name}</p>
                        </div>
                        <div className='flex gap-2 items-center text-[1.1rem]'>
                            <p className='font-medium '>Email:</p>
                            <p>{data.email}</p>
                        </div>
                    </div>
                </div>
                <div className={'bg-white px-2 py-2 '}>
                    <h2 className=' font-bold text-2xl'>Applied For:</h2>
                    <div>
                        <JobPostCard jobPost={data.job}/>
                    </div>
                </div>
            </div>
            <div>
                <div className={' w-[80%] bg-white flex justify-center items-center '}>
                    <div>
                    <ResumePreview file={file}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ApplicationReview
