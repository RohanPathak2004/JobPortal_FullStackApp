import React, {useEffect, useState} from 'react'
import {useAuthContext} from "../context/AuthContext.jsx";

const UserDashboard = () => {
    const[username,setUsername] = useState("");
    const {user,token} = useAuthContext();

    useEffect(()=>{
        setUsername((user.email).split("@")[0]);
    },[user,token])

    return (
        <div className='py-8 bg-slate-200 px-4 rounded-lg '>
            <h1 className='text-3xl font-medium'>Welcome, {username}</h1>
            <div className={'mt-4'}>
                <div>Track Applications</div>
                <div>

                </div>
            </div>

        </div>
    )
}
export default UserDashboard
