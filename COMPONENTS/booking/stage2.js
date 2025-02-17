import {useEffect, useRef, useState} from "react";
import {stage2Inputs} from "../../HELPERS/variousVariables";

import {isValid} from "postcode";
import {toNormalised} from "postcode";
import {aroundLondon} from "../../50kmAroundLondon";

export default function Stage2({
    state,
    dispatch,
    clickNext,
    logged,
    setshowbookingpopup,
}) {
    const form = useRef();
    const inputRef = useRef();

    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [showotherinputs, setshowotherinputs] = useState(false);
    const [place, setplace] = useState(false);

    function submitForm(e) {
        e.preventDefault();

        if (form.current.checkValidity()) {
            if (!state.address.addressLine1) {
                setshowbookingpopup(
                    "Please enter your Address line 1 to proceed"
                );
            } else if (!state.address.town) {
                setshowbookingpopup(
                    "Please enter your Town to proceed"
                );
            } else if (!state.address.postcode) {
                setshowbookingpopup(
                    "Please enter your Postcode proceed"
                );
            } else if (!isValid(state.address.postcode)) {
                setshowbookingpopup("Your postcode is not valid");
            } else {
                if (showotherinputs) {
                    clickNext(Date.now());
                } else {
                    if (place) {
                        setshowotherinputs(true);
                    }
                }
            }
        }
    }

    useEffect(() => {
        let pc = state.address.postcode;
        if (pc && isValid(pc)) {
            let ts = pc.substring(0, 2);
            if (parseInt(ts[1])) {
                dispatch({
                    t: "postcodeDistance",
                    v: aroundLondon.includes(ts[0]) ? 40 : 60,
                    p: "address",
                });
            } else {
                dispatch({
                    t: "postcodeDistance",
                    v: aroundLondon.includes(ts) ? 40 : 60,
                    p: "address",
                });
            }
        }
    }, [state.address.postcode]);

    useEffect(() => {
        if (scriptLoaded) {
            const options = {
                componentRestrictions: {country: "gb"},
                fields: ["address_components", "geometry"],
                types: ["(regions)"],
            };

            let autocomplete =
                new window.google.maps.places.Autocomplete(
                    inputRef.current,
                    options
                );
            function placeChanged() {
                let place = autocomplete.getPlace();

                if (place && place.address_components) {
                    setshowotherinputs(true);
                    setplace(true);
                    let arr = place.address_components;

                    for (const el of arr) {
                        if (el.types.includes("route")) {
                            dispatch({
                                t: "addressLine1",
                                v: el.long_name,
                                p: "address",
                            });
                        }
                        if (el.types.includes("locality")) {
                            dispatch({
                                t: "town",
                                v: el.long_name,
                                p: "address",
                            });
                        }
                        if (el.types.includes("postal_code")) {
                            dispatch({
                                t: "postcode",
                                v: el.long_name,
                                p: "address",
                            });
                        }
                    }
                }
            }
            autocomplete.addListener("place_changed", placeChanged);
        }
    }, [scriptLoaded]);

    useEffect(() => {
        let key = process.env.production
            ? process.env.placesApiProd
            : process.env.placesApiKey;

        let src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
        let ch = document.getElementsByTagName("script");

        let eg = false;
        for (const sc of ch) {
            if (sc.src.includes("maps.googleapis.com")) {
                eg = true;
                setScriptLoaded(true);
                break;
            }
        }

        let script;
        if (!eg) {
            script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.name = "googleplacesid";

            document.body.appendChild(script);

            script.addEventListener("load", loaded);
        }

        function loaded(params) {
            setScriptLoaded(true);
        }

        return () => {
            if (script) {
                document.body.removeChild(script);
            }

            document.removeEventListener("load", loaded);
        };
    }, []);

    useEffect(() => {
        if (
            state?.address?.postcode ||
            state?.address?.addressLine1
        ) {
            setshowotherinputs(true);
        }
    }, [state]);

    return (
        <div className="stagewrapper">
            <div className="stage2wrp">
                <h3 className="stage2title">
                    Tell us where to collect your stuff from
                </h3>

                <div className="stage2inputswrp">
                    <form
                        id="stage-form"
                        ref={form}
                        onSubmit={submitForm}
                        className="stage2gridinputs"
                    >
                        <input
                            ref={inputRef}
                            placeholder="Start typing and select your address"
                            className="stae2firstinput"
                            onChange={(e) => {
                                dispatch({
                                    t: "firstinput",
                                    v: e.target.value,
                                    p: "address",
                                });
                            }}
                        ></input>
                        {!showotherinputs ? (
                            <p className="stage2manuallyp">
                                Or{" "}
                                <span
                                    className="stage2manuallyspan"
                                    onClick={() => {
                                        setshowotherinputs(true);
                                    }}
                                >
                                    enter manually
                                </span>{" "}
                            </p>
                        ) : null}

                        {showotherinputs
                            ? stage2Inputs.map((el, i) => {
                                  if (el.disabled && !logged) {
                                      return null;
                                  } else
                                      return (
                                          <label
                                              className="stage2label"
                                              key={i}
                                          >
                                              &nbsp; &nbsp; {el.label}
                                              <input
                                                  disabled={
                                                      el.disabled &&
                                                      logged
                                                  }
                                                  className="stage2labelinputs"
                                                  value={
                                                      state.address[
                                                          el.name
                                                      ] || ""
                                                  }
                                                  onChange={(e) => {
                                                      dispatch({
                                                          t: el.name,
                                                          v: e.target
                                                              .value,
                                                          p: "address",
                                                      });
                                                  }}
                                              ></input>
                                          </label>
                                      );
                              })
                            : null}
                        {showotherinputs ? (
                            <label className="stage2labellastinput">
                                &nbsp; &nbsp; {"Postcode"}
                                <input
                                    className="stae2lastinput"
                                    name={"postcode"}
                                    maxLength={7}
                                    value={
                                        state.address.postcode || ""
                                    }
                                    onChange={(e) => {
                                        let norm = toNormalised(
                                            e.target.value
                                        );
                                        if (norm) {
                                            dispatch({
                                                t: e.target.name,
                                                v: norm,
                                                p: "address",
                                            });
                                        } else {
                                            dispatch({
                                                t: e.target.name,
                                                v: e.target.value.toUpperCase(),
                                                p: "address",
                                            });
                                        }
                                    }}
                                ></input>
                            </label>
                        ) : null}
                    </form>
                    {showotherinputs ? (
                        <textarea
                            name={"specialInstructions"}
                            value={
                                state.address.specialInstructions ||
                                ""
                            }
                            onChange={(e) => {
                                dispatch({
                                    t: e.target.name,
                                    v: e.target.value,
                                    p: "address",
                                });
                            }}
                            placeholder="Special instructions"
                            maxLength={"1000"}
                            className="page2textarea"
                        ></textarea>
                    ) : null}
                    {showotherinputs ? (
                        <p className="page2specialinstructions">
                            Please enter special instructions here.
                            Our drivers cannot always contact you by
                            telephone on arrival so make sure that
                            your door bell is working, that any
                            reception point is informed and that
                            someone is able to meet the driver at the
                            ground floor of the given address.
                        </p>
                    ) : null}

                    <div className="storageleftbootomwrpsplitter"></div>
                </div>
            </div>
        </div>
    );
}
