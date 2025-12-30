import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, Play, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const reelAssets = [
    { id: 'r1', src: '/videos/Independence Day reel.mp4', title: 'Independence Day Bash', color: 'bg-primary-carmine' },
    { id: 'r2', src: '/videos/psycomotorskullreels.mp4', title: 'Building Motor Skills', color: 'bg-gulf-blue' },
    { id: 'r3', src: '/videos/reddayreel.mp4', title: 'Red Day Celebration', color: 'bg-primary-carmine' },
    { id: 'r4', src: '/videos/renaisanecefiestareel.mp4', title: 'The Renaissance Fiesta', color: 'bg-gentle-yellow text-gulf-lebanese' },
    { id: 'r5', src: '/videos/schooltourreel.mp4', title: 'Mini Campus Tour', color: 'bg-gulf-blue' },
    { id: 'r6', src: '/videos/sportsdayreel.mp4', title: 'Sports Day Action', color: 'bg-desert-coral' },
    { id: 'r7', src: '/videos/testimonial_4.mp4', title: 'Parent Love & Trust', color: 'bg-charming-green' },
];

const campusAssets = [
    { id: 'cam1', src: '/SchoolPremises/SchoolPremises_1.jpeg', title: 'Entrance' },
    { id: 'cam2', src: '/SchoolPremises/classplay.jpeg', title: 'Play Area' },
    { id: 'cam3', src: '/SchoolPremises/classroom1.jpeg', title: 'Classroom' },
    { id: 'cam4', src: '/SchoolPremises/classroom2.jpeg', title: 'Learning Space' },
    { id: 'cam5', src: '/SchoolPremises/classroom3.png', title: 'Interactive' },
    { id: 'cam6', src: '/SchoolPremises/playground1.jpeg', title: 'Playground' },
    { id: 'cam9', src: '/SchoolPremises/schoolbuilding.avif', title: 'School Building' },
    { id: 'vid_tour', src: '/videos/SchoolTour.mp4', title: 'Full Tour', type: 'video' }
];

const celebrationAssets = [
    { id: 'cel1', src: '/ChildrensDay/ChildrenDay_2.jpeg', title: 'Smiles' },
    { id: 'cel2', src: '/ChildrensDay/ChildrensDay_1.jpeg', title: 'Joy' },
    { id: 'cel3', src: '/IndependenceDay/IndependenceDay_1.jpeg', title: 'March Past' },
    { id: 'cel4', src: '/IndependenceDay/IndependenceDay_2.jpeg', title: 'Flag Hoisting' },
    { id: 'cel6', src: '/RedDay/REDDAY6.png', title: 'Red Day' },
    { id: 'cel7', src: '/RedDay/RedDay_1.jpeg', title: 'Red Learning' },
    { id: 'vid_indep', src: '/videos/indepencedneday activity.mp4', title: 'Independence Act', type: 'video' }
];

const activityAssets = [
    { id: 'act1', src: '/Activities/0.1.jpeg', title: 'Arts' },
    { id: 'act2', src: '/Activities/Activities_1.jpeg', title: 'Science' },
    { id: 'act4', src: '/Activities/motor.jpeg', title: 'Motor Skills' },
    { id: 'vid_shapes', src: '/videos/Shapes exercise Activity.mp4', title: 'Shapes', type: 'video' },
    { id: 'vid_group', src: '/videos/groupequiliactivity.mp4', title: 'Group Balance', type: 'video' },
    { id: 'vid_alpha', src: '/videos/Find the alphabets activity.mp4', title: 'Alphabets', type: 'video' }
];

const communityAssets = [
    { id: 'com1', src: '/PTM/PTM_3.jpeg', title: 'Parents' },
    { id: 'com2', src: '/PTM/PTM_5.jpeg', title: 'Open House' },
    { id: 'spo1', src: '/SportsDay/sportdaymedal.jpeg', title: 'Medals' },
    { id: 'spo2', src: '/SportsDay/sportsday1.jpeg', title: 'Racing' },
];

// --- Sub-Components ---

