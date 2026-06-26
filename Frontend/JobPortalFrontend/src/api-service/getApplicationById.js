import axios from "axios";

export const getApplicationById = async (appId,token)=>{
    try{
        const res = await axios.get(`http://localhost:8080/application/${appId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    }catch(err){
        throw new Error(err.data);
    }

}