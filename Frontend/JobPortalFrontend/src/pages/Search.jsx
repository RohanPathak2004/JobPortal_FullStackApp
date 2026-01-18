import React, {useContext, useEffect, useState} from 'react'
import SearchIcon from "../components/SearchIcon.jsx";
import {JobContext} from "../context/JobContext.jsx";
import {Link} from "react-router-dom";
import JobPostCard from "../components/JobPostCard.jsx";
import axios from "axios";

const Search = () => {
    const {techStacks} = useContext(JobContext);
    const [searchedValue,setSearchedValue] = useState("");
    const [searchedPosts,setSearchPosts] = useState([]);
    const handleSearching = async (keyword) =>{
        try{
            const res = await axios.get(`http://localhost:8080/jobPosts/keyword/${keyword}`);
            const data = res.data;
            setSearchPosts(data);
        }catch (e){
            console.log(e.message);
        }
    }
    useEffect(()=>{
        handleSearching(searchedValue);
    },[searchedValue])
    return (
        <div>
            <div className="min-w-3/4 mt-2.5 relative">
                <label className="min-w-3/4 flex justify-center items-center sticky">
                    <input onChange={(e)=>setSearchedValue(e.target.value)} list={"stackSuggestion"} id="search" className="px-3 py-2 w-[50%] mr-1 rounded-2xl  focus:outline-pink-400 border-2" placeholder="Search by Keyword"/>
                    <datalist id={"stackSuggestion"}>
                        {
                            techStacks.map((stack,_)=>(
                                <option value={stack}>{stack}</option>
                            ))
                        }
                    </datalist>
                    <button className={"bg-orange-200 px-2 py-1 cursor-pointer rounded-2xl"} onClick={()=>handleSearching(searchedValue)}><SearchIcon/></button>
                </label>
            </div>
            <div>
                <div className="flex flex-col gap-4 items-center mt-20 overflow-y-auto mb-5">
                    {searchedPosts.map((job,idx)=>(
                        <div className="max-w-3/4 min-w-[60%]">

                                <JobPostCard jobPost={job} />

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Search
