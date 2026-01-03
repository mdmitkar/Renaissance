import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Life @ School', path: '/life' },
    { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            <header
                className={`
                    fixed top-0 left-0 right-0 z-50
                    transition-all duration-500 ease-smooth
                    ${scrolled
                        ? 'py-3 bg-cream-warm/95 dark:bg-navy-deep/95 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800'
                        : 'py-5 bg-transparent'
                    }
                `}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <NavLink to="/" className="flex items-center gap-3 group">
                            <img
                                src="/logo_.png"
                                alt="Renaissance"
                                className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-contain transition-transform group-hover:scale-105"
                            />
                            <div className="hidden sm:block">
                                <h1 className={`
                                    font-display text-lg md:text-xl font-bold tracking-tight
                                    transition-colors duration-300
                                    ${scrolled
                                        ? 'text-slate-900 dark:text-white'
                                        : 'text-slate-900 dark:text-white'
                                    }
                                `}>
                                    Renaissance
                                </h1>
                                <p className={`
                                    text-xs font-heading font-semibold tracking-wide
                                    transition-colors duration-300
                                    ${scrolled
                                        ? 'text-slate-500 dark:text-slate-400'
                                        : 'text-slate-600 dark:text-slate-400'
                                    }
                                `}>
                                    Preschool
                                </p>
                            </div>
                        </NavLink>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) => `
                                        px-4 py-2 rounded-full
                                        font-heading font-bold text-sm
                                        transition-all duration-300
                                        ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5'
                                        }
                                    `}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3">
                            <ThemeToggle scrolled={scrolled} />

                            {/* CTA Button - Desktop */}
                            <NavLink to="/admission" className="hidden md:block">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="
                                        inline-flex items-center gap-2
                                        px-6 py-2.5 rounded-full
                                        bg-gradient-to-r from-primary to-primary-dark
                                        text-white
                                        font-heading font-bold text-sm
                                        shadow-lg shadow-primary/25
                                        hover:shadow-xl hover:shadow-primary/40
                                        transition-all duration-300
                                    "
                                >
                                    Apply Now
                                    <ArrowRight size={16} />
                                </motion.button>
                            </NavLink>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`
                                    lg:hidden p-2.5 rounded-xl
                                    transition-all duration-300
                                    hover:bg-primary/10 hover:text-primary
                                    ${scrolled
                                        ? 'bg-transparent text-slate-700 dark:text-slate-200'
                                        : 'bg-white/50 text-slate-900 dark:text-white'
                                    }
                                `}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="
                            fixed top-0 right-0 bottom-0 z-50
                            w-[85%] max-w-sm
                            bg-lavender-light dark:bg-slate-900
                            shadow-2xl
                            lg:hidden
                        "
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                                <span className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Links */}
                            <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) => `
                                                block px-4 py-3 rounded-xl
                                                font-heading font-medium
                                                transition-colors duration-200
                                                ${isActive
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                }
                                            `}
                                        >
                                            {link.name}
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* CTA */}
                            <div className="p-5 border-t border-slate-100 dark:border-slate-800">
                                <NavLink to="/admission" onClick={() => setIsOpen(false)}>
                                    <button className="
                                        w-full flex items-center justify-center gap-2
                                        px-5 py-3.5 rounded-xl
                                        bg-primary text-white
                                        font-heading font-semibold
                                        hover:bg-primary-dark
                                        transition-colors
                                    ">
                                        Apply for Admission
                                        <ArrowRight size={18} />
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
