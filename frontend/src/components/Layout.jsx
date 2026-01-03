import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StickyRightSidebar from './StickyRightSidebar';
import RennyChatbot from './RennyChatbot';
import AdmissionModal from './AdmissionModal';

const Layout = () => {
    const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg-cream text-secondary-black font-body dark:bg-bg-dark dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />

            {/* Renny Chatbot (Replaces Floating WhatsApp) */}
            <RennyChatbot />

            {/* Desktop Sticky Sidebar */}
            <StickyRightSidebar onOpenAdmission={() => setIsAdmissionOpen(true)} />

            {/* Global Admission Modal */}
            <AdmissionModal isOpen={isAdmissionOpen} onClose={() => setIsAdmissionOpen(false)} />
        </div>
    );
};

export default Layout;
