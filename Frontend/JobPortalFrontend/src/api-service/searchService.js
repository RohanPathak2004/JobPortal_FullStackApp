import axios from "axios";

export const searchService = async (keyword,token)=>{
    try{
        const res = await axios.get(`http://localhost:8080/jobPosts/keyword/${keyword}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const searchResults = await res.data;
        return searchResults;
    }catch(err){
        throw new Error(`Failed to get search posts reason: ${err}`);
    }
}