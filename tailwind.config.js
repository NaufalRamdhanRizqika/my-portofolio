/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/js/**/*.jsx',
        './resources/views/**/*.blade.php',
    ],
    theme: {
        extend: {
            colors: {
                surface: '#123b34',
                mid: '#0c2a25',
                deep: '#071513',
                abyss: '#04100e',
                foam: '#d9ede8',
                ink: '#eef7f4',
                muted: '#93b3ac',
                koi: '#e2672f',
                koi2: '#f2ede1',
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};