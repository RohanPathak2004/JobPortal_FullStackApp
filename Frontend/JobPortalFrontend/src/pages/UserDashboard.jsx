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

  console.log("hello world");
    return (
        <div className='py-8 border border-zinc-300 px-4 h-screen flex flex-col dark:bg-slate-900 dark:border-zinc-700'>
            <h1 className='text-3xl font-medium'>Welcome, {username}</h1>
            <div className='mt-4 flex flex-col flex-1 min-h-0'>
                <p className='text-neutral-700 font-bold text-sm md:text-xl dark:text-neutral-200'>
                    Applications<span className='text-sm'>({applications.length})</span>
                </p>
                <div className='bg-white py-2 px-4 mt-2 flex flex-col gap-2 dark:bg-slate-900 flex-1 overflow-y-auto'>
                    {applications.length > 0 && applications.map((a, idx) => (
                        <div key={idx}>
                            <ApplicationCardForCandidate postId={a.job.postId} postProfile={a.job.postProfile} status={a.status} />
                        </div>
                    ))}
                    {applications.length === 0 && <div>No Active Applications</div>}
                </div>
            </div>
        </div>
    )
}
export default UserDashboard
