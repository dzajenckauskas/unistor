import Image from "next/image";
import {useRouter} from "next/router";

export default function PaymentProcess({
    paymentConfirmed,
    paymentError,
    setPaymentProcess,
}) {
    const router = useRouter();
    const ratio = 2.5;

    if (paymentConfirmed) {
        return (
            <section className="paymentconfirmedglobalwrp">
                <div className="paymentconfirmedwrp">
                    <Image
                        width={84 * ratio}
                        height={150 * ratio}
                        alt="happy student left"
                        className="confirmstudentleft"
                        src={"/booking/Thankyou-left.svg"}
                    ></Image>

                    <div className="paymentyconfirmedcentersection">
                        <div className="pconfirmedcube"></div>
                        <div className="pconfirmedtitle">
                            <h2 className="titletop">Your booking</h2>
                            <h2 className="titlebottom">
                                is now complete !
                            </h2>

                            <p className="paymentconfirmsectionparagraph">
                                We are extremely happy that you have
                                trusted us to store your precious
                                belongings.<br></br> <br></br>
                                Confirmation email will follow
                                shortly!
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                document.body.style.overflow = "auto";
                                router.push({
                                    pathname: "/my_account",
                                    query: {page: "bookings"},
                                });
                            }}
                            className="backgtohomepagebtn"
                        >
                            go to your account
                        </button>
                    </div>
                    <Image
                        className="confirmstudentright"
                        width={89 * ratio}
                        height={150 * ratio}
                        alt="happy student right"
                        src={"/booking/Thankyou-right.svg"}
                    ></Image>
                </div>
            </section>
        );
    } else if (paymentError) {
        return (
            <section className="paymentconfirmedglobalwrp">
                <div className="paymenterrorwrp">
                    <div className="classname">
                        Something went wrong!
                    </div>
                    <button
                        onClick={() => {
                            document.body.style.overflow = "auto";
                            setPaymentProcess(false);
                        }}
                        className="backgtohomepagebtn"
                    >
                        back to payment
                    </button>
                </div>
            </section>
        );
    } else {
        return (
            <section className="paymentconfirmedglobalwrp">
                <div className="paymentprocesswrp">
                    <div className="classname">please wait...</div>
                    <div className="processingcube"></div>
                </div>
            </section>
        );
    }
}
