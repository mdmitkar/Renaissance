import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200); // 2.2 seconds show time
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-secondary-black text-cream-velvet overflow-hidden"
                >
                    <div className="text-center relative z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.1, opacity: 1 }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                            className="w-64 h-64 mb-8 mx-auto rounded-full bg-gulf-blue/20 flex items-center justify-center relative"
                        >
                            <img src="/logo.jpeg" alt="Logo" className="w-48 h-48 object-contain rounded-full mix-blend-normal z-20" />
                        </motion.div>

                        {/* Loading Bar Container */}
                        <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto relative shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="h-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)]"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
