import React, { useState, useRef, useEffect, useLayoutEffect, Component, useMemo } from 'react';
import SEO from '../components/SEO';
import { useLocation } from 'react-router-dom';
import Slider from "react-slick";
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Star, Heart, Trophy, X, PlayCircle, Play, ArrowDown, ChevronRight, ChevronLeft, PartyPopper, BookOpen } from 'lucide-react';
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
        galleryId: 'campus',
        images: [
            "../assets/cropschool_building_enhanced.png",
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
        id: 'jumuah-day',
        title: "Jumuah Day",
        description: "Celebrating faith, values, and community. A day filled with reflection, joy, and spiritual growth for our students.",
        date: "Faith & Values",
        folder: "New/Islamic Day",
        galleryId: 'jumuah_day',
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
        galleryId: 'childrens_day',
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
        galleryId: 'independence_day',
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
        galleryId: 'ptm',
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
        galleryId: 'red_day',
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
        galleryId: 'sports',
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
    },
    {
        id: 'reniesta',
        title: "RENIESTA - Fun Festival",
        description: "A vibrant festival where fun meets creativity! A spectacular day filled with games, laughter, and talent showcases that bring our entire community together.",
        date: "Festival of Joy",
        folder: "reniesta",
        galleryId: 'reniesta',
        images: [
            "reniesta1.png",
            "renista2.jpeg",
            "renista3.png",
            "reniesta4.jpeg",
            "reniesta5.png",
            "reniesta6.png"
        ],
        theme: {
            primary: "#8B5CF6", // Violet
            secondary: "#FCD34D", // Gold
            accent: "#FCD34D",
            shadow: "rgba(139, 92, 246, 0.4)",
            text: "#4C1D95" // Deep Violet
        },
        icon: <PartyPopper size={24} />
    },
    {
        id: 'teachers-day',
        title: "Teacher's Day",
        description: "Honoring the guiding lights of Renaissance. Our students express their gratitude and love through heartwarming performances and gestures for their beloved teachers.",
        date: "Gratitude & Growth",
        folder: "teachersday",
        galleryId: 'teachers_day',
        images: [
            "WhatsApp Image 2026-01-30 at 20.43.39 copy.jpeg",
            "WhatsApp Image 2026-01-30 at 20.43.39.jpeg",
            "WhatsApp Image 2026-01-30 at 20.43.41.jpeg",
            "objimage1.png"
        ],
        theme: {
            primary: "#3B82F6", // Blue
            secondary: "#10B981", // Emerald
            accent: "#10B981",
            shadow: "rgba(59, 130, 246, 0.4)",
            text: "#1E3A8A" // Dark Blue
        },
        icon: <BookOpen size={24} />
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
                            onClick={() => {
                                const element = document.getElementById(event.galleryId);
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
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

const TourOfRenaissance = () => {
    return (
        <div className="bg-[#F3F0E8] dark:bg-[#111] font-body transition-colors duration-300">
            {/* HERO HEADER */}
            <header className="relative w-full h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/SchoolPremises/insiderenaisacene].jpeg"
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
                    <h1 className="text-[12vw] md:text-[8vw] font-english font-normal text-[#D4AF37] mb-4 tracking-normal drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] whitespace-nowrap leading-none">
                        Tour of Renaissance
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

            {/* VIEW GALLERY NAV */}
            <div className="flex justify-center py-20 snap-start">
                <button
                    onClick={() => document.getElementById('gallery-start').scrollIntoView({ behavior: 'smooth' })}
                    className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-white/10 text-slate-900 dark:text-white rounded-full font-bold shadow-xl border border-white/20 hover:scale-105 hover:bg-rose-500 hover:text-white transition-all"
                >
                    View Our Full Gallery <ArrowDown className="group-hover:animate-bounce" size={20} />
                </button>
            </div>


        </div>
    );
};

// ===================================
// PART 2: GALLERY DATA & COMPONENT
// ===================================

const GALLERY_DATA = {
    events: [
        {
            id: 'activities',
            title: 'Activities',
            cover: '/Activities/Activities_1.jpeg',
            media: [
                { type: 'image', src: '/Activities/0.1.jpeg' },
                { type: 'image', src: '/Activities/Activities_4.jpeg' },
                { type: 'image', src: '/Activities/motor.jpeg' },
                { type: 'image', src: '/Activities/otherchemical.jpeg' },
                { type: 'image', src: '/Activities/otherchiolddraw.jpeg' },
                { type: 'image', src: '/Activities/otherimpkidplayball.jpeg' },
                { type: 'image', src: '/Activities/otherimprenistaclass.jpeg' },
                { type: 'image', src: '/Activities/otherkidinroom.jpeg' },
                { type: 'image', src: '/Activities/student_flower_craft_project.jpeg' },
                { type: 'image', src: '/Activities/students_group_drawing_on_floor.jpeg' },
                { type: 'video', src: '/Activities/Find the alphabets activity.mp4' },
                { type: 'video', src: '/Activities/Shapes exercise Activity.mp4' },
                { type: 'video', src: '/Activities/groupequiliactivity.mp4' },
                { type: 'video', src: '/Activities/psycomotorskullreels.mp4' },
                { type: 'video', src: '/Activities/renaisanecefiestareel.mp4' },
                { type: 'image', src: '/Activities/PTM_1.jpeg' }, // Moved from PTM
            ]
        },
        {
            id: 'sports',
            title: 'Sports',
            cover: '/SportsDay/newsportday.jpeg',
            media: [
                { type: 'image', src: '/SportsDay/newsportday.jpeg' },
                { type: 'image', src: '/SportsDay/sportday4.webp' },
                { type: 'image', src: '/SportsDay/sportdaymedal.jpeg' },
                { type: 'image', src: '/SportsDay/sportsday1.jpeg' },
                { type: 'image', src: '/SportsDay/student_with_awards_and_medals.jpeg' },
                { type: 'video', src: '/SportsDay/SportsDay_1.mp4' },
                { type: 'video', src: '/SportsDay/SportsDay_2.mp4' },
                { type: 'video', src: '/SportsDay/parentracesp[oprots.mp4' },
                { type: 'video', src: '/videos/sportsdayreel.mp4' },
            ]
        },
        {
            id: 'ptm',
            title: 'PTM',
            cover: '/PTM/PTM_5.jpeg',
            media: [
                { type: 'image', src: '/PTM/PTM_3.jpeg' },
                { type: 'image', src: '/PTM/PTM_5.jpeg' },
                { type: 'image', src: '/PTM/ptm6.jpeg' },
                { type: 'image', src: '/PTM/ptma.jpeg' },
                { type: 'image', src: '/PTM/ptmb.jpeg' },
            ]
        },
        {
            id: 'awards',
            title: 'Awards',
            cover: '/New/givingaward2/givingaward.jpeg',
            media: [
                { type: 'image', src: '/New/givingaward2/Activities_1.jpeg' },
                { type: 'image', src: '/New/givingaward2/Awards_2.jpeg' },
                { type: 'image', src: '/New/givingaward2/givingaward copy.jpeg' },
                { type: 'image', src: '/New/givingaward2/givingaward.jpeg' },
                { type: 'image', src: '/New/givingaward2/otherkidrecivinggift.jpeg' },
                { type: 'image', src: '/New/givingaward2/teachers_in_niqab_with_student.jpeg' },
                { type: 'image', src: '/New/givingaward2/teachers_with_student_and_gift.jpeg' },
            ]
        },
        {
            id: 'campus',
            title: 'Campus',
            cover: '/assets/cropschool_building_enhanced.png',
            media: [
                { type: 'image', src: '/SchoolPremises/classplay.jpeg' },
                { type: 'image', src: '/SchoolPremises/classroom1.jpeg' },
                { type: 'image', src: '/SchoolPremises/classroom2.jpeg' },
                { type: 'image', src: '/SchoolPremises/classroom3.png' },
                { type: 'image', src: '/SchoolPremises/classroom_panorama_view.jpeg' },
                { type: 'image', src: '/SchoolPremises/otherimpentry.jpeg' },
                { type: 'image', src: '/SchoolPremises/otherstaircase.jpeg' },
                { type: 'image', src: '/SchoolPremises/playground1.jpeg' },
                { type: 'image', src: '/SchoolPremises/playground2.jpeg' },
                { type: 'image', src: '/SchoolPremises/playground3.png' },
                { type: 'image', src: '/assets/cropschool_building_enhanced.png' },
                { type: 'image', src: '/SchoolPremises/schoolentry.jpeg' },
                { type: 'image', src: '/SchoolPremises/teachers_day_classroom_decorations.jpeg' },
                { type: 'video', src: '/videos/schooltour.mp4' },
                { type: 'video', src: '/videos/schooltourreel.mp4' },
            ]
        },
        {
            id: 'testimonials',
            title: 'Testimonials',
            cover: '/New/New Testimonials/newtest1.jpeg',
            media: [
                { type: 'image', src: '/New/New Testimonials/newtest1.jpeg' },
                { type: 'image', src: '/New/New Testimonials/newtest14.jpeg' },
                { type: 'image', src: '/New/New Testimonials/newtest2.jpeg' },
                { type: 'image', src: '/New/New Testimonials/newtest3.jpeg' },
                { type: 'image', src: '/New/New Testimonials/newtest4.jpeg' },
                { type: 'image', src: '/New/New Testimonials/newtest5.jpeg' },
                { type: 'image', src: '/New/New Testimonials/newtest6.jpeg' },
                { type: 'image', src: '/New/New Testimonials/newtest7.jpeg' },
                { type: 'image', src: '/New/New Testimonials/newtest8.jpeg' },
                { type: 'image', src: '/New/New Testimonials/newtest9.jpeg' },
                { type: 'video', src: '/New/New Testimonials/newtest10.mp4' },
                { type: 'video', src: '/New/New Testimonials/newtest11.mp4' },
                { type: 'video', src: '/New/New Testimonials/newtest12.mp4' },
                { type: 'video', src: '/New/New Testimonials/newtest4.mp4' },
                { type: 'video', src: '/New/New Testimonials/newtest5.mp4' },
                { type: 'video', src: '/New/New Testimonials/newtest6.mp4' },
                { type: 'video', src: '/New/New Testimonials/newtest7.mp4' },
                { type: 'video', src: '/New/New Testimonials/newtest8.mp4' },
                { type: 'video', src: '/New/New Testimonials/newtest9.mp4' },
                { type: 'video', src: '/videos/Testimonial_1.mp4' },
                { type: 'video', src: '/videos/Testimonial_2.mp4' },
                { type: 'video', src: '/videos/Testimonial_3.mp4' },
                { type: 'video', src: '/videos/testimonial_4.mp4' },
                { type: 'video', src: '/New/New Testimonials/testxx.mp4' },
            ]
        },
        {
            id: 'reniesta',
            title: 'RENIESTA',
            cover: '/reniesta/reniesta1.png',
            media: [
                { type: 'image', src: '/reniesta/reniesta1.png' },
                { type: 'image', src: '/reniesta/renista2.jpeg' },
                { type: 'image', src: '/reniesta/renista3.png' },
                { type: 'image', src: '/reniesta/reniesta4.jpeg' },
                { type: 'image', src: '/reniesta/reniesta5.png' },
                { type: 'image', src: '/reniesta/reniesta6.png' },
                { type: 'video', src: '/videos/reniestavideo.mp4', muted: true },
            ]
        }
    ],
    celebrations: [
        {
            id: 'childrens_day',
            title: "Children's Day",
            cover: '/ChildrensDay/ChildrenDay_2.jpeg',
            media: [
                { type: 'image', src: '/ChildrensDay/ChildrenDay_2.jpeg' },
                { type: 'image', src: '/ChildrensDay/ChildrensDay_1.jpeg' },
                { type: 'image', src: '/ChildrensDay/childrenday3.png' },
            ]
        },
        {
            id: 'independence_day',
            title: "Independence Day",
            cover: '/IndependenceDay/IndependenceDay_2.jpeg',
            media: [
                { type: 'image', src: '/IndependenceDay/IndependenceDay_1.jpeg' },
                { type: 'image', src: '/IndependenceDay/IndependenceDay_2.jpeg' },
                { type: 'image', src: '/IndependenceDay/IndependenceDay_4.jpeg' },
                { type: 'image', src: '/Activities/PTM_4.jpeg' }, // Moved from PTM
                { type: 'video', src: '/IndependenceDay/independence_day_reel.mp4' },
                { type: 'video', src: '/IndependenceDay/independence_day_activity.mp4' },
            ]
        },
        {
            id: 'jumuah_day',
            title: "Jumuah Day",
            cover: '/New/Islamic Day/ilamioc1.jpeg',
            media: [
                { type: 'image', src: '/New/Islamic Day/ilamioc1.jpeg' },
                { type: 'image', src: '/New/Islamic Day/islamic2.jpeg' },
                { type: 'image', src: '/New/Islamic Day/islamic3.jpeg' },
                { type: 'image', src: '/New/Islamic Day/islamic5.jpeg' },
                { type: 'image', src: '/New/Islamic Day/islamic6.jpeg' },
            ]
        },
        {
            id: 'red_day',
            title: "Red Day",
            cover: '/RedDay/REDDAY6.png',
            media: [
                { type: 'image', src: '/RedDay/REDDAY6.png' },
                { type: 'image', src: '/RedDay/RedDay_1.jpeg' },
                { type: 'image', src: '/RedDay/redday5.jpeg' },
                { type: 'video', src: '/RedDay/reddayvideo.mp4' },
                { type: 'video', src: '/videos/reddayreel.mp4' },
            ]
        },
        {
            id: 'teachers_day',
            title: "Teacher's Day",
            cover: '/teachersday/WhatsApp Image 2026-01-30 at 20.43.39.jpeg',
            media: [
                { type: 'image', src: '/teachersday/objimage1.png' },
                { type: 'image', src: '/teachersday/WhatsApp Image 2026-01-30 at 20.43.39.jpeg' },
                { type: 'video', src: '/teachersday/WhatsApp Video 2026-01-30 at 20.43.43.mp4' },
                { type: 'image', src: '/teachersday/WhatsApp Image 2026-01-30 at 20.43.41.jpeg' },
                { type: 'video', src: '/teachersday/objren.mp4' },
            ]
        }
    ]
};

const SectionHeader = ({ title, subtitle, color = "text-slate-900", className = "" }) => {
    return (
        <div className={`mb-12 md:mb-20 px-6 ${className}`}>
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true }}
                className={`text-sm font-bold uppercase tracking-[0.2em] mb-3 ${color} dark:text-white/70`}
            >
                {subtitle}
            </motion.h3>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`text-4xl md:text-6xl font-black ${color} dark:text-white`}
            >
                {title}
            </motion.h2>
        </div>
    );
};

