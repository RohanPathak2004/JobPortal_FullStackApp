import axios from "axios";

export const getJobByAdmin = async (token)=>{
    try{
        const res = await axios.get('http://localhost:8080/admin/jobPosts',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const jobPosts = res.data;
        return jobPosts;
    }catch(err){
        throw new Error(`Error fetching jobPost ${err.data}`);
    }
}