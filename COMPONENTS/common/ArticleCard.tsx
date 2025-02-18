'use client'
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleDataType } from '../types/ArticleTypes';
import { theme } from '../shared/Theme';

type Props = {
    article?: ArticleDataType;
    activeContinent?: string;
    loading?: boolean;
}

const ArticleCard = ({ loading, article }: Props) => {
    const url = `/blog/${article?.attributes?.slug}`
    const imgSrc = `${process.env.NEXT_PUBLIC_API_URL}${article?.attributes?.image?.data?.attributes?.formats?.medium?.url
        ?? article?.attributes?.image?.data?.attributes?.url
        ?? '/'}`
    const imgAlt = article?.attributes?.image?.data?.attributes?.alternativeText
        ?? article?.attributes?.title

    return (
        <Paper key={article?.id}
            sx={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
                width: '100%',
                backgroundColor: "#fff",
                borderRadius: '0px',
                overflow: 'hidden',
                height: '100%',
            }}>
            <Link href={url} passHref aria-label={'Read more'}>
                <Stack sx={{
                    overflow: 'hidden',
                }}>
                    <Stack sx={{
                        height: { xs: '250px', md: '250px' },
                        // borderTopRightRadius: '5px',
                        // borderTopLeftRadius: '5px',
                        width: '100%',
                        alignItems: 'flex-end',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease',
                        ":hover": {
                            transform: loading ? '' : 'scale(1.05)'
                        }
                    }}>
                        {loading && <Skeleton variant="rectangular" width={'100%'} height={'100%'} />}
                        {!loading && <Image
                            src={imgSrc}
                            alt={imgAlt}
                            priority
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{
                                objectFit: 'cover',
                            }}
                        />}
                    </Stack>
                </Stack>
            </Link>

            <Stack sx={{ p: { xs: 2, md: 3 }, width: '100%', position: 'relative' }}>
                {/* <Typography variant='body2' sx={{ color: '#9b9b9b', textTransform: 'uppercase', fontWeight: 500, letterSpacing: 1 }}>
                    {loading ? <Skeleton /> : <> {'category'} {'continent' && <>• {'continent'}</>}</>}
                </Typography> */}
                <Link href={url} passHref aria-label={'Read more'}>
                    <Typography variant='h4' component={'h2'} sx={{
                        // py: 1,
                        color: theme.palette.secondary.main,
                        fontWeight: 700,
                        lineHeight: 1.2,
                        minHeight: { xs: 0, md: '102px' }
                    }}>
                        {loading ? <>
                            <Skeleton height={86} />
                        </> : article?.attributes?.title}
                    </Typography>
                </Link>

                <Typography variant='body1' sx={{ pt: 1, fontWeight: 500, minHeight: { xs: '6rem', sm: '6rem', md: '11rem' }, maxHeight: '11rem', overflow: 'hidden' }}>
                    {loading ? <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </> : article?.attributes?.shortContent}
                </Typography>

                <Typography sx={{
                    mt: 2,
                    height: '100%',
                    width: 'fit-content',
                    fontSize: 14,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    justifySelf: 'flex-end',
                    color: theme.palette.secondary.main,
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                    fontWeight: 600,
                    ':hover': { color: theme.palette.secondary.dark }
                }}>
                    {loading ?
                        <Skeleton width={100} aria-label="Read more about the topic" />
                        :
                        <Link aria-label="Read more about the topic" href={url} passHref>
                            Read article
                        </Link>}
                </Typography>
            </Stack>
        </Paper>

    )
}

export default ArticleCard
