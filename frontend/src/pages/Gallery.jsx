import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, PlayCircle } from 'lucide-react';

// Comprehensive asset list
const allImages = [
    // --- Videos ---
    { id: 'v1', src: '/videos/SchoolTour.mp4', category: 'Campus', title: 'Virtual School Tour', type: 'video' },
    { id: 'v2', src: '/videos/SportsDay_1.mp4', category: 'Sports', title: 'Sports Day Highlights', type: 'video' },
    { id: 'v3', src: '/videos/SportsDay_2.mp4', category: 'Sports', title: 'Winning Moments', type: 'video' },
    { id: 'v4', src: '/videos/Testimonial_1.mp4', category: 'Community', title: 'Parent Experience', type: 'video' },
    { id: 'v5', src: '/videos/Testimonial_2.mp4', category: 'Community', title: 'Happy Parents', type: 'video' },
    { id: 'v6', src: '/videos/Testimonial_3.mp4', category: 'Community', title: 'Community Love', type: 'video' },

    // --- Campus ---
    { id: 1, src: '/SchoolPremises/SchoolPremises_1.jpeg', category: 'Campus', title: 'Our Beautiful Campus', type: 'image' },
    { id: 2, src: '/SchoolPremises/classplay.jpeg', category: 'Campus', title: 'Role Play Area', type: 'image' },
    { id: 3, src: '/SchoolPremises/classroom1.jpeg', category: 'Campus', title: 'Modern Classroom', type: 'image' },
    { id: 4, src: '/SchoolPremises/classroom2.jpeg', category: 'Campus', title: 'Learning Environment', type: 'image' },
    { id: 5, src: '/SchoolPremises/classroom3.png', category: 'Campus', title: 'Interactive Space', type: 'image' },
    { id: 6, src: '/SchoolPremises/playground1.jpeg', category: 'Campus', title: 'Playground Fun', type: 'image' },
    { id: 7, src: '/SchoolPremises/playground2.jpeg', category: 'Campus', title: 'Outdoor Activities', type: 'image' },
    { id: 8, src: '/SchoolPremises/playground3.png', category: 'Campus', title: 'Safe Play Area', type: 'image' },

    // --- Activities ---
    { id: 9, src: '/Activities/0.1.jpeg', category: 'Activities', title: 'Creative Arts', type: 'image' },
    { id: 10, src: '/Activities/Activities_1.jpeg', category: 'Activities', title: 'Engaging Lessons', type: 'image' },
    { id: 11, src: '/Activities/Activities_4.jpeg', category: 'Activities', title: 'Group Collaboration', type: 'image' },
    { id: 12, src: '/Activities/motor.jpeg', category: 'Activities', title: 'Motor Skills', type: 'image' },
    { id: 13, src: '/otherimp/Activities_3.jpeg', category: 'Activities', title: 'Hands-on Learning', type: 'image' },

    // --- Celebrations ---
    { id: 14, src: '/ChildrensDay/ChildrenDay_2.jpeg', category: 'Celebrations', title: 'Children\'s Day Joy', type: 'image' },
    { id: 15, src: '/ChildrensDay/ChildrensDay_1.jpeg', category: 'Celebrations', title: 'Celebrating Childhood', type: 'image' },
    { id: 16, src: '/otherimp/ChildrensDay_2.jpeg', category: 'Celebrations', title: 'Smiles & Laughter', type: 'image' },
    { id: 17, src: '/IndependenceDay/IndependenceDay_1.jpeg', category: 'Celebrations', title: 'Independence Day', type: 'image' },
    { id: 18, src: '/IndependenceDay/IndependenceDay_2.jpeg', category: 'Celebrations', title: 'Flag Hoisting', type: 'image' },
    { id: 19, src: '/IndependenceDay/IndependenceDay_4.jpeg', category: 'Celebrations', title: 'Patriotic Spirit', type: 'image' },
    { id: 20, src: '/otherimp/IndependenceDay_3.jpeg', category: 'Celebrations', title: 'Proud Moments', type: 'image' },
    { id: 21, src: '/RedDay/REDDAY6.png', category: 'Celebrations', title: 'Red Day Celebration', type: 'image' },
    { id: 22, src: '/RedDay/RedDay_1.jpeg', category: 'Celebrations', title: 'Shades of Red', type: 'image' },
    { id: 23, src: '/RedDay/redday5.jpeg', category: 'Celebrations', title: 'Colorful Memories', type: 'image' },

    // --- Sports ---
    { id: 24, src: '/SportsDay/sportdaymedal.jpeg', category: 'Sports', title: 'Medal Ceremony', type: 'image' },
    { id: 25, src: '/SportsDay/sportsday1.jpeg', category: 'Sports', title: 'Little Athletes', type: 'image' },

    // --- Community ---
    { id: 26, src: '/PTM/PTM_1.jpeg', category: 'Community', title: 'Parent Teacher Meeting', type: 'image' },
    { id: 27, src: '/PTM/PTM_3.jpeg', category: 'Community', title: 'Building Connections', type: 'image' },
    { id: 28, src: '/PTM/PTM_5.jpeg', category: 'Community', title: 'Community Support', type: 'image' },
    { id: 29, src: '/PTM/ptm6.jpeg', category: 'Community', title: 'Engaged Parents', type: 'image' },
    { id: 30, src: '/otherimp/Awards_2.jpeg', category: 'Community', title: 'Awards & Recognition', type: 'image' },
    { id: 31, src: '/otherimp/a.jpeg', category: 'Community', title: 'Special Moments', type: 'image' },
];

