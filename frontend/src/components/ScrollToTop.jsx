import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Prevent browser from restoring scroll position on reload
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // "instant" behavior overrides the "smooth" scroll-behavior in CSS
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
