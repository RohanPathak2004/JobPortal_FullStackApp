import React, {useEffect, useState} from 'react'
import {Document, Page} from "react-pdf";
import {pdfjs} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
// This tells react-pdf to use the worker from a CDN instead of your local server
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const ResumePreview = ({file}) => {
    console.log(file)
    const [fileUrl,setFileUrl] = useState('');
    useEffect(() => {
        setFileUrl(file.fileData);
    },[])
    console.log(file)
    return (
        <div
            className=" w-full flex flex-col justify-center items-center  h-full bg-gray-100 overflow-y-auto overflow-x-auto">

            <iframe title={file.filename} src={`data:application/pdf;base64,${file.fileData}`} width="100%" height="100%">

            </iframe>
        </div>
    )
}
export default ResumePreview
