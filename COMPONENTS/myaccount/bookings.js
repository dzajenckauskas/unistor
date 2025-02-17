import {PDFDownloadLink} from "@react-pdf/renderer";
import {useEffect, useState} from "react";
import {fetchData} from "../../HELPERS/fetchdata";
import {pdfForLabels} from "../../HELPERS/pdfforlabels";
import OrdersForDeliver from "./mybookings/deliver";

import OrdersForPickup from "./mybookings/pickup";
import StoredOrders from "./mybookings/stored";

export default function Bookings({mobile}) {
    const [pickup, setpickup] = useState([]);
    const [stored, setstored] = useState([]);
    const [deliver, setdeliver] = useState([]);
    const [showcalendar, setshowcalendar] = useState(false);
    const [time, settime] = useState(false);
    const [date, setdate] = useState(false);
    const [status, setstatus] = useState("");
    const [showpaymentcompleted, setshowpaymentcompleted] =
        useState(false);

    const [popup, setpopup] = useState(false);

    useEffect(() => {
        let pu = [];
        let st = [];
        let del = [];

        (async () => {
            let f = await fetchData("/api/myAccount/myBookings", {
                type: "getList",
            });
            if (f.orders) {
                let o = JSON.parse(f.orders);

                for (const el of o) {
                    switch (el.status) {
                        case "pickup":
                            {
                                pu.push(el);
                            }

                            break;

                        case "stored":
                            {
                                st.push(el);
                            }

                            break;

                        case "return":
                            {
                                del.push(el);
                            }
                            break;
                        default:
                            break;
                    }
                }

                setpickup(pu);
                setstored(st);
                setdeliver(del);
            }
        })();
    }, []);

    async function fetchToServer(ordernr) {
        let f = await fetchData("/api/myAccount/myBookings", {
            type: status,
            newDate: {pickUpDate: date, pickUpTime: time},
            ordernr,
        });

        if (f) {
            switch (status) {
                case "pickup":
                    {
                        let c = [...pickup];

                        for (const or of c) {
                            if (or.orderNr === ordernr) {
                                or.state.date = {
                                    pickUpDate: date,
                                    pickUpTime: time,
                                };

                                break;
                            }
                        }
                        setpopup("Collection date has been changed");
                        setpickup(c);
                    }
                    break;
                case "stored":
                    {
                        setstored(
                            stored.filter((el) => {
                                return el.orderNr !== ordernr;
                            })
                        );
                        setdeliver([...deliver, f.order]);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    function generateInventory(inv) {
        let boxes = [
            {name: "Small box", obj: "smallBox"},
            {name: "Medium  suitcase", obj: "mediumSuitcase"},
            {name: "Medium box", obj: "mediumBox"},
            {name: "Large  suitcase", obj: "largeSuitcase"},
            {name: "Large box", obj: "largeBox"},
            {name: "Bike", obj: "bike"},
            {name: "Guitar", obj: "guitar"},
            {name: "Keyboard", obj: "keyboard"},
            {name: "TV", obj: "tv"},
            {name: "Clothes rack", obj: "clothesRack"},
            {name: "Ironing board", obj: "ironingBoard"},
            {name: "Other small item", obj: "otherSmallItem"},
        ];

        let elmnts = [];

        Object.keys(inv).map((key, i) => {
            for (const box of boxes) {
                if (box.obj === key && inv[key]) {
                    elmnts.push(
                        <p
                            key={mobile ? key : key + i}
                            className="classname"
                        >
                            {inv[key]}x {box.name}{" "}
                        </p>
                    );
                    break;
                }
            }
        });

        return elmnts;
    }

    function waitingPickup(el) {
        function downloadInvoiceButton(order) {
            return (
                <PDFDownloadLink
                    className="myaccount_payments_downloadpdf_button"
                    style={{marginTop: "8px"}}
                    document={pdfForLabels(order)}
                    fileName="labels.pdf"
                >
                    {({blob, url, loading, error}) => "LABELS"}
                </PDFDownloadLink>
            );
        }

        let d1 = new Date(el.state.date.pickUpDate);
        let d2 = new Date(Date.now());
        let Difference_In_Time = d1.getTime() - d2.getTime();

        let did = Difference_In_Time / (1000 * 3600 * 24);

        if (el.status === "stored") {
            return (
                <div className="classname">
                    <button
                        onClick={() => {
                            setstatus(el.status);

                            settime("08.00 - 18.00");
                            setshowcalendar(
                                showcalendar === el.orderTime
                                    ? false
                                    : el.orderTime
                            );
                        }}
                        className="myaccount_payments_downloadpdf_button"
                    >
                        Order delivery
                    </button>
                    {downloadInvoiceButton(el)}
                </div>
            );
        }
        if (el.status === "pickup") {
            return (
                <div className="classname">
                    <button
                        onClick={() => {
                            setstatus(el.status);

                            settime("08.00 - 18.00");
                            setshowcalendar(
                                showcalendar === el.orderTime
                                    ? false
                                    : el.orderTime
                            );
                        }}
                        className="myaccount_payments_downloadpdf_button"
                    >
                        Change pickup date
                    </button>

                    {downloadInvoiceButton(el)}
                </div>
            );
        }

        if (el.status === "return") {
            return (
                <div className="classname">
                    <button className="myaccount_payments_downloadpdf_button_disabled">
                        delivering
                    </button>{" "}
                    {downloadInvoiceButton(el)}
                </div>
            );
        }
    }

    function paymentCompletedInfo() {
        return (
            <div className="paymentcompletedoutsidewrp">
                <div className="paymentcompletedinsidewrp">
                    <div
                        className="paymentcompletedclosebutton"
                        onClick={() => {
                            setshowpaymentcompleted(false);
                        }}
                    >
                        &#x2715;
                    </div>
                    <p
                        style={{
                            color: "#d80b65",
                            marginBottom: "32px",
                        }}
                    >
                        <strong>Payment completed</strong>
                    </p>

                    <p
                        style={{
                            lineHeight: 1.3,
                            marginBottom: "32px",
                        }}
                    >
                        Thank you for completing your final payment.
                        Your shipment is scheduled to be returned on{" "}
                        <br></br>
                        {showpaymentcompleted}
                    </p>

                    <p style={{marginBottom: "8px"}}>
                        if there any issues please get in touch via
                    </p>

                    <p style={{marginBottom: "4px"}}>
                        <strong>Email:</strong> hello@unistor.co.uk
                    </p>
                    <p>
                        <strong>Phone:</strong> 020 8064 1795
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section
            className="myaccountbookingsglobalsectiopn"
            style={mobile ? {marginTop: "16px"} : {}}
        >
            {popup ? (
                <div className="bookingspopupwrp">
                    <div className="bookingspopup">
                        <div
                            className="bookingpopupclosebtn"
                            onClick={() => {
                                setpopup(false);
                            }}
                        >
                            &#x2715;
                        </div>
                        <p className="bookingpopuptxt">
                            <strong>{popup}</strong>
                        </p>
                    </div>
                </div>
            ) : null}

            {showpaymentcompleted ? paymentCompletedInfo() : null}

            {pickup.length !== 0 ? (
                <OrdersForPickup
                    mobile={mobile}
                    date={date}
                    setdate={(el) => {
                        setdate(el);
                    }}
                    pickup={pickup}
                    generateInventory={generateInventory}
                    waitingPickup={waitingPickup}
                    showcalendar={showcalendar}
                    time={time}
                    fetchToServer={fetchToServer}
                    setshowcalendar={(el) => {
                        setshowcalendar(el);
                    }}
                />
            ) : null}

            {stored.length !== 0 ? (
                <StoredOrders
                    mobile={mobile}
                    date={date}
                    setdate={(el) => {
                        setdate(el);
                    }}
                    pickup={stored}
                    generateInventory={generateInventory}
                    waitingPickup={waitingPickup}
                    showcalendar={showcalendar}
                    //
                    time={time}
                    fetchToServer={fetchToServer}
                    setshowcalendar={(el) => {
                        setshowcalendar(el);
                    }}
                    paymentDone={(order) => {
                        setshowpaymentcompleted(
                            order.deliverDate.date
                        );
                        setstored(
                            stored.filter((el, i) => {
                                return (
                                    el.orderTime !== order.orderTime
                                );
                            })
                        );

                        setdeliver([...deliver, order]);
                    }}
                />
            ) : null}
            {deliver.length !== 0 ? (
                <OrdersForDeliver
                    fetchToServer={fetchToServer}
                    mobile={mobile}
                    date={date}
                    setdate={(el) => {
                        setdate(el);
                    }}
                    pickup={deliver}
                    generateInventory={generateInventory}
                    waitingPickup={waitingPickup}
                    showcalendar={showcalendar}
                    setshowcalendar={(el) => {
                        setshowcalendar(el);
                    }}
                />
            ) : null}
        </section>
    );
}
