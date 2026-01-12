import React, { useState, useRef, useEffect, useLayoutEffect, Component } from 'react';
import Slider from "react-slick";
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Star, Heart, Trophy, X, PlayCircle, Play, ArrowDown, ChevronRight, ChevronLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImgWithFallback from '../components/ImgWithFallback';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// PART 1: LIFE AT RENAISSANCE DATA & COMPONENT
// ============================================

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
        id: 'islamic-day',
        title: "Islamic Day",
        description: "Celebrating faith, values, and community. A day filled with reflection, joy, and spiritual growth for our students.",
        date: "Faith & Values",
        folder: "New/Islamic Day",
        images: [
            "ilamioc1.jpeg",
            "islamic2.jpeg",
            "islamic3.jpeg",
            "islamic5.jpeg",
            "islamic6.jpeg"
        ],
        theme: {
            primary: "#0F766E", // Teal
            secondary: "#134E4A", // Dark Teal
            accent: "#134E4A",
            shadow: "rgba(15, 118, 110, 0.4)",
            text: "#0D5E56" // Deep Teal
        },
        icon: <Star size={24} />
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
            "sportdaymedal.jpeg",
            "sportday4.webp"
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
            {/* Background Watermark Number - VISIBLE IN DARK MODE */}
            <div className={`absolute top-20 md:top-auto opacity-[0.05] dark:opacity-[0.1] text-[10rem] md:text-[20rem] font-heading font-black z-0 pointer-events-none select-none text-black dark:text-white`}
                style={{
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
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ margin: "-50px" }}
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
                            className="bg-clip-text text-transparent bg-gradient-to-r dark:!bg-none dark:!text-white"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${event.theme.secondary}, ${event.theme.accent})`
                            }}
                        >
                            {event.title}
                        </span>
                    </h2>

                    <p className="text-base md:text-lg leading-relaxed mb-8 font-medium text-justify dark:!text-gray-300" style={{ color: event.theme.text }}>
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

const LifeSection = () => {
    return (
        <div className="bg-[#F3F0E8] dark:bg-[#111] font-body transition-colors duration-300">
            {/* HERO HEADER */}
            <header className="relative w-full h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/generated/life_at_renaissance_hero.png"
                        alt="Life at Renaissance"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-4 w-full"
                >
                    <h1 className="text-[8vw] md:text-[7vw] font-heading font-normal text-white mb-4 tracking-tighter drop-shadow-2xl whitespace-nowrap leading-none">
                        Inside Renaissance
                    </h1>

                    <p className="text-lg md:text-2xl font-light text-slate-100 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-body tracking-wide">
                        A dynamic journey of joy, learning, and unforgettable moments.
                    </p>
                </motion.div>

                {/* Decorative Scroll Down Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto mb-2"></div>
                    <span className="text-xs uppercase tracking-[0.3em]">Explore</span>
                </motion.div>
            </header>

            {/* EVENTS LOOP */}
            {EVENTS.map((event, index) => (
                <TimelineSection key={event.id} event={event} index={index} />
            ))}


        </div>
    );
};

// ===================================
// PART 2: GALLERY DATA & COMPONENT
// ===================================

class GalleryErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Gallery Error Boundary Caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-center bg-red-50 rounded-xl border border-red-200 my-8">
                    <h3 className="text-red-800 font-bold mb-2">Something went wrong with this gallery section.</h3>
                    <p className="text-red-600">Please try refreshing the page.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

const reelAssets = [
    { id: 'r1', src: '/IndependenceDay/Independence Day reel.mp4', title: 'Independence Day Bash', color: 'bg-primary-carmine' },
    { id: 'r2', src: '/videos/psycomotorskullreels.mp4', title: 'Building Motor Skills', color: 'bg-gulf-blue' },
    { id: 'r3', src: '/videos/reddayreel.mp4', title: 'Red Day Celebration', color: 'bg-primary-carmine' },
    { id: 'r4', src: '/videos/renaisanecefiestareel.mp4', title: 'The Renaissance Fiesta', color: 'bg-gentle-yellow text-gulf-lebanese' },
    { id: 'r5', src: '/videos/schooltourreel.mp4', title: 'Mini Campus Tour', color: 'bg-gulf-blue' },
    { id: 'r6', src: '/videos/sportsdayreel.mp4', title: 'Sports Day Action', color: 'bg-desert-coral' },
    { id: 'r7', src: '/videos/testimonial_4.mp4', title: 'Parent Love & Trust', color: 'bg-charming-green' },
];

const campusAssets = [
    { id: 'cam1', src: '/SchoolPremises/playground2.jpeg', title: 'Entrance' },
    { id: 'cam2', src: '/SchoolPremises/classplay.jpeg', title: 'Play Area' },
    { id: 'cam3', src: '/SchoolPremises/classroom1.jpeg', title: 'Classroom' },
    { id: 'cam4', src: '/SchoolPremises/classroom2.jpeg', title: 'Learning Space' },
    { id: 'cam5', src: '/SchoolPremises/classroom3.png', title: 'Interactive' },
    { id: 'cam6', src: '/SchoolPremises/playground1.jpeg', title: 'Playground' },
    { id: 'cam9', src: '/SchoolPremises/schoolbuilding.avif', title: 'School Building' },
    { id: 'vid_tour', src: '/videos/schooltour.mp4', title: 'Full Tour', type: 'video' }
];

const celebrationAssets = [
    { id: 'cel1', src: '/ChildrensDay/ChildrenDay_2.jpeg', title: 'Smiles' },
    { id: 'cel2', src: '/ChildrensDay/ChildrensDay_1.jpeg', title: 'Joy' },
    { id: 'cel3', src: '/IndependenceDay/IndependenceDay_1.jpeg', title: 'March Past' },
    { id: 'cel4', src: '/IndependenceDay/IndependenceDay_2.jpeg', title: 'Flag Hoisting' },
    { id: 'cel6', src: '/RedDay/REDDAY6.png', title: 'Red Day' },
    { id: 'cel7', src: '/RedDay/RedDay_1.jpeg', title: 'Red Learning' },
    { id: 'vid_indep', src: '/IndependenceDay/indepencedneday activity.mp4', title: 'Independence Act', type: 'video' }
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
            <h3 className={`text-sm font-bold uppercase tracking-[0.2em] mb-3 ${color} dark:text-white/70 opacity-60 split-text`}>{subtitle}</h3>
            <h2 className={`text-4xl md:text-6xl font-black ${color} dark:text-white split-text`}>{title}</h2>
        </div>
    );
};

const MediaCard = ({ item, onClick, className }) => {
    const videoRef = useRef(null);
    const [hover, setHover] = useState(false);

    if (!item) return null;

    return (
        <div
            className={`relative overflow-hidden rounded-xl bg-gray-100 dark:bg-[#1a1a1a] cursor-pointer group ${className}`}
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

const GallerySection = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const campusRef = useRef(null);
    const celebRef = useRef(null);
    const learningRef = useRef(null);
    const trackRef = useRef(null);
    const reelsRef = useRef(null);

    const scrollReels = (direction) => {
        if (reelsRef.current) {
            const scrollAmount = 300;
            reelsRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

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

            // Celebration Horizontal Scroll Effect
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

                gsap.to(trackRef.current, {
                    x: xTo,
                    ease: "none",
                    scrollTrigger: {
                        trigger: learningRef.current,
                        start: "center center",
                        end: () => "+=" + (scrollWidth - windowWidth),
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-slate-50 dark:bg-black min-h-screen text-slate-800 dark:text-gray-200 font-sans selection:bg-rose-500 selection:text-white transition-colors duration-300">

            {/* 1. New Simple Header */}
            <div className="pt-20 pb-10 text-center bg-slate-50 dark:bg-black transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-heading font-normal text-slate-800 dark:text-white mb-4">
                        Our Whole Gallery
                    </h2>
                    <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
                </motion.div>
            </div>


            {/* 2. Featured Reels (Stories) */}
            <div className="reels-section max-w-[1920px] mx-auto mb-32 mt-10 relative z-20 pl-6 md:pl-12">
                <div className="max-w-7xl mb-1 pr-6 flex justify-between items-end">
                    <SectionHeader title="Highlights" subtitle="Stories in Motion" className="!mb-4" />

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mb-4 md:mr-10">
                        <button
                            onClick={() => scrollReels('left')}
                            className="p-3 bg-white dark:bg-white/10 rounded-full shadow-lg border border-gray-100 dark:border-white/20 hover:scale-110 active:scale-95 transition-all text-slate-800 dark:text-white"
                            aria-label="Scroll Left"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scrollReels('right')}
                            className="p-3 bg-white dark:bg-white/10 rounded-full shadow-lg border border-gray-100 dark:border-white/20 hover:scale-110 active:scale-95 transition-all text-slate-800 dark:text-white"
                            aria-label="Scroll Right"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
                <div ref={reelsRef} className="pt-3 flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x no-scrollbar pr-6 scroll-smooth">
                    {reelAssets.map((item, i) => (
                        <div key={item.id} className="reel-card snap-center shrink-0">
                            <div
                                className="w-[180px] h-[320px] sm:w-[240px] sm:h-[420px] rounded-2xl overflow-hidden relative cursor-pointer group shadow-xl border-4 border-black dark:border-white/20 transition-transform hover:-translate-y-2"
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
                <GalleryErrorBoundary>
                    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[650px]">
                        {campusAssets[7] && <MediaCard item={campusAssets[7]} className="campus-item md:col-span-2 md:row-span-2 min-h-[300px] border-4 border-black dark:border-white/20 shadow-lg" onClick={() => setSelectedItem(campusAssets[7])} />}
                        {campusAssets[0] && <MediaCard item={campusAssets[0]} className="campus-item min-h-[200px] border-4 border-black dark:border-white/20 shadow-sm" onClick={() => setSelectedItem(campusAssets[0])} />}
                        {campusAssets[1] && <MediaCard item={campusAssets[1]} className="campus-item min-h-[200px] border-4 border-black dark:border-white/20 shadow-sm" onClick={() => setSelectedItem(campusAssets[1])} />}
                        {campusAssets[2] && <MediaCard item={campusAssets[2]} className="campus-item md:col-span-2 min-h-[200px] border-4 border-black dark:border-white/20 shadow-sm" onClick={() => setSelectedItem(campusAssets[2])} />}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {campusAssets.slice(3, 7).map((item) => (
                            <MediaCard key={item.id} item={item} className="campus-item h-[200px] md:h-[250px] border-4 border-black dark:border-white/20 shadow-sm" onClick={() => setSelectedItem(item)} />
                        ))}
                    </div>
                </GalleryErrorBoundary>
            </div>

            {/* 4. Celebrations (Horizontal Focus) */}
            <div ref={celebRef} className="bg-slate-900 dark:bg-[#111] py-32 text-slate-100 relative overflow-hidden">
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
            <div ref={learningRef} className="py-20 md:py-0 md:h-[100vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-white to-slate-100 dark:from-black dark:to-[#111] relative mb-20 section-learning">
                <div className="max-w-7xl mx-auto w-full px-6 relative mb-8 md:mb-12 z-10 pointer-events-none">
                    <SectionHeader title="Learning & Fun" subtitle="Everyday Adventure" className="!mb-0" />
                </div>

                <div ref={trackRef} className="flex gap-8 md:gap-12 px-6 md:px-20 mt-12 md:mt-0 overflow-visible no-scrollbar w-max">
                    {mergedLearningAssets.map((item, index) => (
                        <div
                            key={item.id}
                            className={`relative shrink-0 w-[80vw] md:w-[600px] aspect-video md:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group border-4 border-black dark:border-white/20 ${index % 2 === 0 ? 'md:rotate-1' : 'md:-rotate-1'}`}
                            onClick={() => setSelectedItem(item)}
                        >
                            <MediaCard item={item} className="w-full h-full transition-transform duration-700 hover:scale-105" />
                        </div>
                    ))}
                </div>
            </div>

            {/* 6. CTA Section */}
            <div className="py-32 flex flex-col justify-center items-center text-center bg-rose-50 dark:bg-[#1a1a1a] transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-block px-6"
                >
                    <h3 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-slate-900 dark:text-white">See the Magic in Person</h3>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
                        These photos are just a glimpse. Experience the laughter, learning, and love firsthand.
                    </p>
                    <button
                        onClick={() => window.location.href = '/contact'}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-12 py-5 rounded-full text-xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        Schedule a Visit
                    </button>
                </motion.div>
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

// ===================================
// MAIN: INSIDE RENAISSANCE
// ===================================

const InsideRenaissance = () => {
    return (
        <div className="overflow-x-hidden">
            <LifeSection />
            <GallerySection />
        </div>
    );
};

export default InsideRenaissance;
