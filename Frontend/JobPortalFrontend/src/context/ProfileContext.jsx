import {createContext, useContext, useEffect, useState} from "react";
import {useAuthContext} from "./AuthContext.jsx";
import {getRecruiterProfile} from "../api-service/getRecruiterProfile.js";


export const RecruiterProfileContext = createContext({});


const RecruiterProfileContextProvider = ({children})=>{
    //logic

    const {token} = useAuthContext();

    const [profile, setProfile] = useState({
        "name":"",
        "companyName":"",
        "companyLogo":"",
        "companyUrl":"",
        "profilePicture":""
    })
    const [fetch, setFetch] = useState(true);

    const fetchProfileDetails = async (token)=>{
        const data = await getRecruiterProfile(token);
        setProfile(data);
    }

    const contextValues = {
      profile,
      setFetch
    };

    useEffect(()=>{
        fetchProfileDetails(token);
    },[fetch]);


    return (
        <RecruiterProfileContext.Provider value={contextValues}>
            {children}
        </RecruiterProfileContext.Provider>
    )

}

export const useRecruiterProfileContext = () =>{
    const context = useContext(RecruiterProfileContext);
    if(context){
        return context;
    }
    throw new Error('useRecruiterProfileContext must be used within the context');

}


export default RecruiterProfileContextProvider;

