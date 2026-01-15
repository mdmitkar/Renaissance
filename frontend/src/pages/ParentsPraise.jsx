import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Heart, Shield, Home, Play, Users, X, PlayCircle, Maximize2, ChevronRight, ChevronLeft } from 'lucide-react';
import { googleReviews } from '../data/reviews';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

// --- 1. CONSOLIDATED ASSET DATA ---
// We found these in your folders during analysis.
const TESTIMONIAL_VIDEOS = [
    { id: 'v1', src: '/videos/Testimonial_1.mp4', title: 'Parent Experience', type: 'video' },
    { id: 'v2', src: '/videos/Testimonial_2.mp4', title: 'Why We Choose Renaissance', type: 'video' },
    { id: 'v3', src: '/videos/Testimonial_3.mp4', title: 'Child Growth', type: 'video' },
    { id: 'v4', src: '/videos/testimonial_4.mp4', title: 'Happy Parents', type: 'video' },
    { id: 'nt5', src: '/New/New Testimonials/newtest5.mp4', title: 'Amazing Teachers', type: 'video' },

    { id: 'nt7', src: '/New/New Testimonials/newtest7.mp4', title: 'Best Decision', type: 'video' },
    { id: 'nt8', src: '/New/New Testimonials/newtest8.mp4', title: 'Holistic Growth', type: 'video' },
    { id: 'nt9', src: '/New/New Testimonials/newtest9.mp4', title: 'Creativity', type: 'video' },
    { id: 'nt10', src: '/New/New Testimonials/newtest10.mp4', title: 'Confidence', type: 'video' },
    { id: 'nt11', src: '/New/New Testimonials/newtest11.mp4', title: 'Activities', type: 'video' },
    { id: 'nt12', src: '/New/New Testimonials/newtest12.mp4', title: 'Recommendations', type: 'video' },
];

const TESTIMONIAL_IMAGES = [
    { id: 'img1', src: '/New/New Testimonials/newtest1.jpeg', title: 'Smiles', type: 'image' },
    { id: 'img2', src: '/New/New Testimonials/newtest2.jpeg', title: 'Joy', type: 'image' },
    { id: 'img3', src: '/New/New Testimonials/newtest3.jpeg', title: 'School', type: 'image' },
    // Removed duplicate newtest4 and newtest8
    { id: 'img5', src: '/New/New Testimonials/newtest5.jpeg', title: 'Learning', type: 'image' },
    { id: 'img6', src: '/New/New Testimonials/newtest6.jpeg', title: 'Friends', type: 'image' },
    { id: 'img7', src: '/New/New Testimonials/newtest7.jpeg', title: 'Growth', type: 'image' },
    { id: 'img9', src: '/New/New Testimonials/newtest9.jpeg', title: 'Creativity', type: 'image' },
    { id: 'img14', src: '/New/New Testimonials/newtest14.jpeg', title: 'Play', type: 'image' },
];

const NEW_IMAGE_REVIEWS = [
    '/assets/testi/review_1.jpeg',
    '/assets/testi/review_2.jpeg',
    '/assets/testi/review_3.jpeg',
    '/assets/testi/review_4.jpeg',
    '/assets/testi/review_5.jpeg',
    '/assets/testi/review_7.jpeg', // Removed review_6 (duplicate)
    '/assets/testi/review_8.jpeg',
    '/assets/testi/review_10.jpeg',
];

const CARD_COLORS = [
    'bg-[#FDE047]', // Yellow
    'bg-[#A5B4FC]', // Blue
    'bg-[#BE185D]', // Magenta/Dark Pink
    'bg-[#EA580C]', // Orange
    'bg-[#06B6D4]', // Cyan
];

// --- 2. COMPONENTS ---

