import React from 'react'

const ApplicationCardForCandidate = ({postId,postProfile,status='Review'}) => {
    const findColor = (status) => {
        if (status === 'accept') return { color: 'green' };
        if (status === 'reject') return { color: 'red' };
        return { color: 'orange' };
    };
    return (
        <div className={'bg-white flex items-center justify-between border border-zinc-400 rounded-md p-4'}>
            <div>
                <div className='flex items-center gap-2'>
                    <span>
                        Job Id
                    </span>
                    <span className='font-bold text-[1.2rem]'>{postId}</span>
                </div>
                <div className={'flex items-center gap-2'}>
                    <span>Job Title</span>
                    <span   className='font-bold text-[1.2rem]'>{postProfile}</span>
                </div>
            </div>
            <div>
                <span className={'font-bold'} style={findColor(status)} >{status.charAt(0).toUpperCase()+status.substring(1)}</span>
            </div>
        </div>
    )
}
export default ApplicationCardForCandidate
