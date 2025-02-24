import { SxProps } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import useSWR from 'swr';
import ArticleCard from '../common/ArticleCard';
import { MaxWidthContainer } from '../common/MaxWidthContainer';
import { ArticleDataType } from '../types/ArticleTypes';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Props = {
    sx?: SxProps;
    bgColor?: string;
    titleColor?: string;
}

const LatestArticles = ({ sx, bgColor, titleColor }: Props) => {
    const latestArticlesUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=seo,image&sort[0]=createdAt:desc&sort[1]=updatedAt:desc&pagination[page]=1&pagination[pageSize]=3`

    const { data: latestArticles, isLoading } = useSWR(
        latestArticlesUrl,
        fetcher
    );

    const filteredLatestArticles = latestArticles?.data?.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })

    const renderLatestArticlesLoading = Array.from({ length: 3 })?.map((_, index) => {
        return (
            <Stack key={index} width={'100%'}>
                <ArticleCard loading />
            </Stack>
        )
    })
    const renderLatestArticles = filteredLatestArticles?.map((article: ArticleDataType) => {
        return (
            <Stack key={article.id} width={'100%'}>
                <ArticleCard article={article} />
            </Stack>
        )
    })
    return (
        <>
            {latestArticles?.data && latestArticles?.data?.length > 0 &&
                <Stack sx={{ width: '100%', backgroundColor: bgColor ?? '#efefef', py: { xs: 6, md: 6 }, ...sx }}>
                    <MaxWidthContainer>
                        <Stack sx={{
                            width: '100%',
                            display: 'flex', flexDirection: 'column',
                            mb: 4
                        }}>
                            <Stack direction={'column'} alignItems={'center'} pt={4}>
                                <div className="diamond"></div>
                                <h2 className="customersrevtitle" style={{ color: titleColor ?? "#000", marginBottom: 16 }}>
                                    Latest articles
                                </h2>
                            </Stack>
                            {isLoading &&
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 4, justifyContent: 'center', width: '100%' }}>
                                    {renderLatestArticlesLoading}
                                </Stack>}
                            {!isLoading && <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 4, justifyContent: 'center', width: '100%' }}>
                                {renderLatestArticles}
                            </Stack>}
                            <Stack direction={'row'} spacing={3} sx={{ mt: 0, justifyContent: 'center', width: '100%' }}>
                                <Grid container spacing={2} sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                    <Grid item lg={4} md={4} sm={6} xs={12}>
                                        <Link aria-label="View all articles" passHref href={'/blog'} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                            <div
                                                className="aboutusbuttongetintouch"
                                            >
                                                View all articles
                                            </div>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Stack>
                    </MaxWidthContainer>
                </Stack>}
        </>
    )
}

export default LatestArticles
