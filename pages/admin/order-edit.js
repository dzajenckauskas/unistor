import {Open_Sans} from "@next/font/google";
const openSans = Open_Sans();
import {generateDate} from "../../HELPERS/generateDate";
import {useEffect, useReducer, useRef, useState} from "react";
import {findByID, findOneDocument} from "../../BACKEND/mongo";
import Calendar from "../../COMPONENTS/global_elements/calendar";
import {checkAuthorization} from "../../HELPERS/checkauthorization";
import {dateFormatConverter} from "../../HELPERS/dateformatconverter";
import {fetchData} from "../../HELPERS/fetchdata";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {
    addonstotypes,
    postcodeDistancePrice,
    returnDeliveryPerItem,
    types,
    weekendCollectionPrice,
} from "../../HELPERS/variousVariables";
import {
    coverageTxt,
    itemsofstorageandmats,
    precollprice,
    precolltxt,
    prerettxt,
    stage2Inputs,
    times,
} from "../../HELPERS/variousVariables";

import Invoices from "../../COMPONENTS/order-edit/invoices";
import Payment from "../../COMPONENTS/order-edit/payment";

import {
    calcmatsprice,
    calculateBoxesCount,
    calculatePaymentSections,
    checkifweekend,
} from "../../COMPONENTS/order-edit/order-edit-helper-funtions";
import {useRouter} from "next/router";
import AdditionalCosts from "../../COMPONENTS/order-edit/additionalcosts";
import Additionalservice from "../../COMPONENTS/order-edit/additionalservice";
import {generateCollectionNote} from "../../COMPONENTS/pdfgenerations/adminordereditnotes";
import Time from "../../COMPONENTS/global_elements/time";
import {pdfForLabels} from "../../HELPERS/pdfforlabels";

let init = {
    actionBar: false,
    materialsDelivery: false,
    inventory: false,
    coverage: false,
    customItem: false,
    collectionDate: false,
    returnDate: false,
    pickUpLocation: false,
    dropOffLocation: false,
    finalPayment: false,
};
function reducer(state, init) {
    let c = {...state};
    c[init.p] = init.v;
    return c;
}

