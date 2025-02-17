// pages/blog.tsx
import React from 'react'
import { ArticlesResponseType } from '../../COMPONENTS/types/ArticleTypes';
import GuidesCategoryPage from '../../COMPONENTS/blog/GuidesCategoryPage';
import { getData } from '../../UTILS/getData';

interface BlogProps {
    articles?: ArticlesResponseType;
    error: string | null
}

const Blog = ({ articles, error }: BlogProps) => {
    if (error) return <div>Error: {error}</div>
    console.log(articles, 'articles');

    return (
        <GuidesCategoryPage articles={articles} />
    )
}

export async function getServerSideProps() {
    try {
        const articles = await getData(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=image`)
        return {
            props: {
                articles,
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
