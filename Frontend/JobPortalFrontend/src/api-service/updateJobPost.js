import axios from "axios";

export const updateJobPost = async (newJob,token) => {
    try{
        const res = await axios.put("http://localhost:8080/jobPost", newJob,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const message = await res.data;
        return message;
    }catch (err){
        throw new Error(`Failed to update job post: ${err}`);
    }
}