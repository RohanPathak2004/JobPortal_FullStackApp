import React, {memo, useEffect, useState} from 'react'
import {Document, Page} from "react-pdf";
import {pdfjs} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
// This tells react-pdf to use the worker from a CDN instead of your local server
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const ResumePreview = ({file}) => {
    console.log("resume component reloaded")
    const [fileUrl,setFileUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const loadFile =async ()=>{
        setLoading(true);
        const byteCharacter = atob(file.fileData);
        const byteNumbers = new Array(byteCharacter.length);
        for(let i = 0; i<byteNumbers.length; i++){
            byteNumbers[i] = byteCharacter.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const url = URL.createObjectURL(blob);

        setFileUrl(url);
        setLoading(false)
    }
    useEffect(() => {
        loadFile();
    },[file])
    return (
        <div className="w-full flex flex-col justify-center items-center h-full bg-gray-100 overflow-hidden">
            {loading ? (
                <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-gray-500">Loading Resume...</p>
                </div>
            ) : fileUrl ? (
                <object
                    title="Resume"
                    data={fileUrl}
                    type={file.type}
                    className="w-full h-full border-none"
                />
            ) : (
                <div className="text-gray-500">No resume data found.</div>
            )}
        </div>
    )
}
export default ResumePreview
