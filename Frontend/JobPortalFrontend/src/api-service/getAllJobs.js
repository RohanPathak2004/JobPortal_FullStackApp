import axios from "axios";

export const getAllJobs = async (token)=>{
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get("http://localhost:8080/jobPosts",{
            headers:{
                'Authorization': `Bearer ${token?token:null}`
            }
        });
        if(response.status !== 200){throw new Error("Something went wrong!")}
        let responseData = await response.data;
        console.log(responseData,"in the service");
        return responseData;
    } catch (error) {
        throw error;
    }
}