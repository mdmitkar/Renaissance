import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Modal Component for Renaissance Preschool
 * Glassmorphic modals for announcements, admissions, etc.
 */
const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    size = 'md',
    showClose = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    className = '',
}) => {
    // Handle escape key
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape' && closeOnEscape && isOpen) {
            onClose();
        }
    }, [closeOnEscape, isOpen, onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // Prevent body scroll when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]',
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 20,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 25,
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 20,
            transition: {
                duration: 0.2,
            }
        },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={closeOnBackdrop ? onClose : undefined}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className={`
                            relative w-full ${sizes[size]}
                            bg-surface-light dark:bg-surface-dark
                            rounded-3xl shadow-elevated
                            overflow-hidden
                            ${className}
                        `.trim()}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        {showClose && (
                            <button
                                onClick={onClose}
                                className="
                                    absolute top-4 right-4 z-10
                                    w-10 h-10 rounded-full
                                    bg-gray-100 dark:bg-gray-800
                                    text-text-secondary dark:text-text-dark-secondary
                                    hover:bg-gray-200 dark:hover:bg-gray-700
                                    hover:text-text-primary dark:hover:text-text-dark-primary
                                    flex items-center justify-center
                                    transition-colors duration-200
                                "
                            >
                                <X size={20} />
                            </button>
                        )}

                        {/* Title */}
                        {title && (
                            <div className="px-6 pt-6 pb-2">
                                <h2 className="text-2xl font-display font-bold text-text-primary dark:text-text-dark-primary">
                                    {title}
                                </h2>
                            </div>
                        )}

                        {/* Content */}
                        <div className={title ? 'px-6 pb-6' : 'p-6'}>
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

/**
 * Announcement Modal - Colorful modal for announcements
 */
export const AnnouncementModal = ({
    isOpen,
    onClose,
    title,
    message,
    image,
    ctaText = 'Got it!',
    ctaAction,
    variant = 'pink',
}) => {
    const gradients = {
        pink: 'from-primary-pink to-primary-pink-dark',
        teal: 'from-secondary-teal to-secondary-teal-dark',
        yellow: 'from-tertiary-yellow to-tertiary-yellow-dark',
        coral: 'from-accent-coral to-amber-500',
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md" showClose={false}>
            {/* Gradient Header */}
            <div className={`
                -m-6 mb-6 p-8 pt-12
                bg-gradient-to-br ${gradients[variant]}
                relative overflow-hidden
            `}>
                {/* Decorative shapes */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
                <div className="absolute bottom-4 left-8 w-12 h-12 bg-white/10 rounded-full" />

                <h2 className="text-3xl font-display font-bold text-white relative z-10">
                    {title}
                </h2>
            </div>

            {/* Image */}
            {image && (
                <div className="mb-6 -mx-2">
                    <img
                        src={image}
                        alt=""
                        className="w-full rounded-2xl shadow-medium"
                    />
                </div>
            )}

            {/* Message */}
            <p className="text-text-secondary dark:text-text-dark-secondary text-lg leading-relaxed mb-6">
                {message}
            </p>

            {/* CTA Button */}
            <button
                onClick={ctaAction || onClose}
                className={`
                    w-full py-4 rounded-2xl
                    bg-gradient-to-r ${gradients[variant]}
                    text-white font-bold text-lg
                    hover:opacity-90 transition-opacity
                    shadow-lg
                `}
            >
                {ctaText}
            </button>
        </Modal>
    );
};

/**
 * Admission Popup Modal
 */
export const AdmissionModal = ({
    isOpen,
    onClose,
    onApply,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <div className="text-center mb-6">
                {/* Badge */}
                <span className="inline-block px-4 py-1 mb-4 rounded-full bg-tertiary-yellow/20 text-yellow-700 dark:text-tertiary-yellow text-sm font-bold">
                    🎉 Admissions Open 2025-26
                </span>

                <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-4">
                    Join the Renaissance Family!
                </h2>

                <p className="text-text-secondary dark:text-text-dark-secondary text-lg max-w-md mx-auto">
                    Give your child the gift of a foundation built on love, laughter, and learning.
                </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                    { emoji: '🌟', text: 'Nurturing Environment' },
                    { emoji: '👩‍🏫', text: 'Expert Faculty' },
                    { emoji: '🎨', text: 'Play-Based Learning' },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 text-center"
                    >
                        <span className="text-3xl mb-2 block">{item.emoji}</span>
                        <span className="text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={onApply}
                    className="
                        flex-1 py-4 rounded-2xl
                        bg-primary-pink text-white
                        font-bold text-lg
                        hover:bg-primary-pink-dark transition-colors
                        shadow-lg shadow-primary-pink/30
                    "
                >
                    Apply Now
                </button>
                <button
                    onClick={onClose}
                    className="
                        flex-1 py-4 rounded-2xl
                        bg-gray-100 dark:bg-gray-800
                        text-text-primary dark:text-text-dark-primary
                        font-semibold text-lg
                        hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors
                    "
                >
                    Maybe Later
                </button>
            </div>
        </Modal>
    );
};

export default Modal;
