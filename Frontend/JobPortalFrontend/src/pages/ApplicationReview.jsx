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
    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        setFile({
            filename: data.resumeName,
            fileData: data.resumeFile,
            filetype: data.resumeType
        })
    }, [])

    console.log(data);
    return (
        <div className={' flex flex-col py-4   gap-2'}>
            <div className=' bg-zinc-200 px-2 py-2 flex flex-col gap-2'>
                <div className={'p-1'}>
                    <h2 className='font-bold text-2xl'>
                        Candidate Information
                    </h2>
                    <div className='flex gap-1 item-center px-1'>
                        <div className='text-xl'>Name:</div>
                        <div className='italic text-xl font-medium'>{data.name}</div>
                    </div>
                    <div className='flex gap-1 item-center px-1'>
                        <div className='text-xl'>Email:</div>
                        <div className='italic text-xl font-medium'>{data.email}</div>
                    </div>
                </div>
                <div className='p-1'>
                    <h2 className='font-bold text-2xl'>Job Applied For:</h2>
                    <JobPostCard jobPost={data.job}/>
                </div>
            </div>
                <div className={'h-[800px] w-full'}>
                    <ResumePreview file={file}/>
                </div>

        </div>
    )
}
export default ApplicationReview
