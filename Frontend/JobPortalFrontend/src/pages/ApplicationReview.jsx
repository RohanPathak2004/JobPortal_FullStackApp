import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import JobPost from "./JobPost.jsx";
import JobPostCard from "../components/JobPostCard.jsx";
import ResumePreview from "../components/ResumePreview.jsx";
import BackButtonWebPage from "../components/BackButtonWebPage.jsx";
import ApplicationStatus from "../components/ApplicationStatus.jsx";
import authContext, {useAuthContext} from "../context/AuthContext.jsx";
import axios from "axios";

const ApplicationReview = () => {
    const {token} = useAuthContext();
    const[data,setData] = useState();
    const [file, setFile] = useState({
        filename: "",
        fileData: "",
        filetype: "",
    })
    const location = useLocation();
    const appId = location.state;
    console.log(data);
    const fetchApplication = async ()=>{
        const res = await axios.get(`http://localhost:8080/application/${appId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res)=> {
            setData(res.data)
        })
            .catch((err)=>console.log(err));

    }

    const fetchResumeFile = async ()=>{
        const res  = await axios.get(`http://localhost:8080/resume/${appId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            setFile({
                filename: res.data.resumeName,
                filetype: res.data.resumeType,
                fileData: res.data.resumeFile
            })
        })
    }

    useEffect(() => {
        fetchApplication();
        fetchResumeFile();
    }, [appId,location.key])

    console.log(data);
    if(data===undefined) return <h1>no response</h1>
    return (
        <div className={' flex flex-col py-4 gap-4   md:gap-8'}>
            <div className='flex flex-col gap-2 items-start md:flex-row  md:justify-between md:items-center'>
                <div className={'px-2 rounded-2xl hover:bg-neutral-100  transition-all'}>
                <BackButtonWebPage/>
                </div>
                <div>
                    <ApplicationStatus/>
                </div>
            </div>
            <div className='  py-2 flex flex-col gap-8'>
                <div className={'p-1 flex flex-col gap-2'}>
                    <h2 className='font-bold text-xl'>
                        Candidate Information
                    </h2>
                    <div className='flex gap-1 item-center px-1'>
                        <div className='text-xl'>Name:</div>
                        <div className='italic text-xl font-medium'>{data?.name}</div>
                    </div>
                    <div className='flex gap-1 item-center px-1'>
                        <div className='text-xl'>Email:</div>
                        <div className='italic text-xl font-medium'>{data?.email}</div>
                    </div>
                </div>
                <div className=''>
                    <h2 className='font-bold text-xl p-2'>Job Details:</h2>
                    <JobPostCard jobPost={data?.job}/>
                </div>
            </div>
            <div className={'h-[800px] w-full py-2'}>
                <h2 className={'text-2xl font-medium py-1'}>Resume/CV Uploaded By Candidate</h2>

                <ResumePreview file={file}/>
            </div>
            <div>
            </div>
        </div>
    )
}
export default ApplicationReview
