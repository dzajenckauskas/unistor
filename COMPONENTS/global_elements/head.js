import Head from "next/head";

export default function Headfn() {
    return (
        <Head>
            <title>UNISTOR</title>
            <meta
                name="description"
                content="Unistor - Student storage just got easier. We come to collect your valuables and deliver when you are ready! No commitment, No stress and takes less than 2 minutes  to book."
            />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            ></meta>
            <meta name="robots" content="all" />
            <meta name="googlebot" content="all" />
            <meta charSet="utf-8" />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favicons/apple-touch-icon.png"
            ></link>
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicons/favicon-32x32.png"
            ></link>
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicons/favicon-16x16.png"
            ></link>
            <link
                rel="manifest"
                href="/favicons/site.webmanifest"
            ></link>
        </Head>
    );
}
