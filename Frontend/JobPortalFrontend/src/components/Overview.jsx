import React, {useEffect, useState} from 'react'
import isProfileComplete from "../api-service/isProfileComplete.js";
import {useAuthContext} from "../context/AuthContext.jsx";
import RecruiterProfileOverview from "./RecruiterComponents/RecruiterProfileOverview.jsx";

const Overview = () => {
    const {token, user} = useAuthContext();
    const [profileStatus, setProfileStatus] = useState(false);

    useEffect(() => {
        const checkProfileStatus = async () => {
            const status = await isProfileComplete(token, user.role);
            setProfileStatus(status);
        }
        console.log("render")
        checkProfileStatus();
    },)

    return (
        <div>{
            profileStatus ? <div>
                {

                    user.role === "ROLE_RECRUITER" ? <RecruiterProfileOverview/>:<CandidateProfileOverview/>


                }
            </div>:<div className={'flex justify-center items-center text-center'}>
                <h1 className={'text-2xl font-medium text-zinc-800 mt-10'}>Complete you profile to see the Overview.</h1>
                </div>
        }</div>
    )
}
export default Overview
