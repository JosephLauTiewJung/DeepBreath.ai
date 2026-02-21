import {useNavigate} from "react-router";
import { User } from 'lucide-react';

export const Navbar = () => {
    const navigate = useNavigate()
    const onHomeClickHanlder = () => {
        navigate("/home")
    }
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={onHomeClickHanlder}
                >
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-blue-700 transition-colors">
                        M
                    </div>
                    <span className="font-semibold text-xl tracking-tight text-slate-800">MedVision AI</span>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Secure</span>
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                        <User/>
                    </div>
                </div>
            </div>
        </nav>
    );
};
