import {Navbar} from "../../components/NavBar.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import { Progress, Tag } from 'antd';
import { AlertTriangle, CheckCircle, Activity, FileText, ClipboardPlus , Brain, ShieldAlert } from 'lucide-react';
import axios from "axios";
import ProcessingPage from "./components/ProcessingPage.jsx";

const AssessmentPage = () => {
    const navigate = useNavigate();

    const baseUrl = "http://localhost:8080"
    const [ctScanImage, setCtScanImage] = useState("");
    const [criticalLevel, setCriticalLevel] = useState(0);
    const [message, setMessage] = useState("");
    const [evaluation, setEvaluation] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    // fetch analyzed ct scan
    useEffect(() => {
        const fetchCtScanImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/userAnnotatedXray?userId=${sessionStorage.getItem("userId")}`, { responseType: 'blob' });
                if (response.status === 200) {
                    const imageUrl = URL.createObjectURL(response.data)
                    setCtScanImage(imageUrl)
                    console.log("Fetched CT scan image:", response.data);
                }
            } catch (error) {
                console.error("Failed to fetch CT scan image:", error);
            }
        }
        fetchCtScanImage()
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = sessionStorage.getItem("userId");
                if (!userId) {
                    console.log("No userId in session storage");
                    return;
                }
                const response = await axios.get(`${baseUrl}/getUser?userId=${userId}`);
                if (response.status === 200) {
                    const data = response.data;
                    const report = data.evaluatedReport || {};

                    setCriticalLevel(report.criticalLevel || 0);
                    setMessage(report.message || "No analysis message available.");
                    setEvaluation(report.evaluation || "No evaluation available.");
                    setRecommendation(report.recommendations || "No recommendation available.");
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchData();
    }, []);
    if (isProcessing) {
        return (
            <ProcessingPage/>
        )
    }
    const getDoctorReport = async () => {
        try {
            setIsProcessing(true);
            const response = await axios.get(`${baseUrl}/getDoctorReport?userId=${sessionStorage.getItem("userId")}`)
            if (response.status === 200) {
                setIsProcessing(false)
                sessionStorage.setItem("doctorReport", response.data)
                navigate("/report")
                return response.data;
            }
            else {
                setIsProcessing(false)
                alert("Failed to fetch doctor's report. Please try again.")
                return null;
            }
        }
        catch (error) {
            setIsProcessing(false)
            console.error("Error fetching doctor's report:", error);
        }
    }

    // Calculate color based on critical level
    const getProgressColor = (level) => {
        if (level < 4) return "#52c41a"; // Green
        if (level < 7) return "#faad14"; // Yellow
        return "#ff4d4f";              // Red
    };

    const getStatusInfo = (level) => {
        if (level >= 7) return { color: "error", text: "HIGH RISK", icon: <AlertTriangle className="w-5 h-5" />, bg: "bg-red-50 text-red-700 border-red-200" };
        if (level >= 4) return { color: "warning", text: "MODERATE RISK", icon: <Activity className="w-5 h-5" />, bg: "bg-orange-50 text-orange-700 border-orange-200" };
        return { color: "success", text: "LOW RISK", icon: <CheckCircle className="w-5 h-5" />, bg: "bg-green-50 text-green-700 border-green-200" };
    };

    const status = getStatusInfo(criticalLevel);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar/>

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <Brain className="w-8 h-8 text-blue-600" />
                        AI Assessment Report
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Detailed analysis of the uploaded CT Scan.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Image Viewer (Span 8) */}
                    <div className="lg:col-span-5 xl:col-span-7 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="border-b border-slate-100 p-4 bg-slate-50 flex justify-between items-center">
                                <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-blue-500" />
                                    Scan Visualization
                                </h3>
                                <Tag color="blue">AI Processed</Tag>
                            </div>
                            <div className="aspect-4/3 bg-slate-900 relative flex items-center justify-center p-2 group">
                                {ctScanImage ? (
                                    <img
                                        src={ctScanImage}
                                        alt="CT Scan Analysis"
                                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                ) : (
                                    <div className="text-slate-400 flex flex-col items-center gap-2">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                        <span>Loading Scan...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Analysis Message */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Analysis Explanation
                            </h4>
                            <p className="text-slate-600 leading-relaxed">
                                {message}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Metrics & Actions (Span 4) */}
                    <div className="lg:col-span-5 xl:col-span-4 space-y-6">

                        {/* Critical Level Card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-bold tracking-wider ${status.bg} border-b border-l`}>
                                {status.text}
                            </div>

                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-6">Risk Assessment</h2>

                            <div className="flex flex-col items-center justify-center py-4">
                                <div className="relative">
                                    <Progress
                                        type="circle"
                                        percent={criticalLevel * 10}
                                        strokeColor={getProgressColor(criticalLevel)}
                                        strokeWidth={8}
                                        size={200}
                                        format={(percent) => (
                                            <div className="flex flex-col items-center justify-center -space-y-1">
                                                <span className="text-4xl font-bold text-slate-800">{percent / 10}</span>
                                                <span className="text-xs text-slate-400 font-medium">/ 10</span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className={`mt-6 flex items-center gap-2 px-4 py-2 rounded-lg ${status.bg} font-semibold transition-colors`}>
                                    {status.icon}
                                    <span>Critical Level: {criticalLevel}</span>
                                </div>
                            </div>
                        </div>

                        {/* Clinical Evaluation */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h4 className="text-md font-bold text-slate-800 mb-3 flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-indigo-500" />
                                Clinical Evaluation
                            </h4>
                            <div className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                                {evaluation}
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm">
                            <h4 className="text-md font-bold text-indigo-900 mb-3 flex items-center gap-2">
                                <Brain className="w-5 h-5 text-indigo-600" />
                                Recommendations
                            </h4>
                            <p className="text-indigo-800 text-sm leading-relaxed">
                                {recommendation}
                            </p>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={getDoctorReport}
                            className="w-full py-4 bg-linear-to-r from-slate-900 to-slate-800 text-white rounded-xl font-bold hover:from-black hover:to-slate-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group transform hover:-translate-y-0.5"
                        >
                            <ClipboardPlus  className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                            Generate Report
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AssessmentPage