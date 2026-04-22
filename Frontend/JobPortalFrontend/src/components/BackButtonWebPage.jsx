import React from 'react'
import {useNavigate} from "react-router-dom";

const BackButtonWebPage = () => {
    const navigate = useNavigate();
    return (
        <div onClick={()=>navigate(-1)} className='flex gap-1 items-center py-2 cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#434343">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
            </svg>
            <span className='text-neutral-700 font-medium text-xl'>back</span>
        </div>
    )
}
export default BackButtonWebPage
