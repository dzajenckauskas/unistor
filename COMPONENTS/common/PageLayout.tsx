import React, { useRef } from 'react';
import Getintoucharea from "../../COMPONENTS/index/getintoucharea";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    const contact = useRef(null);
    return (
        <div style={{ marginTop: 88 }}>
            {children}
            <section ref={contact}>
                <Getintoucharea />
            </section>
        </div>

    );
};

export default PageLayout;
