import axios from "axios";

export const getCandidateApplications = async (token) => {
    try{
        const res = await axios.get('http://localhost:8080/candidate/applications',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const applications = res.data;
        return applications;
    }catch(err){
        throw new Error(err);
    }
}