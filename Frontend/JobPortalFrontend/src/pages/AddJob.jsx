import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {JobContext} from "../context/JobContext.jsx";

const AddJob = () => {
    // const jobPost = {
    //     postDesc:
    //         "Must have good experience in core Java and advanced Java",
    //     postId:
    //         1,
    //     postProfile:
    //         "Java Developer",
    //     postTechStack:
    //         ['Core Java', 'J2EE', 'Spring Boot', 'Hibernate'],
    //     reqExperience:
    //         2
    // }
    const techStacks = ["React", "Spring Boot", "PostgresSQL",
        "MongoDB", "Express", "Node.js",
        "Next.js", "Tailwind",
        "Django", "Networking", "Cisco", "Routing",
        "Switching", "iOS Development",
        "Android Development",
        "Mobile App",
        " Angular", "MySQL",
        "Laravel", "Vue.js"]

    const navigate = useNavigate();
    const {setReload} = useContext(JobContext);
    const [indexOfSelectedStacks,setIndexOfSelectedStacks] = useState([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [finalJobPost,setFinalJobPost] = useState({});
    const [newJob, setNewJob] = useState({
        postId: null,
        postProfile: "",
        postDesc: "",
        reqExperience: 0,
        postTechStack: []
    })

    const handleStackSelection = (idx)=>{
        if(indexOfSelectedStacks.includes(idx)){
            setIndexOfSelectedStacks(indexOfSelectedStacks.filter(index=>(index !== idx)));
            return;
        }
        setIndexOfSelectedStacks(prevState => ([...prevState,idx]));
    }
    const handleFromSubmission =  (e)=>{
        e.preventDefault();
        if(indexOfSelectedStacks.length === 0) return;
        const selectedStacks = indexOfSelectedStacks.map(i => techStacks[i]);
        const finalJob = { ...newJob, postTechStack: selectedStacks };
        setNewJob(finalJob);
        setFinalJobPost((finalJob));
    }
    useEffect(()=>{
        if(JSON.stringify(finalJobPost) === JSON.stringify({})) return;
        addJob(finalJobPost);
    },[finalJobPost])
    const addJob = async ()=>{
        try{
            const res = await axios.post("http://localhost:8080/jobPost",newJob);
            const data = res.data;
            setReload(prev=>!prev);
            navigate("/");
        }catch (e){
            console.log(e.message);
        }

    }


    return (
        <div className="min-w-full min-h-full ">
            <form
                onSubmit={(e)=>handleFromSubmission(e)}
                className="min-h-1/2 max-h-3/4 max-w-[40%] border  flex flex-col px-2 py-4 gap-2 rounded-2xl m-auto my-10">
                <div className="w-full px-2">
                    <label className="text-[1.2rem] font-medium block ml-1">Job Profile</label>
                    <input required
                           onChange={(e) => setNewJob(prevState => ({...prevState, postProfile: e.target.value}))}
                           className="w-full px-2 py-2 rounded-2xl border-2 border-blue-400 focus:outline-pink-400"
                           type="text" placeholder="Job Profile"/>
                </div>
                <div className="w-full px-2">
                    <label className="text-[1.2rem] font-medium block ml-1">Job Description</label>
                    <textarea
                        placeholder={"Job Description"}
                        onChange={(e) => (setNewJob(prevState => ({...prevState, postDesc: e.target.value})))}
                        className="w-full max-h-1/6 px-2 py-2 rounded-2xl border-2 border-blue-400 focus:outline-pink-400"
                        required/>
                </div>
                <div className="w-full px-2">
                    <label className="text-[1.2rem] font-medium block ml-1">Experience Required:</label>
                    <input
                        placeholder={"Experience required in Years"}
                        onChange={(e) => (setNewJob(prevState => ({...prevState, reqExperience: e.target.value})))}
                        className="w-full px-2 py-2 rounded-2xl border-2 border-blue-400 focus:outline-pink-400"
                        required type="number" min="0" max="30"/>
                </div>
                <div className="w-full px-2 py-2 flex flex-col  justify-center ">
                    <button type="button" onClick={() => setOpenDropDown(!openDropDown)}
                            className="bg-blue-400 text-white font-medium px-10 py-2 rounded-2xl text-[1.2rem]  ">{indexOfSelectedStacks.length ===0?"Choose Tech Stack":"Selected"}
                    </button>
                    <div className="w-full flex justify-center items-center relative transition-all">
                        {openDropDown &&
                            <div
                                className="flex flex-col absolute bg-white w-full max-h-40 border-2 px-1   overflow-y-scroll top-0 "> {
                                techStacks.map((techStack, idx) => (
                                    <label className="border-b" key={idx}>
                                        <input onClick={()=>handleStackSelection(idx)} defaultChecked={indexOfSelectedStacks.includes(idx)} type={"checkbox"}/>
                                        <span className="text-[1.2rem]">{techStack}</span>
                                    </label>
                                ))}
                            </div>
                        }
                    </div>

                </div>
                <div className="w-full py-2  flex justify-center px-2 items-center">
                    <button type={"submit"}
                            className="w-full  py-2  bg-orange-400 text-white font-medium rounded-2xl ">Add
                    </button>
                </div>
            </form>
        </div>
    )
}
export default AddJob
