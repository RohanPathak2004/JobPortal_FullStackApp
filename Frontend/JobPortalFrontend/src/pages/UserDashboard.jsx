import React, {useEffect, useState} from 'react'
import {useAuthContext} from "../context/AuthContext.jsx";
import axios from "axios";
import ApplicationCardForCandidate from "../components/ApplicationCardForCandidate.jsx";

const UserDashboard = () => {
    const[username,setUsername] = useState("");
    const {user,token} = useAuthContext();
    const[applications, setApplications] = useState([]);
    const fetchApplications = async ()=>{
        await axios.get('http://localhost:8080/candidate/applications',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res=>{
            setApplications(res.data)
        }).catch(err => console.log(err));
    }
    console.log(applications)
    useEffect(()=>{
        setUsername((user.email).split("@")[0]);
        fetchApplications();
    },[user,token])

    return (
        <div className='py-8 border border-zinc-300 px-4 h-screen bg-zinc-200  rounded-lg '>
            <h1 className='text-3xl font-medium'>Welcome, {username}</h1>
            <div className={'mt-4 '}>
                <p className={'text-neutral-700 font-bold text-2xl'}>
                    Applications<span>({applications.length})</span>
                </p>
                <div className={'bg-white p-2 mt-2 flex flex-col gap-2'}>
                    {applications.length>0&&applications.map((a,idx)=>(
                        <div key={idx}>
                        <ApplicationCardForCandidate postId={a.job.postId} postProfile={a.job.postProfile} status={a.status} />
                        </div>
                    ))}
                    {applications.length===0&&<div>
                        No Active Applications
                    </div>}
                </div>
            </div>

        </div>
    )
}
export default UserDashboard
