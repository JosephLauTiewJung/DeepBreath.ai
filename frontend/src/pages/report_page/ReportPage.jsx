import { Navbar } from "../../components/NavBar.jsx";
import ReactMarkdown from 'react-markdown';
import MDEditor from '@uiw/react-md-editor';
import { useState } from "react";
import { Download, Printer, ArrowLeft, Calendar, ShieldCheck, Activity, Edit, X, Hospital } from 'lucide-react';
import { useNavigate } from "react-router";
import axios from "axios";
import ProcessingPage from "./components/ProcessingPage.jsx";

const ReportPage = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false)
    const [reportDate] = useState(new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }));

    const [doctorReport, setDoctorReport] = useState(() => {
        return sessionStorage.getItem("doctorReport") || "# No Report Found\n\nPlease return to the homepage and upload an image to generate a medical analysis report.";
    });

    const handlePrint = () => {
        window.print();
    };

    const handleBack = () => {
        navigate("/home");
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([doctorReport], {type: 'text/markdown'});
        element.href = URL.createObjectURL(file);
        element.download = "medical-report.md";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    const handleFindDoctor = async () => {
        setIsProcessing(true)
        // ask for user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const BASE_URL = "http://localhost:8000"
                const url = `${BASE_URL}/findDoctor`
                const data = {
                    "doctor_report" : doctorReport,
                    "user_location" : {
                        "latitude" : latitude,
                        "longitude": longitude
                    }
                }
                const response = await axios.post(url, data)
                    .catch(error => {
                        alert(error)
                        setIsProcessing(false)
                    })
                setIsProcessing(false)
                sessionStorage.setItem("findDoctorReport", JSON.stringify(response.data['doctorInfo']))
                navigate("/doctor")
            })
        }
        else {
            alert("Geolocation is not supported by this browser. Please allow location access to find nearby doctors.");
            setIsProcessing(false)
            navigate("/report")
        }
    }
    if (isProcessing) {
        return (
            <ProcessingPage/>
        )
    }
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12 print:bg-white">
            <div className="print:hidden">
                <Navbar />
            </div>

            <main className="max-w-5xl mx-auto px-4 pt-10 sm:px-6 lg:px-8 print:p-0 print:max-w-none">
                {/* Header Actions - Hidden when printing */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-slate-600 hover:text-blue-600 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Dashboard
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex items-center px-4 py-2 border rounded-lg transition-all shadow-sm font-medium ${
                                isEditing 
                                ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100" 
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                            }`}
                        >
                            {isEditing ? (
                                <div>
                                    <X className="w-4 h-4 mr-2"/>
                                    Stop Editing
                                </div>
                            ) : (
                                <>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Report
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm font-medium"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download MD
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                        >
                            <Printer className="w-4 h-4 mr-2" />
                            Print Report
                        </button>
                    </div>
                </div>

                {/* Report Card */}
                <div
                    className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden print:shadow-none print:border-none print:rounded-none"
                >
                    {/* Report Header */}
                    <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white p-8 print:bg-none print:text-black print:p-0 print:mb-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2 opacity-90">
                                    <Activity className="w-5 h-5" />
                                    <span className="font-semibold tracking-wide uppercase text-xs">Medical Analysis System</span>
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-2 print:text-slate-900">Medical Imaging Report</h1>
                                <p className="text-blue-100 print:text-slate-500">AI-Generated Analysis & Findings</p>
                            </div>
                            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 print:bg-slate-100 print:text-slate-700">
                                <Calendar className="w-5 h-5 mr-3 text-blue-100 print:text-slate-500" />
                                <div className="flex flex-col">
                                    <span className="text-xs text-blue-200 uppercase font-semibold print:text-slate-400">Report Date</span>
                                    <span className="font-medium text-white print:text-slate-900">{reportDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Report Content */}
                    <div className="p-8 md:p-12 print:p-0">
                        {/* Disclaimer Banner */}
                        <div className="mb-10 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start gap-3">
                            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-amber-800 font-semibold text-sm uppercase tracking-wide mb-1">AI-Assisted Analysis</h3>
                                <p className="text-amber-700 text-sm leading-relaxed">
                                    This report is generated by an artificial intelligence system and is intended for informational and educational purposes only. It does not replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for clinical decision-making.
                                </p>
                            </div>
                        </div>

                        {isEditing ? (
                            <div className="prose max-w-none">
                                <MDEditor
                                    value={doctorReport}
                                    onChange={setDoctorReport}
                                    height={500}
                                    preview="edit"
                                />
                            </div>
                        ) : (
                            <article className="prose prose-slate prose-lg max-w-none
                                prose-headings:font-bold prose-headings:text-slate-800
                                prose-h1:text-3xl prose-h1:border-b prose-h1:pb-4 prose-h1:mb-6
                                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-blue-700
                                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                                prose-strong:text-slate-900 prose-strong:font-bold
                                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:text-slate-600 prose-li:mb-2
                                print:prose-headings:text-black print:prose-p:text-black">
                                <ReactMarkdown>{doctorReport}</ReactMarkdown>
                            </article>
                        )}

                        {/* Footer Signature Area (for print) */}
                        <div className="hidden print:block mt-20 pt-8 border-t border-slate-300">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-bold text-slate-900">MedVision AI Analysis</p>
                                    <p className="text-slate-500 text-sm">Automated Report Generation System</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 text-sm italic">Page 1 of 1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*find doctor button*/}
                <button
                    onClick={handleFindDoctor}
                    className="m-auto mt-3 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg
                    hover:bg-blue-700 transition-colors shadow-sm font-medium text-2xl"
                >
                    <Hospital className="w-4 h-4 mr-2" />
                    Find Doctor!
                </button>
                <div className="mt-8 text-center print:hidden">
                    <p className="text-slate-400 text-sm">
                        &copy; {new Date().getFullYear()} MedVision AI. Confidential Medical Report.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default ReportPage;
