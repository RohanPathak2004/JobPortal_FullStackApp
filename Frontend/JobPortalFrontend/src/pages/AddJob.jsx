import React, {useState} from 'react'

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

    const [openDropDown, setOpenDropDown] = useState(false);

    const [newJob, setNewJob] = useState({
        postId: null,
        postProfile: "",
        postDesc: "",
        reqExperience: 0,
        postTechStack: []
    })
    return (
        <div className="min-w-full min-h-full ">
            <form className="min-h-1/2 max-h-3/4 max-w-[40%] border flex flex-col px-2 py-2 gap-2 rounded-2xl m-auto my-10">
                <div className="w-full px-2">
                    <label className="text-[1.2rem] font-medium block ml-1">Job Profile</label>
                    <input required
                           className="w-full px-2 py-2 rounded-2xl border-2 border-blue-400 focus:outline-pink-400"
                           type="text" placeholder="Job Profile"/>
                </div>
                <div className="w-full px-2">
                    <label className="text-[1.2rem] font-medium block ml-1">Job Description</label>
                    <textarea
                        className="w-full max-h-1/6 px-2 py-2 rounded-2xl border-2 border-blue-400 focus:outline-pink-400"
                        required/>
                </div>
                <div className="w-full px-2">
                    <label className="text-[1.2rem] font-medium block ml-1">Experience Required:</label>
                    <input className="w-full px-2 py-2 rounded-2xl border-2 border-blue-400 focus:outline-pink-400"
                           required type="number" min="0" max="30"/>
                </div>
                <div className="w-full px-2 flex flex-col gap-2 justify-center ">
                    <button type="button" onClick={() => setOpenDropDown(!openDropDown)}
                            className="bg-blue-500 text-white font-medium px-10 py-2 rounded-2xl  ">Choose Skills
                    </button>
                    <div className="w-full flex justify-center items-center relative">
                    {openDropDown &&
                        <div className="flex flex-col absolute bg-white w-full max-h-40 border-2 px-1   overflow-y-scroll top-0 "> {
                            techStacks.map((techStack, idx) => (
                                <label className="border-b" key={idx}>
                                    <input type={"checkbox"}/>
                                    <span className="text-[1.2rem]">{techStack}</span>
                                </label>
                            ))}
                        </div>
                    }
                    </div>

                </div>
                <div className="w-full flex justify-center items-center">
                    <button type={"submit"} className="w-[75%]  py-2  bg-blue-500 text-white font-medium rounded-2xl">Upload</button>
                </div>
            </form>
        </div>
    )
}
export default AddJob
