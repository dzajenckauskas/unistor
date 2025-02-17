import {useEffect, useRef, useState} from "react";
import {fetchData} from "../HELPERS/fetchdata";

import {v4 as uuidv4} from "uuid";

export default function PasswordRecovery({setshowrecovery}) {
    const [email, setemail] = useState();
    const [buttontxt, setbuttontxt] = useState("send");
    const [emailsent, setemailsent] = useState(false);
    const [uniqueid, setuniqueid] = useState(false);

    useEffect(() => {
        setuniqueid(uuidv4());

        if (!process.env.production) {
            setemail("aitvariux@yahoo.co.uk");
        }
    }, []);

    function beforeEmail() {
        return (
            <div className="signwindowcenterwrp">
                <div
                    className="closepasswordrec"
                    onClick={() => {
                        setshowrecovery(false);
                    }}
                >
                    &#x2715;
                </div>
                <p className="passwordrecoveryp">
                    Please enter your email
                </p>
                <input
                    placeholder="Email"
                    type="email"
                    required
                    className="passwordrecinput"
                    onChange={(e) => {
                        setemail(e.target.value.toLowerCase());
                    }}
                    value={email || ""}
                />

                <button
                    disabled={buttontxt !== "send"}
                    onClick={async () => {
                        setbuttontxt("please wait...");
                        if (email) {
                            let f = await fetchData("/api/recovery", {
                                type: "sendRecovery",
                                email,
                                uniqueid,
                            });

                            if (f?.status) {
                                setemailsent(true);
                            } else {
                                setbuttontxt(f?.msg || "");

                                setTimeout(() => {
                                    setbuttontxt("send");
                                }, 2000);
                            }
                        }
                    }}
                    className="passwordrecbutton"
                >
                    {buttontxt}
                </button>
            </div>
        );
    }

    function afterEmail() {
        return (
            <div className="signwindowcenterwrp">
                <div className="classname">
                    <p className="passwordrecoverypafter">
                        {`Password recovery was sent to ${email}.`}
                    </p>
                    <p className="passwordrecoverypafter">
                        {" "}
                        It will expire after 15 minutes.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="signinwindowglobalwrapper">
            {!emailsent ? beforeEmail() : null}
            {emailsent ? afterEmail() : null}
        </div>
    );
}
