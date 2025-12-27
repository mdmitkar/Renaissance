import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const HeroSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
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
            image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=1920",
            title: "Nurturing Genius Minds",
            subtitle: "Where Curiosity Meets Confidence",
            color: "text-gulf-dark",
            highlight: "text-primary-carmine"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1920",
            title: "Play, Learn, Grow",
            subtitle: "A Foundation for Lifelong Success",
            color: "text-charming-green",
            highlight: "text-gentle-sweet"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1596464716127-f9a8759fa069?auto=format&fit=crop&q=80&w=1920",
            title: "Safe & Happy Space",
            subtitle: "Your Child's Second Home",
            color: "text-gulf-lebanese",
            highlight: "text-gulf-blue"
        }
    ];

    return (
        <div className="w-full h-[85vh] relative overflow-hidden group">
            <Slider {...settings} className="h-full">
                {slides.map((slide) => (
                    <div key={slide.id} className="relative w-full h-[85vh]">
                        {/* Image Background */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-white/10 dark:bg-black/30 backdrop-blur-[1px]"></div>
                        </div>

                        {/* Organic Shape Overlay - Little Millennium Vibe */}
                        <div className="absolute top-0 right-0 w-[60%] h-full bg-cream-velvet/90 dark:bg-[#111]/90 backdrop-blur-md rounded-l-[100px] md:rounded-l-[300px] transform translate-x-20 md:translate-x-0 transition-transform duration-700 hidden sm:block"></div>

                        {/* Mobile Overlay */}
                        <div className="absolute inset-0 bg-cream-velvet/80 sm:hidden"></div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex items-center justify-end px-6 md:px-20 max-w-7xl mx-auto">
                            <div className="sm:w-1/2 text-left space-y-6 pl-4 md:pl-12">
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    key={slide.id}
                                >
                                    <h2 className="text-xl md:text-2xl font-body font-bold text-gulf-lebanese tracking-widest uppercase mb-2">
                                        Renaissance Preschool
                                    </h2>
                                    <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gulf-lebanese leading-tight mb-4">
                                        {slide.title.split(' ')[0]} <br />
                                        <span className={slide.highlight}>{slide.title.split(' ').slice(1).join(' ')}</span>
                                    </h1>
                                    <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 font-medium max-w-lg mb-8">
                                        {slide.subtitle}
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <NavLink
                                            to="/admission"
                                            className="inline-flex items-center gap-2 bg-gulf-dark text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-gulf-blue transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                                        >
                                            Enquire Now <ChevronRight size={20} />
                                        </NavLink>
                                        <button className="px-8 py-4 rounded-full border-2 border-gulf-lebanese text-gulf-lebanese font-bold hover:bg-gulf-lebanese hover:text-white transition-all">
                                            Watch Video
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Wavy Bottom */}
            <div className="absolute bottom-[-2px] left-0 w-full leading-none z-20">
                <svg viewBox="0 0 1440 120" className="w-full h-[60px] md:h-[100px] text-white dark:text-[#1a1a1a] fill-current">
                    <path d="M0,32L80,48C160,64,320,96,480,96C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                </svg>
            </div>
        </div>
    );
};

export default HeroSlider;