const categories = ['All', 'Campus', 'Activities', 'Celebrations', 'Sports', 'Community'];

const getCategoryColor = (category) => {
    switch (category) {
        case 'Campus': return 'bg-gulf-blue text-white';
        case 'Activities': return 'bg-charming-green text-white';
        case 'Celebrations': return 'bg-primary-carmine text-white';
        case 'Sports': return 'bg-desert-coral text-white';
        case 'Community': return 'bg-gentle-yellow text-gulf-lebanese';
        default: return 'bg-gulf-icy text-white';
    }
};

// 3D Tilt Card Component
const TiltCard = ({ item, onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]); // Reduced tilt for subtle premium feel
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="perspective-[1000px]"
        >
            <motion.div
                style={{ rotateX, rotateY, z: 100 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onClick={onClick}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg h-80 bg-white p-2 transform-style-3d hover:shadow-2xl transition-all duration-300 border border-white/50"
            >
                <div className="w-full h-full rounded-xl overflow-hidden relative bg-gray-100">
                    {item.type === 'video' ? (
                        <>
                            <video
                                ref={videoRef}
                                src={item.src}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                muted
                                loop
                                playsInline
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:scale-110 transition-transform duration-300 border border-white/30">
                                    <PlayCircle size={32} className="text-white drop-shadow-lg" fill="currentColor" />
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

                    {/* Gradient Overlay & Content */}
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <div className="w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded mb-2 inline-block ${getCategoryColor(item.category)}`}>
                                {item.category}
                            </span>
                            <span className="text-white font-heading font-bold text-lg block drop-shadow-md leading-tight">{item.title}</span>
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
        <div className="min-h-screen bg-cream-velvet text-text-dark font-body relative overflow-x-hidden">

            {/* Background Blob Decor */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-carmine/5 rounded-full blur-[100px] -ml-40 -mt-40 z-0 pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gulf-blue/5 rounded-full blur-[100px] -mr-40 -mb-40 z-0 pointer-events-none"
            />

            {/* Header */}
            <div className="bg-gulf-dark text-white py-24 text-center relative z-10 shadow-xl rounded-b-[3rem] mb-12 overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-5 pointer-events-none"></div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative px-4"
                >
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-white tracking-tight drop-shadow-lg">
                        Our Gallery
                    </h1>
                    <p className="text-lg md:text-2xl text-gulf-icy max-w-2xl mx-auto font-light leading-relaxed">
                        A visual journey through the moments that define <span className="font-bold text-white">Renaissance</span>.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 md:px-8 pb-20 relative z-10">

                {/* Filters */}
                <div className="flex justify-center flex-wrap gap-3 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${selectedCategory === cat
                                ? 'bg-gulf-blue border-gulf-blue text-white shadow-lg scale-105'
                                : 'bg-white/80 border-transparent text-gray-600 hover:text-gulf-blue hover:bg-white hover:shadow-md backdrop-blur-sm'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8"
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

                {filteredItems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center py-20 text-gray-500 italic"
                    >
                        No items found in this category.
                    </motion.div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
                        onClick={() => setSelectedItem(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 hover:rotate-90 duration-300"
                            onClick={() => setSelectedItem(null)}
                        >
                            <X size={36} />
                        </button>

                        <div
                            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center outline-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedItem.type === 'video' ? (
                                <video
                                    src={selectedItem.src}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-[80vh] rounded-lg shadow-2xl bg-black"
                                />
                            ) : (
                                <motion.img
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ type: "spring", bounce: 0.2 }}
                                    src={selectedItem.src}
                                    alt={selectedItem.title}
                                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                />
                            )}

                            <div className="mt-6 text-center">
                                <h3 className="text-white font-heading font-bold text-3xl mb-2">{selectedItem.title}</h3>
                                <span className={`text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full ${getCategoryColor(selectedItem.category)}`}>
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
