'use client'
import { ThemeProvider } from '@mui/material/styles';
import React, { useRef } from 'react';
import { getTheme } from '../shared/Theme';
import Getintoucharea from "../../COMPONENTS/index/getintoucharea";



const PageLayout = ({ children }: { children: React.ReactNode }) => {
    const theme = getTheme();
    const contact = useRef(null);

    return (
        <ThemeProvider theme={theme}>

            <div style={{ marginTop: 80 }}>
                {children}
                <section ref={contact}>
                    <Getintoucharea />
                </section>
            </div>

        </ThemeProvider >
    );
};

export default PageLayout;
