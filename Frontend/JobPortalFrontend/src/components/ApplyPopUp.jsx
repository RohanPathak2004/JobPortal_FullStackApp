import React, {useState} from 'react'
import {useAuthContext} from "../context/AuthContext.jsx";
import axios from "axios";

const ApplyPopUp = ({setOpen,jobId}) => {

    const [application,setApplication] = useState({
        email:"",
        name:"",
        file:'',
        jobId:''
    })
    const [file,setFile] = useState();
    const handleChange = (e)=>{
        const {name, value} = e.target;
         setApplication({...application,[name]:value});
    }

    const {user,token} = useAuthContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', application.name);
        formData.append('email', user.email);
        formData.append('jobId', jobId);
        formData.append('resumeFile', file); // file is already a File object

        axios.post('http://localhost:8080/apply', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => console.log('Success:', res.data))
            .catch(err => console.error('Error:', err));
    };
    console.log(file)
    return (
        <div className='w-full h-full md:h-[50vh] bg-gray-50 py-3 px-4 rounded-lg'>
            {/* Navigation Header */}
            <div className='max-w-md mx-auto mb-6'>
                <button

                    className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium group'
                >
                    <span onClick={() => setOpen(false)} className="group-hover:-translate-x-1 transition-transform">←</span>
                    Back
                </button>
            </div>

            {/* Form Card */}
            <div className='max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6'>Application Details</h2>

                <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col gap-5'>
                    {/* Full Name Field */}
                    <div className='w-full flex flex-col gap-1.5'>
                        <label
                            htmlFor='name'
                            className='text-sm font-semibold text-gray-700 ml-1'
                        >
                            Full Name
                        </label>
                        <input
                            onChange={(e)=>handleChange(e)}
                            value={application.name}
                            required
                            id='name'
                            type='text'
                            name='name'
                            placeholder="e.g. Jane Doe"
                            className='w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400'
                        />
                    </div>

                    {/* Resume/Link Field */}
                    <div className='w-full flex flex-col gap-1.5'>
                        <label
                            htmlFor='resume'
                            className='text-sm font-semibold text-gray-700 ml-1'
                        >
                            Resume
                        </label>
                        <input
                            onChange={(e)=>setFile(e.target.files[0])}

                            required
                            id='resume'
                            type={'file'}
                            accept={'application/pdf'}
                            name='resume'
                            placeholder="upload Resume only pdf file"
                            className='w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400'
                        />
                        <p>*accepts only pdf</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className='w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98]'
                    >
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    )
}
export default ApplyPopUp
