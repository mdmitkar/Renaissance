import React from 'react';
import { MessageSquare, CheckCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Admission = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your interest! This is a demo form. Please use the WhatsApp button or contact us directly for now.");
    };

    return (
        <div className="min-h-screen bg-bg-cream dark:bg-bg-dark transition-colors duration-300 py-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left Side: Info & CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary-black dark:text-primary-gold mb-6">
                            Join the Renaissance Family
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                            Admissions are now open for the Academic Year 2025-26. Give your child the gift of a foundation built on love, laughter, and learning.
                        </p>
                        <div className="flex flex-col gap-4">
                            <FeatureItem text="Nurturing & Safe Environment" />
                            <FeatureItem text="Experienced & Caring Faculty" />
                            <FeatureItem text="Holistic Curriculum (Play + Learn)" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#222] p-8 rounded-2xl shadow-lg border-l-4 border-primary-gold">
                        <h3 className="text-2xl font-bold text-secondary-black dark:text-white mb-4">Immediate Assistance</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Have questions about fees or the process? Chat with us directly on WhatsApp.
                        </p>
                        <a
                            href="https://wa.me/918483848486?text=Hello%20Renaissance%20Preschool%2C%0A%0AI%20am%20interested%20in%20admission%20for%20my%20child.%20Kindly%20share%20details%20about%20programs%2C%20fees%2C%20and%20admission%20process."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-[#20bd5a] transition-all transform hover:scale-105 shadow-lg w-full justify-center md:w-auto"
                        >
                            <MessageSquare size={24} />
                            Chat on WhatsApp
                        </a>
                    </div>
                </motion.div>

                {/* Right Side: Mock Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-black p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-gold to-yellow-300"></div>
                    <h2 className="text-3xl font-heading font-bold text-secondary-black dark:text-white mb-2">Admission Enquiry</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">Fill in the details below and we will get back to you shortly.</p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Parent's Name" placeholder="e.g. Rahul Sharma" type="text" />
                            <InputField label="Child's Name" placeholder="e.g. Aaryan Sharma" type="text" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Phone Number" placeholder="+91 98765 43210" type="tel" />
                            <InputField label="Email Address" placeholder="rahul@example.com" type="email" />
                        </div>

                        <InputField label="Child's Age / Grade" placeholder="e.g. 3 Years / Nursery" type="text" />

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-secondary-black dark:text-gray-300">Message (Optional)</label>
                            <textarea
                                rows="3"
                                className="w-full bg-bg-cream dark:bg-[#111] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all text-secondary-black dark:text-white"
                                placeholder="Any specific questions?"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-secondary-black text-primary-gold font-bold py-4 rounded-xl text-lg hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2 group"
                        >
                            Submit Enquiry <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-xs text-center text-gray-400 mt-4">
                            *This is a preliminary enquiry. Our team will contact you for the next steps.
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

const FeatureItem = ({ text }) => (
    <div className="flex items-center gap-3">
        <CheckCircle className="text-primary-gold flex-shrink-0" size={20} />
        <span className="text-gray-700 dark:text-gray-300 font-medium">{text}</span>
    </div>
);

const InputField = ({ label, placeholder, type }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-secondary-black dark:text-gray-300">{label}</label>
        <input
            type={type}
            className="w-full bg-bg-cream dark:bg-[#111] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all text-secondary-black dark:text-white"
            placeholder={placeholder}
            required
        />
    </div>
);

export default Admission;
