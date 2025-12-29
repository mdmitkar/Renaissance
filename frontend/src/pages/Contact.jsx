import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, User, Calendar, BookOpen, Star, Heart, Sun, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    return (
        <div className="min-h-screen bg-bg-cream dark:bg-[#111] overflow-x-hidden font-body transition-colors duration-300">

            {/* 1. HERO SECTION - Playful & Welcoming */}
            <div className="relative h-[60vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/SchoolPremises/SchoolPremises_1.jpeg"
                        alt="Renaissance Campus"
                        className="w-full h-full object-cover filter brightness-[0.3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gulf-blue/60 via-transparent to-[#111]/90"></div>
                </div>

                {/* Floating Blobs - Adjusted Position */}
                <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-32 left-10 md:left-20 text-gentle-yellow opacity-60"><Sun size={80} /></motion.div>
                <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-20 right-10 md:right-32 text-luxury-pink opacity-60"><Heart size={80} /></motion.div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24 pb-20">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-8xl font-heading font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight"
                    >
                        Join the <span className="text-gentle-yellow relative">Renaissance <svg className="absolute w-full h-3 bottom-1 left-0 text-primary-carmine" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" /></svg></span> Family
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        Visits, enquiries, or just a friendly hello. We are always here for you.
                    </motion.p>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full leading-none z-20 text-bg-cream dark:text-[#111]">
                    <svg className="block w-full h-16 md:h-32" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            {/* MAIN CONTENT - FIXED Z-INDEX & OVERLAP */}
            <div className="max-w-[1400px] mx-auto px-6 py-12 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* LEFT COLUMN: ADMISSION FORM (7 Cols) */}
                    <div className="lg:col-span-7">
                        <AdmissionForm />
                    </div>

                    {/* RIGHT COLUMN: CONTACT INFO (5 Cols) */}
                    <div className="lg:col-span-5 space-y-8 pt-4 lg:pt-12">
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-[#1a1a1a] p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gulf-blue/10 relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Decorative Circle */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gulf-icy/20 rounded-full group-hover:scale-125 transition-transform duration-500"></div>

                            <h3 className="text-2xl font-heading font-black mb-8 text-gulf-dark dark:text-white flex items-center gap-4">
                                <span className="w-12 h-12 rounded-2xl bg-gulf-blue text-white flex items-center justify-center shadow-lg shadow-gulf-blue/30"><Phone size={24} /></span>
                                Get in Touch
                            </h3>

                            <div className="space-y-8 relative z-10">
                                <ContactItem
                                    icon={<MapPin size={24} />}
                                    title="Visit Campus"
                                    lines={["KUWARI COMPOUND, BUBERE HALL ROAD,", "BESIDE FOOD IN RESTAURANT, NIZAMPUR BHIWANDI"]}
                                    color="bg-primary-carmine/10 text-primary-carmine"
                                    onClick={() => window.open("https://maps.google.com", "_blank")}
                                />
                                <ContactItem
                                    icon={<Phone size={24} />}
                                    title="Call Us"
                                    lines={["+91 84838 48486", "+91 93239 56718"]}
                                    color="bg-charming-green/10 text-charming-green"
                                    link="tel:+918483848486"
                                />
                                <ContactItem
                                    icon={<Mail size={24} />}
                                    title="Email Us"
                                    lines={["info.renaissanceschool@gmail.com"]}
                                    color="bg-gulf-blue/10 text-gulf-blue"
                                    link="mailto:info.renaissanceschool@gmail.com"
                                />
                                <ContactItem
                                    icon={<Clock size={24} />}
                                    title="Office Hours"
                                    lines={["Mon - Sat: 9:00 AM - 4:00 PM", "Sunday: Closed"]}
                                    color="bg-gentle-yellow/20 text-amber-600"
                                />
                            </div>
                        </motion.div>

                        {/* SOCIAL & RATINGS - Replaced Hiring Section */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-[#222] to-black text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="flex items-center gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} className="fill-gentle-yellow text-gentle-yellow animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />)}
                                </div>
                                <h3 className="text-3xl font-heading font-bold mb-2">4.8/5 Rating</h3>
                                <p className="opacity-70 text-sm mb-6">Loved by 500+ Parents on Google</p>

                                <div className="flex gap-4">
                                    <SocialButton icon={<Instagram size={24} />} color="hover:bg-pink-600" />
                                    <SocialButton icon={<Facebook size={24} />} color="hover:bg-blue-600" />
                                    <SocialButton icon={<Youtube size={24} />} color="hover:bg-red-600" />
                                </div>
                            </div>

                            {/* Glossy Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* MAP SECTION - Enhanced Styling */}
            <div className="h-[450px] w-full relative z-0 mt-16 shadow-inner border-t-8 border-gulf-blue/20">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.9632497672!2d73.0560!3d19.2905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE3JzI1LjgiTiA3M8KwMDMnMjEuNiJF!5e0!3m2!1sen!2sin!4v1631234567890!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }}
                    allowFullScreen=""
                    loading="lazy"
                    tabIndex="0"
                    title="Renaissance Preschool Map"
                    className="w-full h-full"
                ></iframe>
            </div>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const AdmissionForm = () => {
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
        alert(`Thanks ${formData.parentName}! Enquiry for ${formData.childName} submitted successfully.`);
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-white dark:bg-[#1a1a1a] rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-8 md:p-12 border border-gray-100 dark:border-gray-800 relative overflow-hidden"
        >
            {/* Form Decor */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-gulf-blue/10 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none blur-2xl"></div>

            <div className="relative z-10">
                <div className="mb-8 border-l-8 border-gentle-yellow pl-6">
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-gulf-dark dark:text-white mb-2">Admission Open</h2>
                    <h3 className="text-xl text-gray-500 font-medium tracking-wide">Academic Year 2025-26</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Child's Name */}
                        <div className="md:col-span-2">
                            <Input
                                label="Child Full Name"
                                name="childName"
                                placeholder="E.g. Aarav Sharma"
                                icon={<User size={20} />}
                                value={formData.childName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Parent's Name */}
                        <div>
                            <Input
                                label="Parent Full Name"
                                name="parentName"
                                placeholder="E.g. Rahul Sharma"
                                icon={<User size={20} />}
                                value={formData.parentName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Contact */}
                        <div>
                            <Input
                                label="Contact Number"
                                name="contactNumber"
                                placeholder="+91 98765 43210"
                                icon={<Phone size={20} />}
                                value={formData.contactNumber}
                                onChange={handleChange}
                            />
                        </div>

                        {/* DOB */}
                        <div>
                            <Input
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                icon={<Calendar size={20} />}
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <Input
                                label="Residence Location"
                                name="location"
                                placeholder="Area / Locality"
                                icon={<MapPin size={20} />}
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Class Selection */}
                    <div className="pt-2">
                        <label className="text-sm font-bold text-gulf-lebanese dark:text-gray-400 mb-4 block uppercase tracking-wide flex items-center gap-2">
                            <BookOpen size={18} className="text-primary-carmine" /> Select Class/Grade
                        </label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {['Playgroup', 'Nursery', 'Jr. KG', 'Sr. KG'].map((item) => (
                                <motion.div
                                    key={item}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFormData({ ...formData, grade: item })}
                                    className={`cursor-pointer rounded-2xl p-4 text-center border-2 transition-all font-bold text-sm md:text-base ${formData.grade === item
                                        ? 'border-gulf-blue bg-gulf-blue text-white shadow-lg shadow-gulf-blue/30'
                                        : 'border-transparent bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200'
                                        }`}
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02, translateY: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary-carmine to-rose-600 text-white font-bold py-5 rounded-2xl text-xl shadow-xl hover:shadow-2xl hover:shadow-rose-500/30 transition-all flex items-center justify-center gap-3 mt-4"
                    >
                        Submit Enquiry <Send size={22} className="opacity-90" />
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

const Input = ({ label, icon, ...props }) => (
    <div className="group relative">
        <label className="text-xs font-bold text-gray-400 mb-1.5 block uppercase tracking-wide ml-1 group-focus-within:text-gulf-blue transition-colors">
            {label}
        </label>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gulf-blue transition-colors">
                {icon}
            </div>
            <input
                {...props}
                className="w-full bg-gray-50 dark:bg-black/20 border-2 border-gray-100 dark:border-white/10 rounded-2xl pl-12 pr-5 py-4 font-semibold text-gulf-dark dark:text-gray-100 focus:outline-none focus:border-gulf-blue focus:ring-4 focus:ring-gulf-blue/10 transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600"
                required
            />
        </div>
    </div>
);

const ContactItem = ({ icon, title, lines, color, link, onClick }) => (
    <div
        className={`flex items-start gap-5 p-4 rounded-3xl transition-colors hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer`}
        onClick={onClick}
    >
        <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-lg text-gulf-lebanese dark:text-white mb-1">{title}</h4>
            <div className="text-gray-500 dark:text-gray-400 font-medium leading-normal">
                {lines.map((line, i) => (
                    <div key={i}>
                        {link ? (
                            <a href={link} className="hover:text-gulf-blue transition-colors block">{line}</a>
                        ) : (
                            line
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const SocialButton = ({ icon, color }) => (
    <motion.button
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center transition-all ${color}`}
    >
        {icon}
    </motion.button>
)

export default Contact;
