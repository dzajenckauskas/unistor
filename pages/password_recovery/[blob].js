import {useEffect, useState, useRef} from "react";
import {findOneDocument} from "../../BACKEND/mongo";
import {fetchData} from "../../HELPERS/fetchdata";

export default function Pssswrodrecovery(p) {
    const pass1 = useRef();
    const pass2 = useRef();
    const [emailconfirmed, setemailconfirmed] = useState(false);
    const [info, setinfo] = useState("");
    const [globalinfo, setglobalinfo] = useState("");

    useEffect(() => {
        if (p.status) {
            setemailconfirmed(true);
        } else {
            setglobalinfo("Link expired.");
        }
    }, [p]);

    async function submitNewPassword(e) {
        e.preventDefault();

        let p1 = pass1.current.value;
        let p2 = pass2.current.value;

        if (p1 !== p2) {
            setinfo("passwords does not match");
        } else {
            let dt = JSON.parse(p.status);

            let f = await fetchData("/api/password_change", {
                p1,
                id: dt.key,
                email: dt.email,
            });
            if (f) {
                setemailconfirmed(false);
                setglobalinfo(
                    "Password has been changed successfully."
                );
            } else {
                setinfo("Something went wrong");
            }
        }
    }

    return (
        <div className="globalWrapper">
            {emailconfirmed ? (
                <form
                    onSubmit={submitNewPassword}
                    className="passreqpasswrapper"
                >
                    <input
                        placeholder="new password"
                        type="password"
                        className="classname"
                        required
                        minLength={"8"}
                        ref={pass1}
                    />
                    <input
                        placeholder="repeat-password"
                        type="password"
                        className="classname"
                        required
                        minLength={"8"}
                        ref={pass2}
                    />
                    <p className="passreqinfo">{info}</p>
                    <button
                        onClick={() => {
                            setinfo("");
                        }}
                        className="passwordconfirmbutton"
                        type="submit"
                    >
                        CONFIRM
                    </button>
                </form>
            ) : null}
            {globalinfo ? (
                <p className="passwordchangeglobalinfop">
                    {globalinfo}
                </p>
            ) : null}
        </div>
    );
}

export async function getServerSideProps({req, res, resolvedUrl}) {
    const Cryptr = require("cryptr");
    const cryptr = new Cryptr(process.env.cryptokey);

    let split = resolvedUrl.split("/password_recovery/");
    let sc = split[1];

    const dcr = cryptr.decrypt(sc);

    let f = await findOneDocument("users", {"recovery.key": dcr});

    let status = true;

    if (f) {
        let minutes = process.env.production ? 15 : 50;
        let time = 1000 * 60 * minutes;
        if (new Date(Date.now()) - f.recovery.date < time) {
            status = {
                email: f.personalDetails.email,
                key: sc,
            };
        } else {
            status = false;
        }
    } else {
        status = false;
    }

    if (status) {
        return {props: {status: JSON.stringify(status)}};
    } else {
        return {props: {status: false}};
    }
}
