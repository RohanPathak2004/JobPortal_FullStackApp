import React, {useEffect, useMemo, useState} from 'react'
import {useLocation} from "react-router-dom";
import JobPost from "../JobPost.jsx";
import JobPostCard from "../../components/JobPostCard.jsx";
import ResumePreview from "../../components/RecruiterComponents/ResumePreview.jsx";
import BackButton from "../../components/BackButton.jsx";
import ApplicationStatus from "../../components/RecruiterComponents/ApplicationStatus.jsx";
import authContext, {useAuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import {getApplicationById} from "../../api-service/getApplicationById.js";
import {getResumeById} from "../../api-service/getResumeById.js";

const ApplicationReview = () => {
    const {token} = useAuthContext();
    const [data, setData] = useState();
    const [reload, setReload] = useState(true);
    const [file, setFile] = useState({
        filename: "",
        fileData: "",
        filetype: "",
    });
    const location = useLocation();
    const appId = location.state;
    console.log(data);


    useEffect(() => {
        const fetchApplication = async () => {
            try{
                const applicationData = await getApplicationById(appId,token);
                setData(applicationData);
            }catch(err){
                console.log(err);
            }
        }

        const fetchResumeFile = async () => {
            try{
                const fileData = await getResumeById(appId,token);
                setFile({
                    filename: fileData.resumeName,
                    filetype: fileData.resumeType,
                    fileData: fileData.resumeFile
                })
            }catch(err){
                console.log(err);
            }
        }
        fetchApplication();
        fetchResumeFile();
    }, [appId, reload])
    const findColor = (status) => {
        if (status === 'accept') return { color: 'green' };
        if (status === 'reject') return { color: 'red' };
        return { color: 'gray' };
    };
    console.log("on this page application review");
    if (data === undefined) return <h1>no response</h1>
    return (
        <div className={' flex  flex-col py-4 gap-4   md:gap-8'}>

            <div className='flex flex-col gap-2 items-start md:flex-row  md:justify-between md:items-start'>
                <div className={'px-2 rounded-2xl hover:bg-neutral-100  transition-all'}>
                    <BackButton />
                </div>

            </div>

            <div className='  py-2 flex flex-col gap-8'>
                <h3 className='text-2xl '>

                    Application status: <span
                    style={findColor(data.status)}
                    className={`font-bold `}>{data?.status.charAt(0).toUpperCase() + data?.status.slice(1)}</span>
                </h3>
                <div className={'flex flex-col gap-2 md:grid md:grid-cols-2 '}>
                    <div className={'p-1 flex flex-col gap-2'}>
                        <h2 className='font-bold text-[1.5rem]'>
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
                    <div className={'md:flex md:justify-end items-start px-1'}>
                        <ApplicationStatus status={data?.status} appId={appId} setReload={setReload}/>
                    </div>
                </div>
                <div className=''>
                    <h2 className='font-bold text-[1.5rem] p-2'>Job Details:</h2>
                    <JobPostCard jobPost={data?.job}/>
                </div>
            </div>
            <div className={'h-[800px] w-full py-2'}>
                <h2 className={'text-2xl font-medium py-1'}>Resume/CV Uploaded By Candidate</h2>
                {file&&<ResumePreview file={file}/>}
            </div>
            <div>
            </div>
        </div>
    )
}
export default ApplicationReview
