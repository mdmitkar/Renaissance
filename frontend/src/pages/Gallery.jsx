import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, PlayCircle } from 'lucide-react';

// Hardcoded asset list including NEW VIDEOS
const allImages = [
    // --- Videos ---
    { id: 101, src: '/videos/SchoolTour.mp4', category: 'School', title: 'Virtual School Tour', type: 'video' },
    { id: 102, src: '/videos/SportsDay_1.mp4', category: 'Events', title: 'Sports Day Highlights', type: 'video' },
    { id: 103, src: '/videos/SportsDay_2.mp4', category: 'Events', title: 'Winning Moments', type: 'video' },
    { id: 104, src: '/videos/Testimonial_1.mp4', category: 'Testimonial', title: 'Parent Experience', type: 'video' },
    { id: 105, src: '/videos/Testimonial_2.mp4', category: 'Testimonial', title: 'Happy Parents', type: 'video' },
    { id: 106, src: '/videos/Testimonial_3.mp4', category: 'Testimonial', title: 'Community Love', type: 'video' },
    // --- Images ---
    { id: 1, src: '/SchoolPremises/SchoolPremises_1.jpeg', category: 'School', title: 'School Premises', type: 'image' },
    { id: 2, src: '/schoolbuilding.avif', category: 'School', title: 'Main Building', type: 'image' },
    { id: 3, src: '/Activities/Activities_1.jpeg', category: 'Activities', title: 'Classroom Fun', type: 'image' },
    { id: 4, src: '/Activities/Activities_2.jpeg', category: 'Activities', title: 'Learning by Doing', type: 'image' },
    { id: 5, src: '/Activities/Activities_3.jpeg', category: 'Activities', title: 'Creative Time', type: 'image' },
    { id: 6, src: '/Activities/Activities_4.jpeg', category: 'Activities', title: 'Group Activity', type: 'image' },
    { id: 7, src: '/Activities/Activities_5.jpeg', category: 'Activities', title: 'Playtime', type: 'image' },
    { id: 8, src: '/RedDay/RedDay_1.jpeg', category: 'Events', title: 'Red Day Celebration', type: 'image' },
    { id: 9, src: '/RedDay/RedDay_2.jpeg', category: 'Events', title: 'Red Day Costumes', type: 'image' },
    { id: 10, src: '/RedDay/RedDay_3.jpeg', category: 'Events', title: 'Group Photo - Red Day', type: 'image' },
];

const categories = ['All', 'School', 'Activities', 'Events', 'Testimonial'];

// 3D Tilt Card Component
const TiltCard = ({ item, onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);
    const videoRef = useRef(null);

    // Handle mouse move to update x and y values
    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="perspective-1000"
        >
            <motion.div
                style={{ rotateX, rotateY, z: 100 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onClick={onClick}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl h-72 bg-white p-2 transform-style-3d hover:shadow-2xl transition-shadow border-2 border-transparent hover:border-gulf-icy/50"
            >
                <div className="w-full h-full rounded-xl overflow-hidden relative bg-black">
                    {item.type === 'video' ? (
                        <>
                            <video
                                ref={videoRef}
                                src={item.src}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                muted
                                loop
                                playsInline
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full group-hover:scale-125 transition-transform duration-300">
                                    <PlayCircle size={40} className="text-white drop-shadow-md" fill="rgba(255,255,255,0.2)" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-white font-bold text-lg block drop-shadow-md">{item.title}</span>
                            <span className={`text-xs uppercase tracking-wider font-bold px-2 py-1 rounded mt-1 inline-block ${item.category === 'School' ? 'bg-gulf-blue text-white' :
                                    item.category === 'Events' ? 'bg-primary-carmine text-white' :
                                        item.category === 'Activities' ? 'bg-charming-green text-white' :
                                            'bg-gentle-yellow text-gulf-lebanese'
                                }`}>
                                {item.category}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);

    const filteredItems = selectedCategory === 'All'
        ? allImages
        : allImages.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-bg-cream dark:bg-bg-dark font-body text-gulf-lebanese relative overflow-hidden">

            {/* Background Blob Decor */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-carmine/5 rounded-full blur-3xl -ml-64 -mt-64 z-0 pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gulf-blue/5 rounded-full blur-3xl -mr-64 -mb-64 z-0 pointer-events-none"
            />


            {/* Header */}
            <div className="bg-gulf-dark text-white py-24 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl font-heading font-extrabold mb-4 text-white tracking-tight">Our Gallery</h1>
                    <p className="text-xl text-gulf-icy max-w-2xl mx-auto font-light">Capturing the magic of childhood moments.</p>
                </motion.div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-16 relative z-10">

                {/* Filters */}
                <div className="flex justify-center flex-wrap gap-4 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-3 rounded-full font-bold transition-all border-2 ${selectedCategory === cat
                                ? 'bg-gulf-blue border-gulf-blue text-white shadow-lg scale-105 ring-4 ring-gulf-blue/20'
                                : 'bg-white border-white text-gulf-lebanese hover:text-gulf-blue hover:border-gulf-blue hover:shadow-md'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredItems.map((item) => (
                            <TiltCard
                                key={item.id}
                                item={item}
                                onClick={() => setSelectedItem(item)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-gulf-lebanese/95 flex items-center justify-center p-4 backdrop-blur-md"
                        onClick={() => setSelectedItem(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 hover:rotate-90 duration-300"
                            onClick={() => setSelectedItem(null)}
                        >
                            <X size={32} />
                        </button>

                        <div className="relative w-full max-w-5xl flex flex-col items-center">
                            {selectedItem.type === 'video' ? (
                                <video
                                    src={selectedItem.src}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border-4 border-white w-full bg-black"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <motion.img
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ type: "spring", bounce: 0.3 }}
                                    src={selectedItem.src}
                                    alt={selectedItem.title}
                                    className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border-4 border-white"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}

                            <div className="mt-6 text-center">
                                <h3 className="text-white font-bold text-3xl mb-2">{selectedItem.title}</h3>
                                <span className={`text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full ${selectedItem.category === 'School' ? 'bg-gulf-blue text-white' :
                                        selectedItem.category === 'Events' ? 'bg-primary-carmine text-white' :
                                            selectedItem.category === 'Activities' ? 'bg-charming-green text-white' :
                                                'bg-gentle-yellow text-gulf-lebanese'
                                    }`}>
                                    {selectedItem.category}
                                </span>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Gallery;
