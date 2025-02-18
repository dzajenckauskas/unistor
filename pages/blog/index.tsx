import React from 'react'
import { ArticlesResponseType } from '../../COMPONENTS/types/ArticleTypes';
import { getData } from '../../UTILS/getData';
import BlogPage from '../../COMPONENTS/blog/BlogPage';

interface BlogProps {
    articles?: ArticlesResponseType;
    error: string | null
}

const Blog = ({ articles, error }: BlogProps) => {
    if (error) return <div>Error: {error}</div>
    return (
        <BlogPage articles={articles} />
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
