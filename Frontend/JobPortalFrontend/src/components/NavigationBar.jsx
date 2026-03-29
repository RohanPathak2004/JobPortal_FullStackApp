import React from 'react'
import {Link} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import Account from "./Account.jsx";

const NavigationBar = () => {

    const {user,token} = useAuthContext();

    return (

        <nav className="flex flex-col md:flex md:flex-row  md:justify-between w-full  px-20 py-1 bg-white  sticky top-0 ">
            <div className={'flex items-center justify-center'}>
                <Link to="/">
                <span className="text-gray-800 text-3xl font-extrabold cursor-pointer">Job</span>
                <span className="text-green-900 text-3xl font-extrabold cursor-pointer">Portal</span>
                </Link>
            </div>
            <ul className="flex gap-4 text-sm font-medium text-zinc-500 text-[1.1rem] items-center ">
                <li className="hover:text-zinc-900 transition duration-300 ">
                    <Link to="/">
                    Home
                    </Link>
                </li>
                {user?.role==='RECRUITER'?<li
                    className="hover:text-zinc-900 transition duration-300 ">
                    <Link to="/addJob">
                        Add Job
                    </Link>
                </li>:null}
                <li className="hover:text-zinc-900 transition duration-300 ">
                    <Link to="/search">
                    Search
                    </Link>
                </li>
                <li className='cursor-pointer' >
                    {
                        token?<Account/>:<Link className="hover:text-zinc-900 transition duration-300" to={'/login'}>
                            Login/Register
                        </Link>
                    }
                </li>
            </ul>
        </nav>
    )
}
export default NavigationBar
