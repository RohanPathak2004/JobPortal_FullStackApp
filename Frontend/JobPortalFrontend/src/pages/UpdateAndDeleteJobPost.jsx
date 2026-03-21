import React, {useContext, useEffect, useState} from 'react'
import {JobContext} from "../context/JobContext.jsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useAuthContext} from "../context/AuthContext.jsx";

const UpdateAndDeleteJobPost = () => {

    const {postId} = useParams();
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    const {setReload, techStacks} = useContext(JobContext);
    const [indexOfSelectedStacks, setIndexOfSelectedStacks] = useState([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [finalJobPost, setFinalJobPost] = useState({});
    const [newJob, setNewJob] = useState({
        postId: null,
        postProfile: "",
        postDesc: "",
        reqExperience: 0,
        postTechStack: []
    })
    const {token} = useAuthContext();



    const setJobDetails = (data) => {
        let items = data.postTechStack;
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < techStacks.length; j++) {
                if (items[i] === techStacks [j]) {
                    indexOfSelectedStacks.push(j);
                    break;
                }
            }
        }
        setNewJob(data);
    }
    // console.log(newJob);
    const handleStackSelection = (idx) => {
        if (indexOfSelectedStacks.includes(idx)) {
            setIndexOfSelectedStacks(indexOfSelectedStacks.filter(index => (index !== idx)));
            return;
        }
        setIndexOfSelectedStacks(prevState => ([...prevState, idx]));
    }
    const handleFromSubmission = (e) => {
        e.preventDefault();
        if (indexOfSelectedStacks.length === 0) return;
        const selectedStacks = indexOfSelectedStacks.map(i => techStacks[i]);
        const finalJob = {...newJob, postTechStack: selectedStacks};
        setNewJob(finalJob);
        setFinalJobPost((finalJob));
    }
    const updateJob = async () => {
        try {
            const res = await axios.put("http://localhost:8080/jobPost", newJob,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = res.data;
            setReload(prev => !prev);
            navigate("/");
        } catch (e) {
            console.log(e.message);
        }
    }
    const handleDeleteJobPost = async () => {
        alert("Are You sure, You want to Delete this Post");
        try {
            const res = await axios.delete(`http://localhost:8080/jobPost/${postId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = res.data;
            setReload(prev => !prev);
            navigate("/");
        } catch (e) {
            console.log(e.message);
        }
    }


    useEffect(() => {
        setJobDetails(data);
    }, [])

    useEffect(() => {
        if (JSON.stringify(finalJobPost) === JSON.stringify({})) return;
        updateJob(finalJobPost);
    }, [finalJobPost])


    return (
        <div className="w-full min-h-screen bg-gray-50 p-4">
            {/* Go Back Link - Adjusted for better flow */}
            <div onClick={()=>navigate(-1)} className="mb-6 md:ml-20 cursor-pointer text-black text-xl hover:text-blue-600 transition-colors">
                {"← Go back"}
            </div>

            <form
                onSubmit={(e) => handleFromSubmission(e)}
                className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl border bg-white flex flex-col px-4 py-6 gap-4 rounded-2xl shadow-sm mx-auto my-5"
            >
                <div className="w-full px-2">
                    <h1 className="text-xl md:text-2xl font-bold text-center underline underline-offset-4 text-red-500">
                        ID: {postId}
                    </h1>
                </div>

                {/* Job Profile */}
                <div className="w-full px-2">
                    <label className="text-lg font-medium block mb-1">Job Profile</label>
                    <input
                        required
                        value={newJob.postProfile}
                        onChange={(e) => setNewJob(prevState => ({...prevState, postProfile: e.target.value}))}
                        className="w-full px-4 py-2 rounded-xl border-2 border-blue-400 focus:outline-pink-400"
                        type="text"
                        placeholder="Job Profile"
                    />
                </div>

                {/* Job Description */}
                <div className="w-full px-2">
                    <label className="text-lg font-medium block mb-1">Job Description</label>
                    <textarea
                        value={newJob.postDesc}
                        placeholder="Job Description"
                        onChange={(e) => (setNewJob(prevState => ({...prevState, postDesc: e.target.value})))}
                        className="w-full min-h-[120px] px-4 py-2 rounded-xl border-2 border-blue-400 focus:outline-pink-400"
                        required
                    />
                </div>

                {/* Experience */}
                <div className="w-full px-2">
                    <label className="text-lg font-medium block mb-1">Experience Required (Years)</label>
                    <input
                        value={newJob.reqExperience}
                        placeholder="e.g. 3"
                        onChange={(e) => (setNewJob(prevState => ({...prevState, reqExperience: e.target.value})))}
                        className="w-full px-4 py-2 rounded-xl border-2 border-blue-400 focus:outline-pink-400"
                        required
                        type="number"
                        min="0"
                        max="30"
                    />
                </div>

                {/* Tech Stack Dropdown Section */}
                <div className="w-full px-2 py-2 flex flex-col">
                    <button
                        type="button"
                        onClick={() => setOpenDropDown(!openDropDown)}
                        className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-6 py-2 rounded-xl text-lg transition-colors"
                    >
                        {indexOfSelectedStacks.length === 0 ? "Choose Tech Stack" : `Selected (${indexOfSelectedStacks.length})`}
                    </button>

                    <div className="flex flex-wrap mt-3 items-center gap-2">
                        {indexOfSelectedStacks.map((index, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium"
                            >
                        {techStacks[index]}
                    </span>
                        ))}
                    </div>

                    <div className="w-full relative mt-1">
                        {openDropDown && (
                            <div className="absolute z-20 bg-white w-full max-h-48 border-2 rounded-xl shadow-lg overflow-y-auto top-0 left-0">
                                {techStacks.map((techStack, idx) => (
                                    <label className="flex items-center gap-3 p-2 border-b last:border-none hover:bg-gray-50 cursor-pointer" key={idx}>
                                        <input
                                            onClick={() => handleStackSelection(idx)}
                                            defaultChecked={indexOfSelectedStacks.includes(idx)}
                                            type="checkbox"
                                            className="w-4 h-4"
                                        />
                                        <span className="text-base">{techStack}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full py-4 flex flex-col sm:flex-row gap-3 justify-center items-center px-2">
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-10 py-3 bg-orange-400 hover:bg-orange-500 text-white font-bold rounded-xl transition-all shadow-md"
                    >
                        Update Post
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDeleteJobPost(postId)}
                        className="w-full sm:w-auto px-10 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-md"
                    >
                        Delete Post
                    </button>
                </div>
            </form>
        </div>
)
}
export default UpdateAndDeleteJobPost