const SectionHeader = ({ title, subtitle, color = "text-slate-900", className = "" }) => {
    const el = useRef();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".split-text",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el.current,
                        start: "top 80%",
                    }
                }
            );
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={el} className={`mb-12 md:mb-20 px-6 ${className}`}>
            <h3 className={`text-sm font-bold uppercase tracking-[0.2em] mb-3 ${color} opacity-60 split-text`}>{subtitle}</h3>
            <h2 className={`text-4xl md:text-6xl font-black ${color} split-text`}>{title}</h2>
        </div>
    );
};

const MediaCard = ({ item, onClick, className }) => {
    const videoRef = useRef(null);
    const [hover, setHover] = useState(false);

    return (
        <div
            className={`relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer group ${className}`}
            onClick={onClick}
            onMouseEnter={() => {
                setHover(true);
                videoRef.current?.play().catch(() => { });
            }}
            onMouseLeave={() => {
                setHover(false);
                videoRef.current?.pause();
            }}
        >
            {item.type === 'video' ? (
                <>
                    <video
                        ref={videoRef}
                        src={item.src}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        muted loop playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/40">
                            <PlayCircle className="text-white w-8 h-8" />
                        </div>
                    </div>
                </>
            ) : (
                <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
            )}

            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold">{item.title}</p>
            </div>
        </div>
    );
};

// --- Gallery Page ---

