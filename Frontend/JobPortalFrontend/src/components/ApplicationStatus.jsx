import React from 'react'

const ApplicationStatus = () => {

    return (
        <div className='flex gap-2 md:gap-2 items-center'>
            <label className='text-xl font-medium' htmlFor="status">Application Status: </label>

            <select className='outline-1 outline-neutral-500 rounded-md p-1' name="status" id="status">
                <option  value="interview">Schedule Interview</option>
                <option value="review">Under Review</option>
                <option value="rejected">Rejected</option>
            </select>
        </div>
    )
}
export default ApplicationStatus
