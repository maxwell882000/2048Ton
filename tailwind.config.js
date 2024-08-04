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
            boxShadow: {
                'b-button-label': '0 0.25rem 0 rgba(0, 0, 0, 0.25), 0 -0.25rem 0 #A75CF4 inset',
                'b-button': '0 0.25rem 0 rgba(0, 0, 0, 0.25), 0 -0.25rem 0 #4EC306 inset',
                'b-button-orange': '0 0.25rem 0 rgba(0, 0, 0, 0.25), 0 -0.25rem 0 #FFB213 inset',
                'b-button-hover': '0 0.25rem 0 rgba(0, 0, 0, 0.25)',
            },
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