import React from 'react'
import { ArticleResponseType } from '../../../COMPONENTS/types/ArticleTypes';
import ArticlePage from '../../../COMPONENTS/blog/ArticlePage';
import { getData } from '../../../UTILS/getData';
import { PageHead } from '../../../COMPONENTS/global_elements/PageHead';

interface BlogProps {
    article?: ArticleResponseType;
    error: string | null
}

const Blog = ({ article, error }: BlogProps) => {
    if (error) return <div>Error: {error}</div>
    return (
        <>
            <PageHead
                title={article?.data?.attributes?.seo?.seoTitle}
                description={article?.data?.attributes?.seo?.seoDescription}
                keywords={article?.data?.attributes?.seo?.seoKeywords}
            />
            <ArticlePage article={article} />
        </>
    )
}

export async function getServerSideProps({ params }) {
    try {
        const article = await getData(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${params.slug}?populate=seo,image`)


        return {
            props: {
                article,
                error: null
            }
        }
    } catch (error: any) {
        return {
            props: {
                articles: [],
                error: error.message
            }
        }
    }
}

export default Blog
