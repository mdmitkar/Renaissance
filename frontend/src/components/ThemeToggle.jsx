import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ scrolled = false }) => {
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
            className={`
                relative p-2.5 rounded-xl
                transition-all duration-300
                ${scrolled
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }
            `}
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
