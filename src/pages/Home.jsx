import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, BookOpen, BrainCircuit, Star, Quote, ChevronRight, Calculator, Users, Trophy, Smile, Heart, Palette, Music, Sun, Cloud, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSlider from '../components/HeroSlider';
import AdmissionModal from '../components/AdmissionModal';

const Home = () => {
    const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);

    return (
        <div className="flex flex-col w-full relative overflow-x-hidden font-body bg-cream-velvet text-gulf-lebanese">

            {/* HERO SLIDER */}
            <HeroSlider />

            {/* CURRICULUM FLOWER SECTION - "Seven Petals" Inspired */}
            <section className="py-24 bg-white dark:bg-[#1a1a1a] relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gulf-icy rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-luxury-pink rounded-full blur-3xl opacity-30"></div>

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-gulf-lebanese mb-6">
                            The <span className="text-primary-carmine">Science</span> of Learning
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-16">
                            Our proprietary <strong>"Seven Petals"</strong> curriculum ensures holistic growth in every child.
                        </p>
                    </motion.div>

                    {/* The Flower Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Centerpiece (Desktop Only) */}
                        <div className="hidden lg:flex items-center justify-center col-span-2 row-span-2 relative">
                            <div className="w-[400px] h-[400px] bg-cream-velvet rounded-full border-4 border-dashed border-gulf-dark/20 flex items-center justify-center relative animate-spin-slow-reverse">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=300" className="w-64 h-64 rounded-full object-cover border-8 border-white shadow-2xl" alt="Happy Kid" />
                                </div>
                                {/* Floating Orbit Icons */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 bg-gulf-dark text-white p-3 rounded-full shadow-lg"><BrainCircuit size={24} /></div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 bg-primary-carmine text-white p-3 rounded-full shadow-lg"><Heart size={24} /></div>
                                <div className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2 bg-charming-green text-white p-3 rounded-full shadow-lg"><Shield size={24} /></div>
                                <div className="absolute right-0 top-1/2 translate-x-6 -translate-y-1/2 bg-gentle-yellow text-gulf-lebanese p-3 rounded-full shadow-lg"><Palette size={24} /></div>
                            </div>
                        </div>

                        {/* Desktop: Surrounding Cards / Mobile: Stacked Cards */}
                        <PetalCard icon={<BrainCircuit size={32} />} title="Cognitive Skills" desc="Memory and logic development." color="bg-gulf-icy" />
                        <PetalCard icon={<Heart size={32} />} title="Socio-Emotional" desc="Building empathy and bonding." color="bg-luxury-pink" />
                        <PetalCard icon={<BookOpen size={32} />} title="Linguistic" desc="Vocabulary and phonics mastery." color="bg-gulf-blue" />
                        <PetalCard icon={<Shield size={32} />} title="Fine Motor" desc="Dexterity and writing grasp." color="bg-charming-green" />
                        <PetalCard icon={<Palette size={32} />} title="Creativity" desc="Art, craft, and imagination." color="bg-gentle-yellow" />
                        <PetalCard icon={<Sun size={32} />} title="Personal Awareness" desc="Self-care and hygiene habits." color="bg-desert-coral" />
                    </div>
                </div>
            </section>

            {/* STATS SECTION - Floating Bubbles */}
            <section className="py-20 bg-gulf-dark relative overflow-hidden">
                {/* Decorative Curves */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block relative w-full h-[60px] fill-white dark:fill-[#1a1a1a]">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                    </svg>
                </div>

                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10 pt-10">
                    <StatBubble number="1500+" label="Happy Students" />
                    <StatBubble number="50+" label="Expert Teachers" />
                    <StatBubble number="20+" label="Years Legacy" />
                    <StatBubble number="100%" label="Parent Satisfaction" />
                </div>

                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block relative w-full h-[60px] fill-white dark:fill-[#1a1a1a]">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                    </svg>
                </div>
            </section>

            {/* OUR PROGRAMS - Modern Organic Cards */}
            <section className="py-24 bg-white dark:bg-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-gulf-lebanese">
                            Our <span className="text-charming-green">Learning Programs</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ProgramCard
                            title="Playgroup"
                            age="1.5 - 2.5 Years"
                            bg="bg-gulf-icy"
                            img="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=400"
                        />
                        <ProgramCard
                            title="Nursery"
                            age="2.5 - 3.5 Years"
                            bg="bg-gentle-sweet"
                            img="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400"
                        />
                        <ProgramCard
                            title="Junior KG"
                            age="3.5 - 4.5 Years"
                            bg="bg-desert-coral"
                            img="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400"
                        />
                        <ProgramCard
                            title="Senior KG"
                            age="4.5 - 5.5 Years"
                            bg="bg-charming-green"
                            img="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=400"
                        />
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-20 bg-cream-velvet dark:bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl text-center font-heading font-bold mb-12 text-gulf-lebanese">Parent Love</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <TestimonialCard
                            name="Sana Shaikh"
                            text="It feels like a second home for my child. The colors, the teachers, everything is just perfect!"
                            color="bg-white border-b-4 border-primary-carmine"
                        />
                        <TestimonialCard
                            name="Rajesh Verma"
                            text="The 'Seven Petals' curriculum really works. I see holistic growth in my daughter."
                            color="bg-white border-b-4 border-gulf-blue"
                        />
                        <TestimonialCard
                            name="Anita D'Souza"
                            text="Best preschool in the city. Safe, modern, and very professional."
                            color="bg-white border-b-4 border-charming-green"
                        />
                    </div>
                </div>
            </section>

            {/* CTA - Floating Card */}
            <div className="py-12 px-6">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-gulf-dark to-gulf-blue rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
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

// --- SUB COMPONENTS ---

const PetalCard = ({ icon, title, desc, color }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className={`${color} bg-opacity-20 p-6 rounded-[2rem] text-center border-2 border-transparent hover:border-current hover:bg-opacity-30 transition-all`}
    >
        <div className={`w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center mb-4 shadow-md text-gulf-dark`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gulf-lebanese mb-2">{title}</h3>
        <p className="text-sm font-medium text-gulf-lebanese/70">{desc}</p>
    </motion.div>
);

const StatBubble = ({ number, label }) => (
    <div className="rounded-[2.5rem] bg-white/10 backdrop-blur-sm p-6 border border-white/20 hover:bg-white/20 transition-all cursor-default">
        <h3 className="text-4xl font-bold text-white mb-2">{number}</h3>
        <p className="text-gulf-icy font-medium">{label}</p>
    </div>
);

const ProgramCard = ({ title, age, bg, img }) => (
    <div className="group relative rounded-[2.5rem] overflow-hidden shadow-lg h-96">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 text-white">
            <div className={`${bg} text-gulf-lebanese text-xs font-bold px-3 py-1 rounded-full inline-block mb-2`}>
                {age}
            </div>
            <h3 className="text-3xl font-heading font-bold mb-1">{title}</h3>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">Click to view curriculum details</p>
        </div>
    </div>
);

const TestimonialCard = ({ name, text, color }) => (
    <div className={`p-8 rounded-[2rem] shadow-lg ${color}`}>
        <Quote className="text-gray-300 mb-4" size={40} />
        <p className="text-lg text-gray-700 italic mb-6">"{text}"</p>
        <div className="font-bold text-gulf-lebanese">- {name}</div>
    </div>
);

export default Home;
