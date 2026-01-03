import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Heart, Users, Award, ArrowRight, Quote, Star, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "15%"]);

    return (
        <div ref={containerRef} className="min-h-screen bg-cream-warm dark:bg-navy-deep">

            {/* ===== HERO ===== */}
            <section className="relative min-h-[70vh] flex items-center overflow-hidden">
                <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
                    <img
                        src="/SchoolPremises/schoolbuilding.avif"
                        alt="Renaissance School Building"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
                </motion.div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md mb-6"
                        >
                            <Sparkles size={16} className="text-yellow" />
                            <span className="font-heading font-semibold text-sm">Our Story</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-6"
                        >
                            Where Every Child's Story <span className="text-primary relative inline-block">
                                Begins
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed"
                        >
                            Founded in 2025, Renaissance Preschool isn't just a school—it's a second home where we nurture confident, kind, and happy children.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* ===== STORY ===== */}
            <section className="section">
                <div className="container-pro">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block text-primary font-heading font-bold tracking-wider uppercase mb-2">Since 2025</span>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                A Dream Founded on <span className="text-primary">Love</span> & <span className="text-secondary">Care</span>
                            </h2>
                            <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                                <p>
                                    Renaissance Preschool started with a simple thought: <strong>"What if a school felt just like a big, happy family?"</strong>
                                </p>
                                <p>
                                    We believe that children learn best when they are loved, listened to, and free to be themselves. Our "Seven Petals" philosophy is all about helping your little one bloom in every way—emotionally, socially, and creatively.
                                </p>
                                <p>
                                    Right here in Bhiwandi, we've built a colorful, safe haven where curiosity is celebrated and every small achievement is a big deal!
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="relative"
                        >
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform hover:rotate-1 transition-transform duration-500 border-8 border-white dark:border-slate-800">
                                <img
                                    src="/SchoolPremises/classroom2.jpeg"
                                    alt="Our Classroom"
                                    className="w-full h-[400px] lg:h-[500px] object-cover"
                                />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-10 -left-6 md:-left-10 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl max-w-xs rotate-[-3deg] border border-slate-100 dark:border-slate-700">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-orange/10 text-orange flex items-center justify-center shrink-0">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-slate-900 dark:text-white text-lg">Bhiwandi's Happy Place</p>
                                        <p className="text-sm text-slate-500">Creating smiles everyday.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== VALUES ===== */}
            <section className="section bg-secondary/5 dark:bg-slate-900/50">
                <div className="container-pro">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
                            What We Stand For
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            Simple values that make a big difference in your child's life.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Our Mission",
                                desc: "To make learning a joyride! We want every child to wake up excited to come to school.",
                                color: "coral"
                            },
                            {
                                icon: Heart,
                                title: "Our Vision",
                                desc: "A world where every child grows up feeling confident, kind, and capable of anything.",
                                color: "teal"
                            },
                            {
                                icon: Users,
                                title: "Our Values",
                                desc: "Kindness first. We teach respect, sharing, and the magic of saying 'please' and 'thank you'.",
                                color: "yellow"
                            },
                        ].map((item, i) => {
                            const colors = {
                                coral: 'bg-primary/10 text-primary border-primary/20',
                                teal: 'bg-secondary/10 text-secondary border-secondary/20',
                                yellow: 'bg-tertiary/10 text-tertiary-dark border-tertiary/20',
                            };

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className={`bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border-b-4 ${i === 0 ? 'border-primary' : i === 1 ? 'border-secondary' : 'border-tertiary'}`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl ${colors[item.color]} flex items-center justify-center mb-6`}>
                                        <item.icon size={30} />
                                    </div>
                                    <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== MANAGEMENT MESSAGE ===== */}
            <section className="section">
                <div className="container-pro">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-cream-soft dark:bg-navy-soft rounded-[3rem] p-8 md:p-16 relative overflow-hidden"
                        >
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                            <div className="relative z-10 grid md:grid-cols-12 gap-10 items-center">
                                <div className="md:col-span-4 text-center md:text-left">
                                    <div className="relative inline-block">
                                        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
                                            <img
                                                src="/otherimp/rushiuncle.jpeg"
                                                alt="Founder"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow-lg">
                                            <Quote size={20} />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-8 text-center md:text-left">
                                    <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">
                                        A Note from Our Founder
                                    </h3>
                                    <p className="text-primary font-medium mb-6">Renaissance Family</p>

                                    <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6 font-medium">
                                        "At Renaissance, we don't just teach—we nurture. Every child who walks through our doors becomes part of our family. Our promise is to help each one discover their unique gifts and give them the confidence to share those gifts with the world."
                                    </p>

                                    <div className="w-20 h-1 bg-primary/20 rounded-full mx-auto md:mx-0" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-20 bg-slate-900 section-pattern-dark text-center">
                <div className="container-pro">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
                        Come, Be Part of Our Family!
                    </h2>
                    <NavLink to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary text-lg px-8 py-4 shadow-orange/30"
                        >
                            Schedule a Visit
                            <ArrowRight size={20} />
                        </motion.button>
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default About;
