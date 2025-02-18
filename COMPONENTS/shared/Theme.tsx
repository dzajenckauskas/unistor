import { createTheme } from '@mui/material/styles';
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ['latin'],
    display: 'swap' // Prevents font flicker
});

export const theme = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: ({ theme }) => theme.unstable_sx({
                    // 'label + &': {
                    //     marginTop: theme.spacing(2),
                    // },
                    // borderRadius: 0,
                    // backgroundColor: theme.palette.info.main
                }),
                input: ({ theme }) => theme.unstable_sx({
                    // backgroundColor: theme.palette.info.main
                }),
                multiline: ({ theme }) => theme.unstable_sx({
                    // backgroundColor: theme.palette.info.main
                }),
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: ({ theme }) => theme.unstable_sx({
                    // color: `${theme.palette.info.main} !important`,
                    // fontSize: '16px !important'
                    // borderRadius: 0,
                }),
            }
        },
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => theme.unstable_sx({
                    fontFamily: montserrat.style.fontFamily,
                    fontSize: 14,
                    py: 1.2,
                    letterSpacing: 1,
                    fontWeight: 700,
                    borderRadius: '2px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none' // Removing box shadow on hover
                    }
                }),

            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                popper: ({ theme }) => theme.unstable_sx({
                    boxShadow: '0 0 10px #0000001A',
                }),
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: ({ theme }) => theme.unstable_sx({
                    // fontSize: '28px',
                }),

            }
        },
    },
    // typography: {
    //     fontFamily: montserrat.style.fontFamily,
    // },
    typography: {
        h1: {
            fontFamily: montserrat.style.fontFamily,
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
            fontFamily: montserrat.style.fontFamily,
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
            fontFamily: montserrat.style.fontFamily,
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
            fontFamily: montserrat.style.fontFamily,
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
            fontFamily: montserrat.style.fontFamily,
            fontSize: 20
        },
        h6: {
            fontFamily: montserrat.style.fontFamily,
        },
        subtitle1: {
            fontFamily: montserrat.style.fontFamily,
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
            fontFamily: montserrat.style.fontFamily,
            fontSize: 18,
        },
        body1: {
            fontFamily: montserrat.style.fontFamily,
            fontSize: 16,

        },
        body2: {
            fontFamily: montserrat.style.fontFamily,
            fontSize: 14
        },
        caption: {
            fontFamily: montserrat.style.fontFamily,
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