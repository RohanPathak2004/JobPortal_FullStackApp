import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useAuthContext} from "../context/AuthContext.jsx";
import ApplicationCard from "../components/ApplicationCard.jsx";

const Applications = () => {

    const [applications, setApplications] = useState([]);
    const {token} = useAuthContext();
    const getApplications =  async()=>{
        const res = await axios.get('http://localhost:8080/applications',{
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(res=>setApplications(res.data))
    }


    useEffect(()=>{
        getApplications();
    },[token]);
    console.log(applications);
    return (
        <div>
            {applications.length>0?applications.map((application,idx)=>(
                <li className='list-decimal'>
                    <ApplicationCard application={application} />
                </li>
            )):
                <p>
                    No active Applications
                </p>}
        </div>
    )
}
export default Applications