const MediaCard = ({ item, onClick, className = "" }) => {
    const videoRef = useRef(null);
    const [hover, setHover] = useState(false);

    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#1a1a1a] cursor-pointer group shadow-lg border border-black/5 dark:border-white/10 w-full h-full ${className}`}
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
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 block"
                        muted loop playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity bg-black/20">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/40">
                            <PlayCircle className="text-white w-8 h-8 md:w-10 md:h-10" />
                        </div>
                    </div>
                </>
            ) : (
                <ImgWithFallback
                    src={item.src}
                    alt={item.title || "Gallery Image"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 block"
                />
            )}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
    );
};

const GallerySection = () => {
    const containerRef = useRef(null);
    const reelsRef = useRef(null);
    const location = useLocation();
    const [selectedMedia, setSelectedMedia] = useState(null);

    const videoSchema = useMemo(() => {
        const allMedia = [...GALLERY_DATA.events, ...GALLERY_DATA.celebrations].flatMap(album => album.media);
        const videos = allMedia.filter(m => m.type === 'video');

        return videos.map(video => ({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": video.src.split('/').pop().replace('.mp4', '').replace(/_/g, ' '), // Fallback title from filename if title missing in media item
            "description": "Video from Renaissance Preschool gallery.",
            "thumbnailUrl": "https://renaissancepreschool.in/logo.jpeg",
            "uploadDate": "2024-01-01T08:00:00+08:00",
            "contentUrl": `https://renaissancepreschool.in${video.src}`
        }));
    }, []);

    // Fix: Handle Hash Scrolling on Mount and Location Change
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500); // Small delay to ensure content is rendered
        }
    }, [location]);

    // Keyboard Navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedMedia) return;
            const allMedia = [...GALLERY_DATA.events, ...GALLERY_DATA.celebrations].flatMap(album => album.media);
            const currentIndex = allMedia.findIndex(m => m === selectedMedia) || allMedia.findIndex(m => m.src === selectedMedia.src);

            if (e.key === 'ArrowRight') {
                const nextIndex = (currentIndex + 1) % allMedia.length;
                setSelectedMedia(allMedia[nextIndex]);
            } else if (e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + allMedia.length) % allMedia.length;
                setSelectedMedia(allMedia[prevIndex]);
            } else if (e.key === 'Escape') {
                setSelectedMedia(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedMedia]);

    const scrollReels = (direction) => {
        if (reelsRef.current) {
            reelsRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
        }
    };

    return (
        <div ref={containerRef} className="bg-slate-50 dark:bg-black min-h-screen text-slate-800 dark:text-gray-200 font-sans transition-colors duration-300 pb-20" id="gallery-start">

            {/* 1. Header & Navigation */}
            <div className="pt-20 pb-10 text-center bg-slate-50 dark:bg-black transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-normal text-slate-800 dark:text-white mb-4 px-4 break-words">
                        Our Whole Gallery
                    </h2>
                    <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full mb-8"></div>
                </motion.div>
            </div>

            {/* 2. Featured Reels (Stories in Motion) */}
            <div className="reels-section max-w-[1920px] mx-auto mb-24 relative z-20 pl-6 md:pl-12">
                <div className="max-w-7xl mb-1 pr-6 flex justify-between items-end">
                    <SectionHeader title="Highlights" subtitle="Stories in Motion" className="!mb-4" />
                    <div className="flex gap-4 mb-4 md:mr-10">
                        <button onClick={() => scrollReels('left')} className="p-3 bg-white dark:bg-white/10 rounded-full shadow-lg border border-gray-100 dark:border-white/20 hover:scale-110 active:scale-95 transition-all text-slate-800 dark:text-white"><ChevronLeft size={24} /></button>
                        <button onClick={() => scrollReels('right')} className="p-3 bg-white dark:bg-white/10 rounded-full shadow-lg border border-gray-100 dark:border-white/20 hover:scale-110 active:scale-95 transition-all text-slate-800 dark:text-white"><ChevronRight size={24} /></button>
                    </div>
                </div>
                <div ref={reelsRef} className="pt-3 flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x no-scrollbar pr-6 scroll-smooth">
                    {GALLERY_DATA.events.flatMap(e => e.media).filter(m => m.type === 'video').slice(0, 8).map((item, i) => (
                        <div key={i} className="reel-card snap-center shrink-0">
                            <div className="w-[180px] h-[320px] sm:w-[240px] sm:h-[420px]">
                                <MediaCard item={item} onClick={() => setSelectedMedia(item)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Main Stacked Gallery Sections */}

            {/* EVENTS SECTION */}
            <div id="events-section" className="max-w-[1920px] mx-auto mb-32 pt-10 scroll-mt-24">
                <div className="bg-slate-200 dark:bg-white/5 py-12 mb-12 shadow-inner">
                    {/* Visibility Fix: Changed text color to text-slate-600 for better visibility in light mode */}
                    <h2 className="text-3xl sm:text-5xl md:text-8xl font-black text-center text-slate-600 dark:text-white/80 tracking-widest uppercase mb-4 px-4 break-words">Events</h2>
                    <div className="flex flex-wrap justify-center gap-4 px-4 sticky top-24 z-30">
                        {GALLERY_DATA.events.map(event => (
                            <a key={event.id} href={`#${event.id}`} className="px-6 py-2 bg-white dark:bg-black rounded-full shadow-md text-sm font-bold uppercase hover:bg-rose-500 hover:text-white transition-colors">{event.title}</a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-32">
                    {GALLERY_DATA.events.map((album) => (
                        <div key={album.id} id={album.id} className="scroll-mt-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-12 border-b border-black/10 dark:border-white/10 pb-6">
                                <h3 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white">{album.title}</h3>
                                <span className="text-lg text-slate-500 dark:text-gray-400 font-medium pb-2">
                                    {album.media.length} Memories
                                </span>
                            </div>

                            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                                {album.media.map((item, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "50px" }}
                                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                                        key={idx}
                                        className="break-inside-avoid mb-8"
                                    >
                                        <MediaCard item={item} onClick={() => setSelectedMedia(item)} className={item.type === 'video' ? 'aspect-video shadow-2xl' : 'shadow-xl'} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CELEBRATIONS SECTION */}
            <div id="celebrations-section" className="max-w-[1920px] mx-auto mb-32 pt-10 scroll-mt-24">
                <div className="bg-slate-200 dark:bg-white/5 py-12 mb-12 shadow-inner">
                    {/* Visibility Fix: Changed text color to text-slate-600 for better visibility in light mode */}
                    <h2 className="text-3xl sm:text-5xl md:text-8xl font-black text-center text-slate-600 dark:text-white/80 tracking-widest uppercase mb-4 px-4 break-words">Celebrations</h2>
                    <div className="flex flex-wrap justify-center gap-4 px-4 sticky top-24 z-30">
                        {GALLERY_DATA.celebrations.map(event => (
                            <a key={event.id} href={`#${event.id}`} className="px-6 py-2 bg-white dark:bg-black rounded-full shadow-md text-sm font-bold uppercase hover:bg-rose-500 hover:text-white transition-colors">{event.title}</a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-32">
                    {GALLERY_DATA.celebrations.map((album) => (
                        <div key={album.id} id={album.id} className="scroll-mt-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-12 border-b border-black/10 dark:border-white/10 pb-6">
                                <h3 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white">{album.title}</h3>
                                <span className="text-lg text-slate-500 dark:text-gray-400 font-medium pb-2">
                                    {album.media.length} Memories
                                </span>
                            </div>

                            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                                {album.media.map((item, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "50px" }}
                                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                                        key={idx}
                                        className="break-inside-avoid mb-8"
                                    >
                                        <MediaCard item={item} onClick={() => setSelectedMedia(item)} className={item.type === 'video' ? 'aspect-video shadow-2xl' : 'shadow-xl'} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* LIGHTBOX OVERLAY */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedMedia(null)}
                    >
                        <button className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors z-50">
                            <X size={24} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-all hover:scale-110 z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                const allMedia = [...GALLERY_DATA.events, ...GALLERY_DATA.celebrations].flatMap(album => album.media);
                                const currentIndex = allMedia.findIndex(m => m === selectedMedia) || allMedia.findIndex(m => m.src === selectedMedia.src); // Fallback to src check
                                const prevIndex = (currentIndex - 1 + allMedia.length) % allMedia.length;
                                setSelectedMedia(allMedia[prevIndex]);
                            }}
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-all hover:scale-110 z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                const allMedia = [...GALLERY_DATA.events, ...GALLERY_DATA.celebrations].flatMap(album => album.media);
                                const currentIndex = allMedia.findIndex(m => m === selectedMedia) || allMedia.findIndex(m => m.src === selectedMedia.src);
                                const nextIndex = (currentIndex + 1) % allMedia.length;
                                setSelectedMedia(allMedia[nextIndex]);
                            }}
                        >
                            <ChevronRight size={32} />
                        </button>


                        <div
                            className="w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                key={selectedMedia.src} // Key change triggers animation
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full flex flex-col items-center justify-center"
                            >
                                {selectedMedia.type === 'video' ? (
                                    <div className="relative w-full aspect-video md:aspect-auto md:h-[80vh]">
                                        <video
                                            src={selectedMedia.src}
                                            controls
                                            autoPlay
                                            muted={selectedMedia.muted}
                                            className="w-full h-full object-contain rounded-lg shadow-2xl"
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={selectedMedia.src}
                                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                        alt={selectedMedia.title || "Gallery Moment"}
                                    />
                                )}
                                <h3 className="text-white/80 text-xl font-medium mt-6 text-center">{selectedMedia.title || "Gallery Moment"}</h3>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA Section */}
            <div className="py-32 flex flex-col justify-center items-center text-center bg-rose-50 dark:bg-[#1a1a1a] transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-block px-6"
                >
                    <h3 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-slate-900 dark:text-white">See the Magic in Person</h3>
                    <p className="text-lg md:text-2xl text-slate-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
                        Visit us with your child & experience the atmosphere personally
                    </p>
                    <button
                        onClick={() => window.location.href = '/contact'}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-12 py-5 rounded-full text-xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        Schedule a Visit
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

// ===================================
// MAIN: INSIDE RENAISSANCE
// ===================================


const TourOfRenaissancePage = () => {
    const videoSchema = useMemo(() => {
        const allMedia = [...GALLERY_DATA.events, ...GALLERY_DATA.celebrations].flatMap(album => album.media);
        const videos = allMedia.filter(m => m.type === 'video');

        return videos.map(video => ({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            'name': video.src.split('/').pop().replace('.mp4', '').replace(/_/g, ' '),
            'description': 'Video from Renaissance Preschool gallery.',
            'thumbnailUrl': 'https://renaissancepreschool.in/logo.jpeg',
            'uploadDate': '2024-01-01T08:00:00+08:00',
            'contentUrl': `https://renaissancepreschool.in${video.src}`
        }));
    }, []);

    return (
        <div className='overflow-x-hidden'>
            <SEO
                title='Tour of Renaissance - Gallery & Events'
                description='Explore the vibrant life at Renaissance Preschool. From events and celebrations to daily learning activities.'
                canonical='/tour-of-renaissance'
                schema={videoSchema}
            />
            <TourOfRenaissance />
            <GallerySection />
        </div>
    );
};

export default TourOfRenaissancePage;

