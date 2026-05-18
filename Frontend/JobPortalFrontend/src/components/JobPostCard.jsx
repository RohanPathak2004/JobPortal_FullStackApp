import React from 'react'

const JobPostCard = ({jobPost}) => {

    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white text-zinc-900 flex flex-col gap-2 max-w-full h-full  border border-zinc-300 rounded-lg px-4 py-1 hover:border-zinc-400 transition duration-300 cursor-pointer">
            <div className="text-[1.2rem] flex items-center justify-start">
                <h2 className='font-medium text-neutral-700 dark:text-zinc-400'>ID:</h2>
                <p>
                    {jobPost.postId}
                </p>
            </div>
            <div className="text-[1.2rem] flex items-center justify-start gap-2">
                <h2 className='font-medium text-neutral-700 dark:text-zinc-400'>Job Profile:</h2>
                <p >
                    {jobPost.postProfile}
                </p>
            </div>

            <div className="text-[1.2rem] flex flex-col  justify-start gap-1">
                <h2 className='font-medium dark:text-zinc-400'>Job Description:</h2>
                <p >
                    {jobPost.postDesc}
                </p>
            </div>

            <div className="text-[1.2rem] flex items-center justify-start gap-1">
                <h2 className='font-medium dark:text-zinc-400'>Required Experience:</h2>
                <p >
                    {jobPost.reqExperience}
                </p>
            </div>

            <h2 className="text-[1.2rem] font-medium mb-2">
                <span className='dark:text-zinc-400'>Skills:</span>
                <ul className="flex flex-wrap gap-2 mt-2 list-none p-0">
                    {jobPost.postTechStack.map((stack, idx) => (
                        <li
                            key={idx}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium"
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
