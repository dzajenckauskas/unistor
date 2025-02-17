import Image from "next/image";

import heroImg from "../../public/index/heroareaimg.svg";
import {useEffect, useState} from "react";
import {isValid} from "postcode";
import {toNormalised} from "postcode";
import {useRouter} from "next/router";

let quotetxt = ["get a quote", "checking...", "postcode required"];

export default function HeroArea({hideherowarning}) {
    const router = useRouter();
    const [input, setinput] = useState("");
    const [quote, setquote] = useState(quotetxt[0]);
    const [showwarning, setshowwarning] = useState(false);
    const [warningtxt, setwarningtxt] = useState("");

    useEffect(() => {
        if (hideherowarning) {
            setshowwarning(false);
        }
    }, [hideherowarning]);

    async function getQuote() {
        let valid = isValid(input);

        if (valid) {
            router.push("/booking");
        } else {
            setwarningtxt("Postcode is not valid.");
        }
    }

    function postcodewarning(params) {
        return (
            <div className="heroareapostcodewarning">
                <div className="quoteareamiddlewrapper">
                    <div
                        className="quoteareaclosebutton"
                        onClick={() => {
                            setshowwarning(false);
                        }}
                    >
                        &#x2715;
                    </div>
                    <p className="quoteareaparagraphheroarea">
                        {" "}
                        {warningtxt}
                    </p>
                    <Image
                        src={"/index/Step4.svg"}
                        width={178 * 1.2}
                        height={150 * 1.2}
                        alt="student with boxes"
                    ></Image>
                </div>
            </div>
        );
    }

    function heroLeft() {
        return (
            <div className="heroarealeftwrp">
                <div className="heroarealefttop">
                    <div className="heroareaatoptxt">
                        Student{" "}
                        <div className="heroareaestorageword">
                            Storage
                        </div>
                    </div>
                    <div className="herosecondline">
                        Just Got{" "}
                        <span className="heroeasierword">Easier</span>
                    </div>
                </div>
                <p className="heroarealeftmiddle">
                    We come to collect your valuables and deliver when
                    you are ready! No commitment, No stress and takes
                    &nbsp;
                    <span className="lesthantwominutescolored">
                        less than 2 minutes
                    </span>
                    &nbsp; to book.
                </p>

                <div className="heroarealeftbottom">
                    <input
                        placeholder="Enter pick-up postcode"
                        className="postcodeinput"
                        value={input || ""}
                        maxLength={8}
                        onChange={(e) => {
                            setinput(e.target.value.toUpperCase());
                            setquote(quotetxt[0]);
                        }}
                    ></input>
                    <button
                        className="getquoteorengebutton"
                        onClick={() => {
                            if (input) {
                                setinput(toNormalised(input));
                                setquote(quotetxt[1]);
                                getQuote();
                            } else {
                                setquote(quotetxt[2]);
                            }
                        }}
                    >
                        {quote}
                    </button>
                </div>
            </div>
        );
    }

    function heroRight() {
        return (
            <div className="heroarearightwrp">
                <Image
                    alt="storage"
                    src={heroImg}
                    priority
                    className="heroimage"
                ></Image>
            </div>
        );
    }

    return (
        <div className="heroareaglobalwrapper">
            {showwarning ? postcodewarning() : null}
            <div className="heroareacenterwrp">
                {heroLeft()}
                {heroRight()}
            </div>
        </div>
    );
}
