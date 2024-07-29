/** @type {import('jest').Config} */
const config = {
    collectCoverageFrom: [
        "src/**/*.js",
        "!**/__tests__/**"
    ],
};

module.exports = config;