import {BrowserRouter, Route, Routes} from "react-router";
import HomePage from "./pages/home_page/HomePage.jsx";
import AssessmentPage from "./pages/assessment_page/AssessmentPage.jsx";
import ReportPage from "./pages/report_page/ReportPage.jsx";
import {LoginPage} from "./pages/login_page/LoginPage.jsx";
import Processing from "./pages/home_page/components/Proccessing.jsx";
import ProcessingPage from "./pages/assessment_page/components/ProcessingPage.jsx";
import DoctorPage from "./pages/doctor_page/DoctorPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path='/assessment' element={<AssessmentPage/>}/>
            <Route path='/report' element={<ReportPage/>}/>
            <Route path='/doctor' element={<DoctorPage/>}/>
            <Route path='/registration' element={<RegistrationPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
