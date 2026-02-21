import DoctorCard from "./components/DoctorCard.jsx";
import {AdvancedMarker, APIProvider, Map, Pin} from '@vis.gl/react-google-maps';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const DoctorPage = () => {
    const [apiKey] = useState(import.meta.env.VITE_GOOGLE_MAP_API_KEY)
    const [location, setLocation] = useState()
    const navigate = useNavigate()
    // Get user's current location on component mount
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({lat: position.coords.latitude, lng: position.coords.longitude})
            console.log("successfully got location:", position.coords.latitude, position.coords.longitude)
        }, (error) => {
            console.error("Error getting location:", error)
        })
    }, []);

    // Load doctors data from session storage
    const [doctors] = useState(() => {
        const data = sessionStorage.getItem("findDoctorReport")
        return data ? JSON.parse(data): []
    })
    // Handle doctor card click - for now, just reset location to trigger map re-render (can be enhanced to show doctor details or route)
    const handleDoctorOnClick = (e, key) => {
        e.preventDefault()
        const lat = doctors[key].lat
        const lng = doctors[key].lng
        console.log(`Doctor ${doctors[key].doctorName} clicked. Location: ${lat}, ${lng}`)
        setLocation({lat: lat, lng: lng})
    }
    const handleBackToReport = () => {
        navigate("/report")
    }
    return (
        <main className="max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <button className="text-slate-500 hover:text-blue-600 flex items-center mb-2"
                    onClick={handleBackToReport}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back to Report
                    </button>
                    <h1 className="text-2xl font-bold text-slate-900">Nearby Specialists</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[75vh]">

                <div className="lg:col-span-1 flex flex-col gap-4 pr-2 pb-4">
                    {/*Doctor card*/}
                    {doctors.map((doctor, key) => {
                        return <DoctorCard key={key} doctor={doctor} onClick={(e) => handleDoctorOnClick(e, key)}/>
                    })}
                </div>

                <div className="lg:col-span-2 bg-slate-200 rounded-xl border border-slate-300 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                        {apiKey && location ? (
                            <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
                                <Map
                                    defaultZoom={13}
                                    mapId={"myMap"}
                                    defaultCenter={location}
                                    onCameraChanged={ (ev) =>
                                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                                    }>
                                    <AdvancedMarker
                                        key={"test"}
                                        position={location}>
                                        <Pin/>
                                    </AdvancedMarker>
                                </Map>

                            </APIProvider>
                        ) : (
                            <p>Loading map....</p>
                        )}
                    </div>
                </div>

            </div>
        </main>
    )
}

export default DoctorPage