import React from 'react';
import { motion } from 'framer-motion';

const MobileReveal = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -50 }}
            viewport={{ amount: 0.2, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, delay: delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default MobileReveal;
