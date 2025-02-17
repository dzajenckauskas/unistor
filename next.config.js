/** @type {import('next').NextConfig} */

const securityHeaders = [
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
    },
    {
        key: "Permissions-Policy",
        value: "",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "origin-when-cross-origin",
    },
];

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1345',
            },
        ],
    },
    distDir: 'build',
    reactStrictMode: false,
    experimental: {
        appDir: false,

        fontLoaders: [
            {
                loader: "@next/font/google",
                options: { subsets: ["latin"] },
            },
        ],
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders,
            },
        ];
    },
    env: {
        email: "hello@unistor.co.uk",
        emailHost: "smtpout.secureserver.net",
        emailPassword: "#0rIR*8Ve7OG",
        production:
            process && process.env.NODE_ENV === "production"
                ? true
                : false,
        jwtSecret:
            "c3FWn6KULmx57PGfpSsJp9reFHkjCbXALrAAIGTzCSg6DAvnyt58MBc64dNK93Ku",
        mongoProduction:
            "mongodb://unistorAdmin:nyJ2bXn6funWKBNG@127.0.0.1:25431/",
        mongoDEV: `mongodb://127.0.0.1:27017/`,
        dbName: "unistor",
        adminName:
            "$2a$10$QuYzFdp3Ax75CPl5JrRFVedVb2R7BemGJoCZiALmBzOg7XvfZ7/4G",
        adminPass:
            "$2a$10$4dA2Ugr5pSSuabp9h7AbnuPIXztpEbkvt1lLKskSyYEN.F9NiRF.i",

        stripePublic:
            "pk_test_51MCNJ7GphLlAPCZ8jcHt14TNsPj0iOxdYsztc7sQYqstD5Ra2jBLkpKCswwyoADBW9ctgVnYdHQMIaTmVqzolqjN00Ro9sVfXn",
        stripePrivate:
            "sk_test_51MCNJ7GphLlAPCZ8Msi39jCz6k9nh2tD6Go7V7KNduKzIf0wsd7SsYO9FwnNKwr5zsFYkNWPcMp8gNqNnV5m0n4000I2s6ADfE",
        stripePublicProd:
            "pk_live_51MwSqyBVInTkGGBBhqMBpsFkhL7h1s7sdXrZPRqlNaojgbhLeQRnQSvCHvZkgAkh3oh6Js3AUQ6m9yTP8cWa7AUh00fLp5Rd7c",
        stripePrivateProd:
            "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",

        placesApiKey: "AIzaSyDbV6oSdq82YQ8tuKC8NEP_fkkSKlzs9Ck",
        placesApiProd: "AIzaSyDqR1j2_rjypfBHFjep-3SjsSHY5kYgK_Q",
        cryptokey:
            "a5kuCCs9nqkLzcYDB7nyBwD8hwn2j9p7Dc93StM42WRbjmsQK7h5bUzBer2Bb7VM5tedRF2nH94ahjfa",
    },
};

module.exports = nextConfig;
