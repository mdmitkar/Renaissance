import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Sparkles, Cloud, Quote, Rocket } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
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
    const [activePetal, setActivePetal] = useState(0);
    const containerRef = useRef(null);

    // --- LENIS SMOOTH SCROLL SETUP ---
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureDirection: 'vertical',
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Auto-advance hero slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 4000); // Slower for more impact
        return () => clearInterval(timer);
    }, []);

    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    useGSAP(() => {
        // 1. Reveal Animations for Text
        const textElements = gsap.utils.toArray('.reveal-text');
        textElements.forEach((el) => {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // 2. Seven Petals - Pin & Rotate Logic
        const cards = gsap.utils.toArray('.petal-card');
        const totalCards = cards.length;

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".petals-section",
                pin: true,
                start: "top top",
                end: "+=3000",
                scrub: 1.5, // Softer scrub
                onUpdate: (self) => {
                    // Calculate active index based on progress
                    const progress = self.progress;
                    const index = Math.min(
                        Math.round(progress * (totalCards - 1)),
                        totalCards - 1
                    );
                    setActivePetal(index);
                }
            }
        });

        cards.forEach((card, i) => {
            // Intro animation
            tl.to(card, {
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: 0,
                zIndex: i + 1, // Ensure distinct stacking
                duration: 1,
                ease: "none"
            }, i * 1.5); // Spaced out timing

            // Exit animation (for all except last)
            if (i < cards.length - 1) {
                tl.to(card, {
                    scale: 0.95,
                    opacity: 0,
                    y: -50,
                    duration: 0.5
                }, (i + 1) * 1.5); // Overlap slightly
            }
        });

        // 3. Stacking Programs
        const programs = gsap.utils.toArray('.program-card');
        programs.forEach((card, i) => {
            gsap.fromTo(card,
                { y: 150, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 110%",
                        end: "top 70%",
                        scrub: 1
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-cream-velvet font-body min-h-screen selection:bg-luxury-pink selection:text-white overflow-x-hidden w-full relative">

            {/* Grain Overlay for Cinematic Feel */}
            <div className="bg-grain fixed inset-0 z-[9999] pointer-events-none opacity-[0.03]"></div>

            {/* --- HERO SECTION START --- */}
            <section className="relative w-full h-[110vh] min-h-[700px] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={currentSlide}
                            src={HERO_SLIDES[currentSlide]}
                            alt="Hero"
                            initial={{ opacity: 0, scale: 1.15 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.65]"
                        />
                    </AnimatePresence>
                    {/* Darker Gradient for text pop */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-gulf-lebanese/90"></div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                    animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-24 left-12 text-white/20 hidden md:block"
                >
                    <Cloud size={140} fill="currentColor" />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-32 text-center">
                    <motion.div
                        style={{ y: textY, opacity: textOpacity }}
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: -3 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="inline-block bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold text-lg mb-10 border border-white/20 shadow-2xl"
                        >
                            ✨ Est. 2025 • The Future of Learning
                        </motion.div>

                        <h1 className="text-7xl md:text-[9rem] font-heading font-black text-white leading-none drop-shadow-2xl mb-6 tracking-tighter">
                            RENAISSANCE
                        </h1>

                        <h2 className="text-2xl md:text-5xl font-handwriting font-bold text-gentle-yellow drop-shadow-lg mb-12">
                            Where Magic Happens Daily
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsAdmissionOpen(true)}
                                className="group bg-luxury-pink text-white font-bold px-12 py-6 rounded-full text-xl shadow-[0_20px_50px_rgba(220,169,202,0.5)] border-4 border-white/50 relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Enroll Now <Sparkles size={24} />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </motion.button>

                            <NavLink to="/gallery">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-gulf-lebanese font-bold px-12 py-6 rounded-full text-xl shadow-xl flex items-center gap-3 hover:bg-gray-50 transition-colors"
                                >
                                    Visit Gallery <ArrowRight size={24} />
                                </motion.button>
                            </NavLink>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
                >
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                </motion.div>
            </section>


            {/* --- SECTION 2: PHILOSOPHY --- */}
            <section className="relative py-40 px-6 bg-[#F9F7F2]">
                <div className="max-w-7xl mx-auto">
                    <div className="reveal-text text-xl font-bold text-gulf-blue mb-8 uppercase tracking-[0.2em]">
                        Welcome to the Future
                    </div>
                    <h2 className="reveal-text text-5xl md:text-8xl font-heading font-black text-gulf-lebanese leading-[0.9] mb-20">
                        WE BUILD <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-pink via-purple-400 to-indigo-500 animate-gradient-x">
                            BRIGHT MINDS
                        </span> <br />
                        FOR TOMORROW.
                    </h2>

                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="reveal-text">
                            <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                                Imagine a place where every corner sparks <span className="text-luxury-pink font-semibold">curiosity</span>.
                                At Renaissance, we don't just teach foundations; we inspire lifelong dreamers.
                                A modern sanctuary for little explorers.
                            </p>
                        </div>
                        <div className="reveal-text grid grid-cols-2 gap-6">
                            {/* Feature Cards */}
                            {[
                                { icon: "🌱", title: "Holistic Growth", desc: "Mind, Body, Spirit" },
                                { icon: "🛡️", title: "Safety First", desc: "Top-tier Security" },
                                { icon: "🎨", title: "Creative Arts", desc: "Express Freely" },
                                { icon: "🤝", title: "Community", desc: "Stronger Together" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                    <span className="text-4xl block mb-4">{item.icon}</span>
                                    <h3 className="text-lg font-bold text-gulf-lebanese">{item.title}</h3>
                                    <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: THE SEVEN PETALS (Enhanced Interaction) --- */}
            <section className="petals-section h-screen w-full bg-[#F3F0E8] text-gulf-lebanese flex items-center justify-center overflow-hidden relative">

                {/* Side Navigation for Petals */}
                <div className="hidden md:flex flex-col gap-6 absolute left-12 top-1/2 -translate-y-1/2 z-20">
                    {PETAL_DATA.map((_, idx) => (
                        <div key={idx} className="flex items-center gap-4 transition-all duration-300" style={{ opacity: activePetal === idx ? 1 : 0.3 }}>
                            <div className={`w-3 h-3 rounded-full ${activePetal === idx ? 'bg-gulf-lebanese scale-125' : 'bg-gray-400'}`}></div>
                            <span className={`text-sm font-bold tracking-widest uppercase origin-left transition-all duration-300 ${activePetal === idx ? 'translate-x-0' : '-translate-x-4 opacity-0'}`}>
                                0{idx + 1}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="relative w-full max-w-7xl px-6 h-full flex flex-col justify-center">
                    <div className="text-center mb-12 relative z-20">
                        <h2 className="text-6xl md:text-9xl font-heading font-black text-gulf-lebanese/10 absolute top-[-50%] left-1/2 -translate-x-1/2 select-none pointer-events-none whitespace-nowrap">
                            PHILOSOPHY
                        </h2>
                        <h2 className="text-5xl md:text-7xl font-heading font-black text-gulf-lebanese relative">
                            The Seven <span className="text-luxury-pink">Petals</span>
                        </h2>
                    </div>

                    <div className="relative w-full h-[60vh] flex items-center justify-center">
                        {PETAL_DATA.map((petal, index) => (
                            <div
                                key={index}
                                className={`petal-card absolute w-[90vw] md:w-[800px] h-[50vh] md:h-[500px] ${petal.bg} p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white/50 flex flex-col md:flex-row gap-10 items-center justify-between overflow-hidden`}
                                style={{
                                    transform: 'scale(0.8) translateY(100px)',
                                    opacity: 0,
                                }}
                            >
                                {/* Text Content */}
                                <div className="md:w-1/2 z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-sm">
                                            {petal.emoji}
                                        </div>
                                        <span className="text-6xl font-black opacity-10 font-heading">0{index + 1}</span>
                                    </div>
                                    <h3 className={`text-4xl md:text-5xl font-black mb-6 ${petal.color}`}>{petal.title}</h3>
                                    <p className="text-xl text-gulf-lebanese/80 font-medium leading-relaxed">
                                        {petal.desc}
                                    </p>
                                </div>

                                {/* Image Content */}
                                <div className="md:w-1/2 h-64 md:h-full w-full relative rounded-[2rem] overflow-hidden shadow-inner rotate-3">
                                    <img src={petal.img} alt={petal.title} className="w-full h-full object-cover transform scale-110" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: PROGRAMS --- */}
            <section className="py-40 bg-cream-velvet px-4 relative">
                <div className="max-w-7xl mx-auto mb-32 text-center">
                    <h2 className="reveal-text text-6xl md:text-9xl font-heading font-black text-gulf-lebanese tracking-tighter">
                        LEARNING <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">JOURNEYS</span>
                    </h2>
                </div>

                <div className="flex flex-col items-center gap-24 pb-32">
                    {PROGRAMS.map((prog, i) => (
                        <div
                            key={i}
                            className="program-card sticky top-32 w-full max-w-6xl h-auto md:h-[600px] rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-white flex flex-col md:flex-row bg-white"
                            style={{ backgroundColor: prog.bg }}
                        >
                            <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center h-full relative z-10">
                                <span className="bg-white/80 backdrop-blur-sm text-gulf-lebanese px-6 py-2 rounded-full font-bold text-lg w-max mb-6 shadow-sm border border-white/50">
                                    {prog.age}
                                </span>
                                <h3 className="text-5xl md:text-7xl font-black text-gulf-lebanese mb-6 leading-[0.9]">
                                    {prog.title}
                                </h3>
                                <p className="text-xl md:text-2xl text-gulf-lebanese/80 font-medium leading-relaxed mb-8">
                                    {prog.desc}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {prog.tags.map((tag, idx) => (
                                        <span key={idx} className="px-4 py-2 bg-white/50 rounded-lg font-bold text-sm md:text-base border border-white/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="md:w-1/2 h-80 md:h-full relative overflow-hidden group">
                                <img
                                    src={prog.img}
                                    alt={prog.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- SECTION 5: LIVE STATS & TESTIMONIALS --- */}
            <section className="py-32 bg-white overflow-hidden rounded-t-[5rem] relative z-10 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
                    <p className="text-luxury-pink font-bold text-xl uppercase tracking-[0.3em] mb-4">The Voice of Parents</p>
                    <h2 className="text-5xl md:text-7xl font-heading font-black text-gulf-lebanese">Community Love</h2>
                </div>

                {/* Marquee */}
                <div className="relative flex whitespace-nowrap overflow-hidden py-10 group">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                        className="flex gap-8 px-4 group-hover:[animation-play-state:paused]"
                    >
                        {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                            <div key={i} className="w-[450px] bg-bg-cream p-10 rounded-[2rem] flex-shrink-0 whitespace-normal hover:bg-gulf-lebanese hover:text-white transition-colors duration-500 cursor-default border border-gray-100">
                                <Quote className="text-5xl text-gray-300 opacity-50 mb-6" />
                                <p className="text-xl font-medium leading-relaxed mb-8">
                                    "{t.text}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-luxury-pink to-purple-500 rounded-full flex items-center justify-center text-xl text-white font-bold shadow-lg">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{t.name}</h4>
                                        <span className="text-sm opacity-60">Renaissance Parent</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Big Numbers */}
                <div className="max-w-7xl mx-auto px-6 mt-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-gray-100">
                        {[
                            { num: "1.5K+", label: "Happy Students" },
                            { num: "50+", label: "Expert Teachers" },
                            { num: "20+", label: "Years Impact" },
                            { num: "100%", label: "Safety Record" },
                        ].map((stat, i) => (
                            <div key={i} className="reveal-text px-4">
                                <h3 className="text-6xl md:text-7xl font-black text-gulf-lebanese mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gulf-lebanese to-gray-400">
                                    {stat.num}
                                </h3>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 6: FOOTER CTA --- */}
            <section className="relative py-40 bg-gulf-lebanese text-white text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/assets/pattern.png')] mix-blend-overlay"></div>
                <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-10"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Rocket size={80} className="mx-auto mb-12 text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.6)]" />
                    </motion.div>

                    <h2 className="text-6xl md:text-9xl font-heading font-black mb-10 tracking-tight">
                        Ready to <span className="text-luxury-pink italic">Launch?</span>
                    </h2>
                    <p className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
                        Admissions for 2025 are filling up fast. Join the family where your child's future shines brightest.
                    </p>

                    <button
                        onClick={() => setIsAdmissionOpen(true)}
                        className="group relative inline-flex items-center justify-center px-16 py-8 overflow-hidden font-bold text-gulf-lebanese transition-all duration-300 bg-white rounded-full hover:scale-105 shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                    >
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-luxury-pink rounded-full group-hover:w-[150%] group-hover:h-[150%] opacity-20"></span>
                        <span className="relative text-2xl tracking-wide uppercase">Start Admission</span>
                        <ArrowRight className="ml-3 relative transition-transform group-hover:translate-x-2" size={28} />
                    </button>

                    <div className="mt-16 text-white/30 text-sm font-semibold tracking-[0.2em] uppercase">
                        * Limited Seats • Terms Apply
                    </div>
                </div>
            </section>

            <AdmissionModal isOpen={isAdmissionOpen} onClose={() => setIsAdmissionOpen(false)} />
        </div>
    );
};

// --- DATA CONSTANTS ---

const PETAL_DATA = [
    // Updated with gradients or nicer colors if needed, keeping original logic for now
    { title: "Cognitive", emoji: "🧠", desc: "Building strong mental foundations through puzzles and logic.", img: "/SchoolPremises/classroom2.jpeg", color: "text-rose-500", bg: "bg-rose-50" },
    { title: "Motor Skills", emoji: "🤸", desc: "Fine and gross motor development with active play.", img: "/Activities/motor.jpeg", color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Creativity", emoji: "🎨", desc: "Expressing imagination through art, music, and dance.", img: "/Activities/Activities_1.jpeg", color: "text-sky-500", bg: "bg-sky-50" },
    { title: "Culture", emoji: "🌏", desc: "Understanding our world, traditions, and values.", img: "/otherimp/IndependenceDay_3.jpeg", color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Sports", emoji: "🏆", desc: "Teamwork, discipline, and physical health.", img: "/SportsDay/sportsday1.jpeg", color: "text-red-500", bg: "bg-red-50" },
    { title: "Social", emoji: "🤝", desc: "Making friends, sharing, and emotional intelligence.", img: "/Activities/RedDay_3.jpeg", color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Life Skills", emoji: "🌱", desc: "Practical skills for independent living and hygiene.", img: "/Activities/Activities_2.jpeg", color: "text-teal-600", bg: "bg-teal-50" },
];

const PROGRAMS = [
    {
        title: "Playgroup",
        age: "1.5 - 2.5 Years",
        desc: "A sensory wonderland for our tiniest tots. Montessori-inspired aids meet messy play.",
        bg: "#FFE5EC", // Light Pink
        img: "/SchoolPremises/classplay.jpeg",
        tags: ["Sensory Play", "Music", "Safety"]
    },
    {
        title: "Nursery",
        age: "2.5 - 3.5 Years",
        desc: "Stepping stones to literacy. Letters and numbers become friends through stories.",
        bg: "#E0F7FA", // Light Cyan
        img: "/Activities/Activities_1.jpeg",
        tags: ["Phonics", "Nature", "Reading"]
    },
    {
        title: "Junior KG",
        age: "3.5 - 4.5 Years",
        desc: "Curiosity takes flight. Science experiments, reading clubs, and logical reasoning.",
        bg: "#FFF3E0", // Light Orange
        img: "/otherimp/Activities_3.jpeg",
        tags: ["Science", "Logic", "Math"]
    },
    {
        title: "Senior KG",
        age: "4.5 - 5.5 Years",
        desc: "Ready for the big world. Advanced concepts, leadership, and school readiness.",
        bg: "#E8EAF6", // Light Indigo
        img: "/Activities/Activities_4.jpeg",
        tags: ["Writing", "Leadership", "Speaking"]
    }
];

const TESTIMONIALS = [
    { name: "Sana Shaikh", text: "My child refuses to come home! That says everything about how much they love it here." },
    { name: "Rajesh Verma", text: "The best decision we made. The facilities and teachers are world-class." },
    { name: "Anita D'Souza", text: "Professional, clean, and full of love. Highly recommended for every parent." },
    { name: "Michael R.", text: "A truly magical place where learning feels like playing." }
];

export default Home;
