import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => theme.unstable_sx({
                    fontFamily: 'inherit',
                    fontSize: 14,
                    py: 1.2,
                    letterSpacing: 1,
                    fontWeight: 700,
                    borderRadius: '0px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none' // Removing box shadow on hover
                    }
                }),

            }
        },
    },
    typography: {
        fontFamily: 'montserrat.style.fontFamily',
        h1: {
            fontWeight: 700,
            fontSize: 32,
            '@media (min-width:600px)': {
                fontSize: 32,
            },
            '@media (min-width:960px)': {
                fontSize: 36,
            },
            '@media (min-width:1280px)': {
                fontSize: 42,
            },
            '@media (min-width:1920px)': {
                fontSize: 48,
            },
        },
        h2: {
            fontWeight: 700,
            fontSize: 24,
            '@media (min-width:600px)': {
                fontSize: 28,
            },
            '@media (min-width:960px)': {
                fontSize: 32,
            },
            '@media (min-width:1280px)': {
                fontSize: 36,
            },
            '@media (min-width:1920px)': {
                fontSize: 40,
            },
        },
        h3: {
            fontWeight: 700,
            fontSize: 20,
            '@media (min-width:600px)': {
                fontSize: 24,
            },
            '@media (min-width:960px)': {
                fontSize: 28,
            },
            '@media (min-width:1280px)': {
                fontSize: 32,
            },
            '@media (min-width:1920px)': {
                fontSize: 36,
            },
        },
        h4: {
            fontSize: 18,
            '@media (min-width:600px)': {
                fontSize: 20,
            },
            '@media (min-width:960px)': {
                fontSize: 22,
            },
            '@media (min-width:1280px)': {
                fontSize: 24,
            },
            '@media (min-width:1920px)': {
                fontSize: 26,
            },
        },
        h5: {
            fontSize: 20
        },
        h6: {
        },
        subtitle1: {
            fontSize: 18,
            '@media (min-width:600px)': {
                fontSize: 18,
            },
            '@media (min-width:960px)': {
                fontSize: 18,
            },
            '@media (min-width:1280px)': {
                fontSize: 20,
            },
            '@media (min-width:1920px)': {
                fontSize: 22,
            },
        },
        subtitle2: {
            fontSize: 18,
        },
        body1: {
            fontSize: 16,

        },
        body2: {
            fontSize: 14
        },
        caption: {
            fontSize: 12

        }
    },
    palette: {
        primary: {
            main: '#000'
        },
        secondary: {
            main: '#d80b65',
            dark: '#d80b65'
        },
        info: {
            main: '#fff'
        },
        text: {
            primary: '#000',
            secondary: '#727175',
            disabled: '#7d7c83',
        },
        error: {
            main: '#d80b65',
        }
    }
})

export const getTheme = () => {
    return theme
}