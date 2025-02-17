import Calendar from "../../global_elements/calendar";

import {generateDate} from "../../../HELPERS/generateDate";
import {useEffect, useState} from "react";
import {fetchData} from "../../../HELPERS/fetchdata";
import {stage2Inputs} from "../../../HELPERS/variousVariables";
import Payment from "../../order-edit/payment";
import {
    calculatePaymentSections,
    getStoragePrice,
} from "../../order-edit/order-edit-helper-funtions";

export default function StoredOrders({
    pickup,
    generateInventory,
    waitingPickup,
    showcalendar,
    date,
    setdate,
    time,

    setshowcalendar,
    paymentDone,
    mobile,
    setshowpaymentcompleted,
}) {
    const menu = [
        "Order ID",
        "Storage from",
        "Inventory",
        "Monthly cost",
        "",
    ];
    const [items, setitems] = useState(false);

    const [sameaddress, setsameaddress] = useState(true);
    const [order, setorder] = useState(false);
    const [showaddrwrp, setshowarrdwrp] = useState(false);
    const [showpaymentpage, setshowpaymentpage] = useState(false);
    const [total, settotal] = useState(0);

    useEffect(() => {
        async function getItems() {
            let f = await fetchData("/api/getBoxesPrices");

            if (f) {
                setitems(f.prices);
            }
        }

        if (showcalendar && !items) {
            getItems();
        }
    }, [showcalendar]);

    useEffect(() => {
        if (showpaymentpage) {
            setshowarrdwrp(false);
        }
    }, [showpaymentpage]);

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
                            setshowarrdwrp(false);
                            setshowpaymentpage(false);
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
                    {!sameaddress ? (
                        <p className="myaccountorderaddresstxtnotsameaddr">
                            <strong>
                                {" "}
                                If return address is different please
                                email or call us so we can calculate
                                additional costs.
                            </strong>
                        </p>
                    ) : null}

                    {addressform()}
                    <button
                        onClick={() => {
                            let c = calculatePaymentSections(
                                order,
                                items
                            );
                            settotal(c);

                            setshowpaymentpage(true);
                        }}
                        className="bookdeliveryconfirm"
                    >
                        continue
                    </button>
                </div>
            </section>
        );
    }

    async function paymentCompleted(el) {
        if (el && el.status === "succeeded") {
            let c = {...order};
            {
                c.finalPayment = {
                    time: Date.now(),
                    payment: el,
                    paid: true,
                };
                fetchData;
                let fpo = await fetchData("api/user/finalPayment", {
                    order: c,
                });

                if (fpo) {
                    setorder(fpo.order);
                    paymentDone(fpo.order);
                    setshowarrdwrp(false);
                    setshowpaymentpage(false);
                }
            }
        }
    }

    function mobileFn(params) {
        return pickup.map((el, i) => {
            return (
                <section
                    key={i}
                    className="myaccountmybookingsmobile"
                >
                    <p>
                        <strong>Status</strong>
                    </p>
                    <p style={{color: "#d80b65"}}>
                        <strong> Stored</strong>
                    </p>
                    <p>
                        <strong>Order Id</strong>
                    </p>
                    <p>{el.orderNr}</p>
                    <p>
                        <strong>Storage from</strong>
                    </p>
                    <p>{el.state.date.pickUpDate}</p>
                    <p>
                        <strong>inventory</strong>
                    </p>
                    <div className="classname">
                        {" "}
                        {generateInventory(el.state.storage)}
                    </div>
                    <p>
                        <strong>Monthly cost</strong>
                    </p>
                    <p> £{getStoragePrice(el)}</p>
                    <p>
                        <strong>Action</strong>
                    </p>
                    {waitingPickup(el)}
                    {showcalendar === el.orderTime ? (
                        <div className="bookingscalendarwrappermobile">
                            <div className="bookingcalendarinsidewrpmobile">
                                <div
                                    className="bookingscalendarclosebutton"
                                    onClick={() => {
                                        setshowcalendar(false);
                                    }}
                                >
                                    &#x2715;
                                </div>

                                <Calendar
                                    dispatch={(t) => {
                                        if (t.v) {
                                            setdate(t.v);
                                        }
                                        if (el && t.v) {
                                            let c = {...el};

                                            if (
                                                c?.deliverDate?.date
                                            ) {
                                                c.deliverDate.date =
                                                    t.v;
                                            } else {
                                                c.deliverDate = {
                                                    date: t.v,
                                                };
                                            }

                                            setorder(c);
                                        }
                                    }}
                                    priordays={(() => {
                                        if (el.status === "pickup") {
                                            let md =
                                                el.state.materials
                                                    ?.packingMaterialsDelivery;
                                            let mp =
                                                el.state.materials
                                                    ?.packingMaterials;
                                            if (md && mp) {
                                                return generateDate(
                                                    md,
                                                    5
                                                );
                                            }

                                            if (!mp) {
                                                return generateDate(
                                                    Date.now(),
                                                    5
                                                );
                                            }
                                        }
                                        if (el.status === "stored") {
                                            return generateDate(
                                                new Date(Date.now()),
                                                5
                                            );
                                        }
                                    })()}
                                />

                                {date ? (
                                    <p className="bookdeliveryp">
                                        {date},&nbsp;{time}
                                    </p>
                                ) : null}
                                {date ? (
                                    <button
                                        onClick={() => {
                                            setshowcalendar(false);
                                            setshowarrdwrp(true);
                                            window.scrollTo(0, 0);
                                        }}
                                        className="bookdeliveryconfirm"
                                    >
                                        continue
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                    {showaddrwrp ? showAddressWrapper() : null}
                    {showpaymentpage ? (
                        <Payment
                            showpayment={{
                                type: "finalPayment",
                                total,
                            }}
                            payment={(p) => {
                                paymentCompleted(p);
                            }}
                            setshowpayment={() => {
                                setshowpaymentpage(false);
                            }}
                            order={order}
                        />
                    ) : null}

                    {el.state.materials.packingMaterials &&
                    el.status === "pickup" ? (
                        <li className="packingmatsliner">
                            {`  Packing materials delivery: ${el.state.materials.packingMaterialsDelivery}`}
                        </li>
                    ) : null}
                </section>
            );
        });
    }

    function notMobile(params) {
        return (
            <div>
                <p style={{marginBottom: "8px"}}>
                    <strong>
                        <span style={{color: "#d80b65"}}>
                            Status of your shipment:
                        </span>{" "}
                        stored
                    </strong>
                </p>
                <div className="myaccount_topwrp_bookings">
                    {menu.map((el, i) => {
                        return (
                            <div
                                className="myaccount_menutitles"
                                key={i}
                            >
                                {el}
                            </div>
                        );
                    })}
                </div>

                {pickup.map((el, i) => {
                    return (
                        <ul
                            key={i}
                            className="myaccount_listwrapper_bookings"
                        >
                            <li className="classname">
                                {el.orderNr}
                            </li>
                            <li className="classname">
                                {el.state.date.pickUpDate}
                            </li>
                            <ul className="myaccount_bookings_inventory_list">
                                {generateInventory(el.state.storage)}
                            </ul>
                            <li className="classname">
                                &#163;{getStoragePrice(el)}
                            </li>
                            {waitingPickup(el)}

                            {showcalendar === el.orderTime ? (
                                <div className="bookingscalendarwrapper">
                                    <Calendar
                                        dispatch={(t) => {
                                            if (t.v) {
                                                setdate(t.v);
                                            }
                                            if (el && t.v) {
                                                let c = {...el};

                                                if (
                                                    c?.deliverDate
                                                        ?.date
                                                ) {
                                                    c.deliverDate.date =
                                                        t.v;
                                                } else {
                                                    c.deliverDate = {
                                                        date: t.v,
                                                    };
                                                }

                                                setorder(c);
                                            }
                                        }}
                                        priordays={(() => {
                                            if (
                                                el.status === "pickup"
                                            ) {
                                                let md =
                                                    el.state.materials
                                                        ?.packingMaterialsDelivery;
                                                let mp =
                                                    el.state.materials
                                                        ?.packingMaterials;
                                                if (md && mp) {
                                                    return generateDate(
                                                        md,
                                                        5
                                                    );
                                                }

                                                if (!mp) {
                                                    return generateDate(
                                                        Date.now(),
                                                        5
                                                    );
                                                }
                                            }
                                            if (
                                                el.status === "stored"
                                            ) {
                                                return generateDate(
                                                    new Date(
                                                        Date.now()
                                                    ),
                                                    5
                                                );
                                            }
                                        })()}
                                    />

                                    {date ? (
                                        <p className="bookdeliveryp">
                                            {date},&nbsp;{time}
                                        </p>
                                    ) : null}
                                    {date ? (
                                        <button
                                            onClick={() => {
                                                setshowcalendar(
                                                    false
                                                );
                                                setshowarrdwrp(true);
                                                window.scrollTo(0, 0);
                                            }}
                                            className="bookdeliveryconfirm"
                                        >
                                            continue
                                        </button>
                                    ) : null}
                                </div>
                            ) : null}
                            {showaddrwrp
                                ? showAddressWrapper()
                                : null}
                            {showpaymentpage ? (
                                <Payment
                                    showpayment={{
                                        type: "finalPayment",
                                        total,
                                    }}
                                    payment={(p) => {
                                        paymentCompleted(p);
                                    }}
                                    setshowpayment={() => {
                                        setshowpaymentpage(false);
                                    }}
                                    order={order}
                                />
                            ) : null}

                            {el.state.materials.packingMaterials &&
                            el.status === "pickup" ? (
                                <li className="packingmatsliner">
                                    {`  Packing materials delivery: ${el.state.materials.packingMaterialsDelivery}`}
                                </li>
                            ) : null}
                        </ul>
                    );
                })}
            </div>
        );
    }

    if (mobile) {
        return mobileFn();
    } else {
        return notMobile();
    }
}
