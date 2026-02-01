import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2800); // Increased to 2.8 seconds for a more relaxing feel
        return () => clearTimeout(timer);
    }, []);

    // Generate random sparkles with professional positioning
    const sparkles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 8 + 4, // Slightly smaller for more elegance
        delay: Math.random() * 2,
        duration: Math.random() * 1.5 + 1.5, // Slower, more graceful animation
    }));

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-secondary-black text-cream-velvet overflow-hidden"
                >
                    {/* Magical Sparkles Background */}
                    {sparkles.map((sparkle) => (
                        <motion.div
                            key={sparkle.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0], // Increased opacity for "enhanced" effect
                                rotate: [0, 180]
                            }}
                            transition={{
                                duration: sparkle.duration,
                                repeat: Infinity,
                                delay: sparkle.delay,
                                ease: "easeInOut"
                            }}
                            style={{
                                position: 'absolute',
                                top: sparkle.top,
                                left: sparkle.left,
                                width: sparkle.size,
                                height: sparkle.size,
                            }}
                            className="text-[#FFD700]" // Gold sparkles
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                            </svg>
                        </motion.div>
                    ))}

                    <div className="text-center relative z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.1, opacity: 1 }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                            className="w-64 h-64 mb-8 mx-auto flex items-center justify-center relative"
                        >


                            <img src="/logo.jpeg" alt="Logo" className="w-48 h-48 object-contain rounded-full mix-blend-normal z-20" />
                        </motion.div>

                        {/* Loading Bar Container */}
                        <div className="mt-8 w-64 h-2 bg-white/20 rounded-full overflow-hidden mx-auto relative shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.6, ease: "easeInOut" }}
                                className="h-full bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
