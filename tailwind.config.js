/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {

        fontSize: {
            base: '16px', // This sets the base font size to 16px
        },
        extend: {
            width: {
                'lg-button': '16rem',
                'sm-button': '7.375rem', // Add more custom widths as needed
            },
            borderRadius: {
                'button': "2.063rem",
                'container': "1.313rem"
            }
        },
    },
    variants: {},
    plugins: [],
}