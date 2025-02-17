import Calendar from "../../global_elements/calendar";

import {generateDate} from "../../../HELPERS/generateDate";
import {getStoragePrice} from "../../order-edit/order-edit-helper-funtions";

export default function OrdersForPickup({
    pickup,
    generateInventory,
    waitingPickup,
    showcalendar,
    date,
    setdate,
    time,
    fetchToServer,
    setshowcalendar,
    mobile,
}) {
    const menu = [
        "Order ID",
        "Pick up date",
        "Inventory",
        "Monthly cost",
        "",
    ];

    function notMobile() {
        return (
            <div>
                <p style={{marginBottom: "8px"}}>
                    <strong>
                        <span style={{color: "#d80b65"}}>
                            Status of your shipment:
                        </span>{" "}
                        Waiting for pickup
                    </strong>
                </p>

                <div className="myaccount_topwrp_bookings">
                    {menu.map((el, i) => {
                        return (
                            <div
                                className="myaccount_menutitles"
                                key={i + "menu"}
                            >
                                {el}
                            </div>
                        );
                    })}
                </div>

                {pickup.map((el, i) => {
                    return (
                        <ul
                            key={i + "pck"}
                            className="myaccount_listwrapper_bookings"
                        >
                            <li className="classname">
                                {el.orderNr}
                            </li>
                            <li className="classname">
                                {el?.state?.corrections?.pickUpDate ||
                                    el?.state?.date?.pickUpDate ||
                                    ""}
                            </li>
                            <ul className="myaccount_bookings_inventory_list">
                                {generateInventory(el.state.storage)}
                            </ul>
                            <li className="classname">
                                £{getStoragePrice(el)}
                            </li>
                            {waitingPickup(el)}
                            {showcalendar === el.orderTime ? (
                                <div className="bookingscalendarwrapper">
                                    <Calendar
                                        dispatch={(t) => {
                                            setdate(t.v);
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
                                                fetchToServer(
                                                    el.orderNr
                                                );
                                                setshowcalendar(
                                                    false
                                                );
                                                window.scrollTo(0, 0);
                                            }}
                                            className="bookdeliveryconfirm"
                                        >
                                            confirm
                                        </button>
                                    ) : null}
                                </div>
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

    if (!mobile) {
        return notMobile();
    } else {
        return pickup.map((el, i) => {
            return (
                <section
                    className="myaccountmybookingsmobile"
                    key={i + "npck"}
                >
                    {" "}
                    <p>
                        <strong>Status</strong>
                    </p>
                    <p style={{color: "#d80b65"}}>
                        <strong> Waiting for pickup</strong>
                    </p>
                    <p>
                        <strong>Order Id</strong>
                    </p>
                    <p>{el.orderNr}</p>
                    <p>
                        <strong>Pickup date</strong>
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
                                        setdate(t.v);
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
                                            fetchToServer(el.orderNr);
                                            setshowcalendar(false);
                                            window.scrollTo(0, 0);
                                        }}
                                        className="bookdeliveryconfirm"
                                    >
                                        confirm
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                    {el.state.materials.packingMaterials &&
                    el.status === "pickup" ? (
                        <p className="packingmatsliner">
                            {`  Packing materials delivery: ${el.state.materials.packingMaterialsDelivery}`}
                        </p>
                    ) : null}
                </section>
            );
        });
    }
}
