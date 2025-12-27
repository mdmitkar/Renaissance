import React from 'react';

const FloatingWhatsApp = () => {
    const whatsappLink = "https://wa.me/918483848486?text=Hello%20Renaissance%20Preschool%2C%0A%0AI%20am%20interested%20in%20admission%20for%20my%20child.%20Kindly%20share%20details%20about%20programs%2C%20fees%2C%20and%20admission%20process.%0A%0AThank%20you.";

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center z-50 hover:scale-110 hover:shadow-xl transition-all duration-300"
        >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="Chat on WhatsApp" className="w-8 h-8 brightness-0 invert" />
        </a>
    );
};

export default FloatingWhatsApp;
