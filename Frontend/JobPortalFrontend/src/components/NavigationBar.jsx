import React from 'react'
import {Link} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.jsx";
import Account from "./Account.jsx";
import {useTheme} from "../context/ThemeContext.jsx";

const NavigationBar = () => {
    const {user, token} = useAuthContext();
    const {theme,setTheme} = useTheme();

    const changeTheme = () =>{
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (

        <nav
            className="sticky top-0 z-50 flex  flex-col border-b border-zinc-300 bg-white px-20 py-1 transition-colors duration-300 dark:border-zinc-700 dark:bg-slate-950 md:flex-row md:justify-between">
            <div className={'flex items-center justify-center'}>
                <Link to="/">
                    <span className="cursor-pointer text-3xl font-extrabold text-gray-800 transition-colors duration-300 dark:text-zinc-100">Job</span>
                    <span className="cursor-pointer text-3xl font-extrabold text-green-900 transition-colors duration-300 dark:text-green-400">Portal</span>
                </Link>
            </div>
            <ul className="flex items-center justify-center gap-2 text-[1.1rem] text-sm font-medium text-zinc-500 transition-colors duration-300 dark:text-zinc-300">
                <li className="transition duration-300 hover:text-zinc-900 dark:hover:text-white">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                {user?.role === 'RECRUITER' ? <li
                    className="transition duration-300 hover:text-zinc-900 dark:hover:text-white">
                    <Link to="/addJob">
                        Add Job
                    </Link>
                </li> : null}
                <li className="transition duration-300 hover:text-zinc-900 dark:hover:text-white">
                    <Link to="/search">
                        Search
                    </Link>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={changeTheme}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        className="rounded-full p-2 transition-colors duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                    {
                        theme === 'dark'?
                            <LightMode/>:
                            <DarkMode/>
                    }
                    </button>
                </li>
                <li className='cursor-pointer'>
                    {
                        token ? <Account/> :
                            <Link className="transition duration-300 hover:text-zinc-900 dark:hover:text-white" to={'/login'}>
                                Login/Register
                            </Link>
                    }
                </li>
            </ul>
        </nav>
    )
}

const DarkMode = ()=>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             height="30px"
             viewBox="0 -960 960 960"
             width="30px"
             fill="oklch(27.8% 0.033 256.848)"><path
            d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
        </svg>
    )
}

const LightMode = ()=>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             height="30px"
             viewBox="0 -960 960 960"
             width="30px"
             fill="oklch(79.5% 0.184 86.047)">
            <path d="M565-395q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm-226.5 56.5Q280-397 280-480t58.5-141.5Q397-680 480-680t141.5 58.5Q680-563 680-480t-58.5 141.5Q563-280 480-280t-141.5-58.5ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
        </svg>

    )
}

export default NavigationBar
