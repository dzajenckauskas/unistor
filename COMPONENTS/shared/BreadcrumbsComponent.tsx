import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React from 'react'
import { theme } from './Theme'

type Props = {
    children: React.ReactNode
}

const BreadcrumbsComponent = ({ children }: Props) => {
    return (
        <Stack direction={'row'} justifyContent={'flex-start'} spacing={.5} sx={{
            paddingTop: 2.5,
            marginBottom: 2,
            alignItems: 'center'
        }}>
            <Link passHref href={'/'}>
                <Typography variant='body2' sx={{ ':hover': { textDecoration: 'underline' }, fontWeight: 500, color: theme.palette.secondary.main }}>
                    Home
                </Typography>
            </Link>
            <Typography variant='body2' sx={{ fontWeight: 400, color: theme.palette.secondary.main }}>
                {'/'}
            </Typography>
            {children}
        </Stack>
    )
}

export default BreadcrumbsComponent
