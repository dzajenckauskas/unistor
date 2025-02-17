import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/system';
import React from 'react';

type Props = {
    children: React.ReactNode
    sx?: SxProps;
    spacing?: number;
}
export const MaxWidthContainer = ({ children, sx, spacing }: Props) => {
    return (
        <Stack
            direction={'row'} spacing={spacing ?? 0}
            sx={{
                ...sx,
                mx: 'auto',
                maxWidth: 'lg',
                width: '100%',
                px: { xl: 2, sm: 2, xs: 2 },
                alignItems: 'center',
            }}>
            {children}
        </Stack>
    )
}