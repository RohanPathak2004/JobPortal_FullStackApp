import React, {useState} from 'react'
import {Link, useLocation} from "react-router-dom";
import {Outlet} from "react-router";
import addJob from "./AddJob.jsx";

const AdminDashboard = () => {
    const location = useLocation();
    // Sync state with the current URL path so the UI stays correct on refresh
    const [panel,setPanel] = useState('posts')


    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
                    <p className="text-gray-500 text-sm">Monitor your postings and review incoming talent.</p>
                </header>

                {/* Modern Navigation Container */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <nav className="p-2 border-b border-gray-100 bg-gray-50/50">
                        <div className="grid grid-cols-3 gap-2 bg-gray-200/50 p-1 rounded-lg max-w-sm">
                            <Link
                                to={''}
                                onClick={()=>setPanel('posts')}
                                className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                    panel==='posts'
                                        ? 'bg-white text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Path d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 4v4h4' " /></svg>
                                Job Posts
                            </Link>

                            <Link
                                to="applications"
                                onClick={()=>setPanel('applications')}
                                className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                    panel==='applications'
                                        ? 'bg-white text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                Applications
                            </Link>
                            <Link
                                to="addJob"
                                onClick={()=>setPanel('addJob')}
                                className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                    panel==='addJob'
                                        ? 'bg-white text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Create New Opening
                            </Link>
                        </div>
                    </nav>

                    {/* Content Area */}
                    <div className="p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;