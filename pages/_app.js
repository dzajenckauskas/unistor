import "../styles/globals.css";
import "../styles/booking.css";
import "../styles/my_account.css";
import "../styles/admin.css";
import "../styles/password_recovery.css";
import "../styles/medias.css";

import {Montserrat} from "@next/font/google";
import Navbar from "../COMPONENTS/navbar/navbar";
import {useEffect, useState} from "react";
import SignInWindow from "../COMPONENTS/global_elements/signInwindow";
import {fetchData} from "../HELPERS/fetchdata";
import {useRouter} from "next/router";
import Headfn from "../COMPONENTS/global_elements/head";
import PasswordRecovery from "../COMPONENTS/passwordRecovery";

const montserrat = Montserrat();

function MyApp({Component, pageProps}) {
    const router = useRouter();
    const [signwindow, setsignwindow] = useState(false);
    const [logged, setlogged] = useState(false);
    const [bookingpagenr, setbookingpagenr] = useState(1);
    const [scrollintoview, setscrollintoview] = useState(false);
    const [showrecover, setshowrecovery] = useState(false);

    useEffect(() => {
        if (signwindow || showrecover) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [signwindow, showrecover]);

    async function refresh() {
        let f = await fetchData("/api/refreshToken");
        setlogged(f);
    }

    useEffect(() => {
        let int;
        refresh();

        int = setInterval(() => {
            refresh();
        }, 720000);

        return () => {
            window.clearInterval(int);
        };
    }, []);

    useEffect(() => {
        if (router.pathname === "/booking") {
            setbookingpagenr(1);
        }

        document.body.style.overflow = "auto";
    }, [router.pathname]);

    return (
        <div className={montserrat.className}>
            <Headfn />
            {signwindow ? (
                <SignInWindow
                    signwindow={signwindow}
                    setsignwindow={(c) => {
                        setsignwindow(c);
                    }}
                    loggedIn={(e) => {
                        setlogged(e);
                    }}
                    setshowrecovery={(el) => {
                        setshowrecovery(el);
                    }}
                />
            ) : null}

            {showrecover ? (
                <PasswordRecovery
                    setshowrecovery={(el) => {
                        setshowrecovery(el);
                        setsignwindow(true);
                    }}
                />
            ) : null}

            {router.pathname.includes("admin") ? null : (
                <Navbar
                    scrollintoview={(el) => {
                        setscrollintoview(el);
                        setshowrecovery(false);
                    }}
                    bookingpagenr={bookingpagenr}
                    signwindow={(c) => {
                        setsignwindow(c);
                    }}
                    logged={logged}
                    logout={(e) => {
                        setlogged(e);
                    }}
                />
            )}

            <Component
                {...pageProps}
                setbookingpagenr={(nr) => {
                    setbookingpagenr(nr);
                }}
                pagenr={bookingpagenr}
                logged={logged}
                setsignwindow={setsignwindow}
                scrollintoview={scrollintoview}
                logout={(e) => {
                    setlogged(e);
                }}
            />
        </div>
    );
}

export default MyApp;
