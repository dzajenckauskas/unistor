import {useEffect, useState} from "react";
import StripeCardForm from "./stripeElements/StripeCardForm";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {
    coverageTxt,
    precollprice,
    precolltxt,
} from "../../HELPERS/variousVariables";
import {fetchData} from "../../HELPERS/fetchdata";
import {calculateStoragePrice} from "../order-edit/order-edit-helper-funtions";

export default function Stage5({
    state,
    dispatch,
    total,
    setPaymentProcess,
    setPaymentError,
    setPaymentConfirmed,
    items,
    setshowbookingpopup,
}) {
    let stripePromise;
    if (process.env.production) {
        stripePromise = loadStripe(process.env.stripePublicProd);
    } else {
        stripePromise = loadStripe(process.env.stripePublic);
    }

    const [popup, showpopup] = useState(false);
    const [reftxt, setreftxt] = useState("");

    useEffect(() => {
        if (!state.checkout.coverageLevel) {
            dispatch({
                t: "coverageLevel",
                v: coverageTxt[0],
                p: "checkout",
            });
        }

        if (!state.checkout.premiumCollection) {
            dispatch({
                t: "premiumCollection",
                v: precolltxt[0],
                p: "checkout",
            });
        }
    }, []);

    useEffect(() => {
        if (state?.referralCode?.code) {
            setreftxt(state.referralCode.code);
        }
    }, [state.referralCode]);

    function referralCode(params) {
        let calc = calculateStoragePrice(items, state);
        return (
            <section>
                <h3 className="stage5-stagetitle-payment">
                    Referral code
                </h3>
                <div className="stage5referralcodewrp">
                    <input
                        value={reftxt || ""}
                        placeholder="Enter your code here"
                        type="text"
                        className={
                            !state.referralCode.code &&
                            state.referralCode.code !== false
                                ? "referralcodeinputbookingstage5"
                                : state.referralCode.code === false
                                ? "referralcodeinputbookingstage5false"
                                : state.referralCode
                                ? "referralcodeinputbookingstage5true"
                                : "referralcodeinputbookingstage5"
                        }
                        onChange={(e) => {
                            dispatch({
                                t: "code",
                                v: "",
                                p: "referralCode",
                            });

                            setreftxt(e.target.value);
                        }}
                    />
                    <button
                        className="stage5referralcodebutton"
                        onClick={async (e) => {
                            let f = await fetchData(
                                "/api/checkReferralCode",
                                {code: reftxt}
                            );

                            if (f) {
                                dispatch({
                                    t: "code",
                                    v: f.code,
                                    p: "referralCode",
                                });
                                dispatch({
                                    t: "discount",
                                    v: f.discount,
                                    p: "referralCode",
                                });
                                dispatch({
                                    t: "id",
                                    v: f.id,
                                    p: "referralCode",
                                });
                            } else {
                                dispatch({
                                    t: "code",
                                    v: false,
                                    p: "referralCode",
                                });
                            }
                        }}
                    >
                        submit
                    </button>
                </div>

                {state.referralCode.code === false ? (
                    <p className="stage5refferalcodemessage">
                        Referral code is invalid.
                    </p>
                ) : null}

                {state.referralCode.code ? (
                    <p className="rightpagediscounttxt">
                        {`-${state.referralCode.discount}% discount applied`}

                        <span style={{fontWeight: "400"}}>
                            {" "}
                            {`saving £${calc.pricebeforereferral.toFixed(
                                2
                            )} every month`}
                        </span>
                    </p>
                ) : null}
            </section>
        );
    }

    return (
        <section className="booking-stage5">
            <div className="staege5statetitlewrapper">
                <h3 className="stage5-stagetitle">
                    Choose your level of coverage
                </h3>
                <div
                    className="stage5stagetitleqmark"
                    onClick={() => {
                        showpopup(popup ? false : true);
                    }}
                >
                    ?
                </div>
            </div>

            <ul className="stage5-radiobuttons">
                {coverageTxt.map((el, i) => {
                    return (
                        <li key={i}>
                            <div className="stage5-radiobuttonwrp">
                                <div
                                    className="stage5-radiobutton"
                                    onClick={() => {
                                        dispatch({
                                            t: "coverageLevel",
                                            v: el,
                                            p: "checkout",
                                        });
                                    }}
                                >
                                    {state.checkout.coverageLevel ===
                                    el ? (
                                        <div className="page3rbinside"></div>
                                    ) : null}
                                </div>
                                <p>{el}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {popup ? (
                <div className="stage5popupglobalwrp">
                    <div className="stage5popup">
                        <div
                            className="stage5popupclose"
                            onClick={() => {
                                showpopup(false);
                            }}
                        >
                            &#x2715;
                        </div>
                        <h4>Find out more about coverage</h4>

                        <p>
                            For extra piece of mind, we provide £100
                            FREE coverage, per box whilst in transit
                            and storage, just in case something out of
                            our control goes wrong.{" "}
                        </p>
                    </div>
                </div>
            ) : null}

            <div className="staege5statetitlewrapper">
                <h3 className="stage5-stagetitle">
                    Premium collection
                </h3>
            </div>

            <ul className="stage5-radiobuttons">
                {precolltxt.map((el, i) => {
                    return (
                        <li key={i}>
                            <div className="stage5-radiobuttonwrp">
                                <div
                                    className="stage5-radiobutton"
                                    onClick={() => {
                                        dispatch({
                                            t: "premiumCollection",
                                            v: el,
                                            p: "checkout",
                                        });
                                    }}
                                >
                                    {state.checkout
                                        .premiumCollection === el ? (
                                        <div className="page3rbinside"></div>
                                    ) : null}
                                </div>
                                <div>
                                    {el}
                                    <div className="stage5-premiumcollectionprice">
                                        £{precollprice[i]}
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div className="storageleftbootomwrpsplitter"></div>
            {referralCode()}
            <div className="storageleftbootomwrpsplitter"></div>

            <h3 className="stage5-stagetitle-payment">
                Card payment
            </h3>

            <h4 className="stage5-stage-h4">Card details</h4>

            <div className="stage5-bottom-grid">
                <Elements stripe={stripePromise}>
                    <StripeCardForm
                        items={items}
                        state={state}
                        total={total}
                        dispatch={dispatch}
                        setPaymentProcess={setPaymentProcess}
                        setPaymentError={setPaymentError}
                        setPaymentConfirmed={setPaymentConfirmed}
                        setshowbookingpopup={setshowbookingpopup}
                    />
                </Elements>
            </div>
        </section>
    );
}
