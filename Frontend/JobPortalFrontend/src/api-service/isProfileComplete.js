import axios from 'axios'

const checkProfileStatus = async (token, role) => {
    if (role !== 'ROLE_RECRUITER') {
        return true
    }

    if (!token) {
        return false
    }

    try {
        const res = await axios.get('http://localhost:8080/admin/profileStatus', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return res.data
    } catch (err) {
        console.error('Profile status check failed:', err)
        return false
    }
}

export default checkProfileStatus
