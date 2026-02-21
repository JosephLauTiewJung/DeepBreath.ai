const Processing = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">Analyzing Clinical Data</h2>
            <p className="text-slate-500 animate-pulse">Running neural segmentation and semantic analysis...</p>
        </div>
    )
}

export default Processing