import React from 'react'
import { ArticlesResponseType } from '../../COMPONENTS/types/ArticleTypes';
import { getData } from '../../UTILS/getData';
import BlogPage from '../../COMPONENTS/blog/BlogPage';
import { PageHead } from '../../COMPONENTS/global_elements/PageHead';
import { PageResponseType, SeoType } from '../../COMPONENTS/types/PageType';
import ErrorBox from '../../COMPONENTS/shared/ErrorBox';

interface BlogProps {
    articles?: ArticlesResponseType;
    error: string | null;
    blogPage: PageResponseType;
}

const Blog = ({ articles, error, blogPage }: BlogProps) => {
    return (
        <>
            <PageHead
                title={blogPage?.data?.attributes?.seo?.seoTitle}
                description={blogPage?.data?.attributes?.seo?.seoDescription}
                keywords={blogPage?.data?.attributes?.seo?.seoKeywords}
            />
            {error && <ErrorBox error={error} />}
            <BlogPage articles={articles} />
        </>
    )
}


export async function getServerSideProps() {
    try {
        const blogPage = await getData(`${process.env.NEXT_PUBLIC_API_URL}/api/blog-page?populate=seo`)
        console.log(blogPage, "blogPage");

        const articles = await getData(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=image`)
        return {
            props: {
                articles,
                blogPage,
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
