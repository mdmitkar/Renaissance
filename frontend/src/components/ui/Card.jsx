import React from 'react';
import { motion } from 'framer-motion';

/**
 * Card Component for Renaissance Preschool
 * Variants: elevated, glass, playful, feature, image
 */
const Card = ({
    children,
    variant = 'elevated',
    padding = 'md',
    hover = true,
    className = '',
    onClick,
    ...props
}) => {
    const baseStyles = `
        relative overflow-hidden
        transition-all duration-300
    `;

    const variants = {
        elevated: `
            bg-surface-light dark:bg-surface-dark
            rounded-2xl shadow-soft
            border border-gray-100 dark:border-gray-800
            ${hover ? 'hover:shadow-medium hover:-translate-y-1' : ''}
        `,
        glass: `
            glass-card
            rounded-2xl
            ${hover ? 'hover:shadow-elevated hover:-translate-y-1' : ''}
        `,
        playful: `
            bg-surface-light dark:bg-surface-dark
            rounded-3xl shadow-medium
            border-2 border-transparent
            ${hover ? 'hover:border-primary-pink hover:shadow-elevated hover:-translate-y-2' : ''}
        `,
        feature: `
            bg-gradient-to-br from-surface-light to-gray-50
            dark:from-surface-dark dark:to-navy-deep
            rounded-3xl shadow-soft
            border border-gray-100 dark:border-gray-700
            ${hover ? 'hover:shadow-medium hover:-translate-y-1' : ''}
        `,
        image: `
            bg-surface-light dark:bg-surface-dark
            rounded-2xl shadow-medium overflow-hidden
            ${hover ? 'hover:shadow-elevated hover:scale-[1.02]' : ''}
        `,
        gradient: `
            bg-gradient-playful
            rounded-3xl shadow-medium
            ${hover ? 'hover:shadow-elevated hover:-translate-y-1' : ''}
        `,
    };

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
    };

    const combinedClasses = `
        ${baseStyles}
        ${variants[variant]}
        ${paddings[padding]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
    `.replace(/\s+/g, ' ').trim();

    return (
        <motion.div
            className={combinedClasses}
            onClick={onClick}
            whileHover={hover ? { y: -4 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

/**
 * Feature Card with Icon
 */
export const FeatureCard = ({
    icon: Icon,
    title,
    description,
    color = 'pink',
    className = '',
}) => {
    const colors = {
        pink: 'bg-primary-pink text-white',
        teal: 'bg-secondary-teal text-white',
        yellow: 'bg-tertiary-yellow text-text-primary',
        coral: 'bg-accent-coral text-white',
        lavender: 'bg-accent-lavender text-text-primary',
        mint: 'bg-accent-mint text-text-primary',
    };

    return (
        <Card variant="playful" className={`text-center group ${className}`}>
            <div className={`
                w-16 h-16 mx-auto rounded-2xl ${colors[color]}
                flex items-center justify-center mb-4
                shadow-lg group-hover:scale-110 group-hover:rotate-6
                transition-all duration-300
            `}>
                {Icon && <Icon size={28} />}
            </div>
            <h3 className="text-xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-2">
                {title}
            </h3>
            <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                {description}
            </p>
        </Card>
    );
};

/**
 * Image Card with Overlay
 */
export const ImageCard = ({
    src,
    alt,
    title,
    subtitle,
    className = '',
    aspectRatio = 'aspect-video',
    overlay = true,
}) => {
    return (
        <Card variant="image" padding="none" className={`group ${className}`}>
            <div className={`relative ${aspectRatio} overflow-hidden`}>
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {overlay && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            {title && <h4 className="font-display font-bold text-lg">{title}</h4>}
                            {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

/**
 * Stats Card
 */
export const StatsCard = ({
    number,
    label,
    icon: Icon,
    color = 'pink',
    className = '',
}) => {
    const colors = {
        pink: 'text-primary-pink',
        teal: 'text-secondary-teal',
        yellow: 'text-tertiary-yellow',
        coral: 'text-accent-coral',
    };

    return (
        <Card variant="elevated" className={`text-center ${className}`}>
            {Icon && (
                <div className={`${colors[color]} mb-2`}>
                    <Icon size={32} className="mx-auto" />
                </div>
            )}
            <div className={`text-4xl font-display font-bold ${colors[color]} mb-1`}>
                {number}
            </div>
            <div className="text-text-secondary dark:text-text-dark-secondary text-sm font-medium">
                {label}
            </div>
        </Card>
    );
};

export default Card;
