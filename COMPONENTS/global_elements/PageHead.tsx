import Head from "next/head";

type Props = {
    title?: string;
    description?: string;
    keywords?: string;
    url?: string;
}

export const PageHead = ({ title, description, keywords, url }: Props) => {
    return (
        <Head>
            <title>{title ?? "UNISTOR"}</title>
            <meta name="description" content={description ?? "Unistor - Student storage just got easier. We come to collect your valuables and deliver when you are ready! No commitment, No stress and takes less than 2 minutes to book."} />
            <meta name="keywords" content={keywords ?? "storage, student storage, easy storage, hassle-free storage"} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="all" />
            <meta name="googlebot" content="all" />
            <meta charSet="utf-8" />
            <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${url}`} />
            <meta property="og:title" content={title ?? "UNISTOR"} />
            <meta property="og:description" content={description ?? "Unistor - Student storage just got easier."} />
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/logo.png`} />
            <meta property="twitter:title" content={title ?? "UNISTOR"} />
            <meta property="twitter:description" content={description ?? "Unistor - Student storage just got easier."} />
            <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/logo.png`} />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
            <link rel="manifest" href="/favicons/site.webmanifest" />
        </Head>
    );
}