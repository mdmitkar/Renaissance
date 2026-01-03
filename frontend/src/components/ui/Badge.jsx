import React from 'react';
import { motion } from 'framer-motion';

/**
 * Badge Component for Renaissance Preschool
 * Colorful badges for tags, status, and notifications
 */
const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    dot = false,
    pulse = false,
    className = '',
    ...props
}) => {
    const baseStyles = `
        inline-flex items-center justify-center
        font-semibold rounded-full
        transition-all duration-200
    `;

    const variants = {
        default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        pink: 'bg-primary-pink/10 text-primary-pink border border-primary-pink/20',
        teal: 'bg-secondary-teal/10 text-secondary-teal border border-secondary-teal/20',
        yellow: 'bg-tertiary-yellow/20 text-yellow-700 dark:text-tertiary-yellow border border-tertiary-yellow/30',
        coral: 'bg-accent-coral/10 text-accent-coral border border-accent-coral/20',
        mint: 'bg-accent-mint/20 text-emerald-700 dark:text-accent-mint border border-accent-mint/30',
        lavender: 'bg-accent-lavender/20 text-blue-700 dark:text-accent-lavender border border-accent-lavender/30',
        violet: 'bg-accent-violet/20 text-purple-700 dark:text-accent-violet border border-accent-violet/30',
        success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        // Solid variants
        'pink-solid': 'bg-primary-pink text-white',
        'teal-solid': 'bg-secondary-teal text-white',
        'yellow-solid': 'bg-tertiary-yellow text-text-primary',
        'coral-solid': 'bg-accent-coral text-white',
    };

    const sizes = {
        xs: 'px-2 py-0.5 text-xs',
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
    };

    const dotColors = {
        default: 'bg-gray-400',
        pink: 'bg-primary-pink',
        teal: 'bg-secondary-teal',
        yellow: 'bg-tertiary-yellow',
        coral: 'bg-accent-coral',
        mint: 'bg-accent-mint',
        success: 'bg-green-500',
        warning: 'bg-amber-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    };

    return (
        <span
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {dot && (
                <span className={`
                    w-2 h-2 rounded-full mr-2
                    ${dotColors[variant] || dotColors.default}
                    ${pulse ? 'animate-pulse' : ''}
                `} />
            )}
            {children}
        </span>
    );
};

/**
 * Notification Badge - Small badge for icons/buttons
 */
export const NotificationBadge = ({
    count,
    max = 99,
    show = true,
    className = '',
}) => {
    if (!show) return null;

    const displayCount = count > max ? `${max}+` : count;

    return (
        <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`
                absolute -top-1 -right-1
                min-w-[18px] h-[18px] px-1
                flex items-center justify-center
                bg-primary-pink text-white
                text-xs font-bold rounded-full
                border-2 border-surface-light dark:border-surface-dark
                ${className}
            `.trim()}
        >
            {displayCount}
        </motion.span>
    );
};

/**
 * Pill Badge - Used for tags in cards
 */
export const PillBadge = ({
    children,
    icon: Icon,
    color = 'pink',
    className = '',
}) => {
    const colors = {
        pink: 'bg-primary-pink/10 text-primary-pink hover:bg-primary-pink/20',
        teal: 'bg-secondary-teal/10 text-secondary-teal hover:bg-secondary-teal/20',
        yellow: 'bg-tertiary-yellow/20 text-yellow-700 hover:bg-tertiary-yellow/30',
        coral: 'bg-accent-coral/10 text-accent-coral hover:bg-accent-coral/20',
    };

    return (
        <span className={`
            inline-flex items-center gap-1.5
            px-3 py-1.5 rounded-full
            text-sm font-medium
            transition-colors duration-200
            ${colors[color]}
            ${className}
        `.trim()}>
            {Icon && <Icon size={14} />}
            {children}
        </span>
    );
};

/**
 * Status Badge with animated dot
 */
export const StatusBadge = ({
    status = 'active',
    label,
    className = '',
}) => {
    const statuses = {
        active: {
            bg: 'bg-green-100 dark:bg-green-900/30',
            text: 'text-green-700 dark:text-green-400',
            dot: 'bg-green-500',
        },
        pending: {
            bg: 'bg-amber-100 dark:bg-amber-900/30',
            text: 'text-amber-700 dark:text-amber-400',
            dot: 'bg-amber-500',
        },
        inactive: {
            bg: 'bg-gray-100 dark:bg-gray-800',
            text: 'text-gray-600 dark:text-gray-400',
            dot: 'bg-gray-400',
        },
        new: {
            bg: 'bg-primary-pink/10',
            text: 'text-primary-pink',
            dot: 'bg-primary-pink',
        },
    };

    const { bg, text, dot } = statuses[status] || statuses.active;

    return (
        <span className={`
            inline-flex items-center gap-2
            px-3 py-1 rounded-full
            text-sm font-medium
            ${bg} ${text}
            ${className}
        `.trim()}>
            <span className={`relative w-2 h-2 rounded-full ${dot}`}>
                <span className={`absolute inset-0 rounded-full ${dot} animate-ping opacity-75`} />
            </span>
            {label || status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default Badge;
