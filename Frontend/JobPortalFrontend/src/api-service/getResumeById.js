import axios from "axios";

export const getResumeById = async(appId,token)=>{
    try{
        const file = await axios.get(`http://localhost:8080/resume/${appId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const fileData = await file.data;
        return fileData;
    }catch(err){
        throw new Error(err.data);
    }

}