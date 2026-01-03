import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone, Sparkles, ArrowRight } from 'lucide-react';

/**
 * Banner Component for Renaissance Preschool
 * Announcement banners, highlights, and CTAs
 */
const Banner = ({
    children,
    variant = 'info',
    dismissible = false,
    icon: Icon,
    onDismiss,
    className = '',
}) => {
    const [isVisible, setIsVisible] = useState(true);

    const variants = {
        info: 'bg-accent-lavender/20 border-accent-lavender text-blue-800 dark:text-accent-lavender',
        success: 'bg-accent-mint/20 border-accent-mint text-emerald-800 dark:text-accent-mint',
        warning: 'bg-tertiary-yellow/20 border-tertiary-yellow text-amber-800 dark:text-tertiary-yellow',
        error: 'bg-accent-coral/20 border-accent-coral text-red-800 dark:text-accent-coral',
        announcement: 'bg-primary-pink/10 border-primary-pink text-primary-pink',
        gradient: 'bg-gradient-playful text-white border-transparent',
    };

    const handleDismiss = () => {
        setIsVisible(false);
        onDismiss?.();
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
                relative px-4 py-3 rounded-xl border
                ${variants[variant]}
                ${className}
            `.trim()}
        >
            <div className="flex items-center gap-3">
                {Icon && <Icon size={20} className="flex-shrink-0" />}
                <div className="flex-1 text-sm font-medium">{children}</div>
                {dismissible && (
                    <button
                        onClick={handleDismiss}
                        className="p-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </motion.div>
    );
};

/**
 * Sticky Top Banner - Full width announcement bar
 */
export const StickyBanner = ({
    message,
    ctaText,
    ctaLink,
    variant = 'gradient',
    dismissible = true,
    storageKey = 'banner-dismissed',
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has dismissed this banner before
        const dismissed = localStorage.getItem(storageKey);
        if (!dismissed) {
            setIsVisible(true);
        }
    }, [storageKey]);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem(storageKey, 'true');
    };

    const gradients = {
        gradient: 'bg-gradient-to-r from-primary-pink via-accent-coral to-tertiary-yellow',
        pink: 'bg-primary-pink',
        teal: 'bg-secondary-teal',
        dark: 'bg-navy-deep',
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`
                        ${gradients[variant]} text-white
                        relative overflow-hidden
                    `}
                >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Ccircle cx=%2210%22 cy=%2210%22 r=%222%22 fill=%22white%22/%3E%3C/svg%3E')] animate-pulse" />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 py-3">
                        <div className="flex items-center justify-center gap-4 text-sm font-medium">
                            <Sparkles size={18} className="animate-pulse" />
                            <span>{message}</span>
                            {ctaText && ctaLink && (
                                <a
                                    href={ctaLink}
                                    className="
                                        inline-flex items-center gap-1
                                        px-3 py-1 rounded-full
                                        bg-white/20 hover:bg-white/30
                                        transition-colors font-semibold
                                    "
                                >
                                    {ctaText}
                                    <ArrowRight size={14} />
                                </a>
                            )}
                            {dismissible && (
                                <button
                                    onClick={handleDismiss}
                                    className="absolute right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/**
 * Highlight Banner - For special sections
 */
export const HighlightBanner = ({
    title,
    subtitle,
    ctaText,
    onCtaClick,
    image,
    variant = 'pink',
}) => {
    const gradients = {
        pink: 'from-primary-pink to-primary-pink-dark',
        teal: 'from-secondary-teal to-secondary-teal-dark',
        coral: 'from-accent-coral to-amber-500',
        sunset: 'from-primary-pink via-accent-coral to-tertiary-yellow',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`
                relative overflow-hidden rounded-3xl
                bg-gradient-to-br ${gradients[variant]}
                p-8 md:p-12
            `}
        >
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                {/* Content */}
                <div className="flex-1 text-center md:text-left text-white">
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-3">
                        {title}
                    </h3>
                    <p className="text-white/80 text-lg mb-6 max-w-md">
                        {subtitle}
                    </p>
                    {ctaText && (
                        <button
                            onClick={onCtaClick}
                            className="
                                inline-flex items-center gap-2
                                px-6 py-3 rounded-full
                                bg-white text-primary-pink
                                font-bold
                                hover:bg-white/90 transition-colors
                                shadow-lg
                            "
                        >
                            {ctaText}
                            <ArrowRight size={18} />
                        </button>
                    )}
                </div>

                {/* Image */}
                {image && (
                    <div className="flex-shrink-0">
                        <img
                            src={image}
                            alt=""
                            className="w-48 h-48 rounded-full object-cover border-4 border-white/30 shadow-xl"
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

/**
 * Marquee Banner - Scrolling text announcement
 */
export const MarqueeBanner = ({
    items = [],
    speed = 30,
    className = '',
}) => {
    return (
        <div className={`
            overflow-hidden bg-navy-deep text-white py-3
            ${className}
        `}>
            <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    duration: speed,
                    ease: 'linear',
                    repeat: Infinity,
                }}
                className="flex items-center gap-8 whitespace-nowrap"
            >
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="flex items-center gap-2 text-sm font-medium">
                        <Megaphone size={16} className="text-tertiary-yellow" />
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Banner;
