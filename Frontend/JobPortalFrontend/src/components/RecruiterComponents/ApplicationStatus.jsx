import React, {useCallback, useEffect, useState} from 'react'
import axios from "axios";
import {useAuthContext} from "../../context/AuthContext.jsx";

const ApplicationStatus = ({status, appId,setReload}) => {
    const [currStatus, setCurrStatus] = useState(status);
    const {token} = useAuthContext();
    const handleChange = (e) => {
        setCurrStatus(e.target.value);
    }
    const handleStatusUpdate = ()=>{
        updateStatus();
    }
    const updateStatus = async () => {
        await axios.patch('http://localhost:8080/status',null,{
            params:{
                id: appId,
                status: currStatus,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(()=>{setReload(prevState=>!prevState)
        });
    }

    return (
        <div className='flex gap-2 md:gap-2 items-center'>
            <select value={currStatus} onChange={(e) => handleChange(e)}
                    className='outline-1 outline-neutral-400 rounded-md px-4 py-1  text-left *:text-[1rem]'
                    name="status" id="status">
                <option className='px-2 ' value="accept">Schedule Interview</option>
                <option className='px-2 ' value="review">Under Review</option>
                <option className='px-2 ' value="reject">Rejected</option>
            </select>
            <button onClick={handleStatusUpdate} className='bg-blue-500 px-2 py-1 text-white rounded-md text-[1rem] cursor-pointer'>Change Status</button>
        </div>
    )
}
export default ApplicationStatus
