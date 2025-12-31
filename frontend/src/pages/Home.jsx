import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Sparkles, Cloud, Quote, Rocket, Flower2, Star } from 'lucide-react';
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
                    end: "+=1800",
                    scrub: 1,
                    snap: {
                        snapTo: 1 / (totalCards - 1),
                        duration: { min: 0.2, max: 0.5 },
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
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: -3 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="inline-block bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold text-lg mb-10 border border-white/20 shadow-2xl"
                        >
                            ✨ Est. 2025 • The Future of Learning
                        </motion.div>

                        <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-heading font-black text-white leading-none drop-shadow-2xl mb-6 tracking-tighter w-full max-w-[100vw]">
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
                        <h2 className="text-5xl md:text-8xl font-heading font-black text-gulf-lebanese relative z-10 drop-shadow-sm">
                            The Seven <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-pink to-purple-500 italic">Petals</span>
                        </h2>
                    </div>

                    <div className="relative w-full h-[60vh] flex items-center justify-center">
                        {PETAL_DATA.map((petal, index) => (
                            <div
                                key={index}
                                className={`reveal-on-mobile petal-card relative md:absolute w-full md:w-[800px] h-auto md:h-[500px] ${petal.bg} p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-xl md:shadow-2xl border border-white/50 flex flex-col md:flex-row gap-10 items-center justify-between overflow-hidden mb-10 md:mb-0`}
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
                                    <img src={petal.img} alt={petal.title} className="w-full h-full object-cover transform scale-110" />
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
                            className="reveal-on-mobile journey-card relative w-[90vw] md:w-[60vw] h-auto md:h-[70vh] flex flex-col md:flex-row shrink-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
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
    { title: "Cognitive", emoji: "🧠", desc: "Building strong mental foundations through puzzles and logic.", img: "/SchoolPremises/classroom2.jpeg", color: "text-white", bg: "bg-[#1E3A8A]" }, // Dark Blue
    { title: "Motor Skills", emoji: "🤸", desc: "Fine and gross motor development with active play.", img: "/Activities/motor.jpeg", color: "text-white", bg: "bg-[#831843]" }, // Dark Pink
    { title: "Creativity", emoji: "🎨", desc: "Expressing imagination through art, music, and dance.", img: "/Activities/Activities_1.jpeg", color: "text-white", bg: "bg-[#065F46]" }, // Dark Emerald
    { title: "Culture", emoji: "🌏", desc: "Understanding our world, traditions, and values.", img: "/otherimp/IndependenceDay_3.jpeg", color: "text-white", bg: "bg-[#581C87]" }, // Dark Purple
    { title: "Sports", emoji: "🏆", desc: "Teamwork, discipline, and physical health.", img: "/SportsDay/sportsday1.jpeg", color: "text-white", bg: "bg-[#7F1D1D]" }, // Dark Red
    { title: "Social", emoji: "🤝", desc: "Making friends, sharing, and emotional intelligence.", img: "/Activities/RedDay_3.jpeg", color: "text-white", bg: "bg-[#0F766E]" }, // Dark Teal
    { title: "Life Skills", emoji: "🌱", desc: "Practical skills for independent living and hygiene.", img: "/Activities/Activities_2.jpeg", color: "text-white", bg: "bg-[#C2410C]" }, // Dark Orange
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
