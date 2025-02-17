import Link from "next/link";
import {useEffect, useReducer, useRef, useState} from "react";
import {fetchData} from "../../HELPERS/fetchdata";
import Privacy from "../terms/privacy";
import Terms from "../terms/terms";

const initValues = {};

function reducer(state, action) {
    let c = {...state};
    c[action.t] = action.v;
    return c;
}

export default function Getintoucharea() {
    const form = useRef();
    let inpts = [
        {name: "Your name", key: "yourName", type: "text", r: true},
        {name: "Company", key: "company", type: "text"},
        {name: "Telephone", key: "telephone", type: "tel"},
        {name: "Email", key: "email", type: "email", r: true},
    ];

    const [state, dispatch] = useReducer(reducer, initValues);
    const [checked, setchecked] = useState(false);
    const [showterms, setshowterms] = useState(false);

    async function sendMessage(e) {
        let f = await fetchData("/api/getintouch", state);

        if (f) {
            Object.keys(state).forEach((key) => {
                dispatch({
                    t: key,
                    v: "",
                });
            });
            setchecked(false);

            e.target.textContent = "thank you!";
            setTimeout(() => {
                e.target.textContent = "send message";
            }, 2000);
        }
    }

    return (
        <div className="getintouchglobalwrp">
            {showterms ? (
                <section className="showtermswrapper">
                    <div className="showtermsinsidewrapper">
                        {showterms === "terms" ? (
                            <Terms
                                setshowterms={() => {
                                    setshowterms(false);
                                }}
                            />
                        ) : null}
                        {showterms === "privacy" ? (
                            <Privacy
                                setshowterms={() => {
                                    setshowterms(false);
                                }}
                            />
                        ) : null}
                    </div>
                </section>
            ) : null}

            <div className="getintouchinsidewrp">
                <h2 className="getintouchtitle">Get in touch</h2>

                <div className="getintouchbottomwrp">
                    <div className="getintouchleftwrp">
                        <div className="getintouchtxt">
                            Fill the form on the right <span></span>{" "}
                            and we will call you back when{" "}
                            <span></span> one of the team is
                            available.
                        </div>

                        <div className="getintouchiconswrp">
                            <div className="getintouchicon">
                                <div className="getintouchicontitle">
                                    Working hours
                                </div>
                                <div className="getintouchicontxt">
                                    Mon-Sat: 08:00 - 17:00
                                </div>
                                <div className="getintouchicontxt">
                                    Sun: closed
                                </div>
                            </div>
                            <div className="getintouchicon">
                                <div className="getintouchicontitle">
                                    Call
                                </div>

                                <a
                                    className="getintouchicontxt"
                                    href="tel:020 8064 1795"
                                >
                                    020 8064 1795
                                </a>
                            </div>
                            <div className="getintouchicon">
                                <div className="getintouchicontitle">
                                    Email
                                </div>
                                <div className="getintouchicontxt">
                                    info@unistor.co.uk
                                </div>
                            </div>
                        </div>
                    </div>
                    <form ref={form} className="getintouchrightwrp">
                        <div className="getintoucchrightinputs">
                            {inpts.map((inpt, i) => {
                                return (
                                    <div
                                        className="gitrinputwrp"
                                        key={i}
                                    >
                                        <div className="gitrinpttxt">
                                            {inpt.name}
                                            {inpt.r ? " *" : null}
                                        </div>
                                        <input
                                            type={inpt.type}
                                            maxLength="30"
                                            required={
                                                inpt.r ? true : false
                                            }
                                            value={
                                                state[inpt.key] || ""
                                            }
                                            className="gitrgthinptinpt"
                                            onChange={(e) => {
                                                dispatch({
                                                    t: inpt.key,
                                                    v: e.target.value.trim(),
                                                });
                                            }}
                                        ></input>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="getintchtextareawrp">
                            <div className="gitrinpttxt">
                                How can we help? *
                            </div>
                            <textarea
                                value={state.message || ""}
                                onChange={(e) => {
                                    dispatch({
                                        t: "message",
                                        v: e.target.value,
                                    });
                                }}
                                required
                                className="gitchtxtarea"
                                maxLength="10000"
                            ></textarea>
                        </div>

                        <div className="getintouchtickwrp">
                            <input
                                checked={checked}
                                onChange={(e) => {
                                    setchecked(e.target.checked);
                                }}
                                className="getitchtick"
                                type={"checkbox"}
                                required
                            ></input>

                            <div className="getitchtxt">
                                Please tick this box to accept that
                                Unistor will be in touch with you
                                regarding your enquiry. We will not
                                share your data with anyone else.
                            </div>
                        </div>
                        <button
                            type={"submit"}
                            className="gitouchsendmessagebtn"
                            onClick={(e) => {
                                if (form.current.checkValidity()) {
                                    e.preventDefault();
                                    sendMessage(e);
                                }
                            }}
                        >
                            {" send message"}
                        </button>
                        <div className="termsconditionswrp">
                            <div className="termcondtopwrp">
                                <span
                                    className="termscondspan"
                                    onClick={() => {
                                        setshowterms("terms");
                                    }}
                                >
                                    {" "}
                                    Terms & Conditions
                                </span>
                                <div className="termcondsspacer"></div>
                                <span
                                    className="termscondspan"
                                    onClick={() => {
                                        setshowterms("privacy");
                                    }}
                                >
                                    {" "}
                                    Privacy Policy
                                </span>
                                <div className="termcondsspacer"></div>
                                <span className="termscondspan">
                                    {" "}
                                    Inclusions and exclusions
                                </span>
                            </div>
                            <div className="termcondbottomwrp">
                                Unistor ® 2022
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
