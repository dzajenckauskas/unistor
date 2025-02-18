import { useEffect, useReducer, useRef, useState } from "react";
import { findOneDocument } from "../BACKEND/mongo";
import RightPage from "../COMPONENTS/booking/rightPage";
import Stage1 from "../COMPONENTS/booking/stage1";
import Stage2 from "../COMPONENTS/booking/stage2";
import Stage3 from "../COMPONENTS/booking/stage3";
import Stage4 from "../COMPONENTS/booking/stage4";
import Stage5 from "../COMPONENTS/booking/stage5";
import PaymentProcess from "../COMPONENTS/booking/stripeElements/paymentProcess";
import { fetchData } from "../HELPERS/fetchdata";
import {
    itemsofstorageandmats,
    returnDeliveryPerItem,
} from "../HELPERS/variousVariables";

const init = {
    storage: {},
    address: {},
    materials: {},
    date: {},
    checkout: {},
    referralCode: {},
};

function reducer(state, action) {
    let c = { ...state };

    c[action.p][action.t] = action.v;

    return c;
}

export default function Booking({
    setbookingpagenr,
    pagenr,
    logged,
    setsignwindow,
    prices,
}) {
    const [historypage, sethistorypage] = useState(false);
    const [clickNext, setClickNext] = useState(false);

    const [items, setitems] = useState(itemsofstorageandmats);

    const [screenwidth, setscreenwidth] = useState(0);
    const [total, setTotal] = useState(0);
    const [state, dispatch] = useReducer(reducer, init);
    const [paymentProcess, setPaymentProcess] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [paymentError, setPaymentError] = useState(false);
    const [showpopup, setshowpopup] = useState(false);
    const [showbookingpopup, setshowbookingpopup] = useState(false);

    useEffect(() => {
        if (paymentConfirmed) {
            setPaymentProcess(false);
        }
    }, [paymentConfirmed]);

    useEffect(() => {
        async function getname() {
            let f = await fetchData("/api/getname");

            if (f) {
                dispatch({
                    t: "firstName",
                    v: f.firstName,
                    p: "address",
                });
                dispatch({
                    t: "lastName",
                    v: f.lastName,
                    p: "address",
                });
            }
        }

        if (logged) {
            getname();
        }
    }, [logged]);

    useEffect(() => {
        if (prices) {
            setitems(prices);
        }
    }, [prices]);

    useEffect(() => {
        setscreenwidth(window.innerWidth);
        function resize(e) {
            setscreenwidth(window.innerWidth);
        }
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    useEffect(() => {
        if (paymentProcess) {
            window.scrollTo(0, 0);
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [paymentProcess]);

    useEffect(() => {
        if (clickNext) {
            if (historypage) {
                setbookingpagenr(historypage);
                sethistorypage(false);
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            } else {
                if (pagenr === 1) {
                    function checkfirstpage() {
                        let ch = false;

                        for (const item of items.storage) {
                            if (state?.storage?.[item.pos]) {
                                ch = true;
                                break;
                            }
                        }
                        return ch;
                    }

                    let ch = checkfirstpage();

                    if (ch) {
                        setbookingpagenr(pagenr + 1);
                    } else {
                        setshowbookingpopup(
                            "Please select an item to proceed further."
                        );
                    }
                } else if (
                    pagenr === 3 &&
                    state?.materials?.packingMaterials
                ) {
                    if (state?.materials?.packingMaterialsDelivery) {
                        if (
                            state?.materials?.mediumBoxEmpty ||
                            state?.materials?.largeBoxEmpty ||
                            state?.materials?.packingTape
                        ) {
                            setbookingpagenr(pagenr + 1);
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                        } else {
                            setshowbookingpopup(
                                "Please choose material that you require"
                            );
                        }
                    }
                } else {
                    if (pagenr === 4) {
                        if (logged) {
                            setbookingpagenr(pagenr + 1);
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                        } else {
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });

                            setsignwindow({
                                firstName: state.address.firstName,
                                lastName: state.address.lastName,
                            });
                        }
                    } else {
                        if (pagenr < 5) {
                            setbookingpagenr(pagenr + 1);
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                        }
                    }
                }
            }
        }
    }, [clickNext]);

    function clickContinue(e) {
        setClickNext(e);
    }

    useEffect(() => {
        if (pagenr === 4 && state?.date?.pickUpDate && logged) {
            setClickNext(Date.now());
        }
        if (logged) {
            dispatch({
                t: "firstName",
                v: logged.name,
                p: "address",
            });
            dispatch({
                t: "lastName",
                v: logged.lastName,
                p: "address",
            });
        }
    }, [logged]);

    return (
        <section className="bookingglobalwrapper">
            {showbookingpopup ? (
                <div className="bookingpopupoutsidewrp">
                    <div className="bookingpopupinsidewrp">
                        <div
                            className="closebookingpopup"
                            onClick={() => {
                                setshowbookingpopup(false);
                            }}
                        >
                            &#x2715;
                        </div>
                        <strong> {showbookingpopup}</strong>
                    </div>
                </div>
            ) : null}

            {showpopup ? (
                <div className="returnspopupglobalwrp">
                    <div className="returnpopupinsidewrp">
                        <div
                            className="closereturnpopuwindow"
                            onClick={() => {
                                setshowpopup(false);
                            }}
                        >
                            {" "}
                            &#x2715;
                        </div>
                        <h4>Returns</h4>
                        <p>
                            Our standard return delivery (7am - 6pm)
                            starts from £{returnDeliveryPerItem} per
                            box or other item.
                        </p>
                        <br></br>
                        <p>
                            We can return your shipment to different
                            delivery address, hovewer additional fees
                            may aplly - depending on the location.
                        </p>
                    </div>
                </div>
            ) : null}

            {paymentProcess || paymentConfirmed ? (
                <section className="bookingglobalwrapper">
                    <PaymentProcess
                        paymentConfirmed={paymentConfirmed}
                        paymentError={paymentError}
                        paymentProcess={paymentProcess}
                        setPaymentProcess={(el) => {
                            setPaymentError(false);
                            setPaymentProcess(el);
                        }}
                    />
                </section>
            ) : null}

            {!paymentConfirmed ? (
                <div className="boking-left-page">
                    {pagenr === 1 ? (
                        <Stage1
                            state={state}
                            dispatch={dispatch}
                            clickNext={clickContinue}
                        />
                    ) : null}
                    {pagenr === 2 ? (
                        <Stage2
                            state={state}
                            dispatch={dispatch}
                            clickNext={clickContinue}
                            logged={logged}
                            setshowbookingpopup={(p) => {
                                setshowbookingpopup(p);
                            }}
                        />
                    ) : null}
                    {pagenr === 3 ? (
                        <Stage3
                            state={state}
                            dispatch={dispatch}
                            items={items}
                            clickNext={clickContinue}
                            pagenr={pagenr}
                        />
                    ) : null}
                    {pagenr === 4 ? (
                        <Stage4
                            state={state}
                            dispatch={dispatch}
                            clickNext={clickContinue}
                            pagenr={pagenr}
                        />
                    ) : null}
                    {pagenr === 5 ? (
                        <Stage5
                            state={state}
                            items={items}
                            dispatch={dispatch}
                            clickNext={clickContinue}
                            total={total}
                            setPaymentProcess={(el) => {
                                setPaymentProcess(el);
                            }}
                            setPaymentError={(el) => {
                                setPaymentError(el);
                            }}
                            setPaymentConfirmed={(el) => {
                                setPaymentConfirmed(el);
                            }}
                            setshowbookingpopup={(p) => {
                                setshowbookingpopup(p);
                            }}
                        />
                    ) : null}

                    <button
                        type="submit"
                        form="stage-form"
                        className="continuebutton"
                        onClick={() => {
                            if (
                                pagenr === 4 &&
                                state?.date?.pickUpDate
                            ) {
                                setClickNext(Date.now());
                            }
                            if (pagenr === 3) {
                                setClickNext(Date.now());
                            }
                        }}
                    >
                        continue
                    </button>
                </div>
            ) : null}

            <RightPage
                sethistorypage={(pg) => {
                    sethistorypage(pg);
                }}
                screenwidth={screenwidth}
                setbookingpagenr={setbookingpagenr}
                pagenr={pagenr}
                items={items}
                state={state}
                totalToPay={(e) => {
                    setTotal(e);
                }}
                setshowpopup={(v) => {
                    setshowpopup(v);
                }}
                dispatch={dispatch}
            />
        </section>
    );
}

export async function getStaticProps() {
    let prices = await findOneDocument("admin", { type: "prices" });
    return { props: { prices: prices?.prices || false } };
}

// import React from 'react'

// const booking = () => {
//     return (
//         <div>

//         </div>
//     )
// }

// export default booking
