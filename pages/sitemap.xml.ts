import { ArticleDataType } from "../COMPONENTS/types/ArticleTypes";
import { getData } from "../UTILS/getData";

async function fetchData() {
    const articles = await getData(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=articleCategory`);
    return articles?.data || [];
}

function generateSiteMap(articles: ArticleDataType[]) {
    const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;

    const createUrlEntry = (loc: string, lastmod?: string) => `
        <url>
            <loc>${domain}/${loc}</loc>
            ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>`;

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${createUrlEntry("", new Date().toISOString())}
        ${createUrlEntry("blog", new Date().toISOString())}
        ${createUrlEntry("booking", new Date().toISOString())}

        ${articles.map((article) =>
        createUrlEntry(
            `blog/${article.attributes.slug}`,
            new Date().toISOString()
        )
    ).join('')}
    </urlset>`;
}

export async function getServerSideProps({ res }) {
    const articles = await fetchData();
    const sitemap = generateSiteMap(articles);

    res.setHeader("Content-Type", "application/xml");
    res.write(sitemap);
    res.end();

    return { props: {} };
}

export default function SiteMap() { }
