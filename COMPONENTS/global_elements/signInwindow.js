import {useEffect, useReducer, useRef, useState} from "react";
import {useRouter} from "next/dist/client/router";
import {fetchData} from "../../HELPERS/fetchdata";
import Link from "next/link";

const init = {};

function reducer(state, action) {
    let c = {...state};

    c[action.t] = action.v;
    return c;
}

export default function SignInWindow({
    setsignwindow,
    signwindow,
    loggedIn,
    setshowrecovery,
}) {
    const router = useRouter();
    const form1 = useRef();
    const form2 = useRef();
    const [siginorup, setsigninorup] = useState("up");
    const [state, dispatch] = useReducer(reducer, init);
    const [loginerror, setloginerror] = useState(false);
    const [showpassword, setshowpassword] = useState(false);
    const [showgreeting, setshowgreeting] = useState(false);
    const [name, setname] = useState("");

    useEffect(() => {
        if (signwindow) {
            dispatch({t: "firstName", v: signwindow.firstName});
            dispatch({t: "lastName", v: signwindow.lastName});
        }
    }, [signwindow]);

    async function handleSign(e, tgt) {
        if (tgt.checkValidity()) {
            e.preventDefault();
            let c = {...state};
            c.type = siginorup;
            c.email = c.email.toLowerCase();

            let f = await fetchData("/api/sign", c);
            if (f?.status === true) {
                if (router.pathname === "/booking") {
                    loggedIn(true);
                    setsignwindow(false);
                    setshowgreeting(false);
                } else {
                    setname(f.name);
                    loggedIn(true);
                    setshowgreeting(true);
                }
            } else {
                switch (f) {
                    case "exists":
                        setloginerror(
                            "Email already registered, please sign in, if you are returning customer."
                        );
                        break;
                    case "error":
                        setloginerror("Error during registration.");
                        break;
                    case "notFound":
                        setloginerror("User not found.");
                        break;
                    case "wrong":
                        setloginerror("Wrong email or password.");
                        break;

                    default:
                        break;
                }
            }
        }
    }

    function signinwrp() {
        return (
            <form ref={form1} className="signupwrapper">
                <input
                    className="signupfullinputs"
                    type={"email"}
                    placeholder="Email"
                    maxLength={"100"}
                    name="email"
                    value={state.email || ""}
                    autoComplete="email"
                    onChange={handleInputChange}
                    required
                ></input>

                <input
                    className="signupfullinputs"
                    type={"password"}
                    placeholder="Password"
                    maxLength={"120"}
                    minLength={"8"}
                    name="password"
                    value={state.password || ""}
                    autoComplete="password"
                    onChange={handleInputChange}
                    required
                ></input>

                <div className="signupgreysplitter"></div>

                <button
                    type="submit"
                    className="signupsignupbutton"
                    onClick={(e) => {
                        handleSign(e, form1.current);
                    }}
                >
                    sign in
                </button>

                <p
                    onClick={() => {
                        setsignwindow(false);
                        setshowrecovery(true);
                    }}
                    className="forgotpasslink"
                >
                    I forgot my password
                </p>
            </form>
        );
    }

    function handleInputChange(e) {
        setloginerror(false);

        dispatch({t: e.target.name, v: e.target.value.trim()});
    }
    function signWindowCenter(params) {
        return (
            <div className="signwindowcenterwrp">
                <div
                    className="closesigninwindow"
                    onClick={() => {
                        setsignwindow(false);
                    }}
                >
                    &#x2715;
                </div>
                <div className="signwindowtopbtnswrp">
                    <div
                        className={
                            siginorup === "in"
                                ? "signbutton"
                                : "signbuttonmarked"
                        }
                        onClick={() => {
                            setsigninorup("up");
                        }}
                    >
                        <p> complete booking </p>
                        <p className="signupsmalltxt">
                            {" "}
                            and register new account
                        </p>
                    </div>
                    <div
                        className={
                            siginorup === "in"
                                ? "signbuttonmarked"
                                : "signbutton"
                        }
                        onClick={() => {
                            setsigninorup("in");
                        }}
                    >
                        <p> sign in </p>
                        <p className="signupsmalltxt">
                            {" "}
                            for returning customer
                        </p>
                    </div>
                </div>
                {loginerror
                    ? logerror()
                    : siginorup === "in"
                    ? signinwrp()
                    : signupwrp()}
                {}
            </div>
        );
    }
    function logerror(params) {
        return (
            <div className="logerrorwrp">
                <p className="loginerrorp">{loginerror}</p>

                <button
                    className="loginerrorbutton"
                    onClick={() => {
                        setloginerror(false);
                    }}
                >
                    OK
                </button>
            </div>
        );
    }

    function signupwrp() {
        let arr = [
            {
                name: "First name",
                pos: "firstName",
                type: "text",
                r: true,
                ml: "100",
            },
            {
                name: "Last name",
                pos: "lastName",
                type: "text",
                r: true,
                ml: "100",
            },
            {
                name: "Phone number",
                pos: "telephone",
                type: "tel",
                r: true,
                ml: "100",
            },
            {
                name: "Email",
                pos: "email",
                type: "email",
                r: true,
                ml: "100",
            },
            {
                name: "Password",
                pos: "password",
                type: "password",
                r: true,
                ml: "100",
                minl: "8",
            },
        ];

        return (
            <form ref={form2} className="signupwrapperup">
                {arr.map((el, i) => {
                    return (
                        <input
                            key={i}
                            maxLength={el.ml}
                            minLength={el.minl}
                            className="signupfullinputs signupinput"
                            placeholder={el.name}
                            name={el.pos}
                            value={state[el.pos] || ""}
                            autoComplete={el.pos}
                            type={
                                el.pos !== "password"
                                    ? el.type
                                    : showpassword
                                    ? "text"
                                    : el.type
                            }
                            required
                            onChange={handleInputChange}
                        ></input>
                    );
                })}
                <p className="signupinfoabout8symbols">
                    Use 8 or more characters with a mix of letters,
                    numbers & symbols
                </p>

                <div
                    className="container"
                    onClick={() => {
                        setshowpassword(showpassword ? false : true);
                    }}
                >
                    <span
                        className={
                            showpassword
                                ? "checkmark"
                                : "checkmarkoff"
                        }
                    ></span>{" "}
                    <span> Show password</span>
                </div>

                <div className="signupgreysplitter"></div>
                <button
                    type="submit"
                    className="signupsignupbutton"
                    onClick={(e) => {
                        handleSign(e, form2.current);
                    }}
                >
                    sign up
                </button>
            </form>
        );
    }
    function showgreetingfn() {
        return (
            <div className="signwindowcenterwrp">
                <div className="centerwrptext">
                    <p>{`Welcome back, ${
                        name?.name ? name.name : ""
                    }, `}</p>
                    <p>{`It's nice to see you again!`}</p>
                </div>

                <Link
                    onClick={() => {
                        setsignwindow(false);
                        setshowgreeting(false);
                    }}
                    href={{
                        pathname: "/my_account",
                        query: {page: "bookings"},
                    }}
                >
                    <button className="welcomebackokbutton">
                        OK
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="signinwindowglobalwrapper">
            {showgreeting ? showgreetingfn() : signWindowCenter()}
        </div>
    );
}
