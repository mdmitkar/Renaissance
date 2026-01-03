import React, { useState, useRef, useLayoutEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Camera, ChevronLeft, ChevronRight, ArrowRight, Filter } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ===== ASSETS DATA =====
const reelAssets = [
    { id: 'r1', src: '/videos/Independence Day reel.mp4', title: 'Independence Day' },
    { id: 'r2', src: '/videos/psycomotorskullreels.mp4', title: 'Motor Skills Fun' },
    { id: 'r3', src: '/videos/reddayreel.mp4', title: 'Red Day Celebration' },
    { id: 'r4', src: '/videos/renaisanecefiestareel.mp4', title: 'Renaissance Fiesta' },
    { id: 'r5', src: '/videos/schooltourreel.mp4', title: 'Campus Tour' },
    { id: 'r6', src: '/videos/sportsdayreel.mp4', title: 'Sports Day Action' },
];

const galleryAssets = [
    // School Premises (Campus)
    { id: 'c1', src: '/SchoolPremises/schoolbuilding.avif', title: 'School Building', category: 'campus' },
    { id: 'c2', src: '/SchoolPremises/classroom1.jpeg', title: 'Bright Classroom', category: 'campus' },
    { id: 'c3', src: '/SchoolPremises/classroom2.jpeg', title: 'Learning Space', category: 'campus' },
    { id: 'c4', src: '/SchoolPremises/playground1.jpeg', title: 'Playground Fun', category: 'campus' },
    { id: 'c5', src: '/SchoolPremises/playground2.jpeg', title: 'Outdoor Play', category: 'campus' },

    // Activities
    { id: 'a1', src: '/Activities/Activities_1.jpeg', title: 'Art & Craft', category: 'activities' },
    { id: 'a2', src: '/Activities/motor.jpeg', title: 'Motor Skills', category: 'activities' },
    { id: 'a3', src: '/Activities/Activities_4.jpeg', title: 'Group Activity', category: 'activities' },
    { id: 'a4', src: '/Activities/0.1.jpeg', title: 'Learning by Doing', category: 'activities' },

    // Celebrations (Events)
    { id: 'e1', src: '/ChildrensDay/ChildrenDay_2.jpeg', title: 'Children\'s Day', category: 'celebrations' },
    { id: 'e2', src: '/ChildrensDay/ChildrensDay_1.jpeg', title: 'Joyful Moments', category: 'celebrations' },
    { id: 'e3', src: '/IndependenceDay/IndependenceDay_1.jpeg', title: 'Independence Day', category: 'celebrations' },
    { id: 'e4', src: '/IndependenceDay/IndependenceDay_4.jpeg', title: 'Flag Hoisting', category: 'celebrations' },
    { id: 'e5', src: '/RedDay/RedDay_1.jpeg', title: 'Red Day', category: 'celebrations' },
    { id: 'e6', src: '/RedDay/redday5.jpeg', title: 'Kids in Red', category: 'celebrations' },

    // Parents (Events)
    { id: 'p1', src: '/PTM/PTM_3.jpeg', title: 'Parent Teacher Meet', category: 'events' },
    { id: 'p2', src: '/PTM/PTM_4.jpeg', title: 'Community Bonding', category: 'events' },

    // Sports
    { id: 's1', src: '/SportsDay/sportdaymedal.jpeg', title: 'Medal Ceremony', category: 'sports' },
    { id: 's2', src: '/SportsDay/sportsday1.jpeg', title: 'Sports Day Race', category: 'sports' },
];

const CATEGORIES = [
    { id: 'all', label: 'All Moments' },
    { id: 'campus', label: 'Campus' },
    { id: 'activities', label: 'Activities' },
    { id: 'celebrations', label: 'Celebrations' },
    { id: 'sports', label: 'Sports' },
];

