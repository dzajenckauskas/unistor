import {getStoragePrice} from "../../order-edit/order-edit-helper-funtions";

export default function OrdersForDeliver({
    pickup,
    generateInventory,
    waitingPickup,

    mobile,
}) {
    const menu = [
        "Order ID",
        "Deliver date",
        "Inventory",
        "Monthly cost",
        "",
    ];

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
                        <strong> Delivering</strong>
                    </p>
                    <p>
                        <strong>Order Id</strong>
                    </p>
                    <p>{el.orderNr}</p>
                    <p>
                        <strong>Deliver date</strong>
                    </p>
                    <p>{el.deliverDate.date}</p>
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
                </section>
            );
        });
    }

    function notMobileFn() {
        return (
            <div>
                <p style={{marginBottom: "8px"}}>
                    <strong>
                        <span style={{color: "#d80b65"}}>
                            Status of your shipment:
                        </span>{" "}
                        delivering
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
                                {el?.deliverDate?.date || ""}
                            </li>
                            <ul className="myaccount_bookings_inventory_list">
                                {generateInventory(el.state.storage)}
                            </ul>
                            <li className="classname">
                                £{getStoragePrice(el)}
                            </li>
                            {waitingPickup(el)}
                        </ul>
                    );
                })}
            </div>
        );
    }

    if (mobile) {
        return mobileFn();
    } else {
        return notMobileFn();
    }
}
