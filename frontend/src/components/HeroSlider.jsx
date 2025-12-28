import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ImgWithFallback from './ImgWithFallback';

const HeroSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        fade: true,
        arrows: false,
        appendDots: dots => (
            <div style={{ bottom: "50px" }}>
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
    };

    const slides = [
        {
            id: 1,
            type: 'image',
            src: "/SchoolPremises/classplay.jpeg",  // Authenticity: Real play area
            title: "Nurturing Genius Minds",
            subtitle: "Where Curiosity Meets Confidence",
            color: "text-gulf-dark",
            highlight: "text-primary-carmine"
        },
        {
            id: 2,
            type: 'image',
            src: "/Activities/Activities_1.jpeg", // Authenticity: Real learning
            title: "Play, Learn, Grow",
            subtitle: "A Foundation for Lifelong Success",
            color: "text-charming-green",
            highlight: "text-gentle-sweet"
        },
        {
            id: 3,
            type: 'image',
            src: "/IndependenceDay/IndependenceDay_1.jpeg", // Authenticity: Real culture
            title: "Safe & Happy Space",
            subtitle: "Your Child's Second Home",
            color: "text-gulf-lebanese",
            highlight: "text-gulf-blue"
        }
    ];

    // Animation Variants for Text
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3
            }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="w-full h-[90vh] relative overflow-hidden group font-body">
            <Slider {...settings} className="h-full hero-slider">
                {slides.map((slide) => (
                    <div key={slide.id} className="relative w-full h-[90vh] overflow-hidden">

                        {/* Background with Ken Burns Effect */}
                        <motion.div
                            initial={{ scale: 1, transformOrigin: "center center" }}
                            whileInView={{ scale: 1.25 }} // Increased for drama
                            transition={{ duration: 12, ease: "linear", repeat: Infinity, repeatType: "reverse" }} // Slower, deeper zoom
                            className="absolute inset-0 w-full h-full"
                        >
                            <ImgWithFallback
                                src={slide.src}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
                        </motion.div>

                        {/* Organic Shape Overlay - Left Side Curve */}
                        <div className="absolute top-0 right-0 w-[60%] h-full bg-cream-velvet/95 dark:bg-[#111]/95 backdrop-blur-md rounded-l-[100px] md:rounded-l-[300px] transform translate-x-12 md:translate-x-0 transition-transform duration-700 hidden lg:block shadow-[-20px_0_50px_rgba(0,0,0,0.2)] z-10"></div>

                        {/* Mobile Bottom Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-cream-velvet via-cream-velvet/90 to-transparent lg:hidden z-10"></div>

                        {/* Content */}
                        <div className="relative z-20 h-full flex items-center justify-end px-6 md:px-20 max-w-[1400px] mx-auto">
                            <div className="lg:w-1/2 text-left space-y-8 pl-4 md:pl-12 pt-12 lg:pt-0">
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    key={slide.id} // Re-trigger animation on slide change
                                >
                                    {/* Badge */}
                                    <motion.div variants={letterVariants} className="flex items-center gap-3 mb-6">
                                        <span className="bg-gulf-lebanese text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                            Admissions Open 2025
                                        </span>
                                    </motion.div>

                                    {/* Main Title - Split for effect */}
                                    <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gulf-lebanese leading-[1.1] mb-6 drop-shadow-sm">
                                        {slide.title.split(' ').map((word, i) => (
                                            <span key={i} className="inline-block mr-4">
                                                {word.split('').map((char, index) => (
                                                    <motion.span key={index} variants={letterVariants} className="inline-block">
                                                        {char}
                                                    </motion.span>
                                                ))}
                                            </span>
                                        ))}
                                    </h1>

                                    <motion.p variants={letterVariants} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium max-w-lg mb-10 leading-relaxed">
                                        {slide.subtitle}
                                    </motion.p>

                                    <motion.div variants={letterVariants} className="flex flex-wrap gap-4">
                                        <NavLink
                                            to="/admission"
                                            className="inline-flex items-center gap-3 bg-gulf-dark text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-gulf-blue transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 duration-300"
                                        >
                                            Apply Now <ChevronRight size={20} />
                                        </NavLink>
                                        <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-gulf-lebanese text-gulf-lebanese font-bold hover:bg-gulf-lebanese hover:text-white transition-all duration-300 group">
                                            <div className="w-10 h-10 rounded-full bg-gulf-lebanese text-white flex items-center justify-center group-hover:bg-white group-hover:text-gulf-lebanese transition-colors shadow-md">
                                                <Play size={14} fill="currentColor" />
                                            </div>
                                            Watch Review
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Wavy Bottom Divider */}
            <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30">
                <svg viewBox="0 0 1440 100" className="w-full h-[50px] md:h-[80px] text-cream-velvet dark:text-[#1a1a1a] fill-current">
                    <path d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,53.3C1120,43,1280,21,1360,10.7L1440,0L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
                </svg>
            </div>
        </div>
    );
};

export default HeroSlider;
