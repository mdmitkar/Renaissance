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
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-cream-velvet text-gulf-lebanese"
                >
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.1, opacity: 1 }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                            className="w-64 h-64 mb-8 mx-auto rounded-full bg-gulf-blue/20 flex items-center justify-center"
                        >
                            <img src="/logo.jpeg" alt="Logo" className="w-48 h-48 object-contain rounded-full mix-blend-normal" />
                        </motion.div>

                        {/* Removed Text as requested */}

                        <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="h-full bg-primary-carmine"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
