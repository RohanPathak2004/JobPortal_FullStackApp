import React, {useEffect, useState} from 'react'
import {Document, Page} from "react-pdf";
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
// This tells react-pdf to use the worker from a CDN instead of your local server
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const ResumePreview = ({file}) => {
    const [blobData, setBlobData] = React.useState(null);

    const dataToBlob = (fileData,fileType='application/pdf') => {
        const byteChars = atob(fileData);
        const byteNum = new Array(byteChars.length);

        for(let i = 0; i<byteChars.length; i++) {
            byteNum[i] = byteChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNum);
        return new Blob([byteArray], { type: fileType });
    }
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const data = dataToBlob(file.fileData,file.fileType);
    return (
        <div className=" w-full flex flex-col justify-center items-center px-4 h-full bg-gray-100 overflow-y-auto overflow-x-auto">
            {/* - file={data}: can be the Base64 string OR the Blob URL.
          - loading: shows a message while processing.
      */}
            <Document
                file={data}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<p className="text-blue-600 animate-pulse">Loading Resume...</p>}
                error={<p className="text-red-500">Failed to load PDF. Please try again.</p>}
            >
                {/* - scale: Adjusts the zoom (1.0 is 100%).
            - renderMode: "canvas" is usually best for previews.
        */}
                <Page
                    pageNumber={1}
                    scale={1.2}
                    className="shadow-lg border border-gray-300 !position-static !static"
                    renderTextLayer={false} // Improves performance for simple previews
                    renderAnnotationLayer={true}
                />
            </Document>

            {numPages > 1 && (
                <p className="mt-2 text-sm text-gray-500">
                    Page 1 of {numPages}
                </p>
            )}
        </div>
    )
}
export default ResumePreview
