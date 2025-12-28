import React, { useRef, useEffect } from 'react';
import Slider from "react-slick";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Star, Heart, Trophy, Music, Shield, Sprout, GraduationCap, Palette } from 'lucide-react';
import ImgWithFallback from '../components/ImgWithFallback';

// --- DATA & CONFIGURATION ---

const EVENTS = [
    {
        id: 'school-tour',
        title: "School Tour",
        description: "Embark on a journey through our state-of-the-art campus. From modern classrooms to expansive playgrounds, every corner is designed to inspire learning and joy.",
        date: "Discover Our Campus",
        folder: "SchoolPremises",
        images: [
            "schoolbuilding.avif",
            "classroom3.png",
            "playground3.png",
            "playground1.jpeg",
            "playground2.jpeg",
            "classroom1.jpeg",
            "classroom2.jpeg",
            "classplay.jpeg",
            "SchoolPremises_1.jpeg"
        ],
        theme: {
            primary: "#81BAD9", // Gulf Blue
            secondary: "#131720", // Lebanese Blue (Darker)
            accent: "#0060AA", // Dark Blue
            shadow: "rgba(129, 186, 217, 0.4)",
            text: "#004e8a" // Deep Blue
        },
        icon: <MapPin size={24} />
    },
    {
        id: 'children-day',
        title: "Children's Day",
        description: "A day dedicated to the pure joy and innocence of childhood. We celebrate with games, laughter, and special performances that light up every face.",
        date: "Celebration of Joy",
        folder: "ChildrensDay",
        images: [
            "ChildrenDay_2.jpeg",
            "ChildrensDay_1.jpeg"
        ],
        theme: {
            primary: "#75DB9B", // Charming Green
            secondary: "#5C7E68", // Como (Darker)
            accent: "#5C7E68",
            shadow: "rgba(117, 219, 155, 0.4)",
            text: "#2E5C3E" // Deep Green
        },
        icon: <Heart size={24} />
    },
    {
        id: 'independence-day',
        title: "Independence Day",
        description: "Instilling patriotism and pride. Our little ones honor the nation with flag hoisting, cultural programs, and a spirit of unity.",
        date: "Pride of the Nation",
        folder: "IndependenceDay",
        images: [
            "IndependenceDay_1.jpeg",
            "IndependenceDay_4.jpeg",
            "IndependenceDay_2.jpeg"
        ],
        theme: {
            primary: "#EBAC8F", // Desert Coral
            secondary: "#BA1054", // Pictorial Carmine (Using as darker contrast)
            accent: "#BA1054",
            shadow: "rgba(235, 172, 143, 0.4)",
            text: "#8A3C1B" // Deep Coral/Brown
        },
        icon: <Star size={24} />
    },
    {
        id: 'ptm',
        title: "Parent Teacher Meeting",
        description: "Building a bridge between home and school. We believe in collaborative growth, discussing progress, and shaping the future of every child together.",
        date: "Better Together",
        folder: "PTM",
        images: [
            "PTM_5.jpeg",
            "PTM_3.jpeg",
            "ptm6.jpeg"
        ],
        theme: {
            primary: "#DCA9CA", // Luxury Pink
            secondary: "#BA1054", // Pictorial Carmine (Pairing Pink with Red/Carmine for contrast)
            accent: "#BA1054",
            shadow: "rgba(220, 169, 202, 0.4)",
            text: "#8f3e6d" // Deep Pink/Purple
        },
        icon: <Calendar size={24} />
    },
    {
        id: 'red-day',
        title: "Red Day",
        description: "A vibrant celebration of the color Red! Through dress, decoration, and activities, children learn to associate the color with love, energy, and excitement.",
        date: "Color of Love",
        folder: "RedDay",
        images: [
            "REDDAY6.png",
            "RedDay_1.jpeg",
            "redday5.jpeg"
        ],
        theme: {
            primary: "#BA1054", // Pictorial Carmine
            secondary: "#131720", // Dark
            accent: "#131720",
            shadow: "rgba(186, 16, 84, 0.4)",
            text: "#700a33" // Deep Carmine
        },
        icon: <Heart size={24} />
    },
    {
        id: 'sports-day',
        title: "Sports Day",
        description: "Champions in the making! A high-energy day filled with races, relays, and team spirit, teaching resilience and the joy of participation.",
        date: "Energy & Action",
        folder: "SportsDay",
        images: [
            "sportsday1.jpeg",
            "sportdaymedal.jpeg"
        ],
        theme: {
            primary: "#F3DD89", // Gentle Yellow
            secondary: "#0060AA", // Dark Blue (Contrast for Yellow)
            accent: "#0060AA",
            shadow: "rgba(243, 221, 137, 0.4)",
            text: "#004e8a" // Deep Blue (matching the accent)
        },
        icon: <Trophy size={24} />
    }
];

