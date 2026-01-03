import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const contactInfo = [
        { icon: MapPin, label: "Visit Us", value: "102, Kuwari Compound, Bubere Hall Road, Nizampur, Bhiwandi", action: null },
        { icon: Phone, label: "Call Us", value: "+91 84838 48486", action: "tel:+918483848486" },
        { icon: Mail, label: "Email Us", value: "info.renaissanceschool@gmail.com", action: "mailto:info.renaissanceschool@gmail.com" },
        { icon: Clock, label: "Office Hours", value: "Mon - Sat: 9:00 AM - 5:00 PM", action: null },
    ];

    return (
        <div className="min-h-screen">

            {/* ===== HERO ===== */}
            <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 right-[20%] w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="badge bg-white/10 text-white border-white/20 mb-6">Contact</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-slate-300 max-w-xl mx-auto">
                            We'd love to hear from you. Reach out with questions or schedule a campus visit.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ===== CONTACT CONTENT ===== */}
            <section className="section bg-cream-warm dark:bg-navy-deep -mt-12 relative z-10">
                <div className="container-pro">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

                        {/* Left: Info & Map */}
                        <div className="space-y-8">
                            {/* Contact Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {contactInfo.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="card p-5"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                                                {item.action ? (
                                                    <a href={item.action} className="text-sm font-heading font-medium text-slate-900 dark:text-white hover:text-primary transition-colors">
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-sm font-heading font-medium text-slate-900 dark:text-white">
                                                        {item.value}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Map */}
                            <div className="card p-0 overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.8987248893316!2d73.06094897507907!3d19.31229014159612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bd7a3e0a62c1%3A0x46fe3c1c2cc86f0c!2sRenaissance%20Pre%20School!5e0!3m2!1sen!2sin!4v1714657689611!5m2!1sen!2sin"
                                    className="w-full h-72 grayscale hover:grayscale-0 transition-all duration-500"
                                    loading="lazy"
                                    title="Renaissance Preschool Location"
                                />
                            </div>

                            {/* Quick Connect */}
                            <div className="card p-6 flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex-1 text-center sm:text-left">
                                    <p className="font-heading font-semibold text-slate-900 dark:text-white">Prefer instant replies?</p>
                                    <p className="text-sm text-slate-500">Chat with us on WhatsApp</p>
                                </div>
                                <a
                                    href="https://wa.me/918483848486"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-[#25D366] text-white font-heading font-semibold px-5 py-3 rounded-xl hover:bg-[#20BD5A] transition-colors"
                                >
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card p-8 md:p-10"
                        >
                            <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-2">
                                Send a Message
                            </h2>
                            <p className="text-slate-500 mb-8">
                                Fill out the form and we'll get back to you.
                            </p>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                        <Send size={28} />
                                    </div>
                                    <h3 className="text-xl font-heading font-semibold text-slate-900 dark:text-white mb-2">
                                        Message Sent!
                                    </h3>
                                    <p className="text-slate-500">We'll get back to you soon.</p>
                                </motion.div>
                            ) : (
                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputField label="Your Name" placeholder="John Doe" />
                                        <InputField label="Phone" placeholder="+91 98765 43210" type="tel" />
                                    </div>
                                    <InputField label="Email" placeholder="john@example.com" type="email" />
                                    <InputField label="Subject" placeholder="e.g. Admission Inquiry" />
                                    <div className="space-y-2">
                                        <label className="text-sm font-heading font-medium text-slate-700 dark:text-slate-300">
                                            Message
                                        </label>
                                        <textarea
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                            placeholder="How can we help you?"
                                            required
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full btn-primary py-4"
                                    >
                                        Send Message
                                        <Send size={18} />
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-slate-900">
                <div className="container-pro text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-6">
                        Ready to Visit?
                    </h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                        Schedule a campus tour and see our facilities in person.
                    </p>
                    <a href="tel:+918483848486">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary"
                        >
                            Call to Schedule
                            <ArrowRight size={18} />
                        </motion.button>
                    </a>
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

export default Contact;
