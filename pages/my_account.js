import {useEffect, useState} from "react";
import Getintoucharea from "../COMPONENTS/index/getintoucharea";
import {useRouter} from "next/router";
import Bookings from "../COMPONENTS/myaccount/bookings";
import PersonalDetails from "../COMPONENTS/myaccount/personalInfo";
import Payments from "../COMPONENTS/myaccount/payments";
import {fetchData} from "../HELPERS/fetchdata";

const buttons = [
    {
        name: "my bookings",
        query: "bookings",
    },
    {
        name: "personal information",
        query: "personal_details",
    },
    {
        name: "payments",
        query: "payments",
    },
];

export default function Myaccount({logout}) {
    const router = useRouter();
    const [clicked, setclicked] = useState("");
    const [width, setwidth] = useState(false);

    useEffect(() => {
        setclicked(router.query.page);
    }, [router.query]);

    useEffect(() => {
        setwidth(window.innerWidth);

        function resize() {
            setwidth(window.innerWidth);
        }

        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    function myaccountMobile() {
        let elm = [];

        buttons.map((bt, i) => {
            elm.push(
                <button
                    className={
                        clicked === bt.query
                            ? "myaccounttablenavbarbuttonclicked"
                            : "myaccounttablenavbarbutton"
                    }
                    key={bt.name + i}
                    onClick={() => {
                        setclicked(
                            clicked === bt.query ? false : bt.query
                        );
                    }}
                >
                    {bt.name}
                </button>
            );
        });
        elm.push(
            <div
                key="sgnbtn"
                className="myaccountsignoutbutton"
                onClick={async () => {
                    let f = await fetchData("api/logout");
                    if (f) {
                        logout(false);
                        router.push("/");
                    }
                }}
            >
                Sign out &nbsp; &nbsp;&#x2715;
            </div>
        );

        switch (clicked) {
            case buttons[0].query:
                {
                    elm.splice(
                        1,
                        0,
                        <Bookings mobile={true} key={Date.now()} />
                    );
                }
                break;
            case buttons[1].query:
                {
                    elm.splice(
                        2,
                        0,
                        <PersonalDetails
                            mobile={true}
                            key={Date.now()}
                        />
                    );
                }
                break;
            case buttons[2].query:
                {
                    elm.splice(
                        3,
                        0,
                        <Payments mobile={true} key={Date.now()} />
                    );
                }
                break;

            default:
                break;
        }

        return (
            <section className="mobilesectionmyaccount">
                {elm}
            </section>
        );
    }

    return (
        <div className="myaccountglobalwrp">
            <section className="myaccouttopwrp">
                <div className="myaccoutntitle">My Account</div>

                {width && width > 700 ? (
                    <div className="myaccounttable">
                        <nav className="myaccounttablenavbar">
                            {buttons.map((bt, i) => {
                                return (
                                    <button
                                        className={
                                            clicked === bt.query
                                                ? "myaccounttablenavbarbuttonclicked"
                                                : "myaccounttablenavbarbutton"
                                        }
                                        key={bt.name + i}
                                        onClick={() => {
                                            if (bt.query) {
                                                setclicked(bt.query);
                                            }
                                        }}
                                    >
                                        {bt.name}
                                    </button>
                                );
                            })}
                            <div
                                className="myaccountsignoutbutton"
                                onClick={async () => {
                                    let f = await fetchData(
                                        "api/logout"
                                    );
                                    if (f) {
                                        logout(false);
                                        router.push("/");
                                    }
                                }}
                            >
                                Sign out &nbsp; &nbsp;&#x2715;
                            </div>
                        </nav>

                        <div className="myaccounttablebottomwrp">
                            {clicked === "bookings" ? (
                                <Bookings />
                            ) : null}
                            {clicked === "personal_details" ? (
                                <PersonalDetails />
                            ) : null}
                            {clicked === "payments" ? (
                                <Payments />
                            ) : null}
                        </div>
                    </div>
                ) : (
                    myaccountMobile()
                )}
            </section>
            <Getintoucharea />
        </div>
    );
}
