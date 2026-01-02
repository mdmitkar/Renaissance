import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Heart, Award, Users, Star, BrainCircuit } from 'lucide-react';
import gsap from 'gsap';

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div ref={containerRef} className="min-h-screen bg-cream-velvet font-body text-slate-800 overflow-x-hidden selection:bg-rose-500 selection:text-white">

            {/* --- HERO SECTION --- */}
            {/* --- HERO SECTION --- */}
            <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: heroY }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="/assets/school_building_enhanced.png"
                        alt="Renaissance Building"
                        className="w-full h-full object-cover filter brightness-[0.85]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/60"></div>
                </motion.div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="inline-block py-2 px-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold tracking-widest text-sm mb-8 uppercase shadow-lg">
                            Welcome to Excellence
                        </span>
                        <h1 className="text-7xl md:text-9xl font-heading font-black text-white mb-6 tracking-tight drop-shadow-2xl">
                            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">US</span>
                        </h1>
                        <p className="text-xl md:text-3xl font-light text-slate-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-body">
                            Knowing the heart behind Renaissance.
                        </p>
                    </motion.div>
                </div>

                {/* Wave Separator */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#FDFBF7"></path>
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

                {/* --- 1. LEGACY SECTION --- */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-rose-600 font-bold tracking-widest uppercase text-sm mb-4">Who We Are</h3>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 text-gulf-blue leading-tight">
                            A Legacy of <br />
                            <span className="relative inline-block">
                                <span className="relative z-10">Love & Learning</span>
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-200/60 -z-0"></span>
                            </span>
                        </h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                            <p>
                                Established in <strong>2025</strong>, Renaissance Preschool was born from a simple yet powerful belief: that education should be an adventure, not a chore.
                            </p>
                            <p>
                                Our architecture, our curriculum, and our teachers all share a common purpose - to spark curiosity and nurture the unique potential within every child.
                            </p>
                        </div>
                    </motion.div>

                    <div className="relative group perspective-1000">
                        <div className="absolute inset-0 bg-gulf-blue rounded-[3rem] transform rotate-6 scale-95 opacity-20 group-hover:rotate-3 transition-all duration-500"></div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transform transition-transform duration-500 hover:-translate-y-2"
                        >
                            <img
                                src="/SchoolPremises/classroom2.jpeg"
                                alt="Modern Classroom"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                                <p className="font-bold text-xl">Modern Learning Spaces</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- 2. TIMELINE SECTION --- */}
                <section className="mb-32 relative">
                    <div className="text-center mb-20">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-bold tracking-wider mb-4">HISTORY</span>
                        <h2 className="text-5xl font-heading font-black text-gulf-blue">Our Journey</h2>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <TimelineSvg />
                        <div className="space-y-32 relative z-10 pt-10">
                            {JOURNEY_DATA.map((item, index) => (
                                <TimelineItem key={index} data={item} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 3. MANAGEMENT DESK --- */}
                <section className="relative mb-32">
                    <div className="absolute inset-0 bg-gulf-blue rounded-[3rem] transform -rotate-1 opacity-10"></div>
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl relative overflow-hidden border border-slate-100"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                            <div className="md:col-span-4 relative">
                                <div className="absolute inset-0 bg-yellow-400 rounded-2xl transform translate-x-4 translate-y-4"></div>
                                <img
                                    src="/assets/management-profile.png"
                                    alt="Principal"
                                    className="w-full h-auto rounded-2xl shadow-lg relative z-10 grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <div className="md:col-span-8 space-y-8">
                                <div>
                                    <h3 className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-2">From the Management's Desk</h3>
                                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-gulf-blue">Shaping Tomorrow's Leaders</h2>
                                </div>
                                <div className="relative">
                                    <QuoteIcon className="absolute -top-6 -left-8 text-yellow-400/30 w-16 h-16" />
                                    <p className="text-xl text-slate-700 italic leading-relaxed font-serif relative z-10">
                                        "At Renaissance, we believe that the early years are the most critical in a child's life. Our mission is to create a safe, joyful, and stimulating environment where every child feels loved, valued, and inspired to explore the world around them."
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="h-px bg-slate-200 flex-1"></div>
                                    <span className="font-heading font-bold text-lg text-gulf-blue">The Principal</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* --- 4. VALUES GRID --- */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={<Target size={32} />}
                            title="Our Mission"
                            desc="Holistic learning through play and discovery, fostering curiosity that lasts a lifetime."
                            color="text-blue-600"
                            bg="bg-blue-50"
                        />
                        <ValueCard
                            icon={<Heart size={32} />}
                            title="Our Vision"
                            desc="To be a beacon of educational excellence where every child's potential is recognized."
                            color="text-rose-600"
                            bg="bg-rose-50"
                        />
                        <ValueCard
                            icon={<Users size={32} />}
                            title="Our Values"
                            desc="Integrity, Inclusivity, Compassion, and a relentless commitment to quality education."
                            color="text-emerald-600"
                            bg="bg-emerald-50"
                        />
                    </div>
                </section>

            </div>
        </div>
    );
};

const QuoteIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21L14.017 18C14.017 16.896 14.325 16.053 14.941 15.471C15.557 14.89 16.391 14.599 17.442 14.599L19.262 14.599C19.068 13.926 18.97 13.313 18.97 12.761C18.97 11.428 19.922 10.155 21.825 8.941L21.825 8L17.708 8C16.273 8 15.111 8.525 14.223 9.574C13.334 10.624 12.89 11.838 12.89 13.217L12.89 21L14.017 21ZM5 21L5 18C5 16.896 5.308 16.053 5.925 15.471C6.541 14.89 7.375 14.599 8.425 14.599L10.245 14.599C10.051 13.926 9.954 13.313 9.954 12.761C9.954 11.428 10.905 10.155 12.809 8.941L12.809 8L8.691 8C7.257 8 6.095 8.525 5.206 9.574C4.318 10.624 3.873 11.838 3.873 13.217L3.873 21L5 21Z" />
    </svg>
);

const TimelineSvg = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end center"]
    });

    return (
        <div ref={ref} className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 h-full z-0">
            <svg className="absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 w-full h-full overflow-visible">
                <motion.path
                    d="M 1 0 L 1 1500" // Arbitrary long height, clipped by div
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <motion.path
                    d="M 1 0 L 1 1500"
                    fill="none"
                    stroke="#0060AA"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{ pathLength: scrollYProgress }}
                />
            </svg>
        </div>
    );
};

const TimelineItem = ({ data, index }) => {
    const isEven = index % 2 === 0;
    return (
        <div className={`flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''} relative group pl-16 md:pl-0`}>

            {/* Center Dot */}
            <div className={`absolute left-[20px] md:left-1/2 md:-ml-2.5 w-5 h-5 rounded-full border-4 border-white bg-blue-600 z-20 shadow-lg transform group-hover:scale-150 transition-transform duration-300`}></div>

            {/* Spacer */}
            <div className="hidden md:block w-1/2"></div>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 30, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5 }}
                className={`w-full md:w-[45%] bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
            >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${data.accent} opacity-10 rounded-bl-[100%] transition-transform duration-500 group-hover:scale-150`}></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`px-4 py-1 rounded-full text-sm font-bold bg-slate-100 text-slate-800 border border-slate-200`}>{data.year}</span>
                        <div className={`text-slate-600`}>{data.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-3 text-slate-900">{data.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">{data.desc}</p>
                </div>
            </motion.div>
        </div>
    );
};

const ValueCard = ({ icon, title, desc, color, bg }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="bg-white p-10 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all border border-slate-100 text-center group"
    >
        <div className={`w-20 h-20 mx-auto rounded-full ${bg} ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-2xl font-heading font-black mb-4 text-slate-800">{title}</h3>
        <p className="text-slate-600 leading-relaxed font-medium">{desc}</p>
    </motion.div>
);

const JOURNEY_DATA = [
    {
        year: "2020",
        title: "The Inception",
        desc: "The seed of Renaissance was planted during a brainstorming session, focusing on a truly child-centric approach to early education.",
        icon: <Star size={20} />,
        accent: "from-yellow-400 to-orange-500"
    },
    {
        year: "2022",
        title: "Curriculum Design",
        desc: "Two years of intensive research with child psychologists and educators led to our unique 'Seven Petals' methodology.",
        icon: <BrainCircuit size={20} />,
        accent: "from-pink-400 to-rose-500"
    },
    {
        year: "2025",
        title: "Grand Opening",
        desc: "We finally opened our doors to the first batch of happy learners in Bhiwandi, marking the start of a new era.",
        icon: <Award size={20} />,
        accent: "from-emerald-400 to-teal-500"
    }
];

export default About;
