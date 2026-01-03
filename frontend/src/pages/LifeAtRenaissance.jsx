import React, { useRef, useEffect } from 'react';
import Slider from "react-slick";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Star, Heart, Trophy, Music, Shield, Sprout, GraduationCap, Palette } from 'lucide-react';
import ImgWithFallback from '../components/ImgWithFallback';
import Footer from '../components/Footer';

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

const LifeAtRenaissance = () => {




    return (
        <div className="bg-[#F3F0E8] dark:bg-[#111] min-h-screen font-body transition-colors duration-300">



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
                        Life @ Renaissance
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
