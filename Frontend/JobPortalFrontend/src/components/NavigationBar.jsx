import React from 'react'
import {Link} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import Account from "./Account.jsx";

const NavigationBar = () => {

    const {user,token} = useAuthContext();

    return (

        <nav className="flex flex-col md:flex md:flex-row  md:justify-evenly min-w-[80%]  px-4 py-2 mx-auto sticky top-0 backdrop-blur-md bg-white/10 border border-white/20  shadow-xl">
            <div className={'flex items-center justify-center'}>
                <Link to="/">
                <span className="text-gray-800 text-5xl font-extrabold cursor-pointer">Job</span>
                <span className="text-green-900 text-5xl font-extrabold cursor-pointer">Portal</span>
                </Link>
            </div>
            <ul className="flex justify-evenly min-w-[30%] text-[1.2rem] font-medium items-center ">
                <li className="hover:text-red-500 hover:underline transition-all hover:underline-offset-2 cursor-pointer">
                    <Link to="/">
                    Home
                    </Link>
                </li>
                {user?.role==='RECRUITER'?<li
                    className="hover:text-red-500 hover:underline transition-all hover:underline-offset-2 cursor-pointer">
                    <Link to="/addJob">
                        Add Job
                    </Link>
                </li>:null}
                <li className="hover:text-red-500 hover:underline transition-all hover:underline-offset-2 cursor-pointer">
                    <Link to="/search">
                    Search
                    </Link>
                </li>
                <li >
                    {
                        token?<Account/>:<Link className="hover:text-red-500 hover:underline transition-all hover:underline-offset-2 cursor-pointer" to={'/login'}>
                            Login/Register
                        </Link>
                    }
                </li>
            </ul>
        </nav>
    )
}
export default NavigationBar
