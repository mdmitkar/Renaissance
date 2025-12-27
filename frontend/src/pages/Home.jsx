import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, BookOpen, BrainCircuit, Star, Quote, ChevronRight, Calculator, Users, Trophy, Smile, Heart, Palette, Music, Sun, Cloud, PenTool, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import AdmissionModal from '../components/AdmissionModal';

const HERO_SLIDES = [
    "/assets/hero-slide-1.png",
    "/assets/hero-slide-2.png",
    "/assets/hero-slide-3.png",
    "/assets/hero-slide-4.png",
    "/assets/hero-slide-5.png",
    "/assets/hero-slide-6.png"
];

const Home = () => {
    const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slides
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 3000); // Faster slideshow (3 seconds)
        return () => clearInterval(timer);
    }, []);

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={targetRef} className="flex flex-col w-full relative overflow-x-hidden font-body bg-cream-velvet text-gulf-lebanese selection:bg-gulf-blue selection:text-white">

            {/* HERO SECTION - Redesigned for High Contrast & Playfulness */}
            <section className="relative w-full h-[110vh] min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* Parallax Background */}
                {/* Parallax Background - Video Hero */}
                {/* Parallax Background - Slideshow Hero */}
                <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={currentSlide}
                            src={HERO_SLIDES[currentSlide]}
                            alt="Hero Slide"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.6]"
                        />
                    </AnimatePresence>
                    {/* Modern Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-gulf-lebanese/90"></div>
                </motion.div>

                {/* Animated Floating Blobs */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 w-32 h-32 bg-charming-green/30 rounded-full blur-2xl z-0"
                />
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-40 right-10 w-48 h-48 bg-gulf-blue/30 rounded-full blur-3xl z-0"
                />

                {/* Content Container - Glassmorph Card for extreme contrast */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-24">
                    <motion.div
                        style={{ y: textY }}
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-20 bg-white/10 backdrop-blur-xl border-4 border-white/30 p-6 md:p-8 rounded-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.3)] max-w-2xl text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-1.5 rounded-full font-bold text-base mb-6 shadow-lg transform -rotate-2 border-2 border-white"
                        >
                            ★ Est. 2025
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-white leading-tight drop-shadow-2xl mb-3 tracking-tight">
                            RENAISSANCE
                        </h1>

                        <h2 className="text-2xl md:text-4xl font-handwriting font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-400 to-yellow-300 drop-shadow-md mb-8 block leading-relaxed">
                            Learning Through <br /> Love & Laughter
                        </h2>

                        <p className="text-lg md:text-xl text-gray-100 mb-8 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                            A world where every child is a masterpiece. <br />
                            <span className="flex items-center justify-center gap-2 mt-3 text-base bg-black/30 inline-flex px-5 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
                                📍 Kuwari Compound, Bubere Hall Road, Bhiwandi
                            </span>
                        </p>

                        <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsAdmissionOpen(true)}
                                className="bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold px-8 py-3 rounded-full text-xl shadow-[0_5px_20px_rgba(225,29,72,0.5)] border-4 border-white/20 flex items-center gap-2 relative overflow-hidden group w-full md:w-auto justify-center"
                            >
                                <span className="relative z-10">Enroll Now</span>
                                <ArrowRight className="relative z-10" size={24} />
                                {/* Shine effect */}
                                <div className="absolute top-0 left-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
                            </motion.button>

                            <NavLink to="/gallery" className="w-full md:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white/90 text-gulf-blue font-bold px-8 py-3 rounded-full text-xl shadow-[0_5px_20px_rgba(255,255,255,0.3)] border-4 border-white/50 flex items-center gap-2 hover:bg-white transition-colors justify-center w-full"
                                >
                                    View Gallery
                                </motion.button>
                            </NavLink>
                        </div>
                    </motion.div>
                </div>

                {/* Wave Divider at Bottom */}
                <div className="absolute bottom-0 left-0 w-full leading-none z-20">
                    <svg className="block w-full h-16 md:h-32" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* CURRICULUM FLOWER SECTION - "Seven Petals" FLIP CARDS */}
            <section className="py-24 bg-white dark:bg-[#1a1a1a] relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className="mb-16"
                    >
                        <div className="relative inline-block">
                            {/* Rotating Flower Decor - Moved to Header */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-12 -left-16 w-32 h-32 border-[3px] border-dashed border-gulf-blue/20 rounded-full opacity-50 hidden md:block"
                            />
                            <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-gulf-lebanese relative z-10">
                                The <span className="text-primary-carmine relative inline-block">
                                    Science
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-gentle-yellow" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                                    </svg>
                                </span> of Learning
                            </h2>
                        </div>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-6 font-body">
                            Our proprietary <strong>"Seven Petals"</strong> curriculum ensures holistic growth. <br />
                            <span className="text-sm text-gulf-blue font-semibold uppercase tracking-wider">(Hover over the cards to explore)</span>
                        </p>
                    </motion.div>

                    {/* The Grid Layout with FLIP CARDS - 6 In A Line Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 align-top">
                        <FlipCard
                            icon={<BrainCircuit size={40} />}
                            title="Cognitive Skills"
                            desc="Developing memory, logic, and critical thinking."
                            frontColor="bg-gulf-icy"
                            backColor="bg-gulf-dark text-white"
                            index={0}
                        />
                        <FlipCard
                            icon={<Heart size={40} />}
                            title="Socio-Emotional"
                            desc="Building empathy, bonding, and emotional intelligence."
                            frontColor="bg-luxury-pink"
                            backColor="bg-primary-carmine text-white"
                            index={1}
                        />
                        <FlipCard
                            icon={<BookOpen size={40} />}
                            title="Linguistic"
                            desc="Vocabulary, phonics, and communication mastery."
                            frontColor="bg-gulf-blue"
                            backColor="bg-gulf-lebanese text-white"
                            index={2}
                        />
                        <FlipCard
                            icon={<Shield size={40} />}
                            title="Fine Motor"
                            desc="Dexterity, grip, and physical coordination."
                            frontColor="bg-charming-green"
                            backColor="bg-charming-como text-white"
                            index={3}
                        />
                        <FlipCard
                            icon={<Palette size={40} />}
                            title="Creativity"
                            desc="Art, craft, imagination, and expression."
                            frontColor="bg-gentle-yellow"
                            backColor="bg-amber-600 text-white"
                            index={4}
                        />
                        <FlipCard
                            icon={<Sun size={40} />}
                            title="Personal Awareness"
                            desc="Self-care, hygiene, and independence."
                            frontColor="bg-desert-coral"
                            backColor="bg-orange-700 text-white"
                            index={5}
                        />
                    </div>
                </div>
            </section>

            {/* STATS SECTION - Wavy & Modern */}
            <section className="py-24 bg-gulf-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-dots"></div> {/* Requires pattern css or just use simple */}

                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
                    <StatBubble number="1500+" label="Happy Students" delay={0.1} />
                    <StatBubble number="50+" label="Expert Teachers" delay={0.2} />
                    <StatBubble number="20+" label="Years Legacy" delay={0.3} />
                    <StatBubble number="100%" label="Parent Satisfaction" delay={0.4} />
                </div>
            </section>

            {/* OUR PROGRAMS - Cards with Hover Lift */}
            <section className="py-24 bg-bg-cream text-gulf-lebanese relative">
                {/* Top Wave */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                    <svg className="block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#0060AA"></path>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-heading font-extrabold">
                            Our <span className="text-charming-green">Learning Programs</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Program Card Data to save space */}
                        <ProgramCard title="Playgroup" age="1.5 - 2.5 Years" bg="bg-gulf-icy" img="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=400" />
                        <ProgramCard title="Nursery" age="2.5 - 3.5 Years" bg="bg-gentle-sweet" img="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400" />
                        <ProgramCard title="Junior KG" age="3.5 - 4.5 Years" bg="bg-desert-coral" img="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400" />
                        <ProgramCard title="Senior KG" age="4.5 - 5.5 Years" bg="bg-charming-green" img="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=400" />
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-20 bg-white dark:bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl text-center font-heading font-bold mb-12 text-gulf-lebanese">Parent Love</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <TestimonialCard name="Sana Shaikh" text="It feels like a second home for my child. The colors, the teachers, everything is just perfect!" color="bg-cream-velvet border-b-4 border-primary-carmine" />
                        <TestimonialCard name="Rajesh Verma" text="The 'Seven Petals' curriculum really works. I see holistic growth in my daughter." color="bg-cream-velvet border-b-4 border-gulf-blue" />
                        <TestimonialCard name="Anita D'Souza" text="Best preschool in the city. Safe, modern, and very professional." color="bg-cream-velvet border-b-4 border-charming-green" />
                    </div>
                </div>
            </section>

            {/* CTA - Floating Card */}
            <div className="py-20 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-32 h-32 bg-charming-green rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/2 right-0 w-32 h-32 bg-luxury-pink rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                <div className="max-w-5xl mx-auto bg-gradient-to-r from-gulf-dark to-gulf-blue rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden z-10 transition-transform hover:scale-[1.01] duration-500">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Start Your Child's Journey Today</h2>
                        <button onClick={() => setIsAdmissionOpen(true)} className="bg-gentle-yellow text-gulf-lebanese font-bold px-10 py-4 rounded-full text-xl hover:bg-white transition-all shadow-lg hover:scale-105">
                            Enroll Now
                        </button>
                    </div>
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                </div>
            </div>

            <AdmissionModal isOpen={isAdmissionOpen} onClose={() => setIsAdmissionOpen(false)} />

        </div>
    );
};

// --- FLIP CARD COMPONENT ---
const FlipCard = ({ icon, title, desc, frontColor, backColor, index }) => (
    <div className="group h-64 perspective-[1000px] cursor-pointer">
        <div className="relative w-full h-full text-center transition-all duration-700 transform-style-3d group-hover:rotate-y-180 rounded-[2.5rem] shadow-xl">
            {/* Front Face */}
            <div className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center backface-hidden rounded-[2.5rem] ${frontColor} p-6 shadow-md`}>
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-inner text-gulf-lebanese">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-gulf-lebanese font-heading text-center">{title}</h3>
                <div className="absolute bottom-6 text-gulf-lebanese/50 text-sm font-semibold">Hover to see more</div>
            </div>

            {/* Back Face */}
            <div className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center backface-hidden rotate-y-180 rounded-[2.5rem] ${backColor} p-8 shadow-md`}>
                <h3 className="text-2xl font-bold mb-4 font-heading">{title}</h3>
                <p className="text-lg font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
    </div>
);

const StatBubble = ({ number, label, delay }) => (
    <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", delay: delay }}
        className="rounded-[2.5rem] bg-white/10 backdrop-blur-sm p-6 border border-white/20 hover:bg-white/20 transition-all cursor-default group"
    >
        <h3 className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">{number}</h3>
        <p className="text-gulf-icy font-medium">{label}</p>
    </motion.div>
);

const ProgramCard = ({ title, age, bg, img }) => (
    <motion.div
        whileHover={{ y: -15 }}
        className="group relative rounded-[2.5rem] overflow-hidden shadow-xl h-96 cursor-pointer"
    >
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 text-white">
            <div className={`${bg} text-gulf-lebanese text-xs font-bold px-3 py-1 rounded-full inline-block mb-2 group-hover:bg-white transition-colors`}>
                {age}
            </div>
            <h3 className="text-3xl font-heading font-bold mb-1">{title}</h3>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm translate-y-4 group-hover:translate-y-0">Click to view curriculum details</p>
        </div>
    </motion.div>
);

const TestimonialCard = ({ name, text, color }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className={`p-8 rounded-[2rem] shadow-lg ${color} relative`}
    >
        <Quote className="text-gray-300 mb-4" size={40} />
        <p className="text-lg text-gray-700 italic mb-6">"{text}"</p>
        <div className="font-bold text-gulf-lebanese relative z-10">- {name}</div>
        <div className="absolute bottom-4 right-4 text-9xl text-black/5 font-heading opacity-50 select-none">”</div>
    </motion.div>
);

export default Home;
