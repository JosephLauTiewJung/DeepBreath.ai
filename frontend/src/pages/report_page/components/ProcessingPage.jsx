import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { funFacts} from "../../assessment_page/data/FunFacts.jsx";

const STATUS_MESSAGES = [
    "Initializing secure health protocol...",
    "Analyzing radiology findings for key diagnostic markers..",
    "Running diagnostic AI models...",
    "Formatting clinical report...",
    "Connecting to hospital directories for live appointment availability...",
    "Matching specialists with high expertise treatment...",
    "Finalizing secure delivery..."
];

export default function ProcessingPage() {
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);

    // Cycle fun facts
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    // Cycle status messages
    useEffect(() => {
        const timer = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-2xl z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 relative">
                        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                        <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-indigo-500/30"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight mb-2">Finding Doctor....</h1>
                    <p className="text-zinc-400 font-mono text-sm uppercase tracking-widest">
                        {STATUS_MESSAGES[statusIndex]}
                    </p>
                </motion.div>
                {/* Fun Facts Carousel */}
                <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                    <div className="absolute top-0 left-8 -translate-y-1/2 bg-[#0a0a0a] px-3 py-1 border border-white/10 rounded-full">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Did you know?
            </span>
                    </div>

                    <div className="h-32 flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentFactIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="flex gap-6 items-start"
                            >
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                                    {funFacts[currentFactIndex].icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-zinc-200 mb-1">
                                        {funFacts[currentFactIndex].title}
                                    </h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        {funFacts[currentFactIndex].fact}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex gap-1.5 mt-6 justify-center">
                        {funFacts.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-500 ${
                                    i === currentFactIndex ? "w-8 bg-indigo-500" : "w-2 bg-white/10"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 flex justify-center gap-8"
                >
                    <div className="flex items-center gap-2 text-zinc-500">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500/50" />
                        <span className="text-[10px] uppercase tracking-wider font-medium">Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500/50" />
                        <span className="text-[10px] uppercase tracking-wider font-medium">AI-Verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500/50" />
                        <span className="text-[10px] uppercase tracking-wider font-medium">Real-time</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
