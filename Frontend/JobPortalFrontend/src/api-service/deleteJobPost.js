import axios from "axios";

export const deleteJobPost = async (postId,token) => {
    try{
        const res = await axios.delete(`http://localhost:8080/jobPost/${postId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = res.data;
        return data;
    }catch(err){
        throw new Error(`Error while deleting job post: ${err}`);
    }
}