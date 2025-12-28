import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, Palette, Music, Dumbbell, BookOpen, Star, Sparkles, Trophy, Mic2, MapPin } from 'lucide-react';
import ImgWithFallback from '../components/ImgWithFallback';

const LifeAtRenaissance = () => {
    return (
        <div className="bg-cream-velvet dark:bg-bg-dark text-gulf-lebanese dark:text-text-light font-body transition-colors duration-300">

            {/* 1. Header with Floating Elements */}
            <div className="py-24 text-center px-4 relative overflow-hidden bg-white dark:bg-[#1a1a1a]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -left-20 w-64 h-64 border-4 border-dashed border-gulf-icy rounded-full opacity-30"
                />
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 text-charming-green opacity-20 hidden md:block"
                >
                    <Palette size={60} fill="currentColor" />
                </motion.div>
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-10 text-luxury-pink opacity-20"
                >
                    <Star size={80} fill="currentColor" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-5xl md:text-8xl font-heading font-extrabold text-gulf-lebanese mb-6 relative z-10"
                >
                    Life @ <span className="text-primary-carmine inline-block transform hover:scale-105 transition-transform duration-300">Renaissance</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-500 font-medium relative z-10"
                >
                    Where every day is a new adventure, and every corner is a stage for discovery.
                </motion.p>
            </div>

            {/* 2. Daily Activities - Levitating Cards */}
            <section className="py-20 px-6 max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading font-bold mb-4">A Day in the Life</h2>
                    <div className="w-24 h-1 bg-charming-green mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <LevitatingCard
                        icon={<BookOpen size={40} />}
                        title="Interactive Learning"
                        desc="Storytelling, phonics, and concept-based learning."
                        color="bg-gulf-icy"
                        delay={0}
                    />
                    <LevitatingCard
                        icon={<Palette size={40} />}
                        title="Art & Craft"
                        desc="Exploring creativity through colors, clay, and waste."
                        color="bg-luxury-pink"
                        delay={0.1}
                    />
                    <LevitatingCard
                        icon={<Music size={40} />}
                        title="Music & Dance"
                        desc="Rhythm, rhymes, and movement for expression."
                        color="bg-gentle-yellow"
                        delay={0.2}
                    />
                    <LevitatingCard
                        icon={<Dumbbell size={40} />}
                        title="Physical Play"
                        desc="Yoga, outdoor games, and sensory play activities."
                        color="bg-charming-green"
                        delay={0.3}
                    />
                </div>
            </section>

            {/* 3. IMMERSIVE EVENT SECTIONS WITH 3D TILT */}

            {/* SPORTS DAY - The "Energy" Section */}
            <section className="py-24 bg-white dark:bg-[#111] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-gulf-blue/10 text-gulf-blue px-4 py-2 rounded-full font-bold uppercase text-sm mb-6">
                            <Trophy size={16} /> Annual Sports Meet
                        </div>
                        <h2 className="text-5xl md:text-6xl font-heading font-extrabold mb-6">Champions in the Making</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            Our Sports Day is a spectacle of energy and teamwork! From sack races to relay sprints, every child gets a chance to shine on the podium.
                        </p>
                        <div className="flex gap-4">
                            <motion.div
                                animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                className="w-20 h-20 bg-gentle-yellow rounded-full flex items-center justify-center text-gulf-lebanese shadow-xl border-4 border-white"
                            >
                                <Trophy size={36} />
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -25, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
                                className="w-20 h-20 bg-primary-carmine rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white"
                            >
                                <Dumbbell size={36} />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* 3D TILT PHOTO */}
                    <TiltCard src="/sportdaymedal.jpeg" alt="Sports Day Medal" caption="PROUD MOMENTS" />
                </div>
            </section>

            {/* CULTURAL FEST - The "Magic" Section */}
            <section className="py-24 bg-gulf-lebanese text-white relative overflow-hidden">
                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full opacity-20 blur-sm"
                            style={{
                                width: Math.random() * 6 + 2 + 'px',
                                height: Math.random() * 6 + 2 + 'px',
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                            }}
                            animate={{
                                y: [0, -100],
                                opacity: [0, 0.5, 0]
                            }}
                            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5 }}
                        />
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* 3D TILT PHOTO (Left on Desktop) */}
                    <div className="order-2 md:order-1">
                        <TiltCard src="/RedDay/RedDay_1.jpeg" alt="Cultural Fest" caption="STAGE PERFORMANCE" />
                    </div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="order-1 md:order-2"
                    >
                        <div className="inline-flex items-center gap-2 bg-luxury-pink/20 text-luxury-pink px-4 py-2 rounded-full font-bold uppercase text-sm mb-6 border border-luxury-pink/50">
                            <Sparkles size={16} /> Cultural Extravaganza
                        </div>
                        <h2 className="text-5xl md:text-6xl font-heading font-extrabold mb-6 leading-tight">Stage is Set!</h2>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            From Diwali lights to Christmas carols, we celebrate diversity with grand stage performances. It's time for our little stars to shine under the spotlight.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <EventBadge icon={<Mic2 size={20} />} text="Singing" />
                            <EventBadge icon={<Music size={20} />} text="Dancing" />
                            <EventBadge icon={<Palette size={20} />} text="Drama" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* DAILY LIFE - The "Classroom" Section */}
            <section className="py-24 bg-cream-velvet dark:bg-bg-dark relative">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-charming-green/10 text-charming-green px-4 py-2 rounded-full font-bold uppercase text-sm mb-6 border border-charming-green/50">
                            <BookOpen size={16} /> Dynamic Classrooms
                        </div>
                        <h2 className="text-5xl md:text-6xl font-heading font-extrabold mb-6 text-gulf-lebanese">Learning Spaces</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            Our classrooms are designed to spark curiosity. Bright, airy, and full of learning resources that encourage hands-on exploration.
                        </p>
                    </motion.div>

                    <TiltCard src="/SchoolPremises/classroom3.png" alt="Classroom" caption="MODERN SPACES" />
                </div>
            </section>
        </div>
    );
};

// --- SOPHISTICATED SUB COMPONENTS ---

const LevitatingCard = ({ icon, title, desc, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay, duration: 0.6, type: "spring" }}
        whileHover={{ y: -15, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        className="bg-white dark:bg-[#222] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group items-center text-center"
    >
        <div className={`w-20 h-20 mx-auto rounded-3xl ${color} bg-opacity-20 flex items-center justify-center text-gulf-lebanese mb-6 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-2xl font-bold font-heading mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{desc}</p>
    </motion.div>
);

const TiltCard = ({ src, alt, caption }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set((clientX - left) / width - 0.5);
        y.set((clientY - top) / height - 0.5);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[4/5] rounded-[2.5rem] bg-gray-200 cursor-pointer perspective-[1000px] group"
        >
            <div className="absolute inset-0 bg-black rounded-[2.5rem] transform translate-y-4 translate-z-[-20px] blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border-[6px] border-white dark:border-gray-700 bg-white shadow-2xl">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                <div className="absolute bottom-6 left-0 w-full text-center z-20">
                    <span className="text-white font-bold tracking-[0.2em] text-sm border border-white/30 px-4 py-2 rounded-full backdrop-blur-md uppercase">{caption}</span>
                </div>

                <ImgWithFallback
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                />
            </div>
        </motion.div>
    );
};

const EventBadge = ({ icon, text }) => (
    <motion.span
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
        className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 text-sm font-bold cursor-default"
    >
        {icon} {text}
    </motion.span>
);

export default LifeAtRenaissance;
