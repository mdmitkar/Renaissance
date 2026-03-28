import React, { useState } from 'react';
import { X, Send, Calendar, MapPin, User, Phone, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdmissionModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        childName: '',
        parentName: '',
        contactNumber: '',
        dob: '',
        location: '',
        grade: 'Playgroup'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeOiGyFZKqfEcGPlhOpYtekgBjgeLtCh0JZW3_isFUNGSCjkg/formResponse";

        const dobParts = formData.dob.split('-');
        const params = new URLSearchParams();
        params.append('entry.2093174780', formData.childName);
        params.append('entry.1530633836', formData.parentName);
        params.append('entry.733738623', formData.contactNumber);
        params.append('entry.366963014', formData.location);
        params.append('entry.1271191765', formData.grade);

        if (dobParts.length === 3) {
            params.append('entry.605336312_year', dobParts[0]);
            params.append('entry.605336312_month', dobParts[1]);
            params.append('entry.605336312_day', dobParts[2]);
        }

        try {
            await fetch(formUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });

            setIsSubmitted(true);
            setIsSubmitting(false);
            
            // Auto close after 3 seconds or keep it open for them to see
            setTimeout(() => {
                if (isOpen) {
                    onClose();
                    setIsSubmitted(false);
                    setFormData({
                        childName: '',
                        parentName: '',
                        contactNumber: '',
                        dob: '',
                        location: '',
                        grade: 'Playgroup'
                    });
                }
            }, 5000);
            
        } catch (error) {
            console.error("Error submitting to Google Form", error);
            setIsSubmitting(false);
            alert("Something went wrong. Please try again or contact us directly via WhatsApp.");
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[20000] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    className="bg-cream-velvet dark:bg-[#1a1a1a] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative border-4 border-gulf-icy/50"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gulf-dark to-gulf-blue p-6 flex justify-between items-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold">Admissions Open</h2>
                            <h3 className="text-lg md:text-xl text-white/90 font-medium tracking-wide">Academic Year 2026 - 2027</h3>
                        </div>
                        <button onClick={onClose} className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors relative z-10">
                            <X size={24} />
                        </button>

                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-10 -translate-y-10"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-10 translate-y-10"></div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-charming-green/20 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 size={48} className="text-charming-green" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gulf-dark mb-2">Enquiry Sent Successfully!</h3>
                                    <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                                        Thank you for your interest in Renaissance Preschool. We have received your enquiry and will get back to you shortly.
                                    </p>
                                    <button 
                                        onClick={onClose}
                                        className="mt-8 bg-gulf-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-gulf-blue transition-all"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            ) : (
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

                                    {/* Child's Name */}
                                    <div className="md:col-span-2">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gulf-lebanese dark:text-gray-300 mb-2">
                                            <User size={16} className="text-primary-carmine" /> Child Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="childName"
                                            value={formData.childName}
                                            onChange={handleChange}
                                            placeholder="Enter child's full name"
                                            className="w-full bg-white dark:bg-[#222] border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:border-gulf-blue focus:ring-4 focus:ring-gulf-blue/20 outline-none transition-all dark:text-white"
                                            required
                                        />
                                    </div>

                                    {/* Parent's Name */}
                                    <div className="md:col-span-1">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gulf-lebanese dark:text-gray-300 mb-2">
                                            <User size={16} className="text-gulf-dark" /> Parent Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="parentName"
                                            value={formData.parentName}
                                            onChange={handleChange}
                                            placeholder="Enter parent's name"
                                            className="w-full bg-white dark:bg-[#222] border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:border-gulf-blue focus:ring-4 focus:ring-gulf-blue/20 outline-none transition-all dark:text-white"
                                            required
                                        />
                                    </div>

                                    {/* Parent Contact */}
                                    <div className="md:col-span-1">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gulf-lebanese dark:text-gray-300 mb-2">
                                            <Phone size={16} className="text-charming-green" /> Contact Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="w-full bg-white dark:bg-[#222] border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:border-gulf-blue focus:ring-4 focus:ring-gulf-blue/20 outline-none transition-all dark:text-white"
                                            required
                                        />
                                    </div>

                                    {/* DOB */}
                                    <div className="md:col-span-1">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gulf-lebanese dark:text-gray-300 mb-2">
                                            <Calendar size={16} className="text-desert-coral" /> Date of Birth *
                                        </label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            className="w-full bg-white dark:bg-[#222] border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:border-gulf-blue focus:ring-4 focus:ring-gulf-blue/20 outline-none transition-all dark:text-white"
                                            required
                                        />
                                    </div>

                                    {/* Location */}
                                    <div className="md:col-span-1">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gulf-lebanese dark:text-gray-300 mb-2">
                                            <MapPin size={16} className="text-primary-carmine" /> Residence Location *
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Area / Locality"
                                            className="w-full bg-white dark:bg-[#222] border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:border-gulf-blue focus:ring-4 focus:ring-gulf-blue/20 outline-none transition-all dark:text-white"
                                            required
                                        />
                                    </div>

                                    {/* Class Selection */}
                                    <div className="md:col-span-2">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gulf-lebanese dark:text-gray-300 mb-2">
                                            <BookOpen size={16} className="text-luxury-pink" /> Enquiring for Class *
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {['Playgroup', 'Nursery', 'Jr. KG', 'Sr. KG'].map((cls) => (
                                                <label key={cls} className={`cursor-pointer border-2 rounded-xl p-3 text-center transition-all ${formData.grade === cls ? 'border-gulf-blue bg-gulf-blue/10 font-bold text-gulf-dark' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                                                    <input
                                                        type="radio"
                                                        name="grade"
                                                        value={cls}
                                                        checked={formData.grade === cls}
                                                        onChange={handleChange}
                                                        className="hidden"
                                                    />
                                                    {cls}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className={`md:col-span-2 w-full bg-gulf-dark text-white font-bold py-4 rounded-xl hover:bg-gulf-blue transition-all flex items-center justify-center gap-2 mt-2 shadow-xl shadow-gulf-blue/30 active:scale-95 text-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isSubmitting ? 'Sending Enquiry...' : 'Submit Admission Enquiry'} 
                                        {!isSubmitting && <Send size={20} />}
                                    </button>
                                </form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AdmissionModal;
