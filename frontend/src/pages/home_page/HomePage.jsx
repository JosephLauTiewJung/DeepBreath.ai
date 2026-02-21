import {Navbar} from "../../components/NavBar.jsx";
import {UploadSection} from "./components/UploadSelection.jsx";
import {useNavigate} from "react-router";
import {useState} from "react";
import axios from "axios";
// Import the functions you need from the SDKs you need
const HomePage = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()
    const [isAnalyzed, setIsAnalyzed] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)
    const baseUrl = "http://localhost:8080/"

    const getAnalysisResult = async () => {
        setIsProcessing(true)
        const userId = sessionStorage.getItem("userId")
        // get tumor analysis result from backend and store in session storage
        console.log("Getting tumor plot result...")
        const tumorPlotResult = await axios.get(`${baseUrl}analyzedXray?userId=${userId}`)

        console.log("Getting semantic analysis result...")
        // get the evaluation result from backend and store in session storage
        const evaluationResult = await axios.get(`${baseUrl}analyzedReport?userId=${userId}`)
        if (tumorPlotResult.status === 200 && evaluationResult.status === 200) {
            setIsProcessing(false)
            navigate("/assessment")
        }
        else {
            setIsProcessing(false)
            alert("Failed to analyze CT scan. Please try again.")
        }
    }

    // upload files
    const uploadFiles = async (xrayFile, reportFile) => {
        setIsProcessing(true)
        const formData = new FormData()
        formData.append("xray", xrayFile)
        formData.append("report", reportFile)
        const response = await axios.post(`${baseUrl}saveUser?userId=${sessionStorage.getItem("userId")}`, formData)
        setIsUploaded(true)
        setIsProcessing(false)
        return response
    }

    const onCompleteHandler = async (xrayFile, reportFile) => {
        const response = await uploadFiles(xrayFile, reportFile)
        if (response.status === 200) {
            setIsProcessing(false)
            alert("Files uploaded successfully!")
        }
        else {
            setIsProcessing(false)
            alert("Failed to upload files. Please try again.")
            navigate("/home")
        }
    }

    return (
        <>
            <Navbar/>
            <UploadSection isProcessing={isProcessing} onComplete={onCompleteHandler} isAnalyzed={isAnalyzed}
                           analyzeResult={getAnalysisResult} isUploaded={isUploaded}/>
        </>
    )
}

export default HomePage