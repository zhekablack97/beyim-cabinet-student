/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            sm: '1168px',
            // => @media (min-width: 640px) { ... }

            md: '1168px',
            // => @media (min-width: 768px) { ... }

            lg: '1168px',
            // => @media (min-width: 1024px) { ... }

            xl: '1168px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1168px',
            // => @media (min-width: 1536px) { ... }
        },
        container: {
            center: true,
            padding: '2rem',
        },
        extend: {
            colors: {
                'stroke-primary': '#B6D3E4',
            },
        },
    },
    plugins: [],
};
