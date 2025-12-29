import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, User, Calendar, BookOpen, Star, Heart, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    return (
        <div className="min-h-screen bg-bg-cream dark:bg-[#111] overflow-x-hidden font-body transition-colors duration-300">

            {/* 1. HERO SECTION - Playful & Welcoming */}
            <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/SchoolPremises/SchoolPremises_1.jpeg"
                        alt="Renaissance Campus"
                        className="w-full h-full object-cover filter brightness-[0.4]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gulf-blue/60 to-[#111]/90"></div>
                </div>

                {/* Floating Blobs */}
                <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-10 left-10 text-gentle-yellow opacity-40"><Sun size={80} /></motion.div>
                <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-10 right-10 text-luxury-pink opacity-40"><Heart size={80} /></motion.div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-gulf-icy text-sm font-bold uppercase tracking-wider mb-4"
                    >
                        Let's Connect
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-6 drop-shadow-2xl"
                    >
                        Join the <span className="text-gentle-yellow">Renaissance</span> Family
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
                    >
                        We’d love to hear from you! Whether it's an enquiry or a visit, our doors and hearts are always open.
                    </motion.p>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full leading-none z-20 text-bg-cream dark:text-[#111]">
                    <svg className="block w-full h-16 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="currentColor" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-12 relative z-10 -mt-10 md:-mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-gulf-lebanese dark:text-gray-200">

                    {/* LEFT COLUMN: ADMISSION FORM (7 Cols) */}
                    <div className="lg:col-span-7">
                        <AdmissionForm />
                    </div>

                    {/* RIGHT COLUMN: CONTACT INFO (5 Cols) */}
                    <div className="lg:col-span-5 space-y-8 pt-10 lg:pt-0">
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-[#1a1a1a] p-8 rounded-[2.5rem] shadow-xl border-2 border-dashed border-gulf-blue/20 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gulf-icy rounded-full -mr-16 -mt-16 opacity-30 group-hover:scale-150 transition-transform duration-700"></div>

                            <h3 className="text-2xl font-heading font-bold mb-8 text-gulf-dark dark:text-white flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-gulf-blue text-white flex items-center justify-center shadow-lg"><Phone size={20} /></span>
                                Get in Touch
                            </h3>

                            <div className="space-y-6">
                                <ContactItem
                                    icon={<MapPin size={24} />}
                                    title="Our Campus"
                                    lines={["KUWARI COMPOUND, BUBERE HALL ROAD,", "BESIDE FOOD IN RESTAURANT, NIZAMPUR BHIWANDI"]}
                                    color="text-primary-carmine"
                                />
                                <ContactItem
                                    icon={<Phone size={24} />}
                                    title="Call Us"
                                    lines={["+91 84838 48486", "+91 93239 56718"]}
                                    color="text-charming-green"
                                    link="tel:+918483848486"
                                />
                                <ContactItem
                                    icon={<Mail size={24} />}
                                    title="Email Us"
                                    lines={["info.renaissanceschool@gmail.com"]}
                                    color="text-gulf-blue"
                                    link="mailto:info.renaissanceschool@gmail.com"
                                />
                                <ContactItem
                                    icon={<Clock size={24} />}
                                    title="Office Hours"
                                    lines={["Mon - Sat: 9:00 AM - 4:00 PM", "Sunday: Closed"]}
                                    color="text-gentle-yellow"
                                />
                            </div>
                        </motion.div>

                        {/* Fun Element */}
                        <div className="bg-gradient-to-r from-luxury-pink to-primary-carmine rounded-[2rem] p-8 text-white text-center shadow-lg relative overflow-hidden transform hover:-translate-y-2 transition-transform cursor-default">
                            <div className="relative z-10">
                                <Star className="inline-block mb-3 animate-spin-slow" size={40} />
                                <h3 className="text-2xl font-bold font-heading mb-2">We are Hiring!</h3>
                                <p className="opacity-90 text-sm">Passionate about teaching? Send your CV to our email.</p>
                            </div>
                            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAP SECTION */}
            <div className="h-[400px] w-full relative z-0 mt-12 bg-white dark:bg-[#222]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.9632497672!2d73.0560!3d19.2905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE3JzI1LjgiTiA3M8KwMDMnMjEuNiJF!5e0!3m2!1sen!2sin!4v1631234567890!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.2) contrast(1.2)' }}
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
        // Here you would typically send the data to a backend
        alert(`Thanks ${formData.parentName}! Enquiry for ${formData.childName} submitted successfully.`);
        setFormData({
            childName: '',
            parentName: '',
            contactNumber: '',
            dob: '',
            location: '',
            grade: 'Playgroup'
        });
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-white dark:bg-[#1a1a1a] rounded-[3rem] shadow-2xl p-8 md:p-12 border-4 border-white/50 dark:border-white/10 relative overflow-hidden"
        >
            {/* Form Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gulf-blue opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-luxury-pink opacity-5 rounded-full -ml-10 -mb-10 pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-heading font-black text-gulf-dark dark:text-white mb-2">Admission Open</h2>
                <h3 className="text-xl text-primary-carmine font-bold mb-8">Join the Renaissance Family</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        {/* Child's Name */}
                        <div className="md:col-span-2">
                            <Input
                                label="Child Full Name *"
                                name="childName"
                                placeholder="Enter child's full name"
                                icon={<User size={18} />}
                                value={formData.childName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Parent's Name */}
                        <div>
                            <Input
                                label="Parent Full Name *"
                                name="parentName"
                                placeholder="Enter parent's name"
                                icon={<User size={18} />}
                                value={formData.parentName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Contact */}
                        <div>
                            <Input
                                label="Contact Number *"
                                name="contactNumber"
                                placeholder="+91 98765 43210"
                                icon={<Phone size={18} />}
                                value={formData.contactNumber}
                                onChange={handleChange}
                            />
                        </div>

                        {/* DOB */}
                        <div>
                            <Input
                                label="Date of Birth *"
                                name="dob"
                                type="date"
                                icon={<Calendar size={18} />}
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <Input
                                label="Residence Location *"
                                name="location"
                                placeholder="Area / Locality"
                                icon={<MapPin size={18} />}
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Class Selection */}
                    <div className="pt-4">
                        <label className="text-sm font-bold text-gray-500 mb-4 block uppercase tracking-wide flex items-center gap-2">
                            <BookOpen size={16} /> Enquiring for Class *
                        </label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {['Playgroup', 'Nursery', 'Jr. KG', 'Sr. KG'].map((item) => (
                                <motion.div
                                    key={item}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFormData({ ...formData, grade: item })}
                                    className={`cursor-pointer rounded-2xl p-4 text-center border-2 transition-all font-bold ${formData.grade === item
                                            ? 'border-gulf-blue bg-gulf-blue text-white shadow-lg shadow-gulf-blue/30 scale-105'
                                            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 text-gray-500 hover:border-gulf-blue/50'
                                        }`}
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-gulf-dark to-gulf-blue text-white font-bold py-5 rounded-2xl text-xl shadow-xl hover:shadow-2xl hover:shadow-gulf-blue/40 transition-all flex items-center justify-center gap-3 mt-8"
                    >
                        Submit Admission Enquiry <Send size={22} className="opacity-90" />
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

const Input = ({ label, icon, ...props }) => (
    <div className="group">
        <label className="text-sm font-bold text-gray-500 mb-2 block uppercase tracking-wide flex items-center gap-2 group-focus-within:text-gulf-blue transition-colors">
            {icon} {label}
        </label>
        <div className="relative">
            <input
                {...props}
                className="w-full bg-gray-50 dark:bg-black/30 border-2 border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 font-medium focus:outline-none focus:border-gulf-blue focus:ring-4 focus:ring-gulf-blue/10 transition-all dark:text-white placeholder:text-gray-400"
                required
            />
        </div>
    </div>
);

const ContactItem = ({ icon, title, lines, color, link }) => (
    <div className="flex items-start gap-4">
        <div className={`shrink-0 ${color} mt-1`}>{icon}</div>
        <div>
            <h4 className="font-bold text-lg text-gulf-lebanese dark:text-gray-100">{title}</h4>
            <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {lines.map((line, i) => (
                    <div key={i}>
                        {link ? (
                            <a href={link} className="hover:text-gulf-blue transition-colors">{line}</a>
                        ) : (
                            line
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Contact;
