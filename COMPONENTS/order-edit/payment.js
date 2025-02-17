import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {useRouter} from "next/dist/client/router";
import Paymentform from "./payment-form";
import {calculateBoxesCount} from "./order-edit-helper-funtions";
import {returnDeliveryPerItem} from "../../HELPERS/variousVariables";

export default function Payment({
    showpayment,
    setshowpayment,
    payment,
    order,
    userID,
}) {
    let stripePromise;
    if (process.env.production) {
        stripePromise = loadStripe(process.env.stripePublicProd);
    } else {
        stripePromise = loadStripe(process.env.stripePublic);
    }
    const router = useRouter();

    function adjustmentsAdditions(params) {
        return (
            <div>
                <strong>
                    £
                    {parseFloat(
                        showpayment.total.cstordersprc
                    ).toFixed(2)}
                </strong>{" "}
                Adjustments and additions
            </div>
        );
    }

    function totalForMonths() {
        return (
            <div
                style={{
                    marginTop: "8px",
                    marginBottom: "4px",
                }}
            >
                <strong>
                    £
                    {(
                        parseFloat(
                            showpayment.total.storagepriceandmonths
                                .months
                        ) *
                        parseFloat(
                            showpayment.total.storagepriceandmonths
                                .price
                        )
                    ).toFixed(2)}
                </strong>{" "}
                For remaining{" "}
                {showpayment.total.storagepriceandmonths.months}{" "}
                months of storage
            </div>
        );
    }

    function bookingPay() {
        return (
            <div
                style={{
                    marginTop: "8px",
                    marginBottom: "32px",
                }}
            >
                <strong>
                    £
                    {(
                        parseFloat(order?.paymentIntent?.amount) / 100
                    ).toFixed(2)}
                </strong>{" "}
                First month{" "}
                <span
                    style={{color: "green", fontWeight: "bold"}}
                >{`(paid)`}</span>
            </div>
        );
    }

    function costForBoxes() {
        let bc = calculateBoxesCount(order);

        let bcprice = bc * parseFloat(returnDeliveryPerItem);

        return (
            <div
                style={{
                    marginTop: "8px",
                    marginBottom: "4px",
                }}
            >
                <strong>£{parseFloat(bcprice).toFixed(2)}</strong>{" "}
                Return cost for {bc} boxes / pieces (£
                {returnDeliveryPerItem} per box / piece)
            </div>
        );
    }
    function totalAmount() {
        return (
            <div
                style={{
                    marginTop: "32px",
                    marginBottom: "32px",
                }}
            >
                <p
                    style={{
                        marginBottom: "4px",
                    }}
                >
                    <strong>Total amount:</strong>
                </p>
                £{showpayment.total.total}
            </div>
        );
    }

    return (
        <div className="ordereditpaymentwrp">
            <div className="ordereditpaymentinsidewrp">
                <p
                    className="closepaymentwindow"
                    onClick={() => {
                        setshowpayment(false);
                    }}
                >
                    &#x2715;
                </p>

                <div className="ordereditinvoicestitlepayment">
                    <p style={{color: "#d80b65"}}>
                        {" "}
                        <strong>
                            {" "}
                            {showpayment.type === "finalPayment"
                                ? "Final payment"
                                : "One-off payment"}
                        </strong>
                        {showpayment.type ===
                        "finalPayment" ? null : (
                            <p className="additionaservicesubtitle">{`Charge one-off payment of the transaction`}</p>
                        )}
                    </p>
                    {router.pathname !== "/admin/order-edit"
                        ? bookingPay()
                        : null}
                    {router.pathname !== "/admin/order-edit" ? (
                        <p>
                            <strong>Outstanding costs:</strong>
                        </p>
                    ) : null}

                    {router.pathname !== "/admin/order-edit"
                        ? totalForMonths()
                        : null}
                    {router.pathname !== "/admin/order-edit"
                        ? costForBoxes()
                        : null}
                    {router.pathname !== "/admin/order-edit"
                        ? adjustmentsAdditions()
                        : null}
                    {router.pathname !== "/admin/order-edit"
                        ? totalAmount()
                        : null}
                </div>

                <Elements stripe={stripePromise}>
                    <Paymentform
                        userID={userID}
                        showpayment={showpayment}
                        payment={payment}
                    />
                </Elements>
            </div>
        </div>
    );
}
