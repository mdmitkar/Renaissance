import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, PlayCircle, Play } from 'lucide-react';

// Comprehensive asset list
// ... (rest of imports basically)

// ... (skipping down to ReelCard)

const ReelCard = ({ item, onClick }) => {
    const videoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="flex-shrink-0 w-48 md:w-56 h-80 md:h-96 rounded-3xl overflow-hidden relative cursor-pointer shadow-xl border-[6px] border-white snap-center group"
            onClick={onClick}
            onMouseEnter={() => {
                setIsHovered(true);
                videoRef.current?.play();
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            }}
        >
            {/* Video Layer */}
            <video
                ref={videoRef}
                src={item.src}
                className="w-full h-full object-cover transform scale-105"
                muted
                loop
                playsInline
            />

            {/* Overlay Gradient for nicer text readability when video is playing */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Solid Cover Layer with Animation */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: isHovered ? '-100%' : '0%' }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }} // smooth cubic-bezier
                className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center ${item.color}`}
            >
                <div className="bg-white/30 p-4 rounded-full backdrop-blur-md mb-4 shadow-sm ring-1 ring-white/50">
                    <Play fill="currentColor" size={32} className="opacity-90" />
                </div>
                <h3 className="font-heading font-bold text-2xl leading-tight drop-shadow-sm">{item.title}</h3>
                <span className="mt-2 text-xs font-bold uppercase tracking-widest opacity-80 border border-current px-2 py-1 rounded-full">Reel</span>
            </motion.div>
        </motion.div>
    );
};

// Comprehensive asset list
// Comprehensive asset list
const allImages = [
    // --- Videos ---
    { id: 'v1', src: '/videos/schooltour.mp4', category: 'Campus', title: 'Virtual School Tour', type: 'video' },
    { id: 'v2', src: '/SportsDay/SportsDay_1.mp4', category: 'Sports', title: 'Sports Day Excitement', type: 'video' },
    { id: 'v3', src: '/SportsDay/SportsDay_2.mp4', category: 'Sports', title: 'Champions on Track', type: 'video' },
    { id: 'v4', src: '/videos/Testimonial_1.mp4', category: 'Community', title: 'Parent Testimonial: Trust & Care', type: 'video' },
    { id: 'v5', src: '/videos/Testimonial_2.mp4', category: 'Community', title: 'Parent Testimonial: Growth', type: 'video' },
    { id: 'v6', src: '/videos/Testimonial_3.mp4', category: 'Community', title: 'Parent Testimonial: Community', type: 'video' },

    // --- Campus (SchoolPremises) ---
    { id: 'c1', src: '/SchoolPremises/SchoolPremises_1.jpeg', category: 'Campus', title: 'Welcoming Entrance', type: 'image' },
    { id: 'c2', src: '/SchoolPremises/classplay.jpeg', category: 'Campus', title: 'Imaginative Play Area', type: 'image' },
    { id: 'c3', src: '/SchoolPremises/classroom1.jpeg', category: 'Campus', title: 'Modern Learning Spaces', type: 'image' },
    { id: 'c4', src: '/SchoolPremises/classroom2.jpeg', category: 'Campus', title: 'Collaborative Classrooms', type: 'image' },
    { id: 'c5', src: '/SchoolPremises/classroom3.png', category: 'Campus', title: 'Interactive Learning', type: 'image' },
    { id: 'c6', src: '/SchoolPremises/playground1.jpeg', category: 'Campus', title: 'Adventure Playground', type: 'image' },
    { id: 'c7', src: '/SchoolPremises/playground2.jpeg', category: 'Campus', title: 'Outdoor Fun Zone', type: 'image' },
    { id: 'c8', src: '/SchoolPremises/playground3.png', category: 'Campus', title: 'Safe & Active Play', type: 'image' },
    { id: 'c9', src: '/SchoolPremises/schoolbuilding.avif', category: 'Campus', title: 'Our Iconic Building', type: 'image' },

    // --- Activities ---
    { id: 'a1', src: '/Activities/0.1.jpeg', category: 'Activities', title: 'Creative Arts & Crafts', type: 'image' },
    { id: 'a2', src: '/Activities/Activities_1.jpeg', category: 'Activities', title: 'Hands-on Science', type: 'image' },
    { id: 'a3', src: '/Activities/Activities_4.jpeg', category: 'Activities', title: 'Team Building Games', type: 'image' },
    { id: 'a4', src: '/Activities/motor.jpeg', category: 'Activities', title: 'Motor Skills Development', type: 'image' },
    { id: 'a5', src: '/otherimp/Activities_3.jpeg', category: 'Activities', title: 'Experiential Learning', type: 'image' },

    // --- Celebrations (ChildrensDay, IndependenceDay, RedDay) ---
    { id: 'cel1', src: '/ChildrensDay/ChildrenDay_2.jpeg', category: 'Celebrations', title: 'Smiles on Children\'s Day', type: 'image' },
    { id: 'cel2', src: '/ChildrensDay/ChildrensDay_1.jpeg', category: 'Celebrations', title: 'Joy of Childhood', type: 'image' },
    { id: 'cel3', src: '/otherimp/ChildrensDay_2.jpeg', category: 'Celebrations', title: 'Pure Happiness', type: 'image' },
    { id: 'cel4', src: '/IndependenceDay/IndependenceDay_1.jpeg', category: 'Celebrations', title: 'Independence Day Parade', type: 'image' },
    { id: 'cel5', src: '/IndependenceDay/IndependenceDay_2.jpeg', category: 'Celebrations', title: 'Flag Hoisting Ceremony', type: 'image' },
    { id: 'cel6', src: '/IndependenceDay/IndependenceDay_4.jpeg', category: 'Celebrations', title: 'Salute to the Nation', type: 'image' },
    { id: 'cel7', src: '/otherimp/IndependenceDay_3.jpeg', category: 'Celebrations', title: 'Little Patriots', type: 'image' },
    { id: 'cel8', src: '/RedDay/REDDAY6.png', category: 'Celebrations', title: 'Red Day Festivities', type: 'image' },
    { id: 'cel9', src: '/RedDay/RedDay_1.jpeg', category: 'Celebrations', title: 'Learning the Color Red', type: 'image' },
    { id: 'cel10', src: '/RedDay/redday5.jpeg', category: 'Celebrations', title: 'Red Day Art', type: 'image' },
    { id: 'cel11', src: '/Activities/RedDay_3.jpeg', category: 'Celebrations', title: 'Red Balloons & Fun', type: 'image' },

    // --- Sports ---
    { id: 's1', src: '/SportsDay/sportdaymedal.jpeg', category: 'Sports', title: 'Medal of Honor', type: 'image' },
    { id: 's2', src: '/SportsDay/sportsday1.jpeg', category: 'Sports', title: 'Ready, Set, Go!', type: 'image' },

    // --- Community (PTM, Awards, etc) ---

    { id: 'com2', src: '/Activities/PTM_1.jpeg', category: 'Community', title: 'Parent-Teacher Dialogue', type: 'image' },
    { id: 'com3', src: '/Activities/PTM_4.jpeg', category: 'Community', title: 'Sharing Progress', type: 'image' },
    { id: 'com4', src: '/PTM/PTM_3.jpeg', category: 'Community', title: 'Building Partnerships', type: 'image' },
    { id: 'com5', src: '/PTM/PTM_5.jpeg', category: 'Community', title: 'Community Gathering', type: 'image' },
    { id: 'com6', src: '/PTM/ptm6.jpeg', category: 'Community', title: 'Engaged Together', type: 'image' },
    { id: 'com7', src: '/otherimp/Awards_2.jpeg', category: 'Community', title: 'Excellence Awards', type: 'image' },
    { id: 'com8', src: '/otherimp/a.jpeg', category: 'Community', title: 'Cherished Moments', type: 'image' },
];

const reelImages = [
    { id: 'r1', src: '/videos/Independence Day reel.mp4', title: 'Independence Day Bash', color: 'bg-primary-carmine' },
    { id: 'r2', src: '/videos/psycomotorskullreels.mp4', title: 'Building Motor Skills', color: 'bg-gulf-blue' },
    { id: 'r3', src: '/videos/reddayreel.mp4', title: 'Red Day Celebration', color: 'bg-primary-carmine' },
    { id: 'r4', src: '/videos/renaisanecefiestareel.mp4', title: 'The Renaissance Fiesta', color: 'bg-gentle-yellow text-gulf-lebanese' },
    { id: 'r5', src: '/videos/schooltourreel.mp4', title: 'Mini Campus Tour', color: 'bg-gulf-blue' },
    { id: 'r6', src: '/videos/sportsdayreel.mp4', title: 'Sports Day Action', color: 'bg-desert-coral' },
    { id: 'r7', src: '/videos/testimonial_4.mp4', title: 'Parent Love & Trust', color: 'bg-charming-green' },
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
        <div className="min-h-screen bg-cream-velvet text-text-dark font-body relative">

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
            <div className="bg-gradient-to-br from-gentle-yellow to-desert-coral text-gulf-dark py-24 text-center relative z-10 shadow-xl rounded-b-[3rem] mb-12 overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-5 pointer-events-none"></div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative px-4"
                >
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gulf-dark tracking-tight drop-shadow-sm">
                        Our Gallery
                    </h1>
                    <p className="text-lg md:text-2xl text-secondary-charcoal max-w-2xl mx-auto font-light leading-relaxed">
                        A visual journey through the moments that define <span className="font-bold text-gulf-dark">Renaissance</span>.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 md:px-8 pb-20 relative z-10">

                {/* Highlights / Reels Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-carmine to-primary-gold flex items-center justify-center text-white shadow-lg">
                            <PlayCircle size={20} fill="currentColor" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gulf-dark">Highlights</h2>
                    </div>

                    <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar snap-x px-4 -mx-4 md:mx-0">
                        {reelImages.map((reel) => (
                            <ReelCard
                                key={reel.id}
                                item={reel}
                                onClick={() => setSelectedItem({ ...reel, type: 'video', category: 'Highlights' })} // Adapt for modal
                            />
                        ))}
                    </div>
                </div>

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
