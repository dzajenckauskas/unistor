import Image from "next/dist/client/image";
import {useState} from "react";
import {isValid} from "postcode";
import {toNormalised} from "postcode";
import {fetchData} from "../../HELPERS/fetchdata";
import {useRouter} from "next/router";
let quotetxt = [
    "   Please enter your postcode below, so we can get you an instant quote",
    "",
    "postcode is not valid.",
    "Sorry, we are not available in your area. Contact us for proposed solution.",
];

export default function ShowQuoteArea({setshowquote}) {
    const router = useRouter();
    const [input, setinput] = useState("");
    const [txt, settxt] = useState(quotetxt[0]);

    async function getQuote() {
        let valid = isValid(input);

        if (valid) {
            router.push("/booking");
        } else {
            settxt(quotetxt[2]);
        }
    }

    return (
        <section className="quoteareaglobalwrapper">
            <div className="quoteareamiddlewrapper">
                <div
                    className="quoteareaclosebutton"
                    onClick={() => {
                        setshowquote(false);
                    }}
                >
                    X
                </div>

                <p className="quoteareaparagraph">{txt}</p>
                <input
                    value={input || ""}
                    placeholder="Enter you postcode"
                    type="text"
                    className="quoteareinput"
                    maxLength={8}
                    onChange={(e) => {
                        setinput(e.target.value.toUpperCase());
                    }}
                />
                <button
                    className="quotearequotebutton"
                    onClick={() => {
                        if (input) {
                            setinput(toNormalised(input));
                            getQuote();
                        }
                    }}
                >
                    get a quote
                </button>

                <Image
                    src={"/index/Step4.svg"}
                    width={178 * 1.2}
                    height={150 * 1.2}
                    alt="student with boxes"
                ></Image>
            </div>
        </section>
    );
}
