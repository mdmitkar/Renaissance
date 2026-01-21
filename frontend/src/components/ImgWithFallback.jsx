import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

const ImgWithFallback = ({ src, alt, className, fallbackColor = "bg-gray-200", loading = "lazy", ...props }) => {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div className={`flex items-center justify-center ${className} ${fallbackColor}`} {...props}>
                <ImageIcon className="text-gray-400 w-1/3 h-1/3" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading={loading}
            onError={() => setError(true)}
            {...props}
        />
    );
};

export default ImgWithFallback;