const Gallery = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState('all');
    const reelsRef = useRef(null);
    const containerRef = useRef(null);

    // Filter logic
    const filteredImages = useMemo(() => {
        return filter === 'all'
            ? galleryAssets
            : galleryAssets.filter(img => img.category === filter || (filter === 'events' && ['celebrations', 'events'].includes(img.category)));
    }, [filter]);

    const scrollReels = (dir) => {
        if (reelsRef.current) {
            reelsRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
        }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".gallery-item", {
                y: 30, opacity: 0, stagger: 0.05, duration: 0.5,
                scrollTrigger: { trigger: ".gallery-grid", start: "top 80%" }
            });
        }, containerRef);
        return () => ctx.revert();
    }, [filter]); // Re-run animation when filter changes

    return (
        <div ref={containerRef} className="min-h-screen bg-cream-warm dark:bg-navy-deep">

            {/* ===== HERO SECTION ===== */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Colorful blobs background */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                    <div className="absolute top-[20%] right-[-10%] w-80 h-80 bg-secondary/20 rounded-full blur-[80px]" />
                    <div className="absolute bottom-[-10%] left-[30%] w-72 h-72 bg-tertiary/20 rounded-full blur-[90px]" />
                </div>

                <div className="relative z-10 container-pro text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/10 border border-white/60 backdrop-blur-sm text-slate-800 dark:text-white mb-6 shadow-sm">
                            <Camera size={16} className="text-primary" />
                            <span className="font-heading font-semibold text-sm">Our Happy Moments</span>
                        </span>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 dark:text-white mb-6">
                            Capturing <span className="text-primary">Joy</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Every day at Renaissance is filled with laughter, learning, and discovery. Here's a glimpse into our world.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ===== VIDEO REELS ===== */}
            <section className="section py-12 border-b border-primary/5">
                <div className="container-pro">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white">
                                <span className="text-primary">#</span>RenaissanceReels
                            </h2>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => scrollReels('left')} className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                                <ChevronLeft size={20} className="text-slate-600 dark:text-slate-300" />
                            </button>
                            <button onClick={() => scrollReels('right')} className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                                <ChevronRight size={20} className="text-slate-600 dark:text-slate-300" />
                            </button>
                        </div>
                    </div>

                    <div ref={reelsRef} className="flex gap-5 overflow-x-auto pb-8 pt-2 px-2 no-scrollbar scroll-smooth">
                        {reelAssets.map((item, i) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
                                className="relative shrink-0 w-[200px] h-[350px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow border-4 border-white dark:border-slate-800"
                                onClick={() => setSelectedItem({ ...item, type: 'video' })}
                            >
                                <video src={item.src} className="w-full h-full object-cover" muted loop onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                    <Play size={16} className="text-white fill-white" />
                                </div>
                                <div className="absolute bottom-5 left-4 right-4">
                                    <p className="text-white font-heading font-bold text-sm leading-tight">{item.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PHOTO GALLERY ===== */}
            <section className="section">
                <div className="container-pro">

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`
                                    px-6 py-2.5 rounded-full font-heading font-bold text-sm transition-all duration-300
                                    ${filter === cat.id
                                        ? 'bg-slate-900 text-white shadow-lg scale-105 dark:bg-white dark:text-slate-900'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                                    }
                                `}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Masonry Grid */}
                    <motion.div
                        layout
                        className="gallery-grid columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
                    >
                        <AnimatePresence>
                            {filteredImages.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    key={item.id}
                                    className="gallery-item break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center p-4">
                                            <p className="text-white font-heading font-bold text-lg mb-1">{item.title}</p>
                                            <p className="text-white/80 text-xs uppercase tracking-wider font-semibold bg-white/10 px-3 py-1 rounded-full inline-block">
                                                {item.category}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-20 bg-white dark:bg-slate-900/50">
                <div className="container-pro text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
                        Come See Our <span className="text-primary">Happy Place</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto text-lg">
                        We'd love to show you around our campus and introduce you to our teachers.
                    </p>
                    <NavLink to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-heading font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                        >
                            Schedule a Visit <ArrowRight size={20} />
                        </motion.button>
                    </NavLink>
                </div>
            </section>

            {/* ===== LIGHTBOX ===== */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        <button className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors z-10">
                            <X size={24} />
                        </button>

                        <div
                            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedItem.type === 'video' ? (
                                <video
                                    src={selectedItem.src}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl"
                                />
                            ) : (
                                <motion.img
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    src={selectedItem.src}
                                    alt={selectedItem.title}
                                    className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                                />
                            )}

                            <div className="mt-6 text-center">
                                <h3 className="text-2xl font-display font-bold text-white mb-1">{selectedItem.title}</h3>
                                <span className="text-white/60 text-sm uppercase tracking-widest">{selectedItem.category || 'Video Reel'}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