const ReviewImageCard = ({ src, index, onMaximize }) => {
    const colorClass = CARD_COLORS[index % CARD_COLORS.length];

    // Determine text color for contrast (Yellow requires dark text, others white)
    const isYellow = index % 5 === 0;
    const contentColor = isYellow ? 'text-slate-900' : 'text-white';

    return (
        <div
            onClick={onMaximize}
            className={`relative ${colorClass} rounded-[1rem] p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] flex flex-col items-center text-center h-full overflow-hidden cursor-pointer`}
        >

            {/* Header: Fancy Italic Serif */}
            <div className={`mb-6 flex flex-col items-center leading-tight ${contentColor} relative z-10`}>
                <h3 className="font-heading italic text-2xl md:text-3xl">Renaissance</h3>
                <h3 className="font-heading italic text-2xl md:text-3xl">Preschool</h3>
            </div>

            {/* Quote Icon Top-Left */}
            <div className="absolute top-12 left-2 z-0 opacity-90">
                <Quote size={64} className={`text-black fill-current rotate-180`} />
            </div>

            {/* Inner Image Container with Unique Curve */}
            {/* rounded-tr-[5rem] matches the 'Frame 36' specific large curve */}
            <div className="relative w-full bg-[#F5F6F8] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-[5rem] overflow-hidden shadow-sm aspect-square z-10 flex items-center justify-center p-0 group">
                <img
                    src={src}
                    alt="Parent Review"
                    className="w-full h-full object-contain"
                    loading="lazy"
                />

                {/* Maximize Button Overlay */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onMaximize();
                    }}
                    className="absolute bottom-3 right-3 bg-white/90 p-2 rounded-full shadow-lg text-slate-900 hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-50 cursor-pointer"
                    title="Maximize Image"
                >
                    <Maximize2 size={20} />
                </button>
            </div>

            {/* Logo Badge - Positioned to overlap right edge */}
            <div className="absolute top-[22%] -right-0 z-20 w-16 h-16 rounded-full bg-white p-1 shadow-lg border-2 border-slate-100 flex items-center justify-center">
                <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>

            {/* Quote Icon Bottom-Right */}
            <div className="absolute bottom-12 right-2 z-20 opacity-90">
                <Quote size={64} className={`text-black fill-current`} />
            </div>

            {/* Footer: Simple Sans-Serif */}
            <div className={`mt-auto pt-6 ${contentColor} relative z-10`}>
                <h4 className="font-body text-xl md:text-2xl font-medium tracking-wide">Parents Praise</h4>
            </div>
        </div>
    );
};

const MediaCard = ({ item, onClick, className }) => {
    const videoRef = useRef(null);
    const [hover, setHover] = useState(false);

    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#1a1a1a] cursor-pointer group shadow-lg border border-black/5 dark:border-white/10 ${className}`}
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
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity bg-black/20">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/40">
                            <PlayCircle className="text-white w-8 h-8 md:w-10 md:h-10" />
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

            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold tracking-wide">{item.title}</p>
            </div>
        </div>
    );
};

// --- 3. MAIN PAGE ---

