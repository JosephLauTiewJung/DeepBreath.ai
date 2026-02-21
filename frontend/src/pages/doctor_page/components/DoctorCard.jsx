import { MapPin, Phone, Mail, Building2, User, Clock } from "lucide-react";

const DoctorCard = ({ doctor, onClick}) => {

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all
        duration-300 group" onClick={onClick}>
            <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                            <User className="w-7 h-7 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                                {doctor.doctorName}
                            </h3>
                            <p className="text-blue-600 text-sm font-medium bg-blue-50 px-2 py-0.5 rounded-md inline-block mt-1">
                                {doctor.doctorSpecialization}
                            </p>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                        doctor.availability === 'Available' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                            doctor.availability === 'Available' ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}></span>
                        {doctor.availability}
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="flex items-start gap-3 text-slate-600 group-hover:text-slate-700 transition-colors p-2 rounded-lg hover:bg-slate-50">
                        <Building2 className="w-4 h-4 mt-1 text-slate-400 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-slate-900">{doctor.hospitalName}</p>
                            <p className="text-xs text-slate-500 mt-0.5">Hospital</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <MapPin className="w-4 h-4 mt-1 text-slate-400 shrink-0" />
                        <div>
                            <p className="text-sm">{doctor.hospitalAddress}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                        <p className="text-sm font-medium">{doctor.contactNumber}</p>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                        <p className="text-sm truncate">{doctor.emailAddress}</p>
                    </div>
                </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Updates daily
                </span>
            </div>
        </div>
    )
}
export default DoctorCard