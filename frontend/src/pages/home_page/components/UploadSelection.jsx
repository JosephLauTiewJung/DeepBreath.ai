import {useState} from "react";
import {FileText} from "lucide-react";

export const UploadSection = ({ analyzeResult, onComplete, isProcessing, isAnalyzed, isUploaded }) => {
    const [xrayFile, setXrayFile] = useState(null);
    const [reportFile, setReportFile] = useState(null);
    const [xrayPreview, setXrayPreview] = useState(null);

    const handleXrayChange = (e) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setXrayFile(file);
            setXrayPreview(URL.createObjectURL(file));
        }
    };

    const handleReportChange = (e) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setReportFile(file);
        }
    };

    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-2">Analyzing Clinical Data</h2>
                <p className="text-slate-500 animate-pulse">Running neural segmentation and semantic analysis...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12 py-10">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Diagnostic Portal</h1>
                <p className="text-lg text-slate-600">Upload medical imagery and clinical reports for instant AI-assisted evaluation.</p>
            </div>
            {/* X-Ray Upload */}
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">X-Ray Film</h3>
                <p className="text-slate-500 text-sm mb-6">Upload PNG or JPEG radiological imagery.</p>
                <label className="block w-full cursor-pointer">
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-slate-50">
                        {xrayPreview ? (
                            <img src={xrayPreview} alt="Preview" className="mx-auto h-32 w-auto object-contain rounded" />
                        ) : (
                            <span className="text-sm text-slate-500 font-medium">+ Choose File</span>
                        )}
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleXrayChange} />
                </label>
            </div>
            {/* Health Report Upload */}
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Health Report</h3>
                <p className="text-slate-500 text-sm mb-6">Upload blood work, histology, or patient history PDF/Text.</p>
                <label className="block w-full cursor-pointer">
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors bg-slate-50">
                        {reportFile ? (
                            <div className="flex flex-col items-center">
                                <FileText className="w-12 h-12 text-indigo-500 mb-2" />
                                <span className="text-sm text-slate-600 font-medium truncate max-w-full">
                                        {reportFile.name}
                                    </span>
                            </div>
                        ) : (
                            <span className="text-sm text-slate-500 font-medium">+ Choose File</span>
                        )}
                    </div>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleReportChange} />
                </label>
            </div>
            <div className="flex justify-center pt-8 flex-col w-[50%] mx-auto">
                <button
                    onClick={() => onComplete(xrayFile, reportFile)}
                    disabled={!xrayFile || !reportFile || isProcessing}
                    className="m-5 bg-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 shadow-lg active:scale-95"
                >
                    Upload Docs!
                </button>
                <button
                    onClick={analyzeResult}
                    disabled={!xrayFile || !reportFile || isAnalyzed || !isUploaded}
                    className="m-5 bg-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 shadow-lg active:scale-95"
                >
                    Begin Analysis
                </button>
            </div>
        </div>
    );
};
