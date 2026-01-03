import React from 'react';
import { motion } from 'framer-motion';

/**
 * Playful Button Component for Renaissance Preschool
 * Variants: primary, secondary, tertiary, outline, ghost
 * Sizes: sm, md, lg, xl
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'right',
    fullWidth = false,
    loading = false,
    disabled = false,
    className = '',
    onClick,
    type = 'button',
    href,
    ...props
}) => {
    const baseStyles = `
        relative inline-flex items-center justify-center gap-2
        font-semibold rounded-full
        transition-all duration-300 ease-smooth-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
        overflow-hidden
    `;

    const variants = {
        primary: `
            bg-primary-pink text-white
            hover:bg-primary-pink-dark hover:shadow-glow-pink
            focus-visible:ring-primary-pink
            dark:bg-primary-pink dark:hover:bg-primary-pink-dark
        `,
        secondary: `
            bg-secondary-teal text-white
            hover:bg-secondary-teal-dark hover:shadow-glow-teal
            focus-visible:ring-secondary-teal
        `,
        tertiary: `
            bg-tertiary-yellow text-text-primary
            hover:bg-tertiary-yellow-dark hover:shadow-glow-yellow
            focus-visible:ring-tertiary-yellow
        `,
        outline: `
            bg-transparent border-2 border-primary-pink text-primary-pink
            hover:bg-primary-pink hover:text-white
            focus-visible:ring-primary-pink
            dark:border-primary-pink dark:text-primary-pink
            dark:hover:bg-primary-pink dark:hover:text-white
        `,
        ghost: `
            bg-transparent text-primary-pink
            hover:bg-primary-pink/10
            focus-visible:ring-primary-pink
        `,
        coral: `
            bg-accent-coral text-white
            hover:bg-accent-coral/90 hover:shadow-lg
            focus-visible:ring-accent-coral
        `,
        mint: `
            bg-accent-mint text-text-primary
            hover:bg-accent-mint/90 hover:shadow-lg
            focus-visible:ring-accent-mint
        `,
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
    };

    const iconSizes = {
        sm: 16,
        md: 18,
        lg: 20,
        xl: 24,
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const combinedClasses = `
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${className}
    `.replace(/\s+/g, ' ').trim();

    const content = (
        <>
            {/* Ripple Effect Layer */}
            <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="ripple-effect" />
            </span>

            {/* Loading Spinner */}
            {loading && (
                <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}

            {/* Icon Left */}
            {Icon && iconPosition === 'left' && !loading && (
                <Icon size={iconSizes[size]} className="flex-shrink-0" />
            )}

            {/* Button Text */}
            <span className="relative z-10">{children}</span>

            {/* Icon Right */}
            {Icon && iconPosition === 'right' && !loading && (
                <Icon size={iconSizes[size]} className="flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            )}
        </>
    );

    // Motion variants for animation
    const motionProps = {
        whileHover: disabled ? {} : { scale: 1.03 },
        whileTap: disabled ? {} : { scale: 0.97 },
        transition: { type: 'spring', stiffness: 400, damping: 17 }
    };

    // Render as link if href is provided
    if (href) {
        return (
            <motion.a
                href={href}
                className={`${combinedClasses} group`}
                {...motionProps}
                {...props}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${combinedClasses} group`}
            {...motionProps}
            {...props}
        >
            {content}
        </motion.button>
    );
};

export default Button;
