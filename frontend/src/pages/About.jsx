import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Heart, Award, Users, Star, BrainCircuit, Sparkles, ArrowRight } from 'lucide-react';

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div ref={containerRef} className="min-h-screen bg-yellow-50/50 dark:bg-black font-body text-slate-800 dark:text-gray-200 selection:bg-rose-500 selection:text-white transition-colors duration-300">

            {/* --- HERO SECTION --- */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: heroY }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="/assets/school_building_enhanced.png"
                        alt="Renaissance Building"
                        className="w-full h-full object-cover"
                    />
                    {/* Sophisticated Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </motion.div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-12 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // smooth ease-out-quart
                        className="flex flex-col items-center"
                    >
                        {/* Glassmorphic Badge */}
                        <div className="inline-block py-3 px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-10">
                            <span className="text-yellow-50 font-medium tracking-[0.3em] text-xs md:text-sm uppercase font-body">
                                Welcome to the Family
                            </span>
                        </div>

                        {/* Grand Typography */}
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-medium text-white mb-8 tracking-tight leading-[0.9]">
                            About <span className="text-white relative inline-block">
                                Us
                                {/* Subtle gold underline accent */}
                                <svg className="absolute w-full h-3 md:h-5 -bottom-1 md:-bottom-2 left-0 text-yellow-400/80 -z-10 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-lg md:text-2xl font-light text-slate-100 max-w-2xl mx-auto leading-relaxed font-body tracking-wide drop-shadow-lg">
                            Where little dreams grow into big futures.
                        </p>
                    </motion.div>
                </div>

                {/* Wave Separator */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
                    <svg className="relative block w-full h-[60px] md:h-[5px]" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path fill="#FFFBEB" fillOpacity="0.3" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,144C672,149,768,203,864,213.3C960,224,1056,192,1152,170.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        <path fill="#FFFBEB" fillOpacity="0.7" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        <path fill="#FFFBEB" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,218.7C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">


                {/* Floating Shapes Background */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-20 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>


                {/* --- 1. LEGACY SECTION --- */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">Our Happy Place</h3>
                        <h2 className="text-4xl md:text-6xl font-heading font-black mb-8 text-slate-800 dark:text-white leading-tight">
                            A Legacy of <br />
                            <span className="relative inline-block text-rose-500">
                                Love & Learning
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                        </h2>
                        <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            <p>
                                Started with a smile in <strong>2025</strong>, Renaissance Preschool isn't just a school—it's a second home. We believe childhood is a magical journey, not a race.
                            </p>
                            <p>
                                From our colorful classrooms to our caring teachers, everything is designed to make your child feel <span className="text-purple-600 font-bold">safe, loved, and excited</span> to learn every single day.
                            </p>
                        </div>
                    </motion.div>

                    <div className="relative group perspective-1000">
                        <div className="absolute inset-0 bg-yellow-400 rounded-[3rem] transform rotate-6 scale-95 opacity-40 group-hover:rotate-3 transition-all duration-500"></div>
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
                                <p className="font-bold text-xl flex items-center gap-2"><Sparkles className="text-yellow-400" /> Magic Happens Here</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- 2. TIMELINE SECTION --- */}
                <section className="mb-32 relative">
                    <div className="text-center mb-20">
                        <span className="inline-block py-1 px-4 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200 text-sm font-bold tracking-wider mb-4 border border-purple-200 dark:border-purple-700">OUR STORY</span>
                        <h2 className="text-5xl font-heading font-black text-slate-800 dark:text-white">Growing Together</h2>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-rose-100 rounded-[3rem] transform -rotate-1"></div>
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-[#1a1a1a] rounded-[3rem] p-8 md:p-16 shadow-xl relative overflow-hidden border-4 border-white dark:border-white/10"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                            <div className="md:col-span-4 relative">
                                <div className="absolute inset-0 bg-yellow-300 rounded-2xl transform translate-x-4 translate-y-4"></div>
                                <img
                                    src="/otherimp/rushiuncle.jpeg"
                                    alt="Principal"
                                    className="w-full h-auto rounded-2xl shadow-lg relative z-10"
                                />
                            </div>
                            <div className="md:col-span-8 space-y-8">
                                <div>
                                    <h3 className="text-rose-500 font-bold tracking-widest uppercase text-sm mb-2">A Promise from Us</h3>
                                    <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-800">Heads, Hearts & Hands</h2>
                                </div>
                                <div className="relative p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-100 dark:border-yellow-700/30">
                                    <QuoteIcon className="absolute -top-4 -left-4 text-yellow-400 w-12 h-12" />
                                    <p className="text-lg text-slate-700 dark:text-slate-200 italic leading-relaxed font-serif relative z-10">
                                        "At Renaissance, we don't just teach directly to the brain; we teach to the heart. Every child is a universe of potential waiting to be loved, understood, and guided. Your child is our family."
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                                    <span className="font-heading font-bold text-lg text-slate-800 dark:text-white">Management Desk</span>
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
                            desc="To spark a lifelong love for learning through play, giggles, and discovery."
                            color="text-white"
                            bg="bg-sky-400"
                            shadow="shadow-sky-200"
                        />
                        <ValueCard
                            icon={<Heart size={32} />}
                            title="Our Vision"
                            desc="A world where every child feels confident, kind, and capable of anything."
                            color="text-white"
                            bg="bg-rose-400"
                            shadow="shadow-rose-200"
                        />
                        <ValueCard
                            icon={<Users size={32} />}
                            title="Our Values"
                            desc="Kindness in our hearts, honesty in our words, and friendship in our actions."
                            color="text-white"
                            bg="bg-emerald-400"
                            shadow="shadow-emerald-200"
                        />
                    </div>
                </section>

                {/* --- 5. ADMISSION CTA (New) --- */}
                <section className="mt-20 text-center pb-20 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-slate-900 rounded-[2rem] p-10 md:p-14 relative overflow-hidden mx-auto max-w-5xl text-white shadow-xl"
                    >
                        {/* Subtle Professional Accent */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Start Your Child's Journey</h2>
                            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Limited seats available for the upcoming academic year. Give your child the gift of Renaissance.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold text-lg px-8 py-4 rounded-full transition-colors flex items-center gap-2 mx-auto"
                            >
                                Apply for Admission
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
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
            <div className={`absolute left-[20px] md:left-1/2 md:-ml-3 w-6 h-6 rounded-full border-4 border-white ${data.dotColor} z-20 shadow-lg transform group-hover:scale-150 transition-transform duration-300`}></div>

            {/* Spacer */}
            <div className="hidden md:block w-1/2"></div>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 30, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5 }}
                className={`w-full md:w-[45%] bg-white dark:bg-[#1a1a1a] p-8 rounded-[2rem] shadow-xl border-b-8 ${data.borderColor} relative overflow-hidden ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
            >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${data.accent} opacity-10 rounded-bl-[100%] transition-transform duration-500 group-hover:scale-150`}></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`px-4 py-1 rounded-full text-sm font-bold bg-slate-50 dark:bg-white/10 text-slate-800 dark:text-white border-2 ${data.badgeBorder}`}>{data.year}</span>
                        <div className={`${data.iconColor}`}>{data.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-3 text-slate-900 dark:text-white">{data.title}</h3>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed font-medium">{data.desc}</p>
                </div>
            </motion.div>
        </div>
    );
};

const ValueCard = ({ icon, title, desc, color, bg, shadow }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className={`bg-white dark:bg-[#1a1a1a] p-10 rounded-[2.5rem] shadow-xl ${shadow} hover:shadow-2xl transition-all border-b-8 ${shadow.replace('shadow', 'border')} text-center group`}
    >
        <div className={`w-20 h-20 mx-auto rounded-full ${bg} ${color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-inner`}>
            {icon}
        </div>
        <h3 className="text-2xl font-heading font-black mb-4 text-slate-800 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-gray-300 leading-relaxed font-medium">{desc}</p>
    </motion.div>
);

const JOURNEY_DATA = [
    {
        year: "2020",
        title: "A Dreamer's Idea",
        desc: "The seed of Renaissance was planted to create a place that honors the child's spirit above all else.",
        icon: <Star size={24} />,
        accent: "from-yellow-400 to-orange-500",
        dotColor: "bg-yellow-400",
        borderColor: "border-yellow-400",
        badgeBorder: "border-yellow-200",
        iconColor: "text-yellow-500"
    },
    {
        year: "2022",
        title: "Crafting Joy",
        desc: "We designed our 'Seven Petals' curriculum not in a boardroom, but by listening to what helps children thrive.",
        icon: <BrainCircuit size={24} />,
        accent: "from-purple-400 to-pink-500",
        dotColor: "bg-purple-500",
        borderColor: "border-purple-500",
        badgeBorder: "border-purple-200",
        iconColor: "text-purple-500"
    },
    {
        year: "2025",
        title: "The Doors Open!",
        desc: "The laughter of our first students filled the halls, marking the start of a beautiful journey in Bhiwandi.",
        icon: <Award size={24} />,
        accent: "from-emerald-400 to-teal-500",
        dotColor: "bg-emerald-500",
        borderColor: "border-emerald-500",
        badgeBorder: "border-emerald-200",
        iconColor: "text-emerald-500"

    }
];

export default About;