// --- COMPONENTS ---

const AutoSlider = ({ images, folder }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
        arrows: false,
        customPaging: (i) => (
            <div className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300 mt-4" />
        )
    };

    return (
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative group">
            <Slider {...settings} className="h-full">
                {images.map((img, index) => (
                    <div key={index} className="relative aspect-[4/3] or-aspect-video h-[300px] md:h-[400px] outline-none">
                        <ImgWithFallback
                            src={`/${folder}/${img}`}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[4000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                    </div >
                ))}
            </Slider >
        </div >
    );
};

const TimelineSection = ({ event, index }) => {
    const isEven = index % 2 === 0;
    const ref = useRef(null);

    return (
        <section ref={ref} className={`min-h-screen snap-start flex items-center justify-center py-12 md:py-0 relative overflow-hidden`}>
            {/* Background Watermark Number - BLACK OUTLINE */}
            <div className={`absolute top-20 md:top-auto opacity-[0.05] text-[10rem] md:text-[20rem] font-heading font-black z-0 pointer-events-none select-none text-transparent`}
                style={{
                    WebkitTextStroke: '4px black',
                    [isEven ? 'left' : 'right']: '5%'
                }}>
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Connecting Curve (Decorative) - BOLDER */}
            <div className={`absolute bottom-0 w-full h-32 z-0 hidden md:block pointer-events-none opacity-60`}>
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d={isEven ? "M 30 0 Q 30 50 50 100" : "M 70 0 Q 70 50 50 100"}
                        fill="none"
                        stroke={event.theme.primary}
                        strokeWidth="1.5"
                        strokeDasharray="8,8"
                    />
                </svg>
            </div>

            <div className={`w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 px-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                {/* Content Side - 30% */}
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ margin: "-100px" }}
                    className="w-full md:w-[35%] lg:w-[30%] text-center md:text-left shrink-0 z-10 relative"
                >
                    {/* Floating Decorative Icon - BOLDER */}
                    <div className="absolute -top-20 -left-10 text-[${event.theme.primary}] opacity-25 animate-pulse delay-1000 hidden md:block">
                        {event.icon}
                    </div>

                    <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold uppercase tracking-wider mb-4 shadow-lg`}
                        style={{ backgroundColor: event.theme.primary }}
                    >
                        {event.icon}
                        <span>{event.date}</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 leading-tight">
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${event.theme.secondary}, ${event.theme.accent})`
                            }}
                        >
                            {event.title}
                        </span>
                    </h2>

                    <p className="text-base md:text-lg leading-relaxed mb-8 font-medium text-justify" style={{ color: event.theme.text }}>
                        {event.description}
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button
                            className="px-6 py-3 rounded-xl text-white font-bold shadow-xl flex items-center gap-2 mx-auto md:mx-0 transition-all hover:shadow-2xl hover:gap-4 text-sm md:text-base"
                            style={{ backgroundColor: event.theme.primary }}
                        >
                            Explore More <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </motion.div>

                {/* Slider Side - 70% */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-[65%] lg:w-[70%] relative group"
                >
                    <div
                        className="relative border-4 rounded-3xl shadow-2xl bg-white dark:bg-gray-900 overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
                        style={{
                            transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`,
                            borderColor: event.theme.primary
                        }}
                    >
                        <AutoSlider images={event.images} folder={event.folder} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const LifeAtRenaissance = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Lock body scroll to prevent double scrollbars
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.overflowX = 'hidden'; // Restore default
        };
    }, []);

    return (
        <div className="bg-[#F3F0E8] dark:bg-[#111] h-screen overflow-y-scroll snap-y snap-mandatory font-body transition-colors duration-300 scroll-smooth no-scrollbar">

            {/* PROGRESS BAR */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-2 origin-left z-50"
                style={{ scaleX, backgroundColor: '#0060AA' }}
            />

            {/* HERO HEADER */}
            <header className="min-h-screen snap-start flex flex-col justify-center items-center py-20 px-4 text-center relative overflow-hidden">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #0060AA 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Floating Icons Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-10 text-[#FF6B6B] opacity-20"><Star size={64} /></motion.div>
                    <motion.div animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/3 right-10 text-[#4ECDC4] opacity-20"><Music size={80} /></motion.div>
                    <motion.div animate={{ x: [-20, 20, -20], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/3 right-1/4 text-[#FFE66D] opacity-20"><Trophy size={56} /></motion.div>

                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-96 h-96 border-4 border-dashed border-[#0060AA] rounded-full opacity-5" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <h1 className="text-6xl md:text-9xl font-heading font-extrabold text-[#131720] dark:text-white mb-8 tracking-tight drop-shadow-sm">
                        Life @ <span className="text-[#BA1054] relative inline-block">
                            Renaissance
                            <svg className="absolute w-full h-4 -bottom-2 left-0 text-[#F3DD89]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-2xl md:text-3xl text-[#5C7E68] font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
                        A dynamic journey of joy, learning, and unforgettable moments.
                    </p>

                    {/* Feature Highlights - Creative Redesign */}
                    {/* Feature Highlights - Pro UI/UX Organic Design */}
                    <div className="relative max-w-7xl mx-auto mb-32 px-4">

                        {/* Connecting Wave Line (Decor) */}
                        <div className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 hidden md:block opacity-30 pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
                                <path
                                    d="M0,50 C300,0 900,100 1200,50"
                                    fill="none"
                                    stroke="#0060AA"
                                    strokeWidth="4"
                                    strokeDasharray="10 10"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
                            {[
                                { title: "Safety First", desc: "Secure & Caring Environment", icon: <Shield size={32} />, color: "#81BAD9", delay: 0, shape: "60% 40% 30% 70% / 60% 30% 70% 40%" },
                                { title: "Holistic Growth", desc: "Nurturing Mind, Body & Soul", icon: <Sprout size={32} />, color: "#75DB9B", delay: 0.2, shape: "30% 70% 70% 30% / 30% 30% 70% 70%" },
                                { title: "Creative Learning", desc: "Arts, Crafts & Innovation", icon: <Palette size={32} />, color: "#F3DD89", delay: 0.4, shape: "50% 50% 30% 70% / 50% 70% 30% 50%" },
                                { title: "Expert Faculty", desc: "Qualified & Passionate Teachers", icon: <GraduationCap size={32} />, color: "#DCA9CA", delay: 0.6, shape: "70% 30% 30% 70% / 60% 40% 60% 40%" }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                    animate={{ opacity: 1, scale: 1, y: idx % 2 === 0 ? 0 : 40 }}
                                    transition={{ duration: 0.8, delay: feature.delay + 0.5, type: "spring" }}
                                    whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 5 : -5, zIndex: 20 }}
                                    className="flex flex-col items-center justify-center text-center relative group"
                                >

                                    {/* Blob Background */}
                                    <div
                                        className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 shadow-xl"
                                        style={{
                                            borderRadius: feature.shape,
                                            backgroundColor: feature.color,
                                            filter: 'blur(10px)'
                                        }}
                                    />

                                    {/* Glass Card Content */}
                                    <div
                                        className="relative p-8 bg-white/10 dark:bg-black/10 backdrop-blur-xl border-2 border-black rounded-[2rem] shadow-2xl flex flex-col items-center gap-4 transition-all duration-300 w-full aspect-square justify-center"
                                        style={{
                                            boxShadow: `0 20px 40px -10px ${feature.color}40`,
                                        }}
                                    >
                                        <div
                                            className="w-16 h-16 flex items-center justify-center rounded-full text-white shadow-lg mb-2 transform group-hover:scale-125 transition-transform duration-300"
                                            style={{ backgroundColor: feature.color }}
                                        >
                                            {feature.icon}
                                        </div>
                                        <div className="relative z-10">
                                            <h4 className="text-xl font-heading font-black text-[#131720] dark:text-white mb-2 leading-none">{feature.title}</h4>
                                            <p className="text-sm font-bold text-[#5C7E68] opacity-90 leading-tight">{feature.desc}</p>
                                        </div>
                                    </div>

                                </motion.div>
                            ))}
                        </div>
                    </div>


                </motion.div>

                {/* Background Blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#94C4DF] opacity-30 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-20 right-1/4 w-72 h-72 bg-[#DCA9CA] opacity-30 rounded-full blur-[100px] animate-pulse delay-700"></div>
            </header>

            {/* EVENTS LOOP */}
            {EVENTS.map((event, index) => (
                <TimelineSection key={event.id} event={event} index={index} />
            ))}

            {/* FOOTER CTA */}
            <div className="min-h-[50vh] snap-start flex flex-col justify-center items-center text-center py-24 bg-white dark:bg-[#1a1a1a]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-block"
                >
                    <h3 className="text-3xl md:text-5xl font-heading font-bold mb-8 text-[#131720] dark:text-white">Ready to be part of our story?</h3>
                    <button className="bg-[#0060AA] hover:bg-[#81BAD9] text-white px-12 py-5 rounded-full text-xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
                        Join Renaissance Today
                    </button>
                </motion.div>
            </div>

        </div>
    );
};

export default LifeAtRenaissance;
