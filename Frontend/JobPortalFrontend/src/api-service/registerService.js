import axios from "axios";

export const registerService = async (finalCredentials)=>{

    try{
        const res = await axios.post('http://localhost:8080/register', finalCredentials);
        const userDetails = await res.data;
        return userDetails;
    }catch(error){
        throw new Error(`Error in user registration: ${error.message}`);
    }


}