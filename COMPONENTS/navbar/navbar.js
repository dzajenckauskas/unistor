import {useEffect, useRef, useState} from "react";
import {fetchData} from "../../HELPERS/fetchdata";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";

export default function Navbar({
    signwindow,
    logged,
    logout,
    bookingpagenr,
    scrollintoview,
}) {
    const router = useRouter();
    const drpd = useRef();
    const [showdropdown, setshowdropdown] = useState(false);
    const [clickedlink, setclickedlink] = useState(false);
    const [showmenu, setshowmenu] = useState(false);

    const [screenwidth, setscreenwidth] = useState(0);

    const routes = [
        "How it works?",
        "Student storage",
        "Professional packing",
        "FAQ",
        "About us",
        "Contact us",
    ];

    useEffect(() => {
        setscreenwidth(window.innerWidth);

        function mousedown(e) {
            if (drpd?.current && !drpd?.current.contains(e.target)) {
                setshowdropdown(false);
            }
        }
        window.addEventListener("mousedown", mousedown);

        return () => {
            window.removeEventListener("mousedown", mousedown);
        };
    }, []);

    function AccountDropdown() {
        return (
            <div ref={drpd} className="accountdropdownwrapper">
                <Link
                    href={{
                        pathname: "/my_account",
                        query: {page: "bookings"},
                    }}
                >
                    <div
                        className="acountdrpdwnlistitem"
                        onClick={() => {
                            setshowdropdown(false);
                        }}
                    >
                        My bookings
                    </div>
                </Link>
                <Link
                    href={{
                        pathname: "/my_account",
                        query: {page: "personal_details"},
                    }}
                >
                    <div
                        className="acountdrpdwnlistitem"
                        onClick={() => {
                            setshowdropdown(false);
                        }}
                    >
                        Personal details
                    </div>
                </Link>
                <Link
                    href={{
                        pathname: "/my_account",
                        query: {page: "payments"},
                    }}
                >
                    <div
                        className="acountdrpdwnlistitem"
                        onClick={() => {
                            setshowdropdown(false);
                        }}
                    >
                        Payments
                    </div>
                </Link>

                <div className="accountdrpdwsignout">
                    <span
                        onClick={async () => {
                            let f = await fetchData("api/logout");
                            if (f) {
                                setshowdropdown(false);
                                logout(false);
                                router.push("/");
                            }
                        }}
                    >
                        Sign out
                    </span>{" "}
                    <span>&#x2715;</span>{" "}
                </div>
            </div>
        );
    }

    function bookingLiner(params) {
        let txt = [
            "Storage",
            "Address",
            "Materials",
            "Date",
            "Checkout",
        ];

        return (
            <div className="bookinglinerwrapper">
                <div className="bookinglinertopwrp">
                    <div className="bookinglinerlineswrp">
                        {[...Array(4)].map((e, i) => {
                            return (
                                <div
                                    key={i}
                                    className={
                                        bookingpagenr >= i + 2
                                            ? "bookinglinerline"
                                            : "bookinglinerlinegrey"
                                    }
                                ></div>
                            );
                        })}
                    </div>

                    {[...Array(5)].map((e, i) => (
                        <div
                            className={
                                bookingpagenr >= i + 1
                                    ? "bookinglinerdiamond"
                                    : "bookinglinerdiamondgrey"
                            }
                            key={i}
                        ></div>
                    ))}
                </div>

                <div className="bookinglinerbottomwrp">
                    {txt.map((el, i) => {
                        return (
                            <div className="bookinglinertxt" key={i}>
                                {el}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    useEffect(() => {
        function resize(e) {
            setscreenwidth(window.innerWidth);
        }
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    useEffect(() => {
        if (router.pathname !== "/") {
            scrollintoview(false);
        }
    }, [router.pathname]);

    function navbarmobile(params) {
        return (
            <div
                className="navbarmobilemenubutton"
                onClick={() => {
                    setshowmenu(showmenu ? false : true);
                }}
            >
                <div className="navbarmovilebuttonlineswrp">
                    <div className="navbarmobilebuttonline"></div>
                    <div className="navbarmobilebuttonline"></div>
                    <div className="navbarmobilebuttonline"></div>
                </div>

                {showmenu ? navbarroutes() : null}
            </div>
        );
    }

    function navbarroutes(params) {
        return (
            <nav className="navbarrouteswrapper">
                {routes.map((r) => {
                    return (
                        <div
                            className={
                                clickedlink === r
                                    ? "navbarroute-clicked"
                                    : "navbarroute"
                            }
                            key={r}
                            onClick={() => {
                                signwindow(false);
                                if (router.pathname !== "/") {
                                    router.push("/");
                                }
                                scrollintoview(r);
                                setclickedlink(r);
                            }}
                        >
                            {r}
                        </div>
                    );
                })}
            </nav>
        );
    }

    function Phoneandsignbutton(params) {
        return screenwidth <= 700 ? (
            <div
                className="mobilemenuaccountbutton"
                onClick={() => {
                    if (logged) {
                        setshowdropdown(showdropdown ? false : true);
                    } else {
                        signwindow(true);
                    }
                }}
            >
                {logged && showdropdown ? <AccountDropdown /> : null}
                <Image
                    width={24}
                    height={24}
                    alt="account"
                    src={"/index/user.svg"}
                ></Image>
            </div>
        ) : (
            <div className="navbarphoneandsignbuttonwrapper">
                <a
                    className="navbarphonebutton"
                    href="tel:020 8064 1795"
                >
                    020 8064 1795
                </a>

                {logged ? (
                    <div className="loggedbuttonwrapper">
                        <button
                            className="navbarsigninbuttonlogged"
                            onClick={() => {
                                setshowdropdown(
                                    showdropdown ? false : true
                                );
                            }}
                        >
                            my account
                        </button>
                        {showdropdown ? <AccountDropdown /> : null}
                    </div>
                ) : (
                    <button
                        className="navbarsigninbutton"
                        onClick={() => {
                            window.scrollTo(0, 0);

                            signwindow(true);
                        }}
                    >
                        sign in
                    </button>
                )}
            </div>
        );
    }

    return (
        <section className="navbarglobalwrp">
            {navbarmobile()}

            <div
                className="navbarlogo"
                onClick={() => {
                    router.pathname === "/"
                        ? scrollintoview("top")
                        : router.push("/");
                }}
            >
                <div className="navbarlogopointhider"></div>
                <div className="navbarlogocubewrapper">
                    <div className="navbarlogocube"></div>
                </div>

                <div className="navbarunistortxt">unistor</div>
                <div className="navbarlogobottomtxt">
                    Storage made simple
                </div>
            </div>

            {router.pathname == "/booking"
                ? bookingLiner()
                : screenwidth <= 1200
                ? null
                : navbarroutes()}

            <Phoneandsignbutton />
        </section>
    );
}
