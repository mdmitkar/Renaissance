import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    canonical,
    image = '/logo-circle.png',
    type = 'website',
    schema
}) => {
    const siteName = 'Renaissance Preschool';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const fullUrl = canonical ? `https://renaissancepreschool.in${canonical}` : 'https://renaissancepreschool.in';
    const fullImage = image.startsWith('http') ? image : `https://renaissancepreschool.in${image}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "EducationalOrganization",
                    "name": siteName,
                    "url": "https://renaissancepreschool.in",
                    "logo": "https://renaissancepreschool.in/logo-circle.png",
                    "description": "Renaissance Preschool offering holistic education with the Seven Petals philosophy.",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Bhiwandi",
                        "addressRegion": "Maharashtra",
                        "addressCountry": "IN"
                    },
                    // Merge in any page-specific schema
                })}
            </script>
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
