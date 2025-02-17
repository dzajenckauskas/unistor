import {
    Elements,
    CardNumberElement,
    useStripe,
    useElements,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import {fetchData} from "../../../HELPERS/fetchdata";
import {
    coverageprices,
    packingMaterialsDeliveryPrice,
    precollprice,
} from "../../../HELPERS/variousVariables";

let paymentInputs = [
    // {pos: "cardNumber", txt: "Card Number", type: "tel"},
    {pos: "nameOnTheCard", txt: "Name on the card"},
    // {pos: "cardExpirity", txt: "Card Expirity"},
    // {pos: "cardCvc", txt: "Card CVC"},
    {pos: "billingAddress", txt: "Billing Address"},
];

export default function StripeCardElement({
    state,
    dispatch,
    total,
    setPaymentProcess,
    setPaymentError,
    setPaymentConfirmed,
    items,
    setshowbookingpopup,
}) {
    const elements = useElements();
    const stripe = useStripe();
    const [focused, setfocused] = useState(false);
    const [cardnumber, setcardnumber] = useState(false);
    const [cardexpirity, setcardexpirity] = useState(false);
    const [cardcvc, setcardcvc] = useState(false);
    const [error, seterror] = useState("");

    async function submitForm(e) {
        e.preventDefault();

        if (!cardnumber) {
            setshowbookingpopup("Please enter Long card number");
        } else if (!cardexpirity) {
            setshowbookingpopup("Please enter Expirity date");
        } else if (!cardcvc) {
            setshowbookingpopup("Please enter CVC number");
        }

        if (cardnumber && cardcvc && cardexpirity) {
            if (!stripe || !elements) {
                return;
            }

            try {
                if (total !== 0) {
                    setPaymentProcess(true);
                    const amount = parseFloat(
                        Math.round(total * 100)
                    );

                    let {client_secret, email} = await fetchData(
                        "/api/stripe/paymentIntent",
                        {
                            amount,
                            currency: "gbp",
                        }
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
                                    receipt_email: email,
                                }
                            );

                        if (paymentIntent?.status !== "succeeded") {
                            setPaymentError(true);
                        } else {
                            let c = {...state};
                            c.prices = {
                                items,
                                coverageprices,
                                precollprice,
                                packingMaterialsDeliveryPrice,
                            };
                            await fetchData(
                                "/api/stripe/paymentConfirmed",
                                {
                                    paymentIntent,
                                    state: c,
                                }
                            );
                            setPaymentConfirmed(true);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
                setPaymentError(true);
            }
        } else {
            seterror(
                "Card details are missing or invalid, please try again"
            );
        }
    }

    function genRequiredInput(nr) {
        return (
            <input
                placeholder={paymentInputs[nr].txt}
                type={
                    paymentInputs[nr].type
                        ? paymentInputs[nr].type
                        : "text"
                }
                className="stage5-payment-input"
                key={nr}
                value={state.checkout[paymentInputs[nr].pos] || ""}
                onChange={(e) => {
                    dispatch({
                        t: paymentInputs[nr].pos,
                        v: e.target.value,
                        p: "checkout",
                    });
                }}
            />
        );
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
        <form
            id="stage-form"
            onSubmit={submitForm}
            className="stripe-card-element-form"
        >
            {genRequiredInput(0)}
            <CardNumberElement
                name={"cardNumber"}
                onChange={(e) => {
                    setcardnumber(e.complete);
                }}
                className={
                    focused === "cardNumber"
                        ? "card-element-focused"
                        : cardnumber
                        ? "card-element"
                        : "card-element-invalid"
                }
                options={cardElementOptions}
                onFocus={(e) => {
                    setfocused(e.elementType);
                }}
                onBlur={() => {
                    setfocused(false);
                }}
            />

            <div className="stage5formcvc">
                <CardExpiryElement
                    className={
                        focused === "cardExpiry"
                            ? "card-element-focused"
                            : cardexpirity
                            ? "card-element"
                            : "card-element-invalid"
                    }
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
                <CardCvcElement
                    className={
                        focused === "cardCvc"
                            ? "card-element-focused"
                            : cardcvc
                            ? "card-element"
                            : "card-element-invalid"
                    }
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
            </div>

            {genRequiredInput(1)}
            <p className="stripecardformerror">{error}</p>
        </form>
    );
}
