import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, BrainCircuit, Star, Users, Trophy, Palette, Sun, ArrowRight, Heart, Sparkles, Cloud, Quote, Rocket } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AdmissionModal from '../components/AdmissionModal';

gsap.registerPlugin(ScrollTrigger);

const HERO_SLIDES = [
    "/assets/hero-slide-1.png",
    "/assets/hero-slide-2.png",
    "/assets/hero-slide-3.png",
    "/assets/hero-slide-4.png",
    "/assets/hero-slide-5.png",
    "/assets/hero-slide-6.png"
];

const Home = () => {
    const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef(null);
    const petalsRef = useRef(null);

    // Auto-advance hero slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useGSAP(() => {
        // 1. Reveal Animations for Text
        const textElements = gsap.utils.toArray('.reveal-text');
        textElements.forEach((el) => {
            gsap.fromTo(el,
                { y: 100, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // 2. Seven Petals - Pin & Rotate Logic
        const cards = gsap.utils.toArray('.petal-card');

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".petals-section",
                pin: true,
                start: "top top",
                end: "+=4000",
                scrub: 1,
                snap: 1 / (cards.length - 1)
            }
        });

        cards.forEach((card, i) => {
            tl.to(card, {
                opacity: 1,
                scale: 1,
                x: 0,
                rotate: 0,
                zIndex: 10,
                duration: 1,
                ease: "none"
            }, i * 0.5);

            if (i < cards.length - 1) {
                // fade out previous
                tl.to(card, {
                    scale: 0.8,
                    opacity: 0,
                    x: -100,
                    duration: 0.5
                }, (i + 0.8) * 0.5);
            }
        });

        // 3. Stacking Programs - pure visual effect, positioning handled by CSS sticky
        const programs = gsap.utils.toArray('.program-card');
        programs.forEach((card, i) => {
            // Fly-up visual entry
            gsap.fromTo(card,
                { y: 100, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 100%", // Start as soon as it enters
                        end: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Brightness/Scale filter for the 'stacking' depth effect
            gsap.to(card, {
                scale: 1 - (programs.length - i - 1) * 0.05,
                filter: "brightness(1)",
                scrollTrigger: {
                    trigger: card,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-cream-velvet font-body min-h-screen selection:bg-luxury-pink selection:text-white overflow-x-hidden">

            {/* --- HERO SECTION START (PRESERVED) --- */}
            <section className="relative w-full h-[110vh] min-h-[700px] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={currentSlide}
                            src={HERO_SLIDES[currentSlide]}
                            alt="Hero Slide"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7]"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-gulf-lebanese/80"></div>
                </motion.div>

                {/* Floating Clouds Animation */}
                <motion.div
                    animate={{ x: [0, 50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-10 text-white/20"
                >
                    <Cloud size={100} fill="currentColor" />
                </motion.div>
                <motion.div
                    animate={{ x: [0, -40, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-40 right-10 text-white/20"
                >
                    <Cloud size={120} fill="currentColor" />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-24 text-center">
                    <motion.div
                        style={{ y: textY }}
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                    >
                        <motion.div
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            className="inline-block bg-white text-gulf-lebanese px-6 py-2 rounded-full font-bold text-lg mb-8 shadow-xl transform -rotate-3 border-4 border-luxury-pink"
                        >
                            ✨ Est. 2025
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-heading font-black text-white leading-tight drop-shadow-2xl mb-4 tracking-tight">
                            RENAISSANCE
                        </h1>

                        <h2 className="text-3xl md:text-5xl font-handwriting font-bold text-yellow-300 drop-shadow-lg mb-8">
                            Where Magic Happens Daily
                        </h2>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8">
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: -2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsAdmissionOpen(true)}
                                className="bg-luxury-pink text-white font-bold px-10 py-5 rounded-full text-xl shadow-[0_10px_30px_rgba(236,72,153,0.5)] border-4 border-white flex items-center gap-2"
                            >
                                <Sparkles /> Enroll Your Child
                            </motion.button>
                            <NavLink to="/gallery">
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-white text-gulf-blue font-bold px-10 py-5 rounded-full text-xl shadow-xl flex items-center gap-2"
                                >
                                    Visit Gallery <ArrowRight />
                                </motion.button>
                            </NavLink>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* --- HERO SECTION END --- */}

            {/* --- SECTION 2: PHILOSOPHY / INTRO (Typography & Clean) --- */}
            <section className="relative py-32 px-6 bg-[#F9F7F2]">
                <div className="max-w-7xl mx-auto">
                    <div className="reveal-text text-xl md:text-2xl font-bold text-gulf-blue/60 mb-6 uppercase tracking-widest">
                        Welcome to the Future
                    </div>
                    <h2 className="reveal-text text-5xl md:text-8xl font-heading font-black text-gulf-lebanese leading-[0.9] mb-16">
                        WE BUILD <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-pink to-purple-500">
                            BRIGHT MINDS
                        </span> <br />
                        FOR TOMORROW.
                    </h2>

                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="reveal-text">
                            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
                                Imagine a place where every corner sparks curiosity.
                                At Renaissance, we don't just teach; we inspire.
                                A modern sanctuary for little explorers to dream big.
                            </p>
                        </div>
                        <div className="reveal-text grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform">
                                <span className="text-4xl">🌱</span>
                                <h3 className="text-lg font-bold mt-2">Holistic Growth</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform mt-8">
                                <span className="text-4xl">🛡️</span>
                                <h3 className="text-lg font-bold mt-2">Safety First</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: THE SEVEN PETALS (Pinned Interaction) --- */}
            <section className="petals-section h-screen w-full bg-[#F3F0E8] text-gulf-lebanese flex items-start justify-center overflow-hidden relative pt-0">
                {/* Subtle Light Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent"></div>

                <div className="relative z-10 w-full max-w-[95%] px-6 h-full">

                    {/* Header */}
                    <div className="text-center mb-0 relative z-20 pb-0">
                        <h2 className="text-6xl md:text-8xl font-heading font-black mb-0 text-gulf-lebanese">
                            The Seven <span className="text-luxury-pink">Petals</span>
                        </h2>
                        <p className="text-2xl text-gray-500 max-w-2xl mx-auto">
                            Scroll to explore our core philosophy.
                        </p>
                    </div>

                    <div className="relative w-full h-[60vh] flex items-start justify-center perspective-1000 -mt-32">
                        {/* Card Container */}
                        {PETAL_DATA.map((petal, index) => (
                            <div
                                key={index}
                                className={`petal-card absolute w-[90vw] md:w-[400px] h-[60vh] md:h-[600px] ${petal.bg} text-gulf-lebanese p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] origin-center border-[1px] border-white/40 flex flex-col justify-center gap-6`}
                                style={{
                                    transform: 'translateY(150px) scale(0.9)',
                                    opacity: 0,
                                    zIndex: index
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center text-4xl md:text-5xl shadow-sm shrink-0">
                                        {petal.emoji}
                                    </div>
                                    <span className={`text-8xl font-black ${petal.color} opacity-10 absolute right-6 top-6 -z-10 select-none`}>0{index + 1}</span>
                                </div>

                                <div>
                                    <h3 className={`text-4xl md:text-5xl font-black mb-4 leading-none ${petal.color}`}>{petal.title}</h3>
                                    <p className="text-lg md:text-xl text-gulf-lebanese/80 font-medium leading-relaxed">
                                        {petal.desc}
                                    </p>
                                </div>
                                <div className="w-full h-48 md:h-64 rounded-[1.5rem] overflow-hidden mt-2 shadow-sm border border-white/30">
                                    <img src={petal.img} alt={petal.title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: PROGRAMS (Sticky Stacking Cards) --- */}
            <section className="py-32 bg-cream-velvet px-4 relative">
                <div className="max-w-7xl mx-auto mb-20">
                    <h2 className="reveal-text text-6xl md:text-9xl font-heading font-black text-center text-gulf-lebanese tracking-tight">
                        LEARNING <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">JOURNEYS</span>
                    </h2>
                </div>

                <div className="flex flex-col items-center gap-[40vh] pb-64">
                    {PROGRAMS.map((prog, i) => (
                        <div
                            key={i}
                            className="program-card sticky top-[20vh] w-full max-w-5xl h-[60vh] rounded-[2.5rem] shadow-2xl overflow-hidden border-[6px] border-white flex flex-col md:flex-row"
                            style={{ backgroundColor: prog.bg }}
                        >
                            <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center h-full relative z-10">
                                <span className="bg-white/90 backdrop-blur text-gulf-lebanese px-8 py-3 rounded-full font-bold text-xl inline-block w-max mb-8 shadow-sm">
                                    {prog.age}
                                </span>
                                <h3 className="text-6xl md:text-8xl font-black text-gulf-lebanese mb-8 leading-none">
                                    {prog.title}
                                </h3>
                                <p className="text-2xl md:text-3xl text-gulf-lebanese/80 font-medium leading-relaxed mb-10">
                                    {prog.desc}
                                </p>
                                <ul className="space-y-4">
                                    {prog.tags.map((tag, idx) => (
                                        <li key={idx} className="flex items-center text-xl md:text-2xl font-bold text-gulf-lebanese">
                                            <span className="mr-3 text-3xl">✨</span> {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 h-full relative overflow-hidden">
                                <img src={prog.img} alt={prog.title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 ease-in-out" />
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- SECTION 5: LIVE STATS & TESTIMONIALS --- */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                    <p className="text-luxury-pink font-bold text-xl uppercase tracking-widest mb-2">Community Love</p>
                    <h2 className="text-5xl font-heading font-black text-gulf-lebanese">Trusted by Parents</h2>
                </div>

                {/* Marquee */}
                <div className="relative flex whitespace-nowrap overflow-hidden py-10">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="flex gap-8 px-4"
                    >
                        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                            <div key={i} className="w-[450px] bg-[#F3F4F6] p-10 rounded-[2.5rem] flex-shrink-0 whitespace-normal hover:bg-gulf-blue hover:text-white transition-colors duration-300 group">
                                <Quote className="text-4xl text-gray-300 group-hover:text-white/20 mb-4" />
                                <p className="text-xl font-medium leading-relaxed mb-6 group-hover:text-white">
                                    "{t.text}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-luxury-pink rounded-full flex items-center justify-center text-xl text-white font-bold">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg group-hover:text-white">{t.name}</h4>
                                        <span className="text-sm text-gray-500 group-hover:text-pink-200">Parent</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Big Numbers */}
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center mt-20 border-t pt-20">
                    {[
                        { num: "1.5K+", label: "Happy Students" },
                        { num: "50+", label: "Expert Teachers" },
                        { num: "20+", label: "Years Impact" },
                        { num: "100%", label: "Safety Record" },
                    ].map((stat, i) => (
                        <div key={i} className="reveal-text">
                            <h3 className="text-5xl md:text-6xl font-black text-gulf-lebanese mb-2">{stat.num}</h3>
                            <p className="text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- SECTION 6: FOOTER CTA --- */}
            <section className="relative py-32 bg-gulf-lebanese text-white text-center rounded-t-[4rem] -mt-12 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/assets/pattern.png')]"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <Rocket size={64} className="mx-auto mb-8 text-yellow-400 animate-bounce" />
                    <h2 className="text-6xl md:text-8xl font-heading font-black mb-8">
                        Ready to <span className="text-luxury-pink">Launch?</span>
                    </h2>
                    <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Admissions are open for 2025. Secure your child's spot in the most innovative preschool today.
                    </p>

                    <button
                        onClick={() => setIsAdmissionOpen(true)}
                        className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-bold text-gulf-lebanese transition-all duration-300 bg-white rounded-full hover:bg-white hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-luxury-pink rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                        <span className="relative text-2xl">Start Admission Process</span>
                        <ArrowRight className="ml-2 relative transition-transform group-hover:translate-x-2" />
                    </button>

                    <div className="mt-12 text-gray-500 text-sm">
                        * Limited seats available for the upcoming term.
                    </div>
                </div>
            </section>

            <AdmissionModal isOpen={isAdmissionOpen} onClose={() => setIsAdmissionOpen(false)} />
        </div>
    );
};

// --- DATA CONSTANTS ---

const PETAL_DATA = [
    { title: "Cognitive", emoji: "🧠", desc: "Building strong mental foundations through puzzles and logic.", img: "/SchoolPremises/classroom2.jpeg", color: "text-pink-600", bg: "bg-pink-100" },
    { title: "Motor Skills", emoji: "🤸", desc: "Fine and gross motor development with active play.", img: "/Activities/motor.jpeg", color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Creativity", emoji: "🎨", desc: "Expressing imagination through art, music, and dance.", img: "/Activities/Activities_1.jpeg", color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Culture", emoji: "🌏", desc: "Understanding our world, traditions, and values.", img: "/otherimp/IndependenceDay_3.jpeg", color: "text-green-600", bg: "bg-green-100" },
    { title: "Sports", emoji: "🏆", desc: "Teamwork, discipline, and physical health.", img: "/SportsDay/sportsday1.jpeg", color: "text-red-600", bg: "bg-red-100" },
    { title: "Social", emoji: "🤝", desc: "Making friends, sharing, and emotional intelligence.", img: "/Activities/RedDay_3.jpeg", color: "text-teal-600", bg: "bg-teal-100" },
];

const PROGRAMS = [
    {
        title: "Playgroup",
        age: "1.5 - 2.5 Years",
        desc: "A sensory wonderland for our tiniest tots. Montessori-inspired aids meet messy play.",
        bg: "#FFE5EC", // Light Pink
        img: "/SchoolPremises/classplay.jpeg",
        tags: ["Sensory Play", "Music & Movement", "Safe Environment"]
    },
    {
        title: "Nursery",
        age: "2.5 - 3.5 Years",
        desc: "Stepping stones to literacy. Letters and numbers become friends through stories.",
        bg: "#E0F7FA", // Light Cyan
        img: "/Activities/Activities_1.jpeg",
        tags: ["Phonics Intro", "Nature Walks", "Storytelling"]
    },
    {
        title: "Junior KG",
        age: "3.5 - 4.5 Years",
        desc: "Curiosity takes flight. Science experiments, reading clubs, and logical reasoning.",
        bg: "#FFF3E0", // Light Orange
        img: "/otherimp/Activities_3.jpeg",
        tags: ["Science Fun", "Reading Club", "Logic Puzzles"]
    },
    {
        title: "Senior KG",
        age: "4.5 - 5.5 Years",
        desc: "Ready for the big world. Advanced concepts, leadership, and school readiness.",
        bg: "#E8EAF6", // Light Indigo
        img: "/Activities/Activities_4.jpeg",
        tags: ["Creative Writing", "Leadership", "Public Speaking"]
    }
];

const TESTIMONIALS = [
    { name: "Sana Shaikh", text: "My child refuses to come home! That says everything about how much they love it here." },
    { name: "Rajesh Verma", text: "The best decision we made. The facilities and teachers are world-class." },
    { name: "Anita D'Souza", text: "Professional, clean, and full of love. Highly recommended for every parent." },
    { name: "Michael R.", text: "A truly magical place where learning feels like playing." }
];

export default Home;
