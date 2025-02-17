import {
    CardNumberElement,
    useStripe,
    useElements,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {fetchData} from "../../HELPERS/fetchdata";

export default function Paymentform({showpayment, payment, userID}) {
    const router = useRouter();
    const [error, seterror] = useState("");
    const [focused, setfocused] = useState(false);
    const [cardnumber, setcardnumber] = useState(false);
    const [cardexpirity, setcardexpirity] = useState(false);
    const [cardcvc, setcardcvc] = useState(false);
    const [pymentprocess, setpaymentprocess] = useState(false);
    const [paymentconfirmed, setpaymentconfirmed] = useState(false);
    const elements = useElements();
    const stripe = useStripe();
    const [custompaymentamount, setcustompaymentamount] =
        useState("");
    const [custompaymentdescription, setcustompaymentdescription] =
        useState("");
    const [custompaymentquantity, setcustompaymentquantity] =
        useState(1);

    async function submitForm(e) {
        e.preventDefault();
        if (cardnumber && cardcvc && cardexpirity) {
            if (!stripe || !elements) {
                return;
            }

            try {
                setpaymentprocess(true);
                let amount;

                switch (showpayment.type) {
                    case "finalPayment":
                        {
                            amount = parseFloat(
                                showpayment.total.total ||
                                    showpayment.total
                            );
                        }
                        break;
                    case "customPayment":
                        {
                            amount =
                                parseFloat(custompaymentamount) *
                                parseFloat(custompaymentquantity);
                        }
                        break;

                    default:
                        break;
                }

                amount = Math.round(amount * 100);

                let {client_secret} = await fetchData(
                    "/api/stripe/paymentIntent",
                    {order: {amount, currency: "gbp"}, userID}
                );

                if (!client_secret) {
                    setPaymentError(true);
                } else {
                    const {paymentIntent} =
                        await stripe.confirmCardPayment(
                            client_secret,
                            {
                                payment_method: {
                                    card: elements.getElement(
                                        CardNumberElement
                                    ),
                                },
                            }
                        );

                    if (paymentIntent.status !== "succeeded") {
                        setPaymentError(true);
                    } else {
                        if (router.pathname !== "/my_account") {
                            setpaymentconfirmed(true);
                        }

                        paymentIntent.type = showpayment.type;
                        paymentIntent.description =
                            custompaymentdescription;
                        paymentIntent.quantity =
                            custompaymentquantity;
                        paymentIntent.price = custompaymentamount;
                        payment(paymentIntent);
                    }
                }
            } catch (error) {
                console.log(error);
                seterror(true);
            }
        } else {
            seterror(
                "Card details are missing or invalid, please try again"
            );
        }
    }

    const cardElementOptions = {
        style: {
            base: {
                color: "#000",
                fontSize: "16px",
            },
            invalid: {
                color: "#fa755a",
                fontSize: "16px",
            },
        },
    };

    return (
        <div className="classname">
            {paymentconfirmed ? (
                <div className="paymentprocesswrpcustomorder">
                    <div className="classname">Order successful.</div>
                </div>
            ) : (
                <form
                    id="stage-form"
                    onSubmit={submitForm}
                    className="stripe-card-element-form-admin"
                >
                    <div className="stripecardelementformadmintopwrp">
                        <label>
                            Amount:
                            <input
                                disabled={
                                    showpayment.type ===
                                    "finalPayment"
                                        ? true
                                        : false
                                }
                                value={
                                    showpayment.type ===
                                    "finalPayment"
                                        ? `£${
                                              showpayment.total
                                                  .total ||
                                              showpayment.total
                                          }`
                                        : custompaymentamount || ""
                                }
                                type="text"
                                className="custompaymentinputs custompaymentamountinput"
                                onChange={(e) => {
                                    setcustompaymentamount(
                                        e.target.value
                                    );
                                }}
                            />
                        </label>

                        <label>
                            {showpayment.type === "customPayment" ? (
                                <label>
                                    Short description of the
                                    transaction:
                                    <input
                                        value={
                                            custompaymentdescription ||
                                            ""
                                        }
                                        type="text"
                                        className="custompaymentfirstinput custompaymentinputs"
                                        onChange={(e) => {
                                            setcustompaymentdescription(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </label>
                            ) : null}
                        </label>
                    </div>
                    <div className="stripecardelementformadminbottom">
                        <label>
                            Card number:
                            <CardNumberElement
                                name={"cardNumber"}
                                onChange={(e) => {
                                    setcardnumber(e.complete);
                                }}
                                className={
                                    focused === "cardNumber"
                                        ? " carelementfocusedadmin"
                                        : cardnumber
                                        ? " cardelementadmin"
                                        : " carselementinvalidadmin"
                                }
                                options={cardElementOptions}
                                onFocus={(e) => {
                                    setfocused(e.elementType);
                                }}
                                onBlur={() => {
                                    setfocused(false);
                                }}
                            />
                        </label>
                        <label>
                            Expirity date:
                            <CardExpiryElement
                                name={"cardExpiry"}
                                className={
                                    focused === "cardExpiry"
                                        ? "carelementfocusedadmin"
                                        : cardexpirity
                                        ? " cardelementadmin"
                                        : " carselementinvalidadmin"
                                }
                                id="cardexpirityelement"
                                options={cardElementOptions}
                                onFocus={(e) => {
                                    setfocused(e.elementType);
                                }}
                                onBlur={() => {
                                    setfocused(false);
                                }}
                                onChange={(e) => {
                                    setcardexpirity(e.complete);
                                }}
                            />
                        </label>

                        <label>
                            CVC:
                            <CardCvcElement
                                name={"cardCvc"}
                                className={
                                    focused === "cardCvc"
                                        ? " carelementfocusedadmin"
                                        : cardcvc
                                        ? "  cardelementadmin"
                                        : " carselementinvalidadmin"
                                }
                                id="cardcvcelement"
                                options={cardElementOptions}
                                onFocus={(e) => {
                                    setfocused(e.elementType);
                                }}
                                onBlur={() => {
                                    setfocused(false);
                                }}
                                onChange={(e) => {
                                    setcardcvc(e.complete);
                                }}
                            />
                        </label>
                    </div>

                    <p className="stripecardformerroradmin">
                        {error}
                    </p>

                    {pymentprocess ? (
                        <div className="paymentprocesswrpcustomorder">
                            <div className="classname">
                                please wait...
                            </div>
                            <div className="processingcube"></div>
                        </div>
                    ) : (
                        <button
                            className="stripeformpaybutton"
                            type="submit"
                        >
                            PROCEED WITH PAYMENT
                        </button>
                    )}
                </form>
            )}
        </div>
    );
}
