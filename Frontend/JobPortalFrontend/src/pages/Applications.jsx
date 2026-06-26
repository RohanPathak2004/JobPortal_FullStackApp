import React, {useEffect, useState} from 'react'
import {useAuthContext} from "../context/AuthContext.jsx";
import ApplicationCard from "../components/ApplicationCard.jsx";
import {getApplications} from "../api-service/getApplications.js";

const Applications = () => {

    const [applications, setApplications] = useState([]);
    const {token} = useAuthContext();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getApplications(token);
                setApplications(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchApplications();
    }, [token]);
    console.log(applications);
    return (
        <div>
            {applications.length > 0 ? applications.map((application, idx) => (
                    <li key={idx} className={'list-none '}>
                        <ApplicationCard application={application}/>
                    </li>
                )) :
                <p>
                    No active Applications
                </p>}
        </div>
    )
}
export default Applications
