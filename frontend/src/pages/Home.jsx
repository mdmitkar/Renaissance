import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Star, Heart, Shield, Palette, Users, Plus, Minus, Quote, Play, ChevronRight } from 'lucide-react';
import { googleReviews } from '../data/reviews';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AdmissionModal } from '../components/ui/Modal';

gsap.registerPlugin(ScrollTrigger);

// ===== DATA =====
const HERO_IMAGES = [
    "/ChildrensDay/ChildrenDay_2.jpeg",
    "/SchoolPremises/classroom2.jpeg",
    "/Activities/Activities_1.jpeg",
];

const FEATURES = [
    {
        icon: Heart,
        title: "Love & Care",
        desc: "At Renaissance, every child feels at home. We nurture with warmth, patience, and lots of hugs!",
        highlight: "1:8 Teacher Ratio",
        color: "coral" // Coral pink
    },
    {
        icon: Shield,
        title: "Safe Like Home",
        desc: "24/7 CCTV, trained staff, and child-friendly spaces. Your little ones are always in safe hands.",
        highlight: "100% Safety",
        color: "teal" // Teal
    },
    {
        icon: Palette,
        title: "Learn Through Play",
        desc: "Art, music, dance, and fun activities that spark creativity and make learning joyful.",
        highlight: "50+ Fun Activities",
        color: "yellow" // Sunny yellow
    },
    {
        icon: Users,
        title: "Family Values",
        desc: "We believe parents are partners. Regular PTMs and open communication keep you involved.",
        highlight: "Active PTM",
        color: "orange" // Warm orange
    },
];

const PROGRAMS = [
    { title: "Playgroup", age: "1.5-2.5 Years", focus: "Sensory exploration and motor skills development" },
    { title: "Nursery", age: "2.5-3.5 Years", focus: "Language development and social skills building" },
    { title: "Junior KG", age: "3.5-4.5 Years", focus: "Pre-reading, numeracy, and creative expression" },
    { title: "Senior KG", age: "4.5-5.5 Years", focus: "School readiness and leadership foundations" },
];

const PETALS = [
    { title: "Culture & Patriotism", icon: "🇮🇳" },
    { title: "Play-Based Learning", icon: "🎮" },
    { title: "Creativity", icon: "🎨" },
    { title: "Social Growth", icon: "❤️" },
    { title: "Intellectual Growth", icon: "🧠" },
    { title: "Physical Growth", icon: "💪" },
    { title: "Parent Partnership", icon: "🤝" },
];

const FAQS = [
    { q: "What is the admission process?", a: "Fill out our enquiry form, schedule a campus visit, complete registration with required documents, and your child joins the Renaissance family!" },
    { q: "What is the Seven Petals philosophy?", a: "Our unique curriculum focuses on 7 key areas: Culture, Play, Creativity, Social Growth, Intellectual Development, Physical Growth, and Parent Partnership." },
    { q: "What are the school timings?", a: "Morning batch: 9:00 AM - 12:00 PM. We follow a balanced schedule with learning activities, play time, and snack breaks." },
    { q: "Is transportation available?", a: "Currently, we do not provide transport. Parents make their own arrangements for pickup and drop-off." },
];

// ===== COMPONENTS =====
const FAQItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between py-5 text-left group"
        >
            <span className="font-heading font-semibold text-slate-900 dark:text-white pr-4 group-hover:text-primary transition-colors">
                {question}
            </span>
            <div className={`
                w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center
                transition-all duration-300
                ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}
            `}>
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
            </div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <p className="pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">{answer}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

