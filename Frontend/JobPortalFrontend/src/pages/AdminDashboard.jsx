import React, {useEffect, useRef, useState} from 'react'
import {Link, useLocation} from "react-router-dom";
import {Outlet} from "react-router";
import addJob from "./AddJob.jsx";

const AdminDashboard = () => {
    const location = useLocation();
    // Sync state with the current URL path so the UI stays correct on refresh
    const [panel,setPanel] = useState('posts');
    useEffect(()=>{
        let url = location.pathname;
        const pathName = url.substring(1);
        console.log(pathName);
        if(pathName === ""){
            setPanel('posts');
        }else
            setPanel(pathName);
    })
    return (
        <div className="h-full bg-gray-50/50 dark:bg-slate-950 dark:border-l dark:border-zinc-700 dark:border-r p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <header className="mb-8 ">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">Admin Management</h1>
                    <p className="text-gray-500 text-sm dark:text-white">Monitor your postings and review incoming talent.</p>
                </header>

                {/* Modern Navigation Container */}
                <div className="bg-white dark:border-zinc-700 border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-800">
                    <nav className="p-2 border-b dark:border-zinc-700 border-gray-100 bg-gray-50/50 dark:bg-slate-700">
                        <div className="grid transition duration-300 grid-cols-3 gap-2 bg-gray-200/50 dark:bg-slate-800 dark:text-white p-1 rounded-lg max-w-sm">
                            <Link
                                to={''}
                                onClick={()=>setPanel('posts')}
                                className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                    panel==='posts'
                                        ? 'bg-white dark:text-white dark:bg-gray-700 text-green-700 shadow-sm'
                                        : 'text-zinc-600 hover:text-zinc-900'
                                }`}
                            >
                                Job Posts
                            </Link>

                            <Link
                                to="applications"
                                onClick={()=>setPanel('applications')}
                                className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                    panel==='applications'
                                        ? 'bg-white dark:text-white dark:bg-gray-700 text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Applications
                            </Link>
                            <Link
                                to="addJob"
                                onClick={()=>setPanel('addJob')}
                                className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                    panel==='addJob'
                                        ? 'bg-white dark:text-white dark:bg-gray-700 text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Create New Opening
                            </Link>
                        </div>
                    </nav>

                    {/* Content Area */}
                    <div className="p-6">
                        <Outlet context={'posts'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;