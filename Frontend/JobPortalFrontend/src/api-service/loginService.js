import axios from "axios";

export const loginService = async (userCredentials) => {
    try{
        const res = await axios.post('http://localhost:8080/login', userCredentials);
        const newToken = res.data;
        return newToken;
    }catch(err){
        throw new Error(`Error in Log in: ${err.message}`);
    }

}