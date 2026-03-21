import {Outlet} from "react-router";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const DashboardLayout = ()=>{
    const {user} = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if(user&&user.role==='ROLE_RECRUITER'){
            console.log("render")
            navigate('/dashboard/admin');
        }
    },[user])
    return (
        <div>
            <Outlet/>
        </div>

    );
}

export default DashboardLayout;