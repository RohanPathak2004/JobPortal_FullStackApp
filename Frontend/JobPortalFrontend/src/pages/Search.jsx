import React, {useContext, useEffect, useState} from 'react'
import SearchIcon from "../components/SearchIcon.jsx";
import {JobContext} from "../context/JobContext.jsx";
import {Link} from "react-router-dom";
import JobPostCard from "../components/JobPostCard.jsx";
import axios from "axios";
import {useAuthContext} from "../context/AuthContext.jsx";

const Search = () => {
    const {techStacks} = useContext(JobContext);
    const [searchedValue,setSearchedValue] = useState("");
    const [searchedPosts,setSearchPosts] = useState([]);

    const {token} = useAuthContext();

    const handleSearching = async (keyword) =>{
        try{
            const res = await axios.get(`http://localhost:8080/jobPosts/keyword/${keyword}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
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
        <div className='flex flex-col justify-center'>
            <div className="w-[95%] z-10 mt-5 relative">
                <label className="min-w-3/4 flex justify-center  items-center sticky">
                    <input onChange={(e)=>setSearchedValue(e.target.value)} list={"stackSuggestion"} id="search" className="px-3 py-1 w-[50%] rounded-md border-zinc-400 bg-zinc-100  focus:outline-zinc-400 border-2" placeholder="Search by Keyword"/>
                    <datalist id={"stackSuggestion"}>
                        {
                            techStacks.map((stack,_)=>(
                                <option value={stack}>{stack}</option>
                            ))
                        }
                    </datalist>
                    <button className={" px-2 py-1 cursor-pointer rounded-md"} onClick={()=>handleSearching(searchedValue)}><SearchIcon/></button>
                </label>
            </div>
            {
                searchedPosts.length===0?
                    <h1  className="w-full  text-3xl font-medium text-center mt-20">
                        Search job posts through typing keyword.
                    </h1>:null
            }
            <div>
                <div className="flex flex-col gap-4 items-center mt-20 overflow-y-auto mb-5 transition-all">
                    {searchedPosts.map((job,idx)=>(
                        <div className="w-3/4">
                                <JobPostCard jobPost={job} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Search
