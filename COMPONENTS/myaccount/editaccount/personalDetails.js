import {useEffect, useReducer, useRef, useState} from "react";
import {fetchData} from "../../../HELPERS/fetchdata";

const init = {};

function reducer(state, action) {
    let c = {...state};

    c[action.t] = action.v;

    return c;
}

export default function PersonalDetails({info}) {
    const form = useRef();
    const [edit, setedit] = useState(false);
    const [state, dispatch] = useReducer(reducer, init);

    useEffect(() => {
        if (info.personalDetails) {
            Object.keys(info.personalDetails).forEach((el) => {
                dispatch({t: el, v: info.personalDetails[el]});
            });
        }
    }, [info]);

    function personalDetails(params) {
        return (
            <div className="personal-info-details">
                <h4>Personal details</h4>
                <ul className="personal-info-list">
                    <li>
                        {state.firstName} {state.lastName}
                    </li>
                    <li>{state.email}</li>
                    <li>{state.telephone}</li>
                </ul>
                <div
                    className="personal-info-details-edit-button"
                    onClick={() => {
                        setedit(true);
                    }}
                >
                    Edit
                </div>
            </div>
        );
    }

    async function submitInfo(e) {
        if (form.current.checkValidity()) {
            e.preventDefault();

            state.type = "saveInfo";

            let f = await fetchData(
                "/api/myAccount/myaccount",
                state
            );
            if (f) {
                setedit(false);
            } else {
                alert("something went wrong");
            }
        }
    }

    function personalDetailsEdit(params) {
        let arr = [
            {
                label: "First name",
                r: true,
                t: "text",
                pos: "firstName",
            },
            {label: "Last name", r: true, t: "text", pos: "lastName"},
            {label: "Email", r: true, t: "email", pos: "email"},
            {label: "Phone", r: false, t: "tel", pos: "telephone"},
        ];

        return (
            <div className="personal-info-details-edit">
                <h4>Personal details</h4>

                <form
                    onSubmit={submitInfo}
                    ref={form}
                    className="personal-info-details-edit-form"
                >
                    {arr.map((el, i) => {
                        return (
                            <label
                                className="myaccount-edit-label"
                                key={i}
                            >
                                {el.label}
                                <input
                                    required={el.r}
                                    type={el.t}
                                    minLength={"2"}
                                    maxLength={"30"}
                                    value={state[el.pos] || ""}
                                    onChange={(e) => {
                                        dispatch({
                                            t: el.pos,
                                            v: e.target.value.trim(),
                                        });
                                    }}
                                    className="myaccount-edit-input"
                                ></input>
                            </label>
                        );
                    })}
                    <button
                        className="personal-info-submit-button"
                        type="submit"
                    >
                        save changes
                    </button>
                </form>
            </div>
        );
    }

    if (edit) {
        return personalDetailsEdit();
    } else {
        return personalDetails();
    }
}
