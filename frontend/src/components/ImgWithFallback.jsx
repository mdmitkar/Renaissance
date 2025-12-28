import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

const ImgWithFallback = ({ src, alt, className, fallbackColor = "bg-gray-200" }) => {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div className={`flex items-center justify-center ${className} ${fallbackColor}`}>
                <ImageIcon className="text-gray-400 w-1/3 h-1/3" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
        />
    );
};

export default ImgWithFallback;
