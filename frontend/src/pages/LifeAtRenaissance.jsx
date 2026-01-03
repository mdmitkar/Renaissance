import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Star, ArrowRight, Sun, BookOpen, Music, Users, Clock, Coffee } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const EVENTS = [
    {
        id: 1, title: "Independence Day", date: "August 15", emoji: "🇮🇳",
        desc: "Patriots march with pride as our little ones learn about freedom fighters.",
        images: ["/IndependenceDay/IndependenceDay_1.jpeg", "/IndependenceDay/IndependenceDay_2.jpeg"],
        color: "orange"
    },
    {
        id: 2, title: "Children's Day", date: "November 14", emoji: "🎉",
        desc: "The most joyful day of the year with games, treats, and endless fun!",
        images: ["/ChildrensDay/ChildrenDay_2.jpeg", "/ChildrensDay/ChildrensDay_1.jpeg"],
        color: "teal"
    },
    {
        id: 3, title: "Red Day", date: "Color Days", emoji: "❤️",
        desc: "Kids dress up and explore everything red through fun activities.",
        images: ["/RedDay/RedDay_1.jpeg", "/RedDay/REDDAY6.png"],
        color: "coral"
    },
    {
        id: 4, title: "Sports Day", date: "Annual", emoji: "🏆",
        desc: "Tiny athletes showcase skills in races and team games.",
        images: ["/SportsDay/sportsday1.jpeg", "/SportsDay/sportdaymedal.jpeg"],
        color: "yellow"
    },
    {
        id: 5, title: "Parent-Teacher Meet", date: "Quarterly", emoji: "🤝",
        desc: "Building strong partnerships to ensure every child thrives.",
        images: ["/PTM/PTM_3.jpeg", "/PTM/PTM_5.jpeg"],
        color: "purple"
    },
];

const DAILY_ROUTINE = [
    { time: "9:00 AM", title: "Assembly & Prayers", icon: Sun, color: "text-orange bg-orange/10" },
    { time: "9:30 AM", title: "Circle Time & Stories", icon: Users, color: "text-teal bg-teal/10" },
    { time: "10:15 AM", title: "Activity & Learning", icon: BookOpen, color: "text-coral bg-coral/10" },
    { time: "11:15 AM", title: "Healthy Snack Break", icon: Coffee, color: "text-yellow bg-yellow/10" },
    { time: "11:45 AM", title: "Outdoor Play & Music", icon: Music, color: "text-purple bg-purple/10" },
];

const LifeAtRenaissance = () => {
    const [activeEvent, setActiveEvent] = useState(0);
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="min-h-screen bg-cream-warm dark:bg-navy-deep">

            {/* Hero */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30 z-0">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-primary rounded-full blur-[100px]" />
                    <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="badge bg-white/10 text-white border-white/20 mb-6 backdrop-blur-md">
                            <Star size={14} className="mr-1 text-yellow" /> Life @ School
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
                            Every Day is a <span className="text-secondary">Celebration</span>
                        </h1>
                        <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
                            Explore the vibrant journey of festivals, activities, and shared joy that makes Renaissance so special.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-10 border-b border-primary/5 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm -mt-8 relative z-20 mx-4 md:mx-auto max-w-5xl rounded-2xl shadow-lg">
                <div className="grid grid-cols-3 gap-6 text-center divide-x divide-slate-200 dark:divide-slate-700">
                    {[
                        { value: "20+", label: "Events/Year" },
                        { value: "50+", label: "Happy Kids" },
                        { value: "100+", label: "Activities" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <p className="text-3xl md:text-5xl font-display font-bold text-primary">{stat.value}</p>
                            <p className="text-sm font-heading font-medium text-slate-500 uppercase tracking-wider mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Events */}
            <section className="section">
                <div className="container-pro">
                    <div className="text-center mb-16">
                        <span className="text-primary font-heading font-bold uppercase tracking-widest text-sm">Festivals & Fun</span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mt-2">
                            Highlights of Our Year
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {EVENTS.map((event, i) => (
                            <motion.div
                                key={event.id}
                                whileHover={{ y: -8 }}
                                className={`card overflow-hidden cursor-pointer group border-2 transition-all duration-300 ${activeEvent === i ? 'border-primary shadow-xl shadow-primary/10' : 'border-transparent hover:border-slate-200 dark:hover:border-slate-700'}`}
                                onClick={() => setActiveEvent(i)}
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={event.images[0]}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur text-2xl flex items-center justify-center shadow-lg">
                                        {event.emoji}
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <div className="flex items-center gap-2 text-xs font-medium bg-black/30 backdrop-blur px-2 py-1 rounded-full w-fit mb-1">
                                            <Calendar size={12} />
                                            {event.date}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        {event.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Daily Life Timeline */}
            <section className="section bg-lavender-light/30 dark:bg-slate-900/50">
                <div className="container-pro">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="badge badge-secondary mb-4">Daily Routine</span>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
                                A Day at Renaissance
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed">
                                We believe in a balanced day that mixes focused learning with free play. From morning assembly to afternoon goodbyes, every moment counts!
                            </p>

                            <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-8">
                                {DAILY_ROUTINE.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="relative pl-8"
                                    >
                                        <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 ${item.color} flex items-center justify-center shadow-sm`}>
                                            <item.icon size={18} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-heading font-bold text-slate-900 dark:text-white">{item.time}</h4>
                                            <p className="text-slate-600 dark:text-slate-400 font-medium">{item.title}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div whileHover={{ scale: 1.02 }} className="rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-700 transform translate-y-8">
                                    <img src="/Activities/Activities_1.jpeg" alt="Activity" className="w-full h-56 object-cover" />
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.02 }} className="rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-700">
                                    <img src="/Activities/motor.jpeg" alt="Motor Skills" className="w-full h-56 object-cover" />
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.02 }} className="rounded-3xl overflow-hidden shadow-lg col-span-2 border-4 border-white dark:border-slate-700 mt-4">
                                    <img src="/SchoolPremises/classplay.jpeg" alt="Playtime" className="w-full h-64 object-cover" />
                                </motion.div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow/20 rounded-full blur-3xl -z-10" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink/20 rounded-full blur-3xl -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-slate-900 section-pattern-dark text-center">
                <div className="container-pro">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                        Be Part of Our Story
                    </h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
                        Come and feel the joy yourself! Schedule a visit today.
                    </p>
                    <NavLink to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-white font-heading font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2 mx-auto"
                        >
                            Get in Touch <ArrowRight size={20} />
                        </motion.button>
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default LifeAtRenaissance;
