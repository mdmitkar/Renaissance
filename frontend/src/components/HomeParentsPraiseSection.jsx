import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Maximize2, X, ChevronRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- DATA CONSTANTS (Expanded from ParentsPraise.jsx) ---
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
    { id: 'new_video_1', src: '/New/New Testimonials/testxx.mp4', title: 'Parent Testimonial', type: 'video' },
];

const TESTIMONIAL_IMAGES = [
    { id: 'img1', src: '/New/New Testimonials/newtest1.jpeg', title: 'Smiles', type: 'image' },
    { id: 'img2', src: '/New/New Testimonials/newtest2.jpeg', title: 'Joy', type: 'image' },
    { id: 'img3', src: '/New/New Testimonials/newtest3.jpeg', title: 'School', type: 'image' },
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
    '/assets/testi/review_7.jpeg',
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

// --- SUB-COMPONENTS ---

const ReviewImageCard = ({ src, index, onMaximize }) => {
    const colorClass = CARD_COLORS[index % CARD_COLORS.length];
    const isYellow = index % 5 === 0;
    const contentColor = isYellow ? 'text-slate-900' : 'text-white';

    return (
        <div
            onClick={onMaximize}
            className={`relative ${colorClass} rounded-[1rem] p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] flex flex-col items-center text-center h-full overflow-hidden cursor-pointer group min-h-[350px]`}
        >
            {/* Header: Fancy Italic Serif */}
            <div className={`mb-4 flex flex-col items-center leading-tight ${contentColor} relative z-10`}>
                <h3 className="font-english text-2xl md:text-3xl">Renaissance</h3>
                <h3 className="font-heading italic text-xl md:text-2xl">Preschool</h3>
            </div>

            {/* Inner Image Container */}
            <div className="relative w-full flex-grow bg-[#F5F6F8] rounded-tl-xl rounded-bl-xl rounded-br-xl rounded-tr-[3rem] overflow-hidden shadow-sm aspect-square z-10 flex items-center justify-center p-0">
                <img src={src} alt="Parent Review" className="w-full h-full object-contain" loading="lazy" />
                <button
                    onClick={(e) => { e.stopPropagation(); onMaximize(); }}
                    className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-full shadow-lg text-slate-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-50"
                >
                    <Maximize2 size={16} />
                </button>
            </div>

            {/* Logo Badge */}
            <div className="absolute top-[20%] -right-2 z-20 w-12 h-12 rounded-full bg-white p-1 shadow-lg border-2 border-slate-100 hidden md:flex items-center justify-center">
                <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>

            <div className={`mt-4 pt-2 ${contentColor} relative z-10`}>
                <h4 className="font-body text-lg font-medium tracking-wide">Parent's Praise</h4>
            </div>
        </div>
    );
};

const MediaCard = ({ item, onClick, className = "" }) => {
    const videoRef = useRef(null);
    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#1a1a1a] cursor-pointer group shadow-lg border border-black/5 dark:border-white/10 ${className}`}
            onClick={onClick}
            onMouseEnter={() => videoRef.current?.play().catch(() => { })}
            onMouseLeave={() => videoRef.current?.pause()}
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
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/40">
                            <PlayCircle className="text-white w-8 h-8" />
                        </div>
                    </div>
                </>
            ) : (
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            )}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-sm tracking-wide">{item.title}</p>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

const HomeParentsPraiseSection = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <section className="py-20 bg-white dark:bg-[#111] overflow-hidden relative transition-colors duration-300">
            {/* Soft Background Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FDFBF7] dark:from-[#111] to-transparent z-10"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-20">

                {/* 1. Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1 rounded-full bg-luxury-pink/10 text-luxury-pink font-bold text-xs uppercase tracking-widest mb-4"
                    >
                        Voices of Parents - RENAISSANCE
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-heading font-black text-gulf-lebanese dark:text-white mb-6"
                    >
                        Parent's Praise
                    </motion.h2>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                        Real stories. Real smiles. See why families choose us.
                    </p>
                </div>



                {/* 3. EXPANDED Video Stories */}
                <div className="mb-24">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-heading font-bold text-slate-800 dark:text-white">Video Stories</h3>
                        <Link to="/reviews#video-grid" className="text-luxury-pink font-bold text-sm tracking-wide hover:underline">View All →</Link>
                    </div>
                    {/* Grid showing MORE videos (top 8) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TESTIMONIAL_VIDEOS.slice(0, 8).map((video) => (
                            <div key={video.id} className="aspect-[9/16] rounded-2xl overflow-hidden shadow-lg">
                                <MediaCard item={video} className="w-full h-full" onClick={() => setSelectedItem(video)} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. EXPANDED Happy Moments (The Colorful Cards) */}
                <div className="mb-24">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-heading font-bold text-slate-800 dark:text-white">Parents Praise Gallery</h3>
                        <Link to="/reviews" className="text-luxury-pink font-bold text-sm tracking-wide hover:underline">View All Gallery →</Link>
                    </div>
                    {/* Grid showing MORE colorful cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* 1. The Standard Image Testimonials */}
                        {TESTIMONIAL_IMAGES.map((img, idx) => (
                            <div key={img.id} className="w-full">
                                <ReviewImageCard src={img.src} index={idx} onMaximize={() => setSelectedItem(img)} />
                            </div>
                        ))}
                        {/* 2. The New Image Reviews */}
                        {NEW_IMAGE_REVIEWS.map((src, idx) => (
                            <div key={`nir-${idx}`} className="w-full">
                                <ReviewImageCard
                                    src={src}
                                    index={idx + TESTIMONIAL_IMAGES.length}
                                    onMaximize={() => setSelectedItem({ type: 'image', src, title: 'Parent Review', id: `nir-${idx}` })}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. CTA Button (No Marquee/Grid, just button) */}
                <div className="text-center mt-12 pb-12">
                    <p className="text-gray-500 mb-4 font-medium">Want to see what everyone is saying?</p>
                    <Link to="/reviews" className="inline-flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white hover:text-luxury-pink transition-colors border-b-2 border-transparent hover:border-luxury-pink pb-1">
                        Read All Reviews <ChevronRight size={20} />
                    </Link>
                </div>

            </div>

            {/* LIGHTBOX OVERLAY */}
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
                        <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            {selectedItem.type === 'video' ? (
                                <video src={selectedItem.src} controls autoPlay className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" />
                            ) : (
                                <img src={selectedItem.src} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" alt={selectedItem.title} />
                            )}
                            <h3 className="text-white text-xl font-bold mt-4 tracking-wide">{selectedItem.title}</h3>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default HomeParentsPraiseSection;
