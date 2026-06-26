import axios from "axios";

export const postJob = async (jobData, token)=>{
    try {
        await axios.post("http://localhost:8080/jobPost", jobData, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (err) {
        throw new Error(err.response.data.message);
    }
}