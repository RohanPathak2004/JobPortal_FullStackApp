import React from 'react'
import {Link} from "react-router-dom";
import {Outlet} from "react-router";

const ApplicationCard = ({application}) => {

    // {
    //     email
    //         :
    //         "kavitapathak@gmail.com"
    //     id
    //         :
    //         52
    //     job
    //         :
    //         email
    //             :
    //             "rohanpathak258@gmail.com"
    //     postDesc
    //         :
    //         "Strong background in machine learning and data analysis"
    //     postId
    //         :
    //         3
    //     postProfile
    //         :
    //         "Data Scientist"
    //     postTechStack
    //         :
    //         (3) ['Python', 'Machine Learning', 'Data Analysis']
    //     reqExperience
    //         :
    //         4
    //             [[Prototype]]
    // :
    //     Object
    //     name
    //         :
    //         "Rohan Pathak"
    //     resumeFile
    //         :
    //         "JVBERi0xLjUKJb/3ov4KMyAwIG9iago8PCAvTGluZWFyaXplZ
    //     resumeName
    //         :
    //         "Rohan_Resume.pdf"
    //     resumeType
    //         :
    //         "application/pdf"
    // }


    return (
        <div
            className='w-full p-6 mb-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row md:justify-between md:items-center gap-4'>

            {/* Left Section: Info */}
            <div className='flex flex-col space-y-1'>
                <div className='flex flex-col justify-start md:flex-row  md:items-center md:gap-2'>
                    <span className='text-sm font-semibold text-gray-500 uppercase tracking-wider'>Candidate</span>
                    <span className='text-lg font-medium text-gray-900'>{application.email}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-sm text-gray-600'>Job ID:</span>
                    <span className='px-2 py-0.5  text-gray-800 text-sm font-mono rounded-md border border-gray-200'>
                {application.job.postId}
            </span>
                </div>
            </div>

            {/* Right Section: Action */}
            <div className='flex items-center'>
                <Link to={`/review/application/${application.id}`} state={application.id}>
                    <button
                        className='w-full  md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors duration-200'>
                        Review Application
                    </button>
                </Link>
            </div>

        </div>
    )
}
export default ApplicationCard
