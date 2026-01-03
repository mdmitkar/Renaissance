import React from 'react';
import { Send, Phone, MapPin, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Admission = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your interest! Our team will contact you soon.");
    };

    return (
        <div className="min-h-screen">

            {/* ===== HERO ===== */}
            <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-[15%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-light mb-6">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm font-heading">Admissions Open 2025-26</span>
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-6">
                            Join the Renaissance Family
                        </h1>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                            Give your child the gift of a nurturing, holistic education. Begin your application today.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ===== MAIN CONTENT ===== */}
            <section className="section bg-cream-warm dark:bg-navy-deep -mt-12 relative z-10">
                <div className="container-pro">
                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

                        {/* Left: Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Quick Contact */}
                            <div className="card p-6">
                                <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <MessageCircle className="text-primary" size={20} />
                                    Quick Assistance
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                                    Have questions? Chat with us directly on WhatsApp for instant support.
                                </p>
                                <a
                                    href="https://wa.me/918483848486?text=Hello%20Renaissance%20Preschool!"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-5 py-3 rounded-xl hover:bg-[#20BD5A] transition-colors"
                                >
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                                    Chat on WhatsApp
                                </a>
                            </div>

                            {/* Process */}
                            <div className="card p-6">
                                <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-4">
                                    Admission Process
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { step: "1", title: "Submit Enquiry", desc: "Fill the form" },
                                        { step: "2", title: "Campus Visit", desc: "Meet our team" },
                                        { step: "3", title: "Registration", desc: "Complete docs" },
                                        { step: "4", title: "Welcome!", desc: "Join the family" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-heading font-bold text-sm">
                                                {item.step}
                                            </div>
                                            <div>
                                                <p className="font-heading font-medium text-slate-900 dark:text-white text-sm">{item.title}</p>
                                                <p className="text-xs text-slate-500">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="card p-6 space-y-4">
                                <ContactItem icon={Phone} label="Call us" value="84838 48486" href="tel:+918483848486" />
                                <ContactItem icon={MapPin} label="Visit us" value="102, Kuwari Compound, Bhiwandi" />
                                <ContactItem icon={Clock} label="Office hours" value="Mon-Sat, 9 AM - 5 PM" />
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card p-8 md:p-10"
                            >
                                <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-2">
                                    Admission Enquiry
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 mb-8">
                                    Fill in your details and we'll get back to you within 24 hours.
                                </p>

                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputField label="Parent's Name" placeholder="e.g. Rahul Sharma" />
                                        <InputField label="Child's Name" placeholder="e.g. Aaryan Sharma" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputField label="Phone Number" placeholder="+91 98765 43210" type="tel" />
                                        <InputField label="Email" placeholder="rahul@example.com" type="email" />
                                    </div>
                                    <InputField label="Child's Age / Preferred Program" placeholder="e.g. 3 years / Nursery" />

                                    <div className="space-y-2">
                                        <label className="text-sm font-heading font-medium text-slate-700 dark:text-slate-300">
                                            Message (Optional)
                                        </label>
                                        <textarea
                                            rows="3"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                            placeholder="Any specific questions?"
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full btn-primary py-4"
                                    >
                                        Submit Enquiry
                                        <Send size={18} />
                                    </motion.button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Preview */}
            <section className="section bg-peach-light/30 dark:bg-slate-900">
                <div className="container-pro">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-display font-semibold text-slate-900 dark:text-white">
                            Programs We Offer
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { title: "Playgroup", age: "1.5-2.5 yrs" },
                            { title: "Nursery", age: "2.5-3.5 yrs" },
                            { title: "Junior KG", age: "3.5-4.5 yrs" },
                            { title: "Senior KG", age: "4.5-5.5 yrs" },
                        ].map((prog, i) => (
                            <div key={i} className="card p-5 text-center hover:border-primary transition-colors">
                                <h3 className="font-heading font-semibold text-slate-900 dark:text-white">{prog.title}</h3>
                                <p className="text-sm text-slate-500">{prog.age}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const InputField = ({ label, placeholder, type = "text" }) => (
    <div className="space-y-2">
        <label className="text-sm font-heading font-medium text-slate-700 dark:text-slate-300">
            {label}
        </label>
        <input
            type={type}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
            placeholder={placeholder}
            required
        />
    </div>
);

const ContactItem = ({ icon: Icon, label, value, href }) => (
    <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Icon size={18} />
        </div>
        <div>
            <p className="text-xs text-slate-500">{label}</p>
            {href ? (
                <a href={href} className="text-sm font-heading font-medium text-slate-900 dark:text-white hover:text-primary transition-colors">{value}</a>
            ) : (
                <p className="text-sm font-heading font-medium text-slate-900 dark:text-white">{value}</p>
            )}
        </div>
    </div>
);

export default Admission;
