import {useNavigate} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useEffect, useState} from "react";

const firebaseConfig = {
    apiKey: "AIzaSyAbDQ02JqiHvtCblqLOKnihcfhXEu3juRA",
    authDomain: "med-vision-dd803.firebaseapp.com",
    projectId: "med-vision-dd803",
    storageBucket: "med-vision-dd803.firebasestorage.app",
    messagingSenderId: "59876070199",
    appId: "1:59876070199:web:3bf482bd7137117c4500b2",
    measurementId: "G-6RQDFJZG34"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


const RegistrationPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log(email)
    }, [email]);
    useEffect(() => {
      console.log(password)
    }, [password]);
    const handleRegistration = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log("User registered successfully:", user);
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error:", errorMessage);
                console.log("ErrorCode: ", errorCode);
                alert("failed to register. Please check your email and password and try again.")
            });
    }
    const navigate = useNavigate();
    const handleLoginIn = () => {
        navigate("/")
    }


    return (
        <div className="bg-slate-50 flex justify-center items-center min-h-screen text-slate-900 p-5 font-sans">

        <div className="w-full max-w-110 flex flex-col items-center">
            <div
                className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl flex justify-center items-center text-white text-[28px] font-extrabold mb-6 shadow-lg shadow-blue-600/20">
            </div>

            <div className="text-center mb-8">
                <h1 className="text-[28px] font-extrabold text-slate-900 mb-2 tracking-tight">MedVision AI Pro</h1>
                <p className="text-slate-500 text-[15px]">Register for Clinical Access</p>
            </div>

            <div className="bg-white w-full p-10 rounded-3xl shadow-lg shadow-slate-200/50 mb-8">
                <form onSubmit={handleRegistration}>
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email</label>
                        <input type="email" placeholder="dr.smith@hospital.org"
                               className="w-full p-3.5 text-[15px] border-2 border-slate-200 rounded-xl outline-none
                               transition-colors duration-200 text-slate-900 placeholder-slate-400
                               focus:border-blue-500" onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Security Password</label>
                        <input type="password" placeholder="••••••••"
                               className="w-full p-3.5 text-[15px] border-2 border-slate-200 rounded-xl outline-none
                               transition-colors duration-200 text-slate-900 placeholder-slate-400
                               focus:border-blue-500" onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <button type="submit"
                            className="w-full p-4 bg-blue-600 text-white rounded-xl text-base font-bold cursor-pointer transition-colors duration-200 mt-3 mb-6 hover:bg-blue-700">
                        Create Account
                    </button>
                </form>

                <div className="h-px bg-slate-200 mb-6"></div>

                <div className="text-center">
                    <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5 font-semibold">
                        HIPAA Protected Access
                    </h4>
                    <p className="text-slate-400 text-[13px] leading-relaxed">
                        This is a restricted medical information system. Unauthorized access is strictly prohibited and
                        monitored.
                    </p>
                </div>
            </div>

            <div className="text-center text-[15px] text-slate-500" onClick={handleLoginIn}>
                <span className="text-blue-600 no-underline font-semibold hover:underline">
                    Already have an account ? Log in
                </span>
            </div>
        </div>

        </div>
    )
}

export default RegistrationPage;