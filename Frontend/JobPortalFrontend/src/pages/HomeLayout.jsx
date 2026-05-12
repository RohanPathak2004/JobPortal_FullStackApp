import {Outlet} from "react-router";
import {useAuthContext} from "../context/AuthContext.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const HomeLayout = ()=>{
    console.log("outlet in dashboard")
    console.log(location.pathname)

    return (
        <div>
            <Outlet/>
        </div>

    );
}

export default HomeLayout;