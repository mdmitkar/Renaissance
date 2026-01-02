import React from 'react';
import { motion, useScroll } from 'framer-motion';
import { Target, Heart, Award, Users, Clock, History, Star, BrainCircuit } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-bg-cream dark:bg-bg-dark font-body text-gulf-lebanese">
            {/* HERO */}
            <div className="bg-gulf-dark text-white py-32 md:py-48 text-center relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 px-4"
                >
                    <h1 className="text-6xl md:text-8xl font-heading font-extrabold mb-6 tracking-tight drop-shadow-lg">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-gulf-icy to-white">Us</span>
                    </h1>
                    <p className="text-2xl max-w-3xl mx-auto font-light text-gulf-icy/90 leading-relaxed">
                        Knowing the heart behind Renaissance.
                    </p>
                </motion.div>
                {/* Decor - Animated Circles */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-20 -mt-20"
                />
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-0 right-0 w-96 h-96 bg-charming-green/10 rounded-full blur-3xl -mr-20 -mb-20"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* 1. Introduction with Fade In */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">A Legacy of <span className="text-primary-carmine">Love & Learning</span></h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                            Established in <strong>2025</strong>, Renaissance Preschool was born from a simple yet powerful belief: that education should be an adventure, not a chore.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Our architecture, our curriculum, and our teachers all share a common purpose - to spark curiosity and nurture the unique potential within every child.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gulf-blue/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 ease-in-out"></div>
                        <img
                            src="/SchoolPremises/schoolbuilding.avif"
                            alt="Renaissance School Building"
                            className="relative rounded-3xl shadow-2xl w-full object-cover h-80 md:h-[500px] border-4 border-white dark:border-gray-800 transition-transform duration-500 group-hover:-translate-y-2"
                        />
                    </motion.div>
                </section>

                {/* 2. TIMELINE SECTION - With Curved Scroll Animation */}
                <section className="mb-24 relative">
                    <h2 className="text-4xl font-heading font-bold text-center mb-24 text-gulf-lebanese">Our Journey</h2>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Animated Curved Line (Desktop) */}
                        <TimelineSvg />

                        <div className="space-y-24 relative z-10">
                            {JOURNEY_DATA.map((item, index) => (
                                <TimelineItem
                                    key={index}
                                    data={item}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Management Profile - Wide Card */}
                <section className="bg-gradient-to-br from-white to-gulf-icy/30 dark:from-[#222] dark:to-[#1a1a1a] backdrop-blur-md rounded-[3rem] p-8 md:p-16 shadow-xl relative overflow-hidden mb-24 transform transition-all hover:shadow-2xl border border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">
                        <div className="md:col-span-1">
                            <img
                                src="/assets/management-profile.png"
                                alt="Principal"
                                className="w-full h-auto rounded-2xl shadow-lg border-b-8 border-gulf-blue"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-gulf-blue font-bold tracking-widest uppercase text-sm mb-2">From the Management's Desk</h3>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Shaping Tomorrow's Leaders</h2>
                            </div>
                            <div className="space-y-4 text-gray-600 dark:text-gray-300 italic text-lg border-l-4 border-gentle-yellow pl-6">
                                <p>"At Renaissance, we believe that the early years are the most critical in a child's life."</p>
                                <p>"Our mission is to create a safe, joyful, and stimulating environment where every child feels loved."</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Values Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <ValueCard icon={<Target size={40} />} title="Our Mission" desc="Holistic learning through play and discovery." color="bg-gulf-icy" />
                    <ValueCard icon={<Heart size={40} />} title="Our Vision" desc="A beacon of educational excellence." color="bg-luxury-pink" />
                    <ValueCard icon={<Users size={40} />} title="Our Values" desc="Integrity, Inclusivity, Compassion." color="bg-charming-green" />
                </section>

            </div>
        </div>
    );
};

const TimelineSvg = () => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end center"]
    });

    return (
        <div ref={ref} className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 h-full z-0 hidden md:block">
            <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[20px] h-full" viewBox="0 0 20 100" preserveAspectRatio="none">
                <motion.path
                    d="M 10 0 L 10 100"
                    fill="none"
                    stroke="#E4DAFB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                    className="opacity-50"
                />
                <motion.path
                    d="M 10 0 L 10 100"
                    fill="none"
                    stroke="#0060AA"
                    strokeWidth="4"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength: scrollYProgress }}
                    className="drop-shadow-[0_0_8px_rgba(0,96,170,0.6)]"
                />
            </svg>
        </div>
    );
};

const TimelineItem = ({ data, index }) => {
    const isEven = index % 2 === 0;
    return (
        <div className={`flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''} relative group`}>

            {/* Center Dot - aligned with the straight line */}
            <div className={`absolute md:left-1/2 md:-ml-3 w-6 h-6 rounded-full border-4 border-white bg-gulf-dark z-20 shadow-md transform group-hover:scale-125 transition-transform duration-300 left-[-3px]`}></div>

            {/* Desktop Connector Thread */}
            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] w-[8%] bg-gulf-blue/30 z-0 ${isEven ? 'right-[50%]' : 'left-[50%]'}`}>
                <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gulf-blue ${isEven ? 'left-0' : 'right-0'}`}></div>
            </div>

            {/* Mobile Connector Thread */}
            <div className="md:hidden absolute left-[15px] top-8 w-8 h-[2px] bg-gulf-blue/30"></div>

            {/* Spacer */}
            <div className="hidden md:block w-1/2"></div>

            {/* Content Card */}
            <motion.div
                whileHover={{ scale: 1.05, rotate: isEven ? 2 : -2 }}
                initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring" }}
                className={`w-full md:w-[42%] text-left bg-white dark:bg-[#111] p-8 rounded-[2rem] shadow-xl border-b-8 hover:shadow-2xl transition-all relative ${data.color === 'bg-gentle-yellow' ? 'border-gentle-yellow' : data.color === 'bg-luxury-pink' ? 'border-luxury-pink' : 'border-charming-green'} ${isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto'}`}
            >
                <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-gulf-lebanese shadow-sm ${data.color}`}>{data.year}</span>
                    <div className="text-gulf-dark p-2 bg-gulf-icy/20 rounded-full">{data.icon}</div>
                </div>
                <h3 className="text-2xl font-bold font-heading mb-3">{data.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{data.desc}</p>
            </motion.div>
        </div>
    );
};


const JOURNEY_DATA = [
    {
        year: "2020",
        title: "The Inception",
        desc: "The seed of Renaissance was planted during a brainstorming session, focusing on a truly child-centric approach to early education.",
        icon: <Star size={24} />,
        color: "bg-gentle-yellow"
    },
    {
        year: "2022",
        title: "Curriculum Design",
        desc: "Two years of intensive research with child psychologists and educators led to our unique 'Seven Petals' methodology.",
        icon: <BrainCircuit size={24} />,
        color: "bg-luxury-pink"
    },
    {
        year: "2025",
        title: "Grand Opening",
        desc: "We finally opened our doors to the first batch of happy learners in Bhiwandi, marking the start of a new era.",
        icon: <Award size={24} />,
        color: "bg-charming-green"
    }
];

const ValueCard = ({ icon, title, desc, color }) => (
    <motion.div
        whileHover={{ y: -15, scale: 1.02 }}
        className="bg-white dark:bg-[#222] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-transparent hover:border-gulf-blue/10 group"
    >
        <div className={`w-20 h-20 mx-auto rounded-full ${color} flex items-center justify-center mb-6 text-gulf-lebanese`}>
            {icon}
        </div>
        <h3 className="text-xl font-heading font-bold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
);



export default About;
