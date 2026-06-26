import axios from "axios";

export const getJobPostById = async (id, token) => {

    try{
        const res = await axios
            .get(`http://localhost:8080/jobPost/${id}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
        const jobPost = await res.data;
        return jobPost;
    } catch (err) {
        throw new Error(`Error fetching jobPost ${err.data}`);
    }

}