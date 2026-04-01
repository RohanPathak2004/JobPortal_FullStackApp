import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {JobContext} from "../context/JobContext.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";



const AddJob = () => {
    const navigate = useNavigate();
    const { setReload, techStacks } = useContext(JobContext);
    const { user, token } = useAuthContext();

    const [indexOfSelectedStacks, setIndexOfSelectedStacks] = useState([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [newJob, setNewJob] = useState({
        postProfile: "",
        postDesc: "",
        reqExperience: 0,
    });

    const handleStackSelection = (idx) => {
        setIndexOfSelectedStacks(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        if (indexOfSelectedStacks.length === 0) {
            alert("Please select at least one tech stack");
            return;
        }

        // Logic Fix: Construct the object directly instead of relying on multiple state updates
        const selectedStacks = indexOfSelectedStacks.map(i => techStacks[i]);
        const jobData = {
            ...newJob,
            email: user?.email,
            postTechStack: selectedStacks,
            postId: null
        };

        try {
            await axios.post("http://localhost:8080/jobPost", jobData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReload(prev => !prev);
            navigate("/");
        } catch (err) {
            console.error("Submission error:", err.message);
        }
    };

    return (
        <div className="w-full  bg-gray-50 flex items-center justify-center p-4">
            <form
                onSubmit={handleFormSubmission}
                className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white border border-gray-200 flex flex-col p-6 gap-4 rounded-3xl shadow-lg"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Post a New Job</h2>

                {/* Job Profile */}
                <div className="w-full">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Job Profile</label>
                    <input
                        required
                        value={newJob.postProfile}
                        onChange={(e) => setNewJob(prev => ({...prev, postProfile: e.target.value}))}
                        className="w-full mt-1 px-4 py-2 rounded-xl border-2 border-blue-100 focus:border-blue-400 focus:outline-none transition-all"
                        type="text"
                        placeholder="e.g. Fullstack Developer"
                    />
                </div>

                {/* Job Description */}
                <div className="w-full">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Job Description</label>
                    <textarea
                        required
                        value={newJob.postDesc}
                        onChange={(e) => setNewJob(prev => ({...prev, postDesc: e.target.value}))}
                        placeholder="Describe the role..."
                        className="w-full mt-1 min-h-[100px] px-4 py-2 rounded-xl border-2 border-blue-100 focus:border-blue-400 focus:outline-none transition-all"
                    />
                </div>

                {/* Experience */}
                <div className="w-full">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Experience (Years)</label>
                    <input
                        required
                        type="number"
                        min="0"
                        value={newJob.reqExperience}
                        onChange={(e) => setNewJob(prev => ({...prev, reqExperience: e.target.value}))}
                        className="w-full mt-1 px-4 py-2 rounded-xl border-2 border-blue-100 focus:border-blue-400 focus:outline-none transition-all"
                    />
                </div>

                {/* Tech Stack Dropdown */}
                <div className="w-full relative">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Tech Stack</label>
                    <button
                        type="button"
                        onClick={() => setOpenDropDown(!openDropDown)}
                        className="w-full mt-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-xl transition-colors shadow-md"
                    >
                        {indexOfSelectedStacks.length === 0 ? "Select Tech Stack" : `Selected (${indexOfSelectedStacks.length})`}
                    </button>

                    {openDropDown && (
                        <div className="absolute z-20 w-full mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl">
                            {techStacks.map((stack, idx) => (
                                <label key={idx} className="flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-none">
                                    <input
                                        type="checkbox"
                                        checked={indexOfSelectedStacks.includes(idx)}
                                        onChange={() => handleStackSelection(idx)}
                                        className="w-4 h-4 rounded text-blue-600"
                                    />
                                    <span className="ml-3 text-gray-700">{stack}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Selected Tags Display */}
                <div className="flex flex-wrap gap-2">
                    {indexOfSelectedStacks.map((index, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold animate-in fade-in zoom-in duration-200">
                            {techStacks[index]}
                        </span>
                    ))}
                </div>

                <div className="w-full pt-4">
                    <button
                        type="submit"
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transform active:scale-[0.98] transition-all"
                    >
                        Post Job
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;