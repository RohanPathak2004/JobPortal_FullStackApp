import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext.jsx'
import checkProfileStatus from '../api-service/isProfileComplete.js'

const Profile = () => {
    const navigate = useNavigate()
    const { user, token } = useAuthContext()
    const [profileComplete, setProfileComplete] = useState(null)

    useEffect(() => {
        const loadProfileStatus = async () => {
            const isComplete = await checkProfileStatus(token, user?.role)
            setProfileComplete(isComplete)
        }

        if (token) {
            loadProfileStatus()
        }
    }, [token, user?.role])

    useEffect(() => {
        if (profileComplete) {
            navigate('/')
        }
    }, [profileComplete, navigate])

    if (profileComplete === null) {
        return (
            <div>
                <h1>Profile</h1>
                <p>Checking profile status…</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Profile is incomplete — complete your recruiter profile to continue.</p>
        </div>
    )
}

export default Profile
