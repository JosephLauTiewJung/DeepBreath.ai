import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from "firebase/app";
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
export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // registration page navigation
    const handleRegistration = () => {
        navigate("/registration")
    }

    // login logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("User logged in successfully:", user);
                sessionStorage.setItem("userId", user.email)
                sessionStorage.setItem("email", user.email)
                navigate("/home")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`Error (${errorCode}): ${errorMessage}`);
                alert("Failed to log in. Please check your email and password and try again.");
            });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl text-white text-2xl font-black mb-6 shadow-xl shadow-blue-200">
                    M
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">MedVision AI Pro</h2>
                <p className="mt-2 text-sm text-slate-600">
                    Clinical Decision Support System
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-10 px-6 shadow-xl shadow-slate-200/60 sm:rounded-3xl border border-slate-100 sm:px-12">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                                Medical Professional Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="dr.smith@hospital.org"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                                Security Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 active:scale-[0.98]"
                            >
                                {/*loading logic*/}
                                {/*{isLoading ? (*/}
                                {/*    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">*/}
                                {/*        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>*/}
                                {/*        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>*/}
                                {/*    </svg>*/}
                                {/*) : null}*/}
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 border-t border-slate-100 pt-8">
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                            HIPAA Protected Access
                        </div>
                        <p className="text-center text-xs text-slate-400 leading-relaxed">
                            This is a restricted medical information system. Unauthorized access is strictly prohibited and monitored.
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-slate-600" onClick={handleRegistration  }>
                    <span className="font-bold text-blue-600 hover:text-blue-500">Don't have an account? </span>
                </p>
            </div>
        </div>
    );
};