// ===== MAIN COMPONENT =====
const Home = () => {
    const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);
    const containerRef = useRef(null);

    // Auto-rotate hero images
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Parallax
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%']);

    // GSAP animations
    useGSAP(() => {
        gsap.utils.toArray('.fade-up').forEach((el) => {
            gsap.fromTo(el,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 85%" }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen">

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background */}
                <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImage}
                            src={HERO_IMAGES[currentImage]}
                            alt="Renaissance Preschool"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-8"
                        >
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm font-heading">Admissions Open 2025-26</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[1] mb-6 tracking-tight"
                        >
                            Where Little{' '}
                            <span className="text-primary">Dreams</span>{' '}
                            Take Flight
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg md:text-xl text-white/80 mb-10 max-w-xl"
                        >
                            Renaissance Preschool nurtures young minds through our unique Seven Petals curriculum—where every child discovers their potential.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsAdmissionOpen(true)}
                                className="btn-primary text-base"
                            >
                                Apply for Admission
                                <ArrowRight size={18} />
                            </motion.button>

                            <NavLink to="/about">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-heading font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                                >
                                    Learn More
                                </motion.button>
                            </NavLink>
                        </motion.div>
                    </div>
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {HERO_IMAGES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentImage(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImage ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* ===== FEATURES SECTION ===== */}
            <section className="section bg-cream-warm dark:bg-navy-deep">
                <div className="container-pro">
                    <div className="section-header fade-up">
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                            A Foundation Built on <span className="text-primary">Care</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            We create an environment where children feel safe, loved, and inspired to explore.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-up">
                        {FEATURES.map((feature, i) => {
                            const colors = {
                                coral: 'bg-primary/10 text-primary border-primary/20 hover:border-primary hover:shadow-[0_0_40px_rgba(255,107,107,0.2)]',
                                teal: 'bg-secondary/10 text-secondary border-secondary/20 hover:border-secondary hover:shadow-[0_0_40px_rgba(78,205,196,0.2)]',
                                yellow: 'bg-tertiary/10 text-tertiary-dark border-tertiary/20 hover:border-tertiary hover:shadow-[0_0_40px_rgba(255,230,109,0.2)]',
                                orange: 'bg-orange/10 text-orange border-orange/20 hover:border-orange hover:shadow-[0_0_40px_rgba(255,159,67,0.2)]',
                            };

                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -8 }}
                                    className={`bg-cream-soft dark:bg-navy-soft rounded-2xl p-8 border transition-all duration-300 ${colors[feature.color] || colors.coral}`}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center mb-6">
                                        <feature.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                    <span className="text-xs font-heading font-bold uppercase tracking-wider opacity-80">
                                        {feature.highlight}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== PROGRAMS SECTION ===== */}
            <section className="section bg-cream-warm dark:bg-navy-deep">
                <div className="container-pro">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Content */}
                        <div className="fade-up">
                            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">Our Programs</span>
                            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                                Age-Appropriate <span className="text-primary">Learning</span> Journeys
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
                                Each program is designed to meet children where they are developmentally, providing the right challenges and support at every stage.
                            </p>

                            <div className="space-y-4">
                                {PROGRAMS.map((program, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-5 rounded-xl bg-cream-soft dark:bg-navy-soft border border-slate-200/80 dark:border-slate-700 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-heading font-bold text-lg">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-heading font-bold text-slate-900 dark:text-white">
                                                    {program.title}
                                                </h4>
                                                <span className="text-xs text-primary font-semibold">
                                                    ({program.age})
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                {program.focus}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div className="relative fade-up">
                            <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700">
                                <img
                                    src="/SchoolPremises/classroom2.jpeg"
                                    alt="Classroom"
                                    className="w-full h-[500px] object-cover"
                                />
                            </div>
                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -left-6 bg-cream-soft dark:bg-navy-soft rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center">
                                        <Star size={24} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">50+</p>
                                        <p className="text-sm text-slate-500">Happy Students</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SEVEN PETALS SECTION ===== */}
            <section className="section bg-cream-warm dark:bg-navy-deep">
                <div className="container-pro">
                    <div className="section-header fade-up">
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight">
                            The Seven <span className="text-primary">Petals</span> Curriculum
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            A holistic approach to early childhood development, nurturing every aspect of your child's growth.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 fade-up">
                        {PETALS.map((petal, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="flex items-center gap-3 px-6 py-4 rounded-full bg-cream-soft dark:bg-navy-soft border border-slate-200/80 dark:border-slate-700 transition-all duration-300 cursor-default hover:border-primary hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                            >
                                <span className="text-2xl">{petal.icon}</span>
                                <span className="font-heading font-bold text-slate-800 dark:text-white">{petal.title}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center fade-up">
                        <NavLink to="/about">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-heading font-bold text-lg"
                            >
                                Learn More About Our Curriculum
                                <ChevronRight size={20} />
                            </motion.button>
                        </NavLink>
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS SECTION ===== */}
            <section className="section bg-cream-warm dark:bg-navy-deep">
                <div className="container-pro">
                    <div className="section-header fade-up">
                        <span className="badge badge-primary mb-4">Testimonials</span>
                        <h2 className="text-3xl md:text-4xl font-display font-semibold text-slate-900 dark:text-white mb-4">
                            What Parents Say
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 fade-up">
                        {googleReviews.filter(r => r.review.length > 50).slice(0, 3).map((review, i) => (
                            <div key={i} className="card p-8">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} size={16} className="fill-tertiary text-tertiary" />
                                    ))}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-4">
                                    "{review.review}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading font-semibold">
                                        {review.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-heading font-semibold text-slate-900 dark:text-white text-sm">
                                            {review.name}
                                        </p>
                                        <p className="text-xs text-slate-500">Parent</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FAQ SECTION ===== */}
            <section className="section bg-lavender-light/30 dark:bg-slate-900">
                <div className="container-pro">
                    <div className="max-w-3xl mx-auto">
                        <div className="section-header fade-up">
                            <span className="inline-block px-4 py-2 rounded-full bg-purple/10 text-purple font-semibold text-sm mb-6">FAQ</span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                                Parents Ask Us
                            </h2>
                        </div>

                        <div className="card p-0 fade-up">
                            <div className="divide-y divide-slate-100 dark:divide-slate-800 px-6 md:px-8">
                                {FAQS.map((faq, i) => (
                                    <FAQItem
                                        key={i}
                                        question={faq.q}
                                        answer={faq.a}
                                        isOpen={openFaq === i}
                                        onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="section bg-gradient-to-br from-primary via-primary-dark to-orange">
                <div className="container-pro">
                    <div className="max-w-4xl mx-auto text-center fade-up">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white mb-6">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <span className="text-sm font-heading font-semibold">Limited Seats Available for 2025-26</span>
                        </span>

                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                            Ready to Begin Your Child's Journey?
                        </h2>
                        <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
                            Join the Renaissance family and give your child the gift of a strong foundation for life.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsAdmissionOpen(true)}
                                className="btn-primary text-base"
                            >
                                Apply Now
                                <ArrowRight size={18} />
                            </motion.button>

                            <NavLink to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-heading font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                                >
                                    Schedule a Visit
                                </motion.button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admission Modal */}
            <AdmissionModal
                isOpen={isAdmissionOpen}
                onClose={() => setIsAdmissionOpen(false)}
                onApply={() => {
                    setIsAdmissionOpen(false);
                    window.location.href = '/admission';
                }}
            />
        </div>
    );
};

export default Home;