export default function OrderEdit(props) {
    const greyText = {color: "grey"};
    const router = useRouter();
    const inp1 = useRef();
    const inp2 = useRef();
    const inp3 = useRef();
    const userinp1 = useRef();
    const userinp2 = useRef();
    const userinp3 = useRef();
    const userinp4 = useRef();

    const returnDateButton = useRef();

    const apiroute = "/api/admin/order-edit";
    const [order, setorder] = useState(false);
    const [user, setuser] = useState(false);
    const [edituser, setedituser] = useState(false);
    const [showcalendar, setshowcalendar] = useState(false);
    const [showtimeslotdropoff, setshowtimeslotdropoff] =
        useState(false);
    const [items, setitems] = useState(itemsofstorageandmats);
    const [showcoverage, setshowcoverage] = useState(false);
    const [showcollection, setshowcollection] = useState(false);
    const [showreturn, setshowreturn] = useState(false);
    const [discounttxt, setdiscounttxt] = useState("");
    const [showcosts, setshowcosts] = useState(false);
    const [showinvoices, setshowinvoices] = useState(false);
    const [showpayment, setshowpayment] = useState(false);
    const [orderCalculations, setorderCalculations] = useState(false);
    const [showadditionalcosts, setshowadditionalcosts] =
        useState(false);
    const [disabledSection, dispatch] = useReducer(reducer, init);
    const [total, settotal] = useState(0);
    const [updatepopup, setshowupdatepopup] = useState(false);
    const [manualreturn, setmanualreturn] = useState(false);
    const [showaddresswrp, setshowaddresswrp] = useState(false);
    const [sameaddress, setsameaddress] = useState(true);
    const [copyfortableitems, setcopyfortableitems] = useState({});
    const [deleteOrderButtonTxt, setDeleteOrderButtonTxt] =
        useState("DELETE ORDER");
    const [unlockdropoff, setunlockdropoff] = useState(false);

    useEffect(() => {
        if (showcosts || showadditionalcosts) {
            let c = JSON.parse(JSON.stringify(order));
            setcopyfortableitems(c);
        }
    }, [showcosts, showadditionalcosts]);

    function showableitems() {
        return (
            <section className="ordereditshowabnleitems">
                <div className="ordereditshowableitemscenterwrp">
                    <div
                        className="closepaymentwindow"
                        onClick={() => {
                            setshowcosts(false);
                            setshowinvoices(false);
                            setshowadditionalcosts(false);
                        }}
                    >
                        &#x2715;
                    </div>
                    {showcosts ? (
                        <Additionalservice
                            order={copyfortableitems}
                            setorder={(o) => {
                                setcopyfortableitems(o);
                            }}
                        />
                    ) : null}
                    {showinvoices ? <Invoices order={order} /> : null}

                    {showadditionalcosts ? (
                        <AdditionalCosts
                            order={copyfortableitems}
                            setorder={(o) => {
                                setcopyfortableitems(o);
                            }}
                        />
                    ) : null}

                    {showcosts || showadditionalcosts ? (
                        <div className="orderediteditcontactbuttonswrpother">
                            <button
                                className="orderediteditcontactcancelbutton"
                                onClick={() => {
                                    setshowcosts(false);
                                    setshowadditionalcosts(false);
                                    setcopyfortableitems({});
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="ordereditsavebuttonforcancelsave"
                                onClick={() => {
                                    setorder(copyfortableitems);
                                    setshowcosts(false);
                                    setshowadditionalcosts(false);
                                    setcopyfortableitems({});
                                    updateOrder(copyfortableitems);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    ) : null}
                </div>
            </section>
        );
    }

    useEffect(() => {
        if (order) {
            let c = calculatePaymentSections(order, items);
            settotal(c.total);
            setorderCalculations(c);
        }
    }, [order]);

    useEffect(() => {
        if (order) {
            dispatch({
                p: "actionBar",
                v: order?.status === "returned" ? true : false,
            });
            dispatch({
                p: "materialsDelivery",
                v:
                    order?.status !== "pickup" ||
                    order?.state?.materials?.delivered
                        ? true
                        : false,
            });
            dispatch({
                p: "inventory",
                v: order?.status !== "pickup" ? true : false,
            });
            dispatch({
                p: "coverage",
                v: order?.status !== "pickup" ? true : false,
            });
            dispatch({
                p: "customItem",
                v: order?.status !== "pickup" ? true : false,
            });

            dispatch({
                p: "pickUpLocation",
                v: order?.status !== "pickup" ? true : false,
            });
            dispatch({
                p: "finalPayment",
                v: order.finalPayment ? true : false,
            });
        }
    }, [order]);

    useEffect(() => {
        if (props.user) {
            setuser(JSON.parse(props.user));
        }
        if (props.order) {
            let order = JSON.parse(props.order);
            if (!order.state?.corrections) {
                order.state.corrections = {};
            }
            setorder(order);
        }
        if (props.prices) {
            setitems(JSON.parse(props.prices));
        }
    }, [props]);

    function addressform() {
        return (
            <form
                className={
                    "ordereditpickupdropoffform userbookingotheraddressform "
                }
            >
                {stage2Inputs.map((el, i) => {
                    if (i > 1) {
                        return (
                            <input
                                key={i}
                                placeholder={el.label}
                                type="text"
                                className="userbookingotheraddressforminput"
                                disabled={sameaddress ? true : false}
                                value={
                                    sameaddress
                                        ? order?.state?.address?.[
                                              el.name
                                          ] || ""
                                        : order?.state?.dropoff?.[
                                              el.name
                                          ] || ""
                                }
                                onChange={(e) => {
                                    changepickuplocation(
                                        el.name,
                                        e.target.value,
                                        sameaddress
                                            ? "address"
                                            : "dropoff"
                                    );
                                }}
                            />
                        );
                    }
                })}

                <input
                    placeholder="Postcode"
                    type="text"
                    disabled={sameaddress ? true : false}
                    className="userbookingotheraddressforminput"
                    value={
                        sameaddress
                            ? order?.state?.address?.postcode || ""
                            : order?.state?.dropoff?.postcode || ""
                    }
                    onChange={(e) => {
                        changepickuplocation(
                            "postcode",
                            e.target.value,
                            sameaddress ? "address" : "dropoff"
                        );
                    }}
                />
            </form>
        );
    }

    function showAddressWrapper() {
        return (
            <section className="myacocuntorderaddresswrp">
                <div className="myaccountorderaddressinsidewrp">
                    <div
                        className="userbookingsaddressclosebutton"
                        onClick={() => {
                            setshowaddresswrp(false);
                        }}
                    >
                        &#x2715;
                    </div>
                    <div className="classname">
                        <h4 className="myaccountsbookingaddressh4">
                            {" "}
                            Address to be returned to:
                        </h4>
                        <div className="myacountorderaddresssatbuttonswrp">
                            <div
                                className="page3rbwrp"
                                onClick={() => {
                                    setsameaddress(true);
                                }}
                            >
                                <div className="page3rb">
                                    {sameaddress ? (
                                        <div className="page3rbinside"></div>
                                    ) : null}
                                </div>
                                <div className="page3txt">
                                    <p className="classname">
                                        Same as delivery address
                                    </p>
                                </div>
                            </div>
                            <div
                                className="page3rbwrp"
                                onClick={() => {
                                    setsameaddress(false);
                                }}
                            >
                                <div className="page3rb">
                                    {!sameaddress ? (
                                        <div className="page3rbinside"></div>
                                    ) : null}
                                </div>
                                <div className="page3txt">
                                    <p className="classname">Other</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {addressform()}
                    <button
                        onClick={() => {
                            setshowaddresswrp(false);
                            setshowpayment({
                                total: total,
                                type: "finalPayment",
                                manualReturn: true,
                            });
                        }}
                        className="bookdeliveryconfirm"
                    >
                        continue
                    </button>
                </div>
            </section>
        );
    }

    function calendar(params) {
        return (
            <div className="editordercalendarglobalwrp">
                <div className="editordercalendarinsidewrp">
                    <div
                        className="calendarclosebuttonorderedit"
                        onClick={() => {
                            setshowcalendar(false);
                        }}
                    >
                        &#x2715;
                    </div>
                    <Calendar
                        priordays={(() => {
                            let dt;
                            if (showcalendar === "Materials") {
                                dt =
                                    order?.state?.materials
                                        ?.packingMaterialsDelivery ||
                                    new Date(Date.now());
                            }
                            if (showcalendar === "Collection") {
                                dt =
                                    order?.state?.corrections
                                        ?.pickUpDate ||
                                    order?.state?.date?.pickUpDate;
                            }
                            if (showcalendar === "Return") {
                                dt = order?.deliverDate?.date;
                                if (!dt) {
                                    dt = new Date(Date.now());
                                }
                            }

                            return generateDate(
                                new Date(dt).toDateString(),
                                0,
                                false
                            );
                        })()}
                        orderedit={true}
                        showweekends={
                            showcalendar === "Collection"
                                ? true
                                : false
                        }
                        dispatch={(el) => {
                            let c = {...order};

                            if (showcalendar === "Materials") {
                                c.state.materials.packingMaterialsDelivery =
                                    el.v;
                            }
                            if (showcalendar === "Collection") {
                                c.state.corrections.pickUpDate = el.v;
                            }
                            if (showcalendar === "Return") {
                                if (c.deliverDate) {
                                    c.deliverDate.date = el.v;
                                } else {
                                    c.deliverDate = {date: el.v};
                                }
                            }

                            setorder(c);
                        }}
                    />

                    {manualreturn ? (
                        <Time
                            state={order.state}
                            dispatch={(el) => {
                                let c = {...order};
                                c.state.corrections.returnTime = el;
                                setorder(c);
                            }}
                        />
                    ) : null}

                    {manualreturn &&
                    order?.state?.corrections?.returnTime ? (
                        <button
                            className="ordereditbookreturnmanuallybuttoncontinue"
                            onClick={() => {
                                setshowcalendar(false);
                                setshowaddresswrp(Date.now());
                            }}
                        >
                            CONTINUE
                        </button>
                    ) : null}
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (manualreturn) {
            if (!order?.state?.corrections?.returnTime) {
                let c = {...order};
                c.state.corrections.returnTime = `08.00 - 18.00`;
                setorder(c);
            }
        }
    }, [manualreturn]);

    useEffect(() => {
        if (!edituser) {
            if (userinp1.current.value) {
                userinp1.current.style.width =
                    userinp1.current.value.length + 2 + "ch";
            }
            if (userinp2.current.value) {
                userinp2.current.style.width =
                    userinp2.current.value.length + 2 + "ch";
            }
            if (userinp3.current.value) {
                userinp3.current.style.width =
                    userinp3.current.value.length + 2 + "ch";
            }
            if (userinp4.current.value) {
                userinp4.current.style.width =
                    userinp4.current.value.length + 2 + "ch";
            }
        }
    }, [
        edituser,
        userinp1.current,
        userinp2.current,
        userinp3.current,
        userinp4.current,
    ]);

    function topBar(params) {
        return (
            <div className="orderedittopbar">
                {types.map((el, i) => {
                    return (
                        <div
                            key={i}
                            className="ordereditbacktoorders"
                            onClick={() => {
                                router.push(
                                    {
                                        pathname: "/admin/connected",
                                        query: {
                                            location: el,
                                        },
                                    },
                                    "/admin/connected"
                                );
                            }}
                        >
                            {el}
                        </div>
                    );
                })}
                {addonstotypes.map((el, i) => {
                    return (
                        <div
                            key={i}
                            className="ordereditbacktoorders"
                            onClick={() => {
                                router.push(
                                    {
                                        pathname: "/admin/connected",
                                        query: {
                                            location: el,
                                        },
                                    },
                                    "/admin/connected"
                                );
                            }}
                        >
                            {el}
                        </div>
                    );
                })}
            </div>
        );
    }

    async function updateOrder(order) {
        let f = await fetchData(apiroute, {
            order,
            type: "saveOrder",
        });
        setshowupdatepopup(
            f ? "Status has been updated" : "Something went wrong"
        );
    }

    function userInfoBar() {
        ///
        async function submituseredit() {
            let f = await fetchData(apiroute, {
                type: "changeUserData",
                user,
            });
            if (f) {
                setedituser(false);
                setTimeout(() => {
                    updateOrder(order);
                }, 0);
            }
        }
        function changeuservalue(v, place) {
            let c = {...user};
            c.personalDetails[place] = v;
            let o = {...order};

            o.state.address[place] = v;
            setorder(o);
            setuser(c);
        }

        return (
            <div className="userinfobarglobalwrp">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    className={
                        edituser
                            ? "userinfobarglobalwrpformedit"
                            : "userinfobarglobalwrpform"
                    }
                >
                    <div className="classname">
                        {edituser ? <p> First name:</p> : null}

                        <input
                            ref={userinp1}
                            value={
                                user?.personalDetails?.firstName || ""
                            }
                            type="text"
                            className={
                                edituser
                                    ? "userinfoeditinputedit"
                                    : "userinfoeditinput"
                            }
                            readOnly={edituser ? false : true}
                            onChange={(e) => {
                                changeuservalue(
                                    e.target.value,
                                    "firstName"
                                );
                            }}
                        />
                    </div>
                    <div className="classname">
                        {edituser ? <p> Surname:</p> : null}
                        <input
                            ref={userinp2}
                            value={
                                user?.personalDetails?.lastName || ""
                            }
                            type="text"
                            readOnly={edituser ? false : true}
                            className={
                                edituser
                                    ? "userinfoeditinputedit"
                                    : "userinfoeditinput"
                            }
                            onChange={(e) => {
                                changeuservalue(
                                    e.target.value,
                                    "lastName"
                                );
                            }}
                        />
                    </div>
                    <div className="classname">
                        {edituser ? <p> Telephone number:</p> : null}
                        <input
                            ref={userinp3}
                            value={
                                user?.personalDetails?.telephone || ""
                            }
                            type="text"
                            readOnly={edituser ? false : true}
                            className={
                                edituser
                                    ? "userinfoeditinputedit"
                                    : "userinfoeditinput"
                            }
                            onChange={(e) => {
                                changeuservalue(
                                    e.target.value,
                                    "telephone"
                                );
                            }}
                        />
                    </div>
                    <div className="classname">
                        {edituser ? <p> Email:</p> : null}
                        <input
                            ref={userinp4}
                            value={user?.personalDetails?.email || ""}
                            type="mail"
                            readOnly={edituser ? false : true}
                            className={
                                edituser
                                    ? "userinfoeditinputedit"
                                    : "userinfoeditinput"
                            }
                            onChange={(e) => {
                                changeuservalue(
                                    e.target.value,
                                    "email"
                                );
                            }}
                        />
                    </div>

                    {edituser ? (
                        <div className="orderediteditcontactbuttonswrp">
                            <button
                                className="orderediteditcontactcancelbutton"
                                onClick={() => {
                                    setedituser(false);
                                }}
                                type=""
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={submituseredit}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="ordereditcolldelnotewrp">
                            {" "}
                            <button
                                onClick={() => {
                                    setedituser(true);
                                }}
                            >
                                EDIT
                            </button>
                            {order && user && items ? (
                                <span className="ordereditcolldelnotetwobuttons">
                                    <PDFDownloadLink
                                        className="downloadjobbutton"
                                        document={generateCollectionNote(
                                            order,
                                            "collection",
                                            user,
                                            items
                                        )}
                                        fileName="collectionNote.pdf"
                                    >
                                        {({
                                            blob,
                                            url,
                                            loading,
                                            error,
                                        }) => "COLL. NOTE"}
                                    </PDFDownloadLink>

                                    <PDFDownloadLink
                                        className="downloadjobbutton"
                                        document={generateCollectionNote(
                                            order,
                                            "delivery",
                                            user,
                                            items
                                        )}
                                        fileName="deliveryNote.pdf"
                                    >
                                        {({
                                            blob,
                                            url,
                                            loading,
                                            error,
                                        }) => "DEL. NOTE"}
                                    </PDFDownloadLink>

                                    <PDFDownloadLink
                                        className="downloadjobbutton"
                                        document={pdfForLabels(order)}
                                        fileName="labels.pdf"
                                    >
                                        {({
                                            blob,
                                            url,
                                            loading,
                                            error,
                                        }) => "LABELS"}
                                    </PDFDownloadLink>
                                </span>
                            ) : null}
                        </div>
                    )}
                </form>
                {!edituser ? (
                    <div className="userinfobarrightwrp">
                        <button
                            className=""
                            onClick={() => {
                                setshowcosts(true);
                            }}
                        >
                            Additional service
                        </button>
                        <button
                            className=""
                            onClick={() => {
                                setshowadditionalcosts(true);
                            }}
                        >
                            Costs
                        </button>
                        <button
                            className=""
                            onClick={() => {
                                setshowinvoices(true);
                            }}
                        >
                            Invoices
                        </button>
                        <button
                            className=""
                            onClick={() => {
                                setshowpayment({
                                    total: 0,
                                    type: "customPayment",
                                });
                            }}
                        >
                            One-off payment
                        </button>
                    </div>
                ) : null}
            </div>
        );
    }

    useEffect(() => {
        function rtstatus(db) {
            router.replace(
                {
                    pathname: "/admin/order-edit",
                    query: {...router.query, db: db},
                },
                undefined
            );
        }

        switch (order.status) {
            case "pickup":
                rtstatus("pickup");

                break;
            case "stored":
                rtstatus("stored");
                break;
            case "return":
                rtstatus("return");
                break;

            default:
                break;
        }
    }, [order.status]);

    async function actionButtonClicked(order) {
        let f = await fetchData("/api/admin/connected", {
            type: "markAsCompleted",
            el: order,
        });
        setshowupdatepopup(
            f ? "Status have been updated" : "Something went wrong"
        );
        if (f) {
            let c = {...order};

            switch (c.status) {
                case "pickup":
                    {
                        if (
                            c?.state?.materials?.delivered ||
                            !c?.state?.materials?.packingMaterials
                        ) {
                            c.status = "stored";
                        } else {
                            c.state.materials.delivered = true;
                        }
                    }

                    break;

                case "stored":
                    {
                        c.status = "return";
                    }

                    break;
                case "return":
                    {
                        c.status = "returned";
                    }

                    break;

                default:
                    break;
            }

            setorder(c);
        }
    }
    function actionBar() {
        return (
            <div
                className={
                    disabledSection.actionBar
                        ? "ordereditactionbarwrp ordereditdisabled"
                        : "ordereditactionbarwrp"
                }
            >
                <strong className="ordereditsectionlockedfulltxt">
                    Action: &nbsp;
                    {disabledSection.actionBar ? (
                        <p className="ordereditsectionlockedtitle">
                            Section locked
                        </p>
                    ) : null}
                </strong>

                <button
                    onMouseLeave={(e) => {
                        let txt;

                        order?.state?.materials?.packingMaterials &&
                        !order?.state?.materials?.delivered
                            ? (txt = "MATERIALS SENT")
                            : order.status === "pickup"
                            ? (txt = "COLLECTED")
                            : order.status === "stored"
                            ? (txt = "BOOK RETURN MANUALLY")
                            : order.status === "return"
                            ? (txt = "RETURNED")
                            : null;
                        if (order.status === "returned") {
                            txt = "COMPLETED";
                        }

                        e.target.textContent = txt;
                    }}
                    className="adminordersmarkcompletedbutton"
                    onClick={(e) => {
                        if (order.status === "stored") {
                            setmanualreturn(Date.now());

                            returnDateButton.current.click();
                        } else {
                            if (e.target.textContent !== "SURE?") {
                                e.target.textContent = "SURE?";
                            } else {
                                actionButtonClicked(order);
                            }
                        }
                    }}
                >
                    {order?.state?.materials?.packingMaterials &&
                    !order?.state?.materials?.delivered
                        ? "MATERIALS SENT"
                        : order.status === "pickup"
                        ? "COLLECTED"
                        : order.status === "stored"
                        ? "BOOK RETURN MANUALLY"
                        : order.status === "return"
                        ? "RETURNED"
                        : order.status === "returned"
                        ? "COMPLETED"
                        : null}
                </button>
            </div>
        );
    }

    function materialDeliverySection() {
        function changequantity(q, pos, index) {
            if (q !== null) {
                let c = {...order};
                c.state.materials[pos] = q;

                let cr = c?.state?.corrections;
                if (!cr) {
                    c.state.corrections = {materials: {[pos]: index}};
                } else {
                    let po = c.state?.corrections?.materials?.[pos];
                    if (po !== undefined) {
                        c.state.corrections.materials[pos] =
                            po + index;
                    } else {
                        c.state.corrections.materials = {
                            ...c.state.corrections.materials,
                            [pos]: index,
                        };
                    }
                }
                setorder(c);
            }
        }

        return (
            <div
                className={
                    disabledSection.materialsDelivery
                        ? " ordereditmaterialdeliverysection ordereditdisabled"
                        : "ordereditmaterialdeliverysection ordereditenabled"
                }
            >
                <strong className="ordereditsectionlockedfulltxt">
                    Material delivery:&nbsp;
                    {disabledSection.materialsDelivery ? (
                        <p className="ordereditsectionlockedtitle">
                            Section locked
                        </p>
                    ) : null}
                </strong>
                <div className="ordereditmatdeliveryinsidewrp">
                    <div
                        className="ordereditmatdeliverycalbutton"
                        onClick={() => {
                            setshowcalendar("Materials");
                        }}
                    >
                        {dateFormatConverter(
                            order?.state?.materials
                                ?.packingMaterialsDelivery
                        )}
                    </div>
                    {items.packingMaterials.map((el) => {
                        return (
                            <div
                                className="storageleftboxliner"
                                key={el.pos}
                            >
                                <form className="boxlinerinputwrp ">
                                    <span
                                        className="boxlinertoparrow"
                                        style={
                                            disabledSection.materialsDelivery
                                                ? {
                                                      borderTopColor:
                                                          "grey",
                                                      borderLeftColor:
                                                          "grey",
                                                  }
                                                : {}
                                        }
                                        onClick={() => {
                                            changequantity(
                                                order?.state
                                                    ?.materials?.[
                                                    el.pos
                                                ]
                                                    ? order?.state
                                                          ?.materials?.[
                                                          el.pos
                                                      ] + 1
                                                    : 1,
                                                el.pos,
                                                1
                                            );
                                        }}
                                    ></span>
                                    <input
                                        readOnly
                                        step="any"
                                        min={0}
                                        max={99}
                                        value={
                                            order?.state?.materials?.[
                                                el.pos
                                            ] > 0
                                                ? order?.state?.materials?.[
                                                      el.pos
                                                  ].toString()
                                                : 0
                                        }
                                        type={"number"}
                                        className={
                                            order?.state?.materials?.[
                                                el.pos
                                            ] &&
                                            order?.state?.materials?.[
                                                el.pos
                                            ] !== 0
                                                ? `boxlinerinputmarked boxlinerinputmarkedorderedit ${
                                                      disabledSection.materialsDelivery
                                                          ? "boxlinerinputmarkeddisabled "
                                                          : null
                                                  }`
                                                : `boxlinerinput boxlinerinputorderedit ${
                                                      disabledSection.materialsDelivery
                                                          ? "boxlinerinputmarkeddisabledotherstuff "
                                                          : null
                                                  } `
                                        }
                                    ></input>{" "}
                                    <span
                                        className="boxlinerbottomarrow"
                                        style={
                                            disabledSection.materialsDelivery
                                                ? {
                                                      borderTopColor:
                                                          "grey",
                                                      borderLeftColor:
                                                          "grey",
                                                  }
                                                : {}
                                        }
                                        onClick={() => {
                                            changequantity(
                                                order?.state
                                                    ?.materials?.[
                                                    el.pos
                                                ] &&
                                                    order?.state
                                                        ?.materials?.[
                                                        el.pos
                                                    ] !== 0
                                                    ? order?.state
                                                          ?.materials?.[
                                                          el.pos
                                                      ] - 1
                                                    : null,
                                                el.pos,
                                                -1
                                            );
                                        }}
                                    ></span>
                                </form>
                                <div className="storageboxnamewrp">
                                    <div className="classname">
                                        {el.name}
                                    </div>

                                    {items.packingMaterials.map(
                                        (item, i) => {
                                            if (
                                                item.pos === el.pos &&
                                                parseFloat(
                                                    item.price
                                                ).toFixed(2)
                                            ) {
                                                return (
                                                    <div
                                                        className="txt2txt"
                                                        style={
                                                            disabledSection.materialsDelivery
                                                                ? greyText
                                                                : {}
                                                        }
                                                        key={i}
                                                    >
                                                        &#163;
                                                        {parseFloat(
                                                            item.price
                                                        ).toFixed(2)}
                                                    </div>
                                                );
                                            }
                                        }
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    function inventorySection() {
        function dispatchmaterials(pos, v, index) {
            if (v !== null) {
                let c = {...order};
                c.state.storage[pos] = v;

                let cr = c?.state?.corrections;
                if (!cr) {
                    c.state.corrections = {storage: {[pos]: index}};
                } else {
                    let po = c.state?.corrections?.storage?.[pos];
                    if (po !== undefined) {
                        c.state.corrections.storage[pos] = po + index;
                    } else {
                        c.state.corrections.storage = {
                            ...c.state.corrections.storage,
                            [pos]: index,
                        };
                    }
                }

                setorder(c);
            }
        }

        return (
            <section
                className={
                    disabledSection.inventory
                        ? "inventorysectionorderedit ordereditdisabled"
                        : "inventorysectionorderedit ordereditenabled"
                }
            >
                <strong className="ordereditsectionlockedfulltxt">
                    Inventory: &nbsp;
                    {disabledSection.inventory ? (
                        <p className="ordereditsectionlockedtitle">
                            Section locked
                        </p>
                    ) : null}
                </strong>
                <div className="inventorysectioninsidewrporderedit">
                    {items.storage.map((el) => {
                        return (
                            <div
                                className="storageleftboxliner"
                                key={el.pos}
                            >
                                <form
                                    id="stage-form"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                    className="boxlinerinputwrp"
                                >
                                    <span
                                        className="boxlinertoparrow"
                                        style={
                                            disabledSection.inventory
                                                ? {
                                                      borderTopColor:
                                                          "grey",
                                                      borderLeftColor:
                                                          "grey",
                                                  }
                                                : {}
                                        }
                                        onClick={() => {
                                            dispatchmaterials(
                                                el.pos,
                                                order.state.storage[
                                                    el.pos
                                                ]
                                                    ? order.state
                                                          .storage[
                                                          el.pos
                                                      ] + 1
                                                    : 1,
                                                1
                                            );
                                        }}
                                    >
                                        {" "}
                                    </span>{" "}
                                    <input
                                        step="any"
                                        min={0}
                                        max={99}
                                        readOnly
                                        value={
                                            order?.state?.storage?.[
                                                el.pos
                                            ] > 0
                                                ? order.state.storage[
                                                      el.pos
                                                  ].toString()
                                                : 0
                                        }
                                        type={"number"}
                                        className={
                                            order?.state?.storage?.[
                                                el.pos
                                            ] &&
                                            order?.state?.storage?.[
                                                el.pos
                                            ] !== 0
                                                ? `boxlinerinputmarked boxlinerinputmarkedorderedit ${
                                                      disabledSection.inventory
                                                          ? "boxlinerinputmarkeddisabled"
                                                          : null
                                                  }`
                                                : `boxlinerinput boxlinerinputorderedit ${
                                                      disabledSection.inventory
                                                          ? "boxlinerinputmarkeddisabledotherstuff "
                                                          : null
                                                  } `
                                        }
                                    ></input>{" "}
                                    <span
                                        className="boxlinerbottomarrow"
                                        style={
                                            disabledSection.materialsDelivery
                                                ? {
                                                      borderTopColor:
                                                          "grey",
                                                      borderLeftColor:
                                                          "grey",
                                                  }
                                                : {}
                                        }
                                        onClick={() => {
                                            dispatchmaterials(
                                                el.pos,
                                                order.state.storage[
                                                    el.pos
                                                ]
                                                    ? order.state
                                                          .storage[
                                                          el.pos
                                                      ] - 1
                                                    : null,
                                                -1
                                            );
                                        }}
                                    ></span>
                                </form>
                                <div className="classname">
                                    <div className="classname">
                                        {el.name}
                                    </div>
                                    <div
                                        className="txt2txt"
                                        style={
                                            disabledSection.inventory
                                                ? greyText
                                                : {}
                                        }
                                    >
                                        {" "}
                                        &#163;
                                        {parseFloat(el.price).toFixed(
                                            2
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }
    function addCustomItem(params) {
        function savenewitem() {
            let obj = {
                itemid: Date.now(),
                name: inp1.current.value,
                quantity: inp2.current.value,
                price: inp3.current.value,
            };
            let c = {...order};

            if (order.state.customItems) {
                order.state.customItems.push(obj);
            } else {
                order.state.customItems = [obj];
            }
            setorder(c);
            inp1.current.value = "";
            inp2.current.value = "";
            inp3.current.value = "";
        }

        function editItem(id, pos, value) {
            let c = {...order};
            for (const item of c.state.customItems) {
                if (item.itemid === id) {
                    item[pos] = value;
                    break;
                }
            }
            setorder(c);
        }

        return (
            <section
                className={
                    disabledSection.customItem
                        ? "ordereditcustomitemwrp ordereditdisabled"
                        : "ordereditcustomitemwrp ordereditenabled"
                }
            >
                <strong className="ordereditsectionlockedfulltxt">
                    Add custom item: &nbsp;{" "}
                    {disabledSection.customItem ? (
                        <p className="ordereditsectionlockedtitle">
                            Section locked
                        </p>
                    ) : null}{" "}
                </strong>

                <div className="ordereditcustomitemsmappedwrp">
                    <div className="ordereditcustomitemsmappednavbar">
                        <p>Item</p>
                        <p>Quantity</p>
                        <p>Price</p>
                        <p>Action</p>
                    </div>
                    <div className="ordereditcustomitemmappedlinercustomitem">
                        <input
                            ref={inp1}
                            placeholder="item name"
                            type="text"
                            className="classname"
                            required
                        />
                        <input
                            ref={inp2}
                            placeholder="quantity"
                            type="text"
                            className="classname"
                            required
                        />
                        <input
                            ref={inp3}
                            placeholder="£per one"
                            type="number"
                            className="classname"
                            required
                        />
                        <button onClick={savenewitem}> ADD</button>
                    </div>
                    <div className="ordereditcustomitemssplitter"></div>
                    {order?.state?.customItems?.map((el, i) => {
                        return (
                            <div
                                className="ordereditcustomitemmappedlinercustomitem"
                                key={el.itemid}
                            >
                                <input
                                    placeholder=""
                                    type="text"
                                    value={el.name}
                                    className="classname"
                                    onChange={(e) => {
                                        editItem(
                                            el.itemid,
                                            "name",
                                            e.target.value
                                        );
                                    }}
                                />
                                <input
                                    placeholder=""
                                    type="number"
                                    value={el.quantity}
                                    className="classname"
                                    onChange={(e) => {
                                        editItem(
                                            el.itemid,
                                            "quantity",
                                            e.target.value
                                        );
                                    }}
                                />
                                <input
                                    placeholder=""
                                    type="number"
                                    value={el.price}
                                    className="classname"
                                    onChange={(e) => {
                                        editItem(
                                            el.itemid,
                                            "price",
                                            e.target.value
                                        );
                                    }}
                                />
                                <button
                                    onMouseLeave={(e) => {
                                        e.target.textContent =
                                            "DELETE";
                                    }}
                                    onClick={(e) => {
                                        if (
                                            e.target.textContent !==
                                            "SURE?"
                                        ) {
                                            e.target.textContent =
                                                "SURE?";
                                        } else {
                                            let c = {...order};
                                            let f =
                                                c.state.customItems.filter(
                                                    (it) => {
                                                        return (
                                                            it.itemid !==
                                                            el.itemid
                                                        );
                                                    }
                                                );
                                            c.state.customItems = f;
                                            setorder(c);
                                        }
                                    }}
                                >
                                    DELETE
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }
    function changepickuplocation(pos, v, loc) {
        let c = {...order};
        if (loc === "address") {
            c.state.address[pos] = v;
        }
        if (loc === "dropoff") {
            let dr = c?.state?.dropoff;
            if (!dr) {
                c.state.dropoff = {[pos]: v};
            } else {
                let po = c?.state?.dropoff?.[pos];

                if (po) {
                    c.state.dropoff[pos] = v;
                } else {
                    c.state.dropoff = {...c.state.dropoff, [pos]: v};
                }
            }
        }

        setorder(c);
    }

    function pickuplocation(params) {
        return (
            <form
                className={
                    disabledSection.pickUpLocation
                        ? "ordereditpickupdropoffform ordereditdisabled"
                        : "ordereditpickupdropoffform ordereditenabled"
                }
            >
                <strong className="ordereditsectionlockedfulltxt">
                    {" "}
                    Pick-up location&nbsp;{" "}
                    {disabledSection.pickUpLocation ? (
                        <p className="ordereditsectionlockedtitle">
                            Section locked
                        </p>
                    ) : null}{" "}
                </strong>

                {stage2Inputs.map((el, i) => {
                    if (i > 1) {
                        return (
                            <input
                                key={i}
                                placeholder={el.label}
                                type="text"
                                className="classname"
                                value={
                                    order?.state?.address?.[
                                        el.name
                                    ] || ""
                                }
                                onChange={(e) => {
                                    changepickuplocation(
                                        el.name,
                                        e.target.value,
                                        "address"
                                    );
                                }}
                            />
                        );
                    }
                })}
                <input
                    placeholder="Postcode"
                    type="text"
                    className="classname"
                    value={order?.state?.address?.postcode || ""}
                    onChange={(e) => {
                        changepickuplocation(
                            "postcode",
                            e.target.value,
                            "address"
                        );
                    }}
                />
            </form>
        );
    }

    function dropofflocation() {
        return (
            <form
                className={
                    disabledSection.finalPayment
                        ? "ordereditpickupdropoffform ordereditdisabled"
                        : "ordereditpickupdropoffform ordereditenabled"
                }
            >
                <strong className="ordereditsectionlockedfulltxt">
                    {" "}
                    Drop-off location &nbsp;{" "}
                    {disabledSection.finalPayment ? (
                        <p className="ordereditsectionlockedtitle">
                            Section locked
                        </p>
                    ) : null}{" "}
                </strong>

                {stage2Inputs.map((el, i) => {
                    if (i > 1) {
                        return (
                            <input
                                key={i}
                                placeholder={el.label}
                                type="text"
                                className="classname"
                                value={
                                    order?.state?.dropoff?.[
                                        el.name
                                    ] || ""
                                }
                                onChange={(e) => {
                                    changepickuplocation(
                                        el.name,
                                        e.target.value,
                                        "dropoff"
                                    );
                                }}
                            />
                        );
                    }
                })}
                <input
                    placeholder="Postcode"
                    type="text"
                    className="classname"
                    value={order?.state?.dropoff?.postcode || ""}
                    onChange={(e) => {
                        changepickuplocation(
                            "postcode",
                            e.target.value,
                            "dropoff"
                        );
                    }}
                />
            </form>
        );
    }
    function timeslotdropoff() {
        return (
            <ul className="orderedittimeslotdropofftimes">
                {times.map((el, i) => {
                    return (
                        <li
                            onClick={(e) => {
                                e.stopPropagation();
                                let c = {...order};

                                if (
                                    showtimeslotdropoff ===
                                    "collectionTime"
                                ) {
                                    c.state.corrections.pickUpTime =
                                        el;
                                }
                                if (
                                    showtimeslotdropoff ===
                                    "returnTime"
                                ) {
                                    c.state.corrections.returnTime =
                                        el;
                                }
                                setorder(c);
                                setshowtimeslotdropoff(false);
                            }}
                            key={i}
                        >
                            {el}
                        </li>
                    );
                })}
            </ul>
        );
    }

    function pickdates(params) {
        return (
            <div className={"ordereditpickdropdatesliner"}>
                <strong>Collection date</strong>
                <strong>Time slot</strong>
                <div
                    className="ordereditmatdeliverycalbutton"
                    onClick={() => {
                        setshowcalendar("Collection");
                    }}
                >
                    {order?.state?.corrections?.pickUpDate ||
                        dateFormatConverter(
                            order?.state?.date?.pickUpDate
                        ) ||
                        "undefined"}
                </div>
                <div
                    className="ordereditpickdroptimeslot"
                    onClick={() => {
                        setshowtimeslotdropoff(
                            showtimeslotdropoff
                                ? false
                                : "collectionTime"
                        );
                    }}
                >
                    {order?.state?.corrections?.pickUpTime ||
                        order?.state?.date?.pickUpTime}

                    {showtimeslotdropoff === "collectionTime"
                        ? timeslotdropoff()
                        : null}
                </div>
                <strong>Collection</strong>
                <div className="classname"></div>
                <div className="ordereditpremcolmainwrp">
                    <div
                        className="ordereditcoveragecalbutton"
                        onClick={() => {
                            setshowcollection(
                                showcollection ? false : true
                            );
                        }}
                    >
                        {order?.state?.corrections
                            ?.premiumCollection ||
                            order?.state?.checkout
                                ?.premiumCollection ||
                            ""}
                    </div>

                    {showcollection ? (
                        <ul className="orderetipremcollistwrp">
                            {precolltxt.map((el, i) => {
                                return (
                                    <li
                                        className="premcollcovlinerorderedit"
                                        key={i}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            let c = {...order};

                                            c.state.corrections.premiumCollection =
                                                el;
                                            setorder(c);
                                            setshowcollection(false);
                                        }}
                                    >
                                        {el}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : null}
                </div>
            </div>
        );
    }

    function dropdates() {
        return (
            <section className="ordereditpickdropdatessection">
                <div className={"ordereditpickdropdatesliner"}>
                    <strong>Return date</strong>
                    <strong>Time slot</strong>

                    <div
                        ref={returnDateButton}
                        className="ordereditmatdeliverycalbutton"
                        onClick={() => {
                            setshowcalendar("Return");
                        }}
                    >
                        {order?.deliverDate?.date
                            ? dateFormatConverter(
                                  order.deliverDate.date
                              )
                            : "undefined"}
                    </div>
                    <div
                        className="ordereditpickdroptimeslot"
                        onClick={() => {
                            setshowtimeslotdropoff(
                                showtimeslotdropoff
                                    ? false
                                    : "returnTime"
                            );
                        }}
                    >
                        {order?.state?.corrections?.returnTime ||
                            order?.deliverDate?.time ||
                            "undefined"}

                        {showtimeslotdropoff === "returnTime"
                            ? timeslotdropoff()
                            : null}
                    </div>
                    <strong>Return</strong>
                    <div className="ordereditpremcolmainwrp">
                        <div
                            className="ordereditcoveragecalbutton"
                            onClick={() => {
                                setshowreturn(
                                    showreturn ? false : true
                                );
                            }}
                        >
                            {order?.state?.corrections
                                ?.premiumReturn ||
                                order?.deliverDate?.premiumReturn ||
                                ""}
                        </div>

                        {showreturn ? (
                            <ul className="orderetipremcollistwrp">
                                {prerettxt.map((el, i) => {
                                    return (
                                        <li
                                            className="premcollcovlinerorderedit"
                                            key={i}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                let c = {...order};
                                                c.state.corrections.premiumReturn =
                                                    el;

                                                setorder(c);
                                                setshowreturn(false);
                                            }}
                                        >
                                            {el}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : null}
                    </div>
                </div>
            </section>
        );
    }

    function selectedAddons() {
        function checkifpmoram(el) {
            if (el) {
                if (el === times[0]) {
                    return (
                        <tr>
                            <td>FREE</td>
                            <td>No slot required (08:00 - 18:00)</td>
                        </tr>
                    );
                }
                if (el === times[1]) {
                    return (
                        <tr>
                            <td>£25</td>
                            <td>AM time slot (08:00 - 12:00)</td>
                        </tr>
                    );
                }
                if (el === times[2]) {
                    return (
                        <tr>
                            <td>£25</td>
                            <td>PM time slot (12:00 - 18:00)</td>
                        </tr>
                    );
                }
            }
        }

        let bc = calculateBoxesCount(order);

        let bcprice = bc * parseFloat(returnDeliveryPerItem);

        return (
            <section className="selectedaddonsorderedit">
                <p className="selectedorderorderseditstrongtxt">
                    {" "}
                    <strong>PACKAGE SELECTED</strong>
                </p>

                <p className="selectedaddonsordereditpies">
                    AT COLLECTION:
                </p>

                <table className="ordereditgreyandredboxtable">
                    <tbody>
                        {order?.state?.corrections
                            ?.premiumCollection ? (
                            order?.state?.corrections
                                ?.premiumCollection ===
                            precolltxt[[1]] ? (
                                <tr>
                                    <td>£{precollprice[1]}</td>
                                    <td>
                                        {"Collection from doorstep"}
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td>{precollprice[0]}</td>
                                    <td>
                                        {
                                            "Collection from ground floor"
                                        }
                                    </td>
                                </tr>
                            )
                        ) : null}

                        {!order?.state?.corrections
                            ?.premiumCollection ? (
                            order?.state?.checkout
                                ?.premiumCollection ===
                            precolltxt[[1]] ? (
                                <tr>
                                    <td>£{precollprice[1]}</td>
                                    <td>
                                        {"Collection from doorstep"}
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td>{precollprice[0]}</td>
                                    <td>
                                        {
                                            "Collection from ground floor"
                                        }
                                    </td>
                                </tr>
                            )
                        ) : null}

                        {checkifpmoram(
                            order?.state?.corrections?.pickUpTime ||
                                order?.state?.date?.pickUpTime
                        )}

                        {checkifweekend(
                            order.state?.corrections?.pickUpDate ||
                                order.state?.date?.pickUpDate
                        ) ? (
                            <tr>
                                <td>£{weekendCollectionPrice}</td>
                                <td>Weekend collection</td>
                            </tr>
                        ) : null}

                        <tr>
                            <td>£{calcmatsprice(items, order)}</td>

                            <td>Packing materials</td>
                        </tr>
                        <tr>
                            <td>
                                £
                                {order?.state?.address
                                    ?.postcodeDistance &&
                                order?.state?.address
                                    ?.postcodeDistance < 50
                                    ? "FREE"
                                    : postcodeDistancePrice}
                            </td>

                            <td>Out of area charge </td>
                        </tr>
                    </tbody>
                </table>

                <p className="selectedaddonsordereditpies">
                    AT DELIVERY
                </p>

                <table className="ordereditgreyandredboxtable">
                    <tbody>
                        {order?.state?.corrections?.premiumReturn ? (
                            order?.state?.corrections
                                ?.premiumReturn === prerettxt[[1]] ? (
                                <tr>
                                    <td>£{precollprice[1]}</td>
                                    <td>Return to doorstep</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td>{precollprice[0]}</td>
                                    <td>Return to ground floor</td>
                                </tr>
                            )
                        ) : null}
                        {!order?.state?.corrections?.premiumReturn ? (
                            order?.deliverDate?.premiumReturn ===
                            prerettxt[[1]] ? (
                                <tr>
                                    <td>£{precollprice[1]}</td>
                                    <td>Return to doorstep</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td>{precollprice[0]}</td>
                                    <td>Return to ground floor</td>
                                </tr>
                            )
                        ) : null}
                        {checkifpmoram(
                            order?.state?.corrections?.returnTime ||
                                order?.deliverDate?.time
                        )}

                        <tr>
                            <td>£{bcprice.toFixed(2)}</td>
                            <td>Return costs for {bc} items</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        );
    }

    function coverage() {
        return (
            <section
                className={
                    disabledSection.coverage
                        ? "premiumcollectionandcoverage  ordereditdisabled"
                        : "premiumcollectionandcoverage ordereditenabled"
                }
            >
                <div className="ordereditpremcolmainwrp">
                    <strong
                        style={{marginBottom: "8px"}}
                        className="ordereditsectionlockedfulltxt"
                    >
                        Coverage: &nbsp;{" "}
                        {disabledSection.coverage ? (
                            <p className="ordereditsectionlockedtitle">
                                Section locked
                            </p>
                        ) : null}
                    </strong>

                    <div
                        className="ordereditcoveragecalbutton"
                        onClick={() => {
                            setshowcoverage(
                                showcoverage ? false : true
                            );
                        }}
                    >
                        {order?.state?.corrections?.coverageLevel ||
                            order?.state?.checkout?.coverageLevel ||
                            ""}
                    </div>
                    {showcoverage ? (
                        <ul className="orderetipremcollistwrp">
                            {coverageTxt.map((el, i) => {
                                return (
                                    <li
                                        className="premcollcovlinerorderedit"
                                        key={i}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            let c = {...order};

                                            c.state.corrections.coverageLevel =
                                                el;
                                            setorder(c);
                                            setshowcoverage(false);
                                        }}
                                    >
                                        {el}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : null}
                </div>
            </section>
        );
    }

    function totalCosts() {
        function getcoveragetxt() {
            let cl =
                order?.state?.checkout?.coverageLevel ||
                order?.state?.corrections?.coverageLevel;

            if (cl) {
                if (cl.includes("FREE")) {
                    return "FREE";
                }
                if (cl.includes("250")) {
                    return "250";
                }
                if (cl.includes("500")) {
                    return "500";
                }
            }
        }

        return (
            <section
                className={
                    disabledSection.finalPayment
                        ? "orderedittotalcostswrapper ordereditdisabled"
                        : "orderedittotalcostswrapper"
                }
            >
                <p className="selectedorderorderseditstrongtxt">
                    {" "}
                    <strong>TOTAL COSTS</strong>{" "}
                </p>

                <table className="ordereditgreyandredboxtable">
                    <tbody className="oederedittotalcoststbody">
                        <tr>
                            <td>
                                {" "}
                                £
                                {orderCalculations?.packageAtCollection?.toFixed(
                                    2
                                )}
                            </td>
                            <td>Package at collection</td>
                        </tr>
                        <tr>
                            <td>
                                {" "}
                                £
                                {orderCalculations?.addonsOnDelivery?.toFixed(
                                    2
                                )}
                            </td>
                            <td>Package at delivery</td>
                        </tr>
                        <tr>
                            <td>{`£${orderCalculations?.cstordersprc?.toFixed(
                                2
                            )}`}</td>
                            <td>Additional services</td>
                        </tr>

                        <tr>
                            <td>
                                £
                                {(
                                    orderCalculations?.monthlyStoragePrice *
                                    (orderCalculations
                                        ?.storagepriceandmonths
                                        ?.months +
                                        1)
                                ).toFixed(2)}
                            </td>
                            <td>{`Storage for ${
                                orderCalculations
                                    ?.storagepriceandmonths?.months +
                                1
                            } months`}</td>
                        </tr>

                        {orderCalculations?.monthlyCoveragePrice ? (
                            <tr>
                                <td></td>

                                <td
                                    className="editvoveragediscounttotalwrp"
                                    style={{
                                        marginBottom: 0,
                                    }}
                                >
                                    <div>+</div> &nbsp; &nbsp;
                                    <div>
                                        £
                                        {
                                            orderCalculations?.monthlyCoveragePrice
                                        }{" "}
                                        pm &nbsp;
                                    </div>
                                    <div>
                                        {" "}
                                        - £{getcoveragetxt()} coverage
                                    </div>
                                </td>
                            </tr>
                        ) : null}

                        {order?.state?.referralCode?.code ? (
                            <tr>
                                <td></td>

                                <td
                                    className="editvoveragediscounttotalwrp"
                                    style={{
                                        paddingBottom: 0,
                                        marginBottom: 0,
                                    }}
                                >
                                    <div>-</div> &nbsp; &nbsp;&nbsp;
                                    <div>
                                        £
                                        {orderCalculations?.monthlyDiscountPrice?.toFixed(
                                            2
                                        )}{" "}
                                        pm &nbsp;
                                    </div>
                                    <div>
                                        {" "}
                                        -&nbsp;
                                        {
                                            order?.state?.referralCode
                                                ?.discount
                                        }
                                        % discount
                                    </div>
                                </td>
                            </tr>
                        ) : null}

                        {order?.state?.referralCode?.code ? (
                            <tr>
                                <td></td>

                                <td className="editvoveragediscounttotalwrp">
                                    <div> </div> &nbsp; &nbsp; &nbsp;
                                    <div
                                        style={{
                                            fontWeight: "normal",
                                            marginTop: "4px",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        code used{" "}
                                        {order?.state?.referralCode?.code?.toUpperCase()}
                                    </div>
                                </td>
                            </tr>
                        ) : null}

                        <tr>
                            <td>
                                -£
                                {(
                                    order?.paymentIntent?.amount / 100
                                ).toFixed(2)}
                            </td>
                            <td>
                                {`Initial payment (${new Date(
                                    order.orderTime
                                ).toLocaleDateString("en-GB")})`}
                            </td>
                        </tr>

                        {order?.finalPayment?.paid ? null : (
                            <tr>
                                <td style={{paddingTop: "16px"}}>
                                    <strong>£{total}</strong>
                                </td>
                                <td style={{paddingTop: "16px"}}>
                                    <strong>
                                        Total outstanding today
                                    </strong>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="selectedorderordereditinsidedivs">
                    {order?.state?.corrections?.discount ? (
                        <p>
                            £
                            {
                                -parseFloat(
                                    order.state.corrections.discount
                                ).toFixed(2)
                            }{" "}
                            Discount applied
                        </p>
                    ) : null}
                </div>
                {order?.finalPayment?.paid ? null : (
                    <div className="ordereditdiscountapplywrp">
                        <input
                            placeholder={
                                order.finalPayment
                                    ? "LOCKED"
                                    : "Discount"
                            }
                            type="text"
                            className="classname"
                            value={discounttxt || ""}
                            onChange={(e) => {
                                setdiscounttxt(e.target.value);
                            }}
                        />
                        <button
                            type=""
                            onClick={() => {
                                let c = {...order};
                                c.state.corrections.discount =
                                    parseFloat(discounttxt);
                                setorder(c);
                                setdiscounttxt("");
                            }}
                        >
                            APPLY
                        </button>
                    </div>
                )}

                {order?.finalPayment?.paid === true ? (
                    <div className="ordereditbookingcompletedinfo">
                        <p>
                            <strong>BOOKING IS NOW COMPLETE</strong>
                        </p>
                        <p>
                            Total cost paid £
                            {(
                                parseFloat(
                                    order.finalPayment.payment.amount
                                ) /
                                    100 +
                                parseFloat(
                                    order.paymentIntent.amount
                                ) /
                                    100
                            ).toFixed(2)}{" "}
                        </p>
                    </div>
                ) : null}
            </section>
        );
    }

    async function paymentCompleted(el) {
        if (el && el.status === "succeeded") {
            let c = {...order};

            switch (el.type) {
                case "finalPayment":
                    {
                        c.finalPayment = {
                            time: Date.now(),
                            payment: el,
                            paid: true,
                        };

                        let fpo = await fetchData(apiroute, {
                            order: c,
                            type: "finalPaymentOrder",
                        });

                        if (fpo) {
                            if (showpayment.manualReturn) {
                                c.finalPayment.invoiceNr =
                                    fpo.invoiceNr;
                                actionButtonClicked(c);
                            }
                        }
                    }
                    break;

                case "customPayment":
                    {
                        let obj = {
                            time: Date.now(),
                            payment: el,
                            paid: true,
                        };
                        c.customPayments
                            ? c.customPayments.push(obj)
                            : (c.customPayments = [obj]);

                        let fpo = await fetchData(apiroute, {
                            order: c,
                            type: "customPayment",
                        });

                        if (fpo) {
                            c.customPayments[
                                c.customPayments.length - 1
                            ].invoiceNr = fpo.invoiceNr;
                        }
                    }
                    break;

                default:
                    break;
            }

            setorder(c);
        }
    }

    function consignmentNotes(params) {
        return (
            <section className="consignmentnotewwrp ordereditenabled">
                <p>
                    <strong>Consignment notes</strong>
                </p>
                <textarea
                    value={order?.state?.note || ""}
                    className="consignmentnotextxtarr"
                    onChange={(e) => {
                        let c = {...order};
                        c.state.note = e.target.value;

                        setorder(c);
                    }}
                ></textarea>
            </section>
        );
    }

    return (
        <div className={`ordereditglobalwrp ${openSans.className}`}>
            {updatepopup ? (
                <div className="ordereditupdatepopupglobal">
                    <div className="ordereditupdatepopupinsidewrp">
                        <div
                            className="closepaymentwindow"
                            onClick={() => {
                                setshowupdatepopup(false);
                            }}
                        >
                            &#x2715;
                        </div>
                        <p style={{marginTop: "24px"}}>
                            <strong>{updatepopup}</strong>
                        </p>
                    </div>
                </div>
            ) : null}
            {showpayment ? (
                <Payment
                    userID={order?.user}
                    showpayment={showpayment}
                    setshowpayment={(e) => {
                        setshowpayment(e);
                    }}
                    payment={(el) => {
                        paymentCompleted(el);
                    }}
                />
            ) : null}
            {showaddresswrp ? showAddressWrapper() : null}
            {showcalendar ? calendar() : null}
            {topBar()}

            {edituser ? (
                <section className="ordereditedituserpopup">
                    <div className="orderedituserinfobarcenterwrp">
                        <div
                            className="closepaymentwindow"
                            onClick={() => {
                                setedituser(false);
                            }}
                        >
                            &#x2715;
                        </div>
                        <p className="ordereditpopuptitle">
                            <p>
                                {" "}
                                <strong>Edit Contact</strong>
                            </p>
                            <p>
                                Change information about selected
                                contact
                            </p>
                        </p>

                        {userInfoBar()}
                    </div>
                </section>
            ) : (
                userInfoBar()
            )}
            {showcosts || showinvoices || showadditionalcosts
                ? showableitems()
                : null}
            <section className="usereditmainsection">
                <div className="usereditmainsectionleftwrp">
                    {actionBar()}
                    {materialDeliverySection()}
                    {inventorySection()}
                    {coverage()}
                    {addCustomItem()}
                </div>
                <div className="usereditmainsectionrightwrp">
                    <div className="usereditpickdropdateswrp">
                        <div
                            className={
                                order.status !== "pickup"
                                    ? "ordereditdisabled"
                                    : "ordereditenabled"
                            }
                        >
                            {order.status !== "pickup" ? (
                                <strong className="ordereditsectionlockedfulltxt">
                                    Pick-up details:
                                    <p
                                        className="ordereditsectionlockedtitle"
                                        style={{marginBottom: "8px"}}
                                    >
                                        Section locked
                                    </p>
                                </strong>
                            ) : null}

                            {pickdates()}
                        </div>
                        <div
                            className={
                                unlockdropoff
                                    ? "ordereditenabled"
                                    : order.finalPayment
                                    ? "ordereditdisabled"
                                    : "ordereditenabled"
                            }
                        >
                            {order.finalPayment ? (
                                <strong className="ordereditsectionlockedfulltxt">
                                    Drop-off details:
                                    <p
                                        className="ordereditsectionlockedtitle"
                                        style={{marginBottom: "8px"}}
                                    >
                                        Section locked{" "}
                                        <button
                                            className="unlocksectionbutton"
                                            onClick={() => {
                                                setunlockdropoff(
                                                    unlockdropoff
                                                        ? false
                                                        : true
                                                );
                                            }}
                                        >
                                            {unlockdropoff
                                                ? "lock"
                                                : " unlock"}
                                        </button>
                                    </p>
                                </strong>
                            ) : null}

                            {dropdates()}
                        </div>
                    </div>
                    <div className="usereditpickdropdateswrp">
                        {pickuplocation()}
                        {dropofflocation()}
                    </div>
                    {consignmentNotes()}
                    <div className="usereditaddonstotalwrp">
                        {selectedAddons()}

                        {totalCosts()}
                    </div>
                    <div className="ordermainbuttons">
                        <button
                            onMouseLeave={() =>
                                setDeleteOrderButtonTxt(
                                    "DELETE ORDER"
                                )
                            }
                            className="deleteOrderButton"
                            onClick={async () => {
                                if (
                                    deleteOrderButtonTxt ===
                                    "DELETE ORDER"
                                ) {
                                    setDeleteOrderButtonTxt(
                                        "ARE YOU SURE?"
                                    );
                                } else {
                                    let d = await fetchData(
                                        apiroute,
                                        {
                                            type: "deleteOrder",
                                            orderNr:
                                                router.query.orderNr,
                                            db: router.query.db,
                                        }
                                    );

                                    if (d) {
                                        router.push(
                                            "/admin/connected"
                                        );
                                    }
                                }
                            }}
                        >
                            {deleteOrderButtonTxt}
                        </button>
                        <button
                            className="ordereditsavechangesbutton"
                            onClick={() => {
                                updateOrder(order);
                            }}
                        >
                            UPDATE BOOKING
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    let ch = checkAuthorization(ctx.req);

    if (ch && ch.type === "admin") {
        let order = await findOneDocument(ctx.query.db, {
            orderNr: parseInt(ctx.query.orderNr),
        });
        let user;
        let prices;
        if (order) {
            user = await findByID("users", order.user);

            if (user?.password) {
                delete user.password;
            }

            prices = await findOneDocument("admin", {type: "prices"});
        }

        if (ctx.query.orderNr && ctx.query.db) {
            return {
                props: {
                    user: JSON.stringify(user),
                    order: JSON.stringify(order),
                    prices: JSON.stringify(prices?.prices),
                },
            };
        } else {
            return {
                redirect: {
                    destination: "/admin/connected",
                    permanent: false,
                },
            };
        }
    } else {
        return {redirect: {destination: "/admin", permanent: false}};
    }
}
