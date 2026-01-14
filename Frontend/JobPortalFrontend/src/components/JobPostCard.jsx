import React from 'react'

const JobPostCard = ({jobPost}) => {

    return (
        <div className="flex flex-col gap-0.5 max-w-full m-auto border-2 border-amber-200 rounded-2xl px-2 py-2 hover:border-amber-400 cursor-pointer">
            <h2 className="text-[1.2rem]">
                <span><span className="font-bold">ID:</span> {jobPost.postId}</span>
            </h2>
            <h2 className="text-[1.2rem]">
                <span><span className="font-bold">Job Profile:</span> {jobPost.postProfile}</span>
            </h2>
            <h2 className="text-[1.2rem]">
                <span><span className="font-bold">Job Description:</span> {jobPost.postDesc}</span>
            </h2>
            <h2 className="text-[1.2rem]">
                <span><span className="font-bold">Experience:</span> {jobPost.reqExperience}</span>
            </h2>
            <h2 className="text-2xl font-bold mb-2">
                <span>Skills:</span>
                <ul className="flex flex-wrap gap-2 mt-2 list-none p-0">
                    {jobPost.postTechStack.map((stack, idx) => (
                        <li
                            key={idx}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                            {stack}
                        </li>
                    ))}
                </ul>
            </h2>

        </div>
    )
}
export default JobPostCard
