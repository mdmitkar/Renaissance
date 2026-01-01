import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Sparkles, Cloud, Quote, Rocket, Flower2, Star, Plus, Minus } from 'lucide-react';
import { googleReviews } from '../data/reviews';
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

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border border-gulf-lebanese/10 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="text-lg font-bold text-gulf-lebanese">{question}</span>
                <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-luxury-pink text-white' : 'bg-gray-100 text-gulf-lebanese'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Home = () => {
    const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activePetal, setActivePetal] = useState(0);
    const activePetalRef = useRef(0);
    const timerRef = useRef(null);
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
        }, 6000); // 6s for better readability
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
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // 2. Seven Petals - Pin & Rotate Logic
        const mm = gsap.matchMedia();

        // --- DESKTOP ANIMATIONS (Pinning & Horizontal Scroll) ---
        mm.add("(min-width: 768px)", () => {
            // 2. Seven Petals - Pin & Rotate Logic
            const cards = gsap.utils.toArray('.petal-card');
            const totalCards = cards.length;

            // FIX: Robust Initial State - Hide all except first
            gsap.set(cards, { autoAlpha: 0, scale: 0.9, y: 50 });
            gsap.set(cards[0], { autoAlpha: 1, scale: 1, y: 0 });

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".petals-section",
                    pin: true,
                    start: "top top",
                    end: "+=2200",
                    scrub: 1,
                    snap: {
                        snapTo: 1 / (totalCards - 1),
                        duration: { min: 0.1, max: 0.5 },
                        delay: 0,
                        ease: "power1.inOut"
                    },
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const index = Math.min(
                            Math.round(progress * (totalCards - 1)),
                            totalCards - 1
                        );
                        if (index !== activePetalRef.current) {
                            setActivePetal(index);
                            activePetalRef.current = index;
                        }
                    }
                }
            });

            // Chain animations linearly: Fade Out Current -> Fade In Next
            for (let i = 0; i < totalCards - 1; i++) {
                const current = cards[i];
                const next = cards[i + 1];

                tl.to(current, { autoAlpha: 0, scale: 0.95, y: -20, duration: 1 })
                    .to(next, { autoAlpha: 1, scale: 1, y: 0, duration: 1 }, "<"); // Start at same time
            }

            // Journey Horizontal Scroll
            const journeySection = document.querySelector('.journey-section');
            const journeyContainer = document.querySelector('.journey-container');

            if (journeySection && journeyContainer) {
                const scrollTween = gsap.to(journeyContainer, {
                    x: () => -(journeyContainer.scrollWidth - window.innerWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: journeySection,
                        pin: true,
                        scrub: 1,
                        end: () => "+=" + journeyContainer.scrollWidth,
                        invalidateOnRefresh: true,
                    }
                });

                const cards = gsap.utils.toArray('.journey-card');
                cards.forEach((card, i) => {
                    const img = card.querySelector('.journey-img');
                    if (img) {
                        gsap.fromTo(img,
                            { scale: 1.2, x: -50 },
                            {
                                scale: 1, x: 50, ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    containerAnimation: scrollTween,
                                    start: "left right",
                                    end: "right left",
                                    scrub: true,
                                }
                            }
                        );
                    }
                });
            }
        });

        // --- MOBILE ANIMATIONS (Simple Vertical Stacking) ---
        mm.add("(max-width: 767px)", () => {
            const elements = gsap.utils.toArray('.reveal-on-mobile');
            elements.forEach(el => {
                gsap.fromTo(el, { y: 50, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.8,
                    scrollTrigger: { trigger: el, start: "top 85%" }
                });
            });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-cream-velvet font-body min-h-screen selection:bg-luxury-pink selection:text-white overflow-x-hidden w-full relative">

            {/* Grain Overlay for Cinematic Feel */}
            <div className="bg-grain fixed inset-0 z-[9999] pointer-events-none opacity-[0.03]"></div>

            {/* --- HERO SECTION START --- */}
            <section className="relative w-full h-screen md:h-[110vh] min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
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
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="inline-block bg-white/10 backdrop-blur-md text-white px-5 py-2 md:px-8 md:py-3 rounded-full font-bold text-sm md:text-lg mb-6 md:mb-10 border border-white/20 shadow-2xl whitespace-nowrap"
                        >
                            ✨ Est. 2025 • The Future of Learning
                        </motion.div>

                        <h1 className="text-[13vw] md:text-[8rem] font-heading font-black text-white leading-none drop-shadow-2xl mb-8 tracking-tighter w-full break-words">
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
            <section className="relative py-24 md:py-32 px-6 bg-[#F9F7F2]">
                <div className="max-w-7xl mx-auto">
                    {/* Header + Image Row */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        {/* Left: Text */}
                        <div>
                            <div className="reveal-text text-xl font-bold text-gulf-blue mb-8 uppercase tracking-[0.2em]">
                                Welcome to the Future
                            </div>
                            <h2 className="reveal-text text-4xl md:text-6xl font-heading font-black text-gulf-lebanese leading-tight">
                                WE BUILD <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-pink via-purple-400 to-indigo-500 animate-gradient-x">
                                    BRIGHT MINDS
                                </span> <br />
                                FOR TOMORROW.
                            </h2>
                        </div>

                        {/* Right: Image */}
                        <div className="reveal-text relative hidden md:block">
                            <div className="absolute inset-0 bg-luxury-pink/10 rounded-[2.5rem] rotate-3 transform scale-105 z-0"></div>
                            <img
                                src="/SchoolPremises/classroom1.jpeg"
                                alt="Modern Classroom"
                                className="relative z-10 w-full h-[400px] object-cover rounded-[2.5rem] shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="reveal-text grid grid-cols-2 gap-6 w-full">
                            {/* Feature Cards with Hover Animation */}
                            {[
                                { icon: "🌱", title: "Holistic Growth", desc: "Mind, Body, Spirit", img: "/assets/cards/holistic_growth.png" },
                                { icon: "🛡️", title: "Safety First", desc: "Top-tier Security", img: "/assets/cards/safety_first.png" },
                                { icon: "🎨", title: "Creative Arts", desc: "Express Freely", img: "/assets/cards/creative_arts.png" },
                                { icon: "🤝", title: "Community", desc: "Stronger Together", img: "/assets/cards/community.png" }
                            ].map((item, idx) => (
                                <div key={idx} className="group relative overflow-hidden rounded-[2rem] h-[350px] shadow-sm hover:shadow-xl cursor-default border border-gray-100 transition-shadow duration-300">
                                    {/* 1. Background Image */}
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* 2. Slide-up Content Overlay */}
                                    {/* Initial: Translated DOWN (off-screen or minimal visibility). Hover: Slides UP to cover. */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 translate-y-[60%] group-hover:translate-y-0 transition-transform duration-500 ease-out">

                                        {/* Visible Part (Icon + Title) */}
                                        <div className="mb-2">
                                            <span className="text-4xl mb-3 block filter drop-shadow-md">{item.icon}</span>
                                            <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md leading-tight">{item.title}</h3>
                                        </div>

                                        {/* Hidden Part (Description + Decor) */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <div className="w-12 h-1 bg-luxury-pink mb-4 rounded-full"></div>
                                            <p className="text-white/90 font-medium text-lg leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="reveal-text px-4 md:px-0">
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium text-justify">
                                Imagine a place where every corner sparks <span className="text-luxury-pink font-semibold">curiosity</span>.
                                At Renaissance, we don't just teach foundations; we inspire lifelong dreamers.
                                A modern sanctuary for little explorers.
                                <br /><br />
                                Our carefully curated environment encourages independent discovery, while our dedicated mentors ensure every child feels seen and heard. From the first steps of playgroup to the confident strides of Senior KG, we nurture the unique potential within each young mind.
                                <br /><br />
                                We believe that education is not just about filling a bucket, but lighting a fire. Our holistic approach integrates academics with arts, sports, and emotional well-being, creating a balanced ecosystem where children flourish. Every element of our campus, from the sunlit classrooms to the vibrant play areas, is designed to stimulate imagination and foster a deep, lasting love for learning.
                                <br /><br />
                                Parents are our partners in this journey. We maintain open channels of communication, ensuring that you are always part of your child's milestones. Together, we build a strong foundation of values, resilience, and joy, preparing your little ones not just for school, but for life itself. Join us in shaping a future where kindness and knowledge go hand in hand.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: THE SEVEN PETALS (Enhanced Interaction) --- */}
            <section className="petals-section min-h-screen h-auto md:h-screen w-full bg-[#FAF9F6] text-gulf-lebanese flex items-center justify-center overflow-hidden relative py-20 md:py-0">

                {/* Nice Styling: Animated Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-luxury-pink/5 rounded-full blur-[100px] mix-blend-multiply animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-200/10 rounded-full blur-[80px] mix-blend-multiply"></div>

                    {/* Rotating Flower Watermark */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gulf-lebanese/5 hidden md:block"
                    >
                        <Flower2 size={800} strokeWidth={0.5} />
                    </motion.div>
                </div>

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
                    {/* Logical Title Separation */}
                    <div className="text-center mb-16 relative z-20 flex flex-col items-center gap-3">
                        <div className="flex items-center gap-4 mb-2 opacity-60">
                            <div className="h-[1px] w-12 bg-gulf-lebanese"></div>
                            <h3 className="text-sm md:text-base font-bold tracking-[0.4em] uppercase text-gulf-lebanese">Our Philosophy</h3>
                            <div className="h-[1px] w-12 bg-gulf-lebanese"></div>
                        </div>
                        <h2 className="text-4xl md:text-8xl font-heading font-black text-gulf-lebanese relative z-10 drop-shadow-sm px-4">
                            The Seven <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-pink to-purple-500 italic block md:inline">Petals</span>
                        </h2>
                    </div>

                    <div className="relative w-full h-auto flex flex-col md:h-[60vh] md:flex-row items-center justify-center">
                        {PETAL_DATA.map((petal, index) => (
                            <div
                                key={index}
                                className={`reveal-on-mobile petal-card relative md:absolute w-full md:max-w-5xl h-auto md:h-[450px] ${petal.bg} p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-xl md:shadow-2xl border border-white/50 flex flex-col md:flex-row gap-8 md:gap-10 items-center justify-between overflow-hidden mb-8 md:mb-0`}
                                style={{
                                    // Inline styles removed for mobile to allow CSS flow, logic handled by GSAP matchMedia on desktop
                                }}
                            >
                                {/* Text Content */}
                                <div className="md:w-1/2 z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-sm">
                                            {petal.emoji}
                                        </div>
                                        <span className="text-6xl font-black text-white/20 font-heading">0{index + 1}</span>
                                    </div>
                                    <h3 className={`text-4xl md:text-5xl font-black mb-6 ${petal.color}`}>{petal.title}</h3>
                                    <p className="text-xl text-white/90 font-medium leading-relaxed">
                                        {petal.desc}
                                    </p>
                                </div>

                                {/* Image Content */}
                                <div className="md:w-1/2 h-64 md:h-full w-full relative rounded-[2rem] overflow-hidden shadow-inner rotate-3">
                                    <img src={petal.img} alt={petal.title} className={`w-full h-full object-cover transform scale-110 ${petal.imgPos || 'object-center'}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: PROGRAMS (Horizontal Scroll) --- */}
            <section className="journey-section min-h-screen h-auto md:h-screen bg-gulf-lebanese text-white overflow-hidden relative flex flex-col md:flex-row items-center py-20 md:py-0">

                {/* Background Text/Decor */}
                <div className="absolute top-10 left-10 z-10">
                    <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-white/30">
                        The Renaissance Journey
                    </h2>
                </div>

                {/* Horizontal Container */}
                <div className="journey-container flex flex-col md:flex-row h-auto md:h-[80vh] items-center px-6 md:px-[10vw] gap-12 md:gap-[20vw] w-full md:w-max">

                    {/* Intro Card */}
                    <div className="reveal-on-mobile journey-card min-w-[85vw] md:min-w-[30vw] flex flex-col justify-center shrink-0 text-center md:text-left">
                        <h2 className="text-7xl md:text-9xl font-heading font-black leading-none mb-6">
                            GROWING<br />
                            <span className="text-luxury-pink">UP.</span>
                        </h2>
                        <p className="text-2xl text-white/60 max-w-lg mb-10">
                            Every stage is a new adventure. Scroll to explore the path your child will take with us.
                        </p>
                        <div className="flex items-center gap-4 text-white/40">
                            <ArrowRight size={32} className="animate-pulse" />
                            <span className="uppercase tracking-widest text-sm">Scroll to Explore</span>
                        </div>
                    </div>

                    {PROGRAMS.map((prog, i) => (
                        <div
                            key={i}
                            className="reveal-on-mobile journey-card relative w-[90vw] md:w-[600px] h-auto md:h-[500px] flex flex-col md:flex-row shrink-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
                            style={{ backgroundColor: prog.bg }}
                        >
                            {/* Content Side */}
                            <div className="md:w-5/12 p-8 md:p-10 flex flex-col justify-between relative z-10 text-white">
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="px-3 py-1 rounded-full border border-white/30 text-xs font-bold uppercase tracking-wider text-white">
                                            {prog.age}
                                        </span>
                                        <div className="h-[1px] flex-grow bg-white/20"></div>
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-white">
                                        {prog.title}
                                    </h3>
                                    <p className="text-base text-white/90 font-medium leading-relaxed">
                                        {prog.desc}
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-white/60 mb-4">Highlights</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {prog.tags.map((tag, idx) => (
                                            <span key={idx} className="px-5 py-2 bg-white/10 backdrop-blur-md rounded-full font-bold text-sm border border-white/20 text-white">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Image Side */}
                            <div className="md:w-7/12 h-64 md:h-full relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent z-10 w-32"></div>
                                <img
                                    src={prog.img}
                                    alt={prog.title}
                                    className="journey-img w-full h-full object-cover"
                                />
                                {/* Overlay Number */}
                                <div className="absolute bottom-6 right-8 text-[12rem] font-black text-white/10 leading-none z-0 select-none">
                                    0{i + 1}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* End Card */}
                    <div className="reveal-on-mobile journey-card min-w-[85vw] md:min-w-[40vw] flex flex-col justify-center items-center text-center shrink-0 pr-0 md:pr-20 pb-20 md:pb-0">
                        <h3 className="text-6xl font-heading font-black mb-8">
                            Ready to<br />Start?
                        </h3>
                        <button
                            onClick={() => setIsAdmissionOpen(true)}
                            className="bg-luxury-pink text-white px-12 py-6 rounded-full text-2xl font-bold hover:scale-110 transition-transform duration-300 shadow-xl"
                        >
                            Enroll Now
                        </button>
                    </div>

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
                        animate={{ x: [0, -2000] }}
                        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                        className="flex gap-8 px-4 group-hover:[animation-play-state:paused]"
                    >
                        {/* Repeat reviews to create seamless loop */}
                        {[...googleReviews.filter(r => r.review.length > 5), ...googleReviews.filter(r => r.review.length > 5)].map((t, i) => {
                            // "Dark Colourful Colours" from palette
                            const cardColors = [
                                "bg-[#0060AA]", // Little Dark Blue
                                "bg-[#5C7E68]", // Como (Green)
                                "bg-[#BA1054]", // Pictorial Carmine
                                "bg-[#131720]", // Lebanese Blue
                                "bg-[#7D5C7E]", // Added a purple variation for variety using mix
                            ];
                            const currColor = cardColors[i % cardColors.length];

                            return (
                                <div key={i} className={`w-[400px] md:w-[500px] ${currColor} p-8 md:p-10 rounded-[2rem] flex-shrink-0 whitespace-normal text-white transition-transform duration-500 cursor-default border border-white/10 flex flex-col justify-between shadow-xl`}>
                                    <div>
                                        <div className="flex gap-1 mb-6">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} size={20} className="fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-lg md:text-xl font-medium leading-relaxed mb-8 line-clamp-4 text-white/90">
                                            "{t.review}"
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl text-white font-bold shadow-md uppercase border border-white/20">
                                            {t.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-white">{t.name}</h4>
                                            <span className="text-xs text-white/60 uppercase tracking-widest font-bold">Verified Parent</span>
                                        </div>
                                        <Quote className="ml-auto text-4xl text-white opacity-20" />
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Big Numbers */}
                <div className="max-w-7xl mx-auto px-6 mt-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-gray-100">
                        {[
                            { num: "50+", label: "Happy Students" },
                            { num: "5+", label: "Expert Mentors" }, // More premium term than teachers
                            { num: "2025", label: "Established" },
                            { num: "100%", label: "Safety Record" },
                        ].map((stat, i) => (
                            <div key={i} className="reveal-text px-4">
                                <h3 className="text-4xl md:text-7xl font-black text-gulf-lebanese mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gulf-lebanese to-gray-400">
                                    {stat.num}
                                </h3>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 6: FAQ --- */}
            <section className="py-24 bg-[#F9F7F2] relative z-10 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-luxury-pink font-bold tracking-widest uppercase text-sm">Got Questions?</span>
                        <h2 className="text-5xl font-heading font-black text-gulf-lebanese mt-4">We Have Answers</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "What is the age criteria for admission?", a: "We welcome children from 1.5 years for Playgroup, 2.5 years for Nursery, 3.5 years for Junior KG, and 4.5 years for Senior KG." },
                            { q: "What is the 'Seven Petals' philosophy?", a: "It is our proprietary holistic curriculum focusing on 7 key areas: Cognitive, Motor Skills, Creativity, Culture, Sports, Social, and Life Skills." },
                            { q: "Is transport facility available?", a: "Yes, we offer safe and comfortable transport facilities covering all major nearby areas with GPS tracking for parents." },
                            { q: "How do I schedule a campus visit?", a: "You can simply fill out the enquiry form by clicking the 'Enroll Now' button, or call our admissions office directly to book a slot." },
                            { q: "What are the safety measures on campus?", a: "Safety is our priority. We have 24/7 CCTV surveillance, security personnel, soft-flooring in play areas, and background-verified staff." }
                        ].map((faq, i) => (
                            <FAQItem key={i} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 7: PREMIUM FOOTER CTA --- */}
            <section className="relative py-32 px-6 overflow-hidden">
                {/* Background with Gradient and Noise */}
                <div className="absolute inset-0 bg-[#0F172A] z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gulf-lebanese via-[#0F172A] to-luxury-pink/20 opacity-80"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

                    {/* Animated Blobs */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-luxury-pink rounded-full mix-blend-screen filter blur-[100px]"
                    ></motion.div>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px]"
                    ></motion.div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-20 overflow-hidden shadow-2xl ring-1 ring-white/20">
                        {/* Decorative 2025 Watermark */}
                        <div className="absolute -top-12 -right-12 text-[15rem] font-black text-white/5 leading-none select-none pointer-events-none rotate-12">
                            2025
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="text-left">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-yellow-300 font-bold tracking-wider text-xs uppercase mb-8"
                                >
                                    <Sparkles size={14} /> Admissions Open
                                </motion.div>
                                <h2 className="text-5xl md:text-7xl font-heading font-black text-white leading-[1.1] mb-6 drop-shadow-lg">
                                    Start Their <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-pink to-indigo-400">
                                        Legacy Today.
                                    </span>
                                </h2>
                                <p className="text-xl text-blue-100/80 font-light leading-relaxed max-w-lg">
                                    Don't just choose a school; choose a future. Limited seats available for the upcoming academic year.
                                </p>
                            </div>

                            <div className="flex flex-col items-center md:items-end justify-center gap-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsAdmissionOpen(true)}
                                    className="group relative w-full md:w-auto overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
                                >
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#500724_50%,#E2E8F0_100%)]" />
                                    <span className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-gulf-lebanese to-gray-900 px-12 py-6 text-xl font-bold text-white transition-all group-hover:bg-gray-900/90 gap-4">
                                        Start Admission <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>

                                <div className="flex items-center gap-6">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3].map((_, i) => (
                                            <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-gray-600 flex items-center justify-center overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="User" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-left text-white/80 text-sm">
                                        <div className="font-bold text-white text-lg">500+</div>
                                        <div>Parents joined recently</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AdmissionModal isOpen={isAdmissionOpen} onClose={() => setIsAdmissionOpen(false)} />
        </div>
    );
};

// --- DATA CONSTANTS ---

const PETAL_DATA = [
    { title: "Faith & Values", emoji: "🤲", desc: "Rooted in Islamic teachings, learning duas, akhlaq, gratitude, and moral discipline.", img: "/otherimp/IndependenceDay_3.jpeg", color: "text-white", bg: "bg-[#1E3A8A]" }, // Dark Blue
    { title: "Play-Based", emoji: "🧸", desc: "Learning through exploration and curiosity to naturally develop skills while having fun.", img: "/SchoolPremises/classplay.jpeg", color: "text-white", bg: "bg-[#831843]" }, // Dark Pink
    { title: "Creativity", emoji: "🎨", desc: "Encouraging art, craft, storytelling, and imagination for confident self-expression.", img: "/otherimp/ChildrensDay_2_copy.jpeg", color: "text-white", bg: "bg-[#065F46]" }, // Dark Emerald
    { title: "Social Growth", emoji: "❤️", desc: "Building teamwork, empathy, and communication to help children feel valued.", img: "/Activities/RedDay_3.jpeg", color: "text-white", bg: "bg-[#581C87]" }, // Dark Purple
    { title: "Intellectual", emoji: "🧠", desc: "Structured fun activities to strengthen logic, language, and problem-solving.", img: "/SchoolPremises/classroom2.jpeg", color: "text-white", bg: "bg-[#7F1D1D]" }, // Dark Red
    { title: "Physical", emoji: "🏃", desc: "Focus on movement, coordination, and healthy habits through active play.", img: "/SportsDay/sportsday1.jpeg", color: "text-white", bg: "bg-[#0F766E]" }, // Dark Teal
    { title: "Care & Safety", emoji: "🛡️", desc: "A nurturing, secure environment with qualified mentors and strong parent connection.", img: "/Activities/Activities_2.jpeg", color: "text-white", bg: "bg-[#C2410C]" }, // Dark Orange
];

const PROGRAMS = [
    {
        title: "Playgroup",
        age: "1.5 - 2.5 Years",
        desc: "A sensory wonderland for our tiniest tots. Montessori-inspired aids meet messy play.",
        bg: "#BE185D", // Pink 700 - Vibrant
        img: "/SchoolPremises/classplay.jpeg",
        tags: ["Sensory Play", "Music", "Safety"]
    },
    {
        title: "Nursery",
        age: "2.5 - 3.5 Years",
        desc: "Stepping stones to literacy. Letters and numbers become friends through stories.",
        bg: "#059669", // Emerald 600 - Vibrant Green
        img: "/Activities/Activities_1.jpeg",
        tags: ["Phonics", "Nature", "Reading"]
    },
    {
        title: "Junior KG",
        age: "3.5 - 4.5 Years",
        desc: "Curiosity takes flight. Science experiments, reading clubs, and logical reasoning.",
        bg: "#D97706", // Amber 600 - Rich Orange/Gold
        img: "/otherimp/Activities_3.jpeg",
        tags: ["Science", "Logic", "Math"]
    },
    {
        title: "Senior KG",
        age: "4.5 - 5.5 Years",
        desc: "Ready for the big world. Advanced concepts, leadership, and school readiness.",
        bg: "#4F46E5", // Indigo 600 - Vibrant Blue/Purple
        img: "/Activities/Activities_4.jpeg",
        tags: ["Writing", "Leadership", "Speaking"]
    }
];



export default Home;