const Gallery = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const campusRef = useRef(null);
    const celebRef = useRef(null);
    const learningRef = useRef(null);
    const trackRef = useRef(null);

    const mergedLearningAssets = [...activityAssets, ...communityAssets];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Hero Parallax
            gsap.to(".hero-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Horizontal Scroll for Reels
            // (Standard CSS scroll snap used for reels, but we can animate entrance)
            gsap.from(".reel-card", {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".reels-section",
                    start: "top 80%",
                }
            });

            // Campus Grid Reveal
            gsap.from(".campus-item", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: campusRef.current,
                    start: "top 70%",
                }
            });

            // Celebration Horizontal Scroll Effect (Simulated)
            const sections = gsap.utils.toArray(".celeb-item");
            gsap.from(sections, {
                x: 100,
                opacity: 0,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: celebRef.current,
                    start: "top 75%",
                }
            });

            // Learning & Fun Horizontal Pin Scroll
            if (trackRef.current) {
                const scrollWidth = trackRef.current.scrollWidth;
                const windowWidth = window.innerWidth;
                const xTo = -1 * (scrollWidth - windowWidth);

                // Only enable pinning on larger screens where horizontal scroll makes sense
                if (windowWidth > 768) {
                    gsap.to(trackRef.current, {
                        x: xTo,
                        ease: "none",
                        scrollTrigger: {
                            trigger: learningRef.current,
                            start: "center center",
                            end: () => "+=" + scrollWidth,
                            pin: true,
                            scrub: 1,
                            anticipatePin: 1,
                        }
                    });
                }
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white pb-32">

            {/* 1. Hero Section */}
            {/* 1. Hero Section */}
            <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="hero-bg absolute inset-0 z-0">
                    <img
                        src="/assets/gallery_hero.png"
                        alt="Indian Preschool Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
                            GALLERY
                        </h1>
                        <p className="text-xl md:text-3xl font-light text-slate-100 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                            A curated collection of moments that define the Renaissance experience.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                            className="bg-white/10 backdrop-blur-md text-white border border-white/40 px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-white hover:text-slate-900 transition-all shadow-xl"
                        >
                            Explore <ArrowDown size={18} />
                        </motion.button>
                    </motion.div>
                </div>
            </div>


            {/* 2. Featured Reels (Stories) */}
            {/* 2. Featured Reels (Stories) */}
            <div className="reels-section max-w-[1920px] mx-auto mb-32 mt-10 relative z-20 pl-6 md:pl-12">
                <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x no-scrollbar pr-6">
                    {reelAssets.map((item, i) => (
                        <div key={item.id} className="reel-card snap-center shrink-0">
                            <div
                                className="w-[180px] h-[320px] sm:w-[240px] sm:h-[420px] rounded-2xl overflow-hidden relative cursor-pointer group shadow-xl border-4 border-white transition-transform hover:-translate-y-2"
                                onClick={() => setSelectedItem({ ...item, type: 'video' })}
                            >
                                <video src={item.src} className="w-full h-full object-cover" muted loop />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
                                    <Play size={16} className="text-white" fill="white" />
                                </div>
                                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Campus Life (Grid) */}
            <div ref={campusRef} className="max-w-7xl mx-auto px-6 mb-32">
                <SectionHeader title="Campus Life" subtitle="Where we grow" />
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[650px]">
                    {/* Custom Mosaic */}
                    <MediaCard item={campusAssets[7]} className="campus-item md:col-span-2 md:row-span-2 min-h-[300px] border-4 border-black shadow-lg" onClick={() => setSelectedItem(campusAssets[7])} />
                    <MediaCard item={campusAssets[0]} className="campus-item min-h-[200px] border-4 border-black shadow-sm" onClick={() => setSelectedItem(campusAssets[0])} />
                    <MediaCard item={campusAssets[1]} className="campus-item min-h-[200px] border-4 border-black shadow-sm" onClick={() => setSelectedItem(campusAssets[1])} />
                    <MediaCard item={campusAssets[2]} className="campus-item md:col-span-2 min-h-[200px] border-4 border-black shadow-sm" onClick={() => setSelectedItem(campusAssets[2])} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {campusAssets.slice(3, 7).map((item) => (
                        <MediaCard key={item.id} item={item} className="campus-item h-[200px] md:h-[250px] border-4 border-black shadow-sm" onClick={() => setSelectedItem(item)} />
                    ))}
                </div>
            </div>

            {/* 4. Celebrations (Horizontal Focus) */}
            <div ref={celebRef} className="bg-slate-900 py-32 text-slate-100 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <SectionHeader title="Celebrations" subtitle="Moments of Joy" color="text-white" />

                    <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-8 justify-center md:overflow-x-visible">
                        {celebrationAssets.slice(0, 5).map((item, i) => (
                            <motion.div
                                className="celeb-item w-full md:w-1/3 xl:w-1/5 aspect-[3/4] rounded-xl overflow-hidden relative cursor-pointer group shadow-2xl shadow-rose-900/20 border-4 border-white"
                                whileHover={{ y: -20, rotate: i % 2 === 0 ? 2 : -2 }}
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                            >
                                <img src={item.src} className="w-full h-full object-cover" alt={item.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <h4 className="font-bold text-xl">{item.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[150px] pointer-events-none" />
            </div>

            {/* 5. Learning & Fun (Side-Scroll Pin) */}
            <div ref={learningRef} className="py-20 md:py-0 md:h-[100vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-white to-slate-100 relative mb-20 section-learning">
                <div className="max-w-7xl mx-auto w-full px-6 absolute top-20 md:top-auto md:relative md:mb-12 z-10 pointer-events-none">
                    <SectionHeader title="Learning & Fun" subtitle="Everyday Adventure" className="!mb-0" />
                </div>

                <div ref={trackRef} className="flex gap-8 md:gap-12 px-6 md:px-20 mt-12 md:mt-0 overflow-x-auto md:overflow-visible no-scrollbar w-full md:w-max">
                    {mergedLearningAssets.map((item, index) => (
                        <div
                            key={item.id}
                            className={`relative shrink-0 w-[80vw] md:w-[600px] aspect-video md:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group border-4 border-black ${index % 2 === 0 ? 'md:rotate-1' : 'md:-rotate-1'}`}
                            onClick={() => setSelectedItem(item)}
                        >
                            <MediaCard item={item} className="w-full h-full transition-transform duration-700 hover:scale-105" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        <button className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20">
                            <X size={32} />
                        </button>
                        <div
                            className="w-full max-w-6xl max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedItem.type === 'video' ? (
                                <video src={selectedItem.src} controls autoPlay className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" />
                            ) : (
                                <motion.img
                                    initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                                    src={selectedItem.src}
                                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                />
                            )}
                            <h3 className="text-white text-2xl font-bold mt-6">{selectedItem.title}</h3>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default Gallery;
