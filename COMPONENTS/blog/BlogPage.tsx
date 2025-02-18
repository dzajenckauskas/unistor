import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ArticleCard from '../common/ArticleCard';
import { MaxWidthContainer } from '../common/MaxWidthContainer';
import PageLayout from '../common/PageLayout';
import BreadcrumbsComponent from '../shared/BreadcrumbsComponent';
import { theme } from '../shared/Theme';
import { ArticleDataType, ArticlesResponseType } from '../types/ArticleTypes';

type Props = {
    articles?: ArticlesResponseType;
}

const BlogPage = ({ articles }: Props) => {
    const [active, setActive] = useState<string | undefined>('all-posts')

    const renderLatestArticlesLoading = Array.from({ length: 8 })?.map((_, index) => {
        return (
            <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                <ArticleCard loading />
            </Grid>
        )
    })

    const filteredArticles = articles?.data
    const renderLatestArticles = filteredArticles
        ?.map((a: ArticleDataType) => {
            return (
                <Grid item lg={3} md={4} sm={6} xs={12} key={a.id}>
                    <ArticleCard article={a} key={a.id} activeContinent={active !== 'all-posts' ? active : undefined} />
                </Grid>
            )
        })


    return (
        <PageLayout>
            <main style={{
                backgroundColor: "#efefef"
            }}>
                <MaxWidthContainer>
                    <Stack sx={{
                        display: 'flex', flexDirection: 'column',
                    }}>
                        <BreadcrumbsComponent>
                            <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                Blog
                            </Typography>
                        </BreadcrumbsComponent>
                    </Stack>
                </MaxWidthContainer>
                <MaxWidthContainer sx={{
                    display: 'flex', flexDirection: 'column',
                    backgroundColor: "#efefef",
                    width: '100%',
                    pb: 6
                }}>
                    <Stack sx={{
                        width: '100%'
                    }}>
                        {/* <Typography variant='body2' color={theme.palette.secondary.main} sx={{ pb: 2, fontWeight: 600 }}>
                            {'Filter by continent:'}
                        </Typography> */}

                        {/* <Stack direction={'row'} sx={{
                            display: 'flex',
                            paddingBottom: 3,
                            gap: 1,
                            flexWrap: 'wrap'
                        }}>
                            <Button
                                onClick={() => setActive('all-posts')}
                                style={{
                                    padding: '10px 18px',
                                    borderRadius: '2px',
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    backgroundColor: active == 'all-posts' ? '#e71d5e' : '#d9d9d9',
                                    color: active == 'all-posts' ? '#fff' : '#e71d5e',
                                    textTransform: 'uppercase'
                                }}>
                                {"all posts"}
                            </Button>
                            {renderArticleContinents}
                        </Stack> */}
                        <Grid container spacing={2} sx={{ display: 'flex', }}>
                            {(!articles) ? renderLatestArticlesLoading : renderLatestArticles}
                        </Grid>
                        {(active !== 'all-posts' && filteredArticles?.length === 0) &&
                            <Typography color={theme.palette.secondary.main}
                                sx={{ pt: 2, display: 'flex', gap: 16, fontSize: '18px', justifyContent: 'space-between', width: '100%', fontWeight: 600 }}>
                                {"No articles yet"}
                            </Typography>}
                    </Stack>

                </MaxWidthContainer>
            </main>
        </PageLayout>
    )
}

export default BlogPage
