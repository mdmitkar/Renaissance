import React, { useState } from 'react';
import { X, Send, Calendar, MapPin, User, Phone, BookOpen } from 'lucide-react';
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Enquiry Sent for ${formData.childName}!`);
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4"
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
                            <p className="opacity-90 font-medium">Join the Renaissance Family</p>
                        </div>
                        <button onClick={onClose} className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors relative z-10">
                            <X size={24} />
                        </button>

                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-10 -translate-y-10"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-10 translate-y-10"></div>
                    </div>

                    {/* Form */}
                    <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
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

                            <button type="submit" className="md:col-span-2 w-full bg-gulf-dark text-white font-bold py-4 rounded-xl hover:bg-gulf-blue transition-all flex items-center justify-center gap-2 mt-2 shadow-xl shadow-gulf-blue/30 active:scale-95 text-lg">
                                Submit Admission Enquiry <Send size={20} />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AdmissionModal;