const ParentsPraise = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const containerRef = useRef(null);
    const sceneRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!sceneRef.current) return;
        const { clientX, clientY } = e;
        // Subtle tilt
        const xPos = (clientX / window.innerWidth - 0.5) * 5; // Max 2.5deg tilt
        const yPos = (clientY / window.innerHeight - 0.5) * 5;

        gsap.to(sceneRef.current, {
            rotateY: xPos,
            rotateX: -yPos,
            duration: 2,
            ease: "power2.out"
        });
    };

    // GSAP Animations
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".anim-video-card", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: "#video-grid",
                    start: "top 80%"
                }
            });

            // --- SOFT CLOUD HERO ANIMATIONS ---
            const floatingElements = document.querySelectorAll('.soft-float-item');

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

            // 3. Continuous Bobbing (Cloud Effect)
            floatingElements.forEach((el, i) => {
                const delay = Math.random() * 2;
                gsap.to(el, {
                    y: "random(-20, 20)",
                    x: "random(-10, 10)",
                    rotation: "random(-5, 5)",
                    duration: "random(3, 6)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: delay
                });
            });

            // Hero Text Entrance
            gsap.from(".hero-text-anim", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Keyboard Navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedItem) return;
            const allMedia = [
                ...TESTIMONIAL_VIDEOS,
                ...TESTIMONIAL_IMAGES,
                ...NEW_IMAGE_REVIEWS.map((src, i) => ({ type: 'image', src, title: 'Happy Moment', id: `new-img-${i}` }))
            ];
            const currentIndex = allMedia.findIndex(m => (m.id && m.id === selectedItem.id) || m.src === selectedItem.src);

            if (e.key === 'ArrowRight') {
                const nextIndex = (currentIndex + 1) % allMedia.length;
                setSelectedItem(allMedia[nextIndex]);
            } else if (e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + allMedia.length) % allMedia.length;
                setSelectedItem(allMedia[prevIndex]);
            } else if (e.key === 'Escape') {
                setSelectedItem(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem]);

    return (
        <div ref={containerRef} className="min-h-screen bg-rose-50/30 dark:bg-black font-body text-slate-800 dark:text-gray-200 transition-colors duration-500 pb-32">

            {/* --- HERO SECTION: SOFT 3D CLOUD --- */}
            <section
                onMouseMove={handleMouseMove}
                className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden [perspective:1000px] bg-gradient-to-br from-rose-50 via-white to-sky-50 dark:from-slate-900 dark:via-black dark:to-slate-900 transition-colors duration-500"
            >
                {/* 3D Scene Container */}
                <div ref={sceneRef} className="relative w-full h-full max-w-[1400px] flex items-center justify-center [transform-style:preserve-3d]">

                    {/* --- Floating Testimonial Cards (Cloud Ring) --- */}
                    {/* Positioned absolutely around the center */}

                    {/* Top Left */}
                    <div className="soft-float-item absolute top-[15%] left-[10%] md:left-[15%] w-40 md:w-56 z-10 hidden md:block">
                        <div className="bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-xl border border-rose-100 dark:border-white/10 rotate-[-6deg]">
                            <img src={TESTIMONIAL_IMAGES[0].src} className="rounded-xl w-full h-auto" alt="Happy" />
                        </div>
                    </div>

                    {/* Top Right */}
                    <div className="soft-float-item absolute top-[20%] right-[5%] md:right-[15%] w-36 md:w-48 z-10 hidden md:block">
                        <div className="bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-xl border border-sky-100 dark:border-white/10 rotate-[4deg]">
                            <img src={TESTIMONIAL_IMAGES[1].src} className="rounded-xl w-full h-auto" alt="Joy" />
                        </div>
                    </div>

                    {/* Bottom Left */}
                    <div className="soft-float-item absolute bottom-[20%] left-[5%] md:left-[12%] w-36 md:w-52 z-10 hidden md:block">
                        <div className="bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-xl border border-yellow-100 dark:border-white/10 rotate-[6deg]">
                            <div className="p-4 text-center">
                                <p className="text-sm font-heading font-bold text-slate-700 dark:text-gray-300">"Simply amazing!"</p>
                                <div className="flex justify-center mt-2 gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400" /><Star size={12} className="fill-yellow-400 text-yellow-400" /><Star size={12} className="fill-yellow-400 text-yellow-400" /></div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Right */}
                    <div className="soft-float-item absolute bottom-[15%] right-[10%] md:right-[12%] w-40 md:w-60 z-10 hidden md:block">
                        <div className="bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-xl border border-rose-100 dark:border-white/10 rotate-[-3deg]">
                            <img src={TESTIMONIAL_IMAGES[2].src} className="rounded-xl w-full h-auto" alt="Smile" />
                        </div>
                    </div>

                    {/* --- Floating Icons/Particles --- */}
                    <div className="soft-float-item absolute top-[10%] right-[30%] text-rose-300 opacity-60"><Heart size={48} fill="currentColor" /></div>
                    <div className="soft-float-item absolute bottom-[25%] left-[25%] text-sky-300 opacity-60"><Star size={32} fill="currentColor" /></div>
                    <div className="soft-float-item absolute top-[40%] left-[8%] text-yellow-300 opacity-50"><div className="w-16 h-16 rounded-full bg-current blur-xl"></div></div>
                    <div className="soft-float-item absolute bottom-[10%] right-[35%] text-rose-200 opacity-40"><Heart size={64} fill="currentColor" /></div>


                    {/* --- CENTRAL CONTENT (Foreground) --- */}
                    <div className="relative z-30 text-center px-6 max-w-3xl [transform:translateZ(40px)]">
                        <div className="hero-text-anim inline-block mb-6">
                            <div className="px-6 py-2 rounded-full bg-rose-100/50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 font-bold tracking-widest uppercase text-xs md:text-sm backdrop-blur-sm border border-rose-200/50">
                                ❤️ 150+ Happy Families
                            </div>
                        </div>

                        <h1 className="hero-text-anim text-5xl md:text-7xl lg:text-8xl font-heading font-black text-slate-900 dark:text-white mb-8 leading-tight drop-shadow-sm">
                            What Parents <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">Love</span> About Us
                        </h1>

                        <p className="hero-text-anim text-lg md:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                            A safe haven where confidence grows, smiles bloom, and every child feels at home.
                        </p>

                        <div className="hero-text-anim">
                            <button
                                onClick={() => document.getElementById('video-grid')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold shadow-2xl hover:scale-105 hover:shadow-rose-500/20 transition-all duration-300 flex items-center gap-3 mx-auto"
                            >
                                <PlayCircle size={20} className="fill-current" /> Hear Their Stories
                            </button>
                        </div>
                    </div>
                </div>

                {/* Soft Gradient Overlay at Bottom */}
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-20"></div>
            </section>

            {/* --- TRUST STATS --- */}
            <section className="py-12 border-y border-rose-200/50 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-8">
                    {[
                        { label: "Families", val: "150+" },
                        { label: "Rating", val: "4.9/5" },
                        { label: "Smiles", val: "∞" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-1">{stat.val}</h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-rose-500 opacity-80">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- VIDEO GALLERY (Wall of Fame) --- */}
            <section id="video-grid" className="py-24 px-6 max-w-[1920px] mx-auto">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900 dark:text-white mb-4">Voices of Renaissance</h2>
                    <p className="text-slate-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">Click any video to hear their story.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {TESTIMONIAL_VIDEOS.map((video, idx) => (
                        <div key={video.id} className="anim-video-card aspect-[9/16]">
                            <MediaCard
                                item={video}
                                className="w-full h-full shadow-2xl hover:shadow-rose-500/20"
                                onClick={() => setSelectedItem(video)}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* --- PHOTO MOMENTS --- */}
            <section className="py-24 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-rose-500"></div>
                        <h2 className="text-3xl font-heading font-black uppercase tracking-widest">Happy Moments</h2>
                        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-rose-500"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-auto"> {/* Changed to col-4 to accommodate cards better */}
                        {TESTIMONIAL_IMAGES.map((img, idx) => (
                            <div key={img.id} className="w-full">
                                <ReviewImageCard src={img.src} index={idx} onMaximize={() => setSelectedItem(img)} />
                            </div>
                        ))}
                        {NEW_IMAGE_REVIEWS.map((src, idx) => (
                            <div key={`img-review-happy-${idx}`} className="w-full">
                                <ReviewImageCard
                                    src={src}
                                    index={idx}
                                    onMaximize={() => setSelectedItem({ type: 'image', src, title: 'Happy Moment', id: `new-img-${idx}` })}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- ALL REVIEWS (Masonry) --- */}
            <section id="review-grid" className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-rose-500 font-bold tracking-widest uppercase text-sm">Every Word Matters</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900 dark:text-white mt-2">Wall of Love</h2>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {googleReviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="anim-review-card bg-white dark:bg-[#1a1a1a] p-8 rounded-[2rem] shadow-lg border border-slate-100 dark:border-white/5 break-inside-avoid hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="flex gap-1 mb-4 opacity-80">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className={`fill-yellow-400 text-yellow-400 ${i >= review.rating ? 'opacity-30' : ''}`} />
                                ))}
                            </div>

                            {review.review ? (
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-6 relative z-10 text-[0.95rem]">
                                    "{review.review}"
                                </p>
                            ) : (
                                <p className="text-slate-400 italic mb-6 text-sm">Rated 5 stars</p>
                            )}

                            <div className="flex items-center gap-3 pt-4 border-t border-slate-50 dark:border-white/5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-xs uppercase">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-xs md:text-sm">{review.name}</h4>
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">{review.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="pb-24 text-center">
                <a href="/admission" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-12 py-5 rounded-full font-bold text-xl transition-transform hover:scale-105 shadow-2xl hover:shadow-rose-500/50">
                    Be Part of Our Story
                </a>
            </section>

            {/* --- LIGHTBOX OVERLAY (Gallery Style) --- */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        <button className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors z-50">
                            <X size={24} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-all hover:scale-110 z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                const allMedia = [
                                    ...TESTIMONIAL_VIDEOS,
                                    ...TESTIMONIAL_IMAGES,
                                    ...NEW_IMAGE_REVIEWS.map((src, i) => ({ type: 'image', src, title: 'Happy Moment', id: `new-img-${i}` }))
                                ];
                                const currentIndex = allMedia.findIndex(m => (m.id && m.id === selectedItem.id) || m.src === selectedItem.src);
                                const prevIndex = (currentIndex - 1 + allMedia.length) % allMedia.length;
                                setSelectedItem(allMedia[prevIndex]);
                            }}
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-all hover:scale-110 z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                const allMedia = [
                                    ...TESTIMONIAL_VIDEOS,
                                    ...TESTIMONIAL_IMAGES,
                                    ...NEW_IMAGE_REVIEWS.map((src, i) => ({ type: 'image', src, title: 'Happy Moment', id: `new-img-${i}` }))
                                ];
                                const currentIndex = allMedia.findIndex(m => (m.id && m.id === selectedItem.id) || m.src === selectedItem.src);
                                const nextIndex = (currentIndex + 1) % allMedia.length;
                                setSelectedItem(allMedia[nextIndex]);
                            }}
                        >
                            <ChevronRight size={32} />
                        </button>

                        <div
                            className="w-full max-w-full px-4 max-h-[95vh] flex flex-col items-center justify-center relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                key={selectedItem.src || selectedItem.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="w-full flex flex-col items-center justify-center"
                            >
                                {selectedItem.type === 'video' ? (
                                    <div className="relative w-full max-w-6xl aspect-video md:aspect-auto md:h-[80vh]">
                                        <video
                                            src={selectedItem.src}
                                            controls
                                            autoPlay
                                            className="w-full h-full object-contain rounded-lg shadow-2xl"
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={selectedItem.src}
                                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                                        alt={selectedItem.title}
                                    />
                                )}
                                <h3 className="text-white text-xl md:text-2xl font-bold mt-6 tracking-wide text-center">{selectedItem.title}</h3>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default ParentsPraise;
