import React, { useState, useRef, useLayoutEffect } from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, Send, User, Calendar, BookOpen, Star, Heart, Sun, Instagram, Facebook, Youtube, MessageCircle, ChevronsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "description": "Contact Renaissance Preschool for admissions and inquiries.",
    "mainEntity": {
        "@type": "EducationalOrganization",
        "name": "Renaissance Preschool",
        "telephone": "+918483848486",
        "email": "info.renaissanceschool@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "KUWARI COMPOUND, BUBERE HALL ROAD, BESIDE FOOD IN RESTAURANT",
            "addressLocality": "NIZAMPUR BHIWANDI",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN",
            "postalCode": "421302"
        }
    }
};

const Contact = () => {
    const sceneRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!sceneRef.current) return;
        const { clientX, clientY } = e;
        // Subtle tilt
        const xPos = (clientX / window.innerWidth - 0.5) * 8; // Slightly more movement than parent's praise
        const yPos = (clientY / window.innerHeight - 0.5) * 8;

        gsap.to(sceneRef.current, {
            rotateY: xPos,
            rotateX: -yPos,
            duration: 2,
            ease: "power2.out"
        });
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // --- FLOATING HERO ANIMATIONS ---
            const floatingElements = document.querySelectorAll('.contact-float-item');

            // 1. Initial State
            gsap.set(floatingElements, {
                opacity: 0,
                scale: 0.5,
                y: 50
            });

            // 2. Entrance (Gentle Pop)
            gsap.to(floatingElements, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "back.out(1.2)"
            });

            // 3. Continuous Bobbing (Organic Float)
            floatingElements.forEach((el, i) => {
                const delay = Math.random() * 2;
                gsap.to(el, {
                    y: "random(-20, 20)",
                    x: "random(-10, 10)",
                    rotation: "random(-5, 5)",
                    duration: "random(4, 7)", // Slower, more majestic float for buildings
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: delay
                });
            });

            // Hero Text Entrance
            gsap.from(".hero-text-enter", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            });

        }, sceneRef); // Use sceneRef as scope if possible, or parent
        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-bg-cream dark:bg-[#111] overflow-x-hidden font-body transition-colors duration-300">
            <SEO
                title="Contact Us"
                description="Get in touch with Renaissance Preschool. Visit our campus in Bhiwandi, call us, or submit an admission enquiry online."
                canonical="/contact"
                schema={contactSchema}
            />

            {/* 1. HERO SECTION - 3D Campus Floating Scene */}
            <div
                onMouseMove={handleMouseMove}
                className="relative min-h-[75vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden [perspective:1000px] bg-gradient-to-br from-[#FDFBF7] via-white to-[#F0F4F8] dark:from-[#0a0a0a] dark:via-[#111] dark:to-[#0a0a0a]"
            >
                {/* 3D Scene Wrapper */}
                <div ref={sceneRef} className="relative w-full h-full min-h-[75vh] md:min-h-screen max-w-[1600px] flex items-center justify-center [transform-style:preserve-3d] py-16 md:py-20 mt-12 md:mt-0">

                    {/* --- FLOATING CAMPUS IMAGES --- */}

                    {/* Top Left: School Building */}
                    <div className="contact-float-item absolute top-[8%] left-[2%] md:left-[5%] w-32 md:w-72 z-10">
                        <div className="bg-white dark:bg-zinc-800 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl border border-white/50 dark:border-white/10 rotate-[-6deg] hover:scale-110 transition-transform duration-500 hover:rotate-0 hover:z-50">
                            <img src="/assets/cropschool_building_enhanced.png" alt="Our Campus" className="rounded-lg md:rounded-xl w-full h-auto object-cover aspect-[4/3] shadow-inner" />
                            <div className="text-center mt-2 md:mt-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest font-heading">Our Campus</div>
                        </div>
                    </div>

                    {/* Bottom Right: Classroom */}
                    <div className="contact-float-item absolute bottom-[18%] md:bottom-[12%] right-[2%] md:right-[5%] w-36 md:w-72 z-10">
                        <div className="bg-white dark:bg-zinc-800 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl border border-white/50 dark:border-white/10 rotate-[5deg] hover:scale-110 transition-transform duration-500 hover:rotate-0 hover:z-50">
                            <img src="/SchoolPremises/newclassw.png" alt="Classroom" className="rounded-lg md:rounded-xl w-full h-auto object-cover aspect-[4/3] shadow-inner" />
                            <div className="text-center mt-2 md:mt-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest font-heading">Learning Spaces</div>
                        </div>
                    </div>

                    {/* Top Right: Playground */}
                    <div className="contact-float-item absolute top-[3%] md:top-[12%] right-[5%] md:right-[8%] w-20 md:w-60 z-0 opacity-80 md:opacity-80 hover:opacity-100 transition-opacity">
                        <div className="bg-white dark:bg-zinc-800 p-1.5 md:p-2 rounded-xl md:rounded-2xl shadow-xl border border-white/50 dark:border-white/10 rotate-[12deg] hover:scale-105 transition-transform duration-300">
                            <img src="/SchoolPremises/playground3.png" alt="Play Area" className="rounded-lg md:rounded-xl w-full h-auto object-cover aspect-square" />
                        </div>
                    </div>

                    {/* Bottom Left: Activity */}
                    <div className="contact-float-item absolute bottom-[10%] md:bottom-[15%] left-[8%] md:left-[8%] w-24 md:w-60 z-0 opacity-80 md:opacity-80 hover:opacity-100 transition-opacity">
                        <div className="bg-white dark:bg-zinc-800 p-1.5 md:p-2 rounded-xl md:rounded-2xl shadow-xl border border-white/50 dark:border-white/10 rotate-[-12deg] hover:scale-105 transition-transform duration-300">
                            <img src="/SchoolPremises/classplay.jpeg" alt="Activities" className="rounded-lg md:rounded-xl w-full h-auto object-cover aspect-square" />
                        </div>
                    </div>

                    {/* --- FLOATING ICONS - Adjust positions for mobile --- */}
                    <div className="contact-float-item absolute top-[20%] left-[10%] md:left-[28%] text-blue-200 dark:text-blue-900/30 blur-[1px]"><MapPin size={32} md:size={48} className="fill-current" /></div>
                    <div className="contact-float-item absolute bottom-[25%] right-[10%] md:right-[28%] text-rose-200 dark:text-rose-900/30 blur-[1px]"><Mail size={24} md:size={40} className="fill-current" /></div>
                    <div className="contact-float-item absolute top-[15%] right-[15%] md:right-[32%] text-amber-200 dark:text-amber-900/30 blur-[1px]"><Sun size={40} md:size={56} className="animate-[spin_10s_linear_infinite]" /></div>


                    {/* --- CENTRAL HERO TEXT --- */}
                    <div className="relative z-30 text-center px-6 max-w-3xl mx-auto -mt-24 md:mt-0 [transform:translateZ(60px)]">
                        <motion.h1
                            className="hero-text-enter text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-black text-slate-900 dark:text-white mb-6 md:mb-8 drop-shadow-sm leading-[1.1] md:leading-[0.9] break-words"
                        >
                            Join the <br />
                            <span className="text-[#D4AF37] font-english font-normal text-6xl sm:text-7xl md:text-9xl relative inline-block px-2 md:px-4 leading-tight py-2 drop-shadow-md">
                                Renaissance
                                {/* Subtle Underline Decoration */}
                                <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 bg-yellow-300/30 -rotate-1 rounded-full -z-10"></div>
                            </span> <br />
                            Family
                        </motion.h1>

                        <motion.div className="hero-text-enter flex flex-col items-center gap-4 md:gap-6">
                            <p
                                className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-body font-medium tracking-wide"
                            >
                                Visits, enquiries, or just a friendly hello.
                            </p>

                            <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                        </motion.div>
                    </div>





                </div>

                {/* Soft Wave Divider at Bottom */}
                <div className="absolute bottom-0 left-0 w-full leading-none z-20 text-bg-cream dark:text-[#111]">
                    <svg className="block w-full h-16 md:h-32" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                    {/* ADDED SCROLL INDICATOR */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        className=" absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 text-slate-400 dark:text-slate-600 flex flex-col items-center gap-2"
                    >
                        <span className=" text-[15px] uppercase tracking-widest font-bold opacity-70">Scroll</span>
                        <ChevronsDown size={34} />
                    </motion.div>
                </div>

            </div>

            {/* MAIN CONTENT - FIXED Z-INDEX & OVERLAP */}
            <div className="max-w-6xl mx-auto px-6 pb-12 pt-0 mt-4 md:mt-8 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* LEFT COLUMN: ADMISSION FORM (7 Cols) */}
                    <div className="lg:col-span-7">
                        <AdmissionForm />

                        {/* SOCIAL & RATINGS - Moved from Right Side */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-[#222] to-black text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden mt-8 w-[90%] mx-auto"
                        >
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="flex items-center gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} className="fill-gentle-yellow text-gentle-yellow animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />)}
                                </div>
                                <h3 className="text-3xl font-heading font-bold mb-2">4.8/5 Rating</h3>
                                <p className="opacity-70 text-sm mb-6">Loved by 100+ Parents on Google</p>

                                <div className="flex gap-4">
                                    <SocialButton
                                        icon={<Instagram size={24} />}
                                        color="hover:bg-pink-600"
                                        href="https://www.instagram.com/renaissancepreschool"
                                    />
                                    <SocialButton
                                        icon={<MessageCircle size={24} />}
                                        color="hover:bg-green-500"
                                        href="https://api.whatsapp.com/send/?phone=918483848486&text=Hello+Renaissance+Preschool%2C%0A%0AI+am+interested+in+admission+for+my+child.+Kindly+share+details+about+programs%2C+fees%2C+and+admission+process.%0A%0AThank+you.&type=phone_number&app_absent=0"
                                    />
                                </div>
                            </div>

                            {/* Glossy Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: CONTACT INFO (5 Cols) */}
                    <div className="lg:col-span-5 space-y-8 pt-4 lg:pt-12">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            viewport={{ amount: 0.3, margin: "0px 0px -100px 0px" }}
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


                    </div>
                </div>
            </div>

            {/* MAP SECTION - Enhanced Styling */}
            <div className="h-[450px] w-full relative z-0 mt-16 shadow-inner border-t-8 border-gulf-blue/20">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.459697286655!2d73.05916307499606!3d19.305848681946635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bdd8891e3395%3A0x9bc9f6f5e62ce3e5!2sRENAISSANCE%20Preschool!5e0!3m2!1sen!2sin!4v1768495823093!5m2!1sen!2sin"
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
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            viewport={{ amount: 0.3, margin: "0px 0px -100px 0px" }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-6 md:p-12 border border-gray-100 dark:border-gray-800 relative overflow-hidden"
        >
            {/* Form Decor */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-gulf-blue/10 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none blur-2xl"></div>

            <div className="relative z-10">
                <div className="mb-8 border-l-8 border-gentle-yellow pl-4 md:pl-6">
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-gulf-dark dark:text-white mb-2">Admission Open</h2>
                    <h3 className="text-2xl text-gray-500 font-medium tracking-wide">Academic Year 2026 - 2027</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Child's Name */}
                        <div className="md:col-span-2">
                            <Input
                                label="Child Full Name"
                                name="childName"
                                placeholder="E.g. Samad Ansari"
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
                                placeholder="E.g. Javed Ansari"
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
                        <label className="text-sm font-bold text-gulf-lebanese dark:text-gray-400 mb-4 uppercase tracking-wide flex items-center gap-2">
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

const SocialButton = ({ icon, color, href }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center transition-all ${color}`}
    >
        {icon}
    </motion.a>
)

export default Contact;
