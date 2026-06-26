import axios from "axios";

export const getApplications = async (token)=>{
    try{
        const applications = await axios.get('http://localhost:8080/applications',{
            headers: {
                Authorization : `Bearer ${token}`
            }
        })

        return await applications.data;
    }catch(error){
        throw new Error(error.data);
    }
}