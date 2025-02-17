import {useEffect, useState} from "react";
import Link from "next/link";
import {
    coverageprices,
    packingMaterialsDeliveryPrice,
    postcodeDistancePrice,
} from "../../HELPERS/variousVariables";
import {calculateStoragePrice} from "../order-edit/order-edit-helper-funtions";

export default function RightPage({
    state,
    items,
    pagenr,
    sethistorypage,
    setbookingpagenr,
    screenwidth,
    totalToPay,
    dispatch,
    setshowpopup,
}) {
    const [showcharges, setshowcharges] = useState(false);
    const [storageprice, setstorageprice] = useState(0);
    const [total, settotal] = useState(0);
    const [storageItems, setstorageitems] = useState(0);
    const [showsorageitems, setshowstorageitems] = useState(false);
    const [showpackmats, setshowpackmats] = useState(false);
    const [packingCount, setpackingCount] = useState(0);
    const [packingprice, setpackingprice] = useState(0);
    const [showfulltotal, setshowfulltotal] = useState(false);
    const [coveragePrice, setCoveragePrice] = useState(0);
    const [coveragepriceline, setcoveragepriceline] = useState("");
    const [packingmatsdeliveryprice, setpackingmatdeliveryprice] =
        useState(packingMaterialsDeliveryPrice);
    const [pricebeforereferral, setpricebeforereferral] = useState(0);

    let doorstepPrice = 25;
    useEffect(() => {
        let total = storageprice + packingprice;

        if (state.checkout.premiumCollection?.includes("doorstep")) {
            total = total + doorstepPrice;
        }

        if (
            state?.date?.pickUpTime &&
            state?.date?.pickUpTime !== "08.00 - 18.00"
        ) {
            total = total + 25;
        }

        if (state?.materials?.packingMaterials) {
            total = total + parseFloat(packingmatsdeliveryprice);
        }

        if (state?.date?.pickUpDate) {
            let day = new Date(state.date.pickUpDate).getDay();

            if (day === 6 || day === 0) {
                total = total + 25;
            }
        }

        if (state.address.postcodeDistance > 50) {
            total = total + parseFloat(postcodeDistancePrice);
        }
        settotal(total);
        totalToPay(total);
    }, [
        storageprice,
        packingprice,
        state.checkout.premiumCollection,
        state.date.pickUpTime,
        state.date.pickUpDate,
        state.materials.packingMaterials,
        state.address.postcodeDistance,
    ]);

    function generateStorage() {
        function itemsRender() {
            return items.storage.map((item, i) => {
                if (state.storage[item.pos]) {
                    return (
                        <div className=" brp-total-twoliner " key={i}>
                            <div className="brp-total-twoliner-insidewrp">
                                <div className="booking-right-itemname">
                                    {state.storage[item.pos]} x{" "}
                                    {item.name}
                                </div>
                                <div className="booking-right-price">
                                    {" "}
                                    &#163;
                                    {(
                                        state.storage[item.pos] *
                                        parseFloat(item.price)
                                    ).toFixed(2)}
                                </div>
                            </div>

                            <div className="booking-right-perunit">
                                {" "}
                                &#163;
                                {parseFloat(item.price).toFixed(
                                    2
                                )}{" "}
                                per {item.totalName}
                            </div>
                        </div>
                    );
                }
            });
        }

        if (pagenr < 2) {
            return (
                <div className="total-storage-items-only">
                    {itemsRender()}
                </div>
            );
        } else {
            return (
                <div className="brp-total-storage-expander">
                    <div
                        className="total-storage-expander-top"
                        onClick={() => {
                            setshowstorageitems(
                                showsorageitems ? false : true
                            );
                        }}
                    >
                        <div className="total-storage-arrow"></div>
                        &nbsp;
                        <div className="classname">
                            {storageItems}
                        </div>{" "}
                        <div className="classname">items</div>
                        <div className="storage-arrow-total-price">
                            &#163;{storageprice.toFixed(2)}
                        </div>
                    </div>

                    {showsorageitems ? (
                        <div className="total-storage-items-only">
                            {itemsRender()}
                        </div>
                    ) : null}
                </div>
            );
        }
    }
    function generateMats() {
        function itemsRender() {
            return items.packingMaterials.map((item, i) => {
                if (state.materials[item.pos]) {
                    return (
                        <div className=" brp-total-twoliner " key={i}>
                            <div className="brp-total-twoliner-insidewrp">
                                <div className="booking-right-itemname">
                                    {state.materials[item.pos]} x{" "}
                                    {item.name}
                                </div>
                                <div className="booking-right-price">
                                    {" "}
                                    &#163;
                                    {(
                                        state.materials[item.pos] *
                                        parseFloat(item.price)
                                    ).toFixed(2)}
                                </div>
                            </div>

                            <div className="booking-right-perunit">
                                {" "}
                                &#163;
                                {parseFloat(item.price).toFixed(
                                    2
                                )}{" "}
                                per {item.totalName}
                            </div>
                        </div>
                    );
                }
            });
        }

        if (pagenr === 3) {
            return (
                <div className="total-storage-items-only">
                    {itemsRender()}
                </div>
            );
        } else {
            return (
                <div className="brp-total-storage-expander">
                    <div
                        className="total-storage-expander-top"
                        onClick={() => {
                            setshowpackmats(
                                showpackmats ? false : true
                            );
                        }}
                    >
                        <div className="total-storage-arrow"></div>
                        &nbsp;
                        <div className="classname">
                            {packingCount}
                        </div>{" "}
                        <div className="classname">items</div>
                        <div className="storage-arrow-total-price">
                            &#163;{packingprice.toFixed(2)}
                        </div>
                    </div>

                    {showpackmats ? (
                        <div className="total-storage-items-only">
                            {itemsRender()}
                        </div>
                    ) : null}
                </div>
            );
        }
    }

    function storagePerMonth(params) {
        return (
            <div className="storage-per-month-wrp">
                <div className="brp-total-twoliner-insidewrp-title2wrp">
                    <h4 className="bookings-t-tal-title2">
                        {" "}
                        Storage per month
                    </h4>
                    {pagenr === 1 ? (
                        <div
                            className="bookings-total-remove"
                            onClick={() => {}}
                        >
                            {" "}
                        </div>
                    ) : (
                        <div
                            className="bookings-total-remove"
                            onClick={() => {
                                sethistorypage(pagenr);
                                setbookingpagenr(1);
                            }}
                        >
                            {" "}
                            Edit
                        </div>
                    )}
                </div>
                <div className="booking-right-total-wrp">
                    {" "}
                    {generateStorage()}
                </div>
            </div>
        );
    }
    function packingMats(params) {
        return (
            <div className="storage-materials-wrp">
                <div className="brp-total-twoliner-insidewrp-title2wrp">
                    <h4 className="bookings-t-tal-title2">
                        {" "}
                        Packing materials
                    </h4>
                    {pagenr === 3 ? (
                        <div
                            className="bookings-total-remove"
                            onClick={() => {}}
                        >
                            {" "}
                        </div>
                    ) : (
                        <div
                            className="bookings-total-remove"
                            onClick={() => {
                                sethistorypage(4);
                                setbookingpagenr(3);
                            }}
                        >
                            {" "}
                            Edit
                        </div>
                    )}
                </div>
                <div className="booking-right-total-wrp">
                    {" "}
                    {generateMats()}
                </div>
            </div>
        );
    }
    function collectionAddress(params) {
        function generateAddress(params) {
            let arr = [
                "buildingnrname",
                "addressLine1",
                "addressLine2",
                "town",
                "postcode",
            ];
            let txt = [];
            for (const el of arr) {
                if (state.address[el]) {
                    txt.push(state.address[el]);
                }
            }
            return (
                <span className="booking-right-adress">
                    {txt.join(", ")}
                </span>
            );
        }

        if (
            state.address.buildingnrname ||
            state.address.town ||
            state.address.addressLine1 ||
            state.address.postcode
        ) {
            return (
                <div className="storage-materials-wrp">
                    <div className="brp-total-twoliner-insidewrp-title2wrp">
                        <h4 className="bookings-t-tal-title2">
                            {" "}
                            Collection address
                        </h4>
                        {pagenr === 2 ? (
                            <div
                                className="bookings-total-remove"
                                onClick={() => {}}
                            >
                                {" "}
                            </div>
                        ) : (
                            <div
                                className="bookings-total-remove"
                                onClick={() => {
                                    sethistorypage(pagenr);
                                    setbookingpagenr(2);
                                }}
                            >
                                {" "}
                                Edit
                            </div>
                        )}
                    </div>

                    <p className="collectiondaterpprice">
                        <span>{generateAddress()}</span>
                        {state.address.postcodeDistance &&
                        state.address.postcodeDistance > 50 ? (
                            <span className="storage-arrow-total-price">
                                £{postcodeDistancePrice}
                            </span>
                        ) : null}
                    </p>
                </div>
            );
        } else {
            return null;
        }
    }

    useEffect(() => {
        let packingMaterialsCount = 0;
        let packingMaterialsPrice = 0;

        for (const item of items.packingMaterials) {
            if (state.materials[item.pos]) {
                packingMaterialsCount =
                    packingMaterialsCount + state.materials[item.pos];

                packingMaterialsPrice =
                    state.materials[item.pos] *
                        parseFloat(item.price) +
                    packingMaterialsPrice;
            }
        }

        setpackingCount(packingMaterialsCount);
        setpackingprice(packingMaterialsPrice);
        let calc = calculateStoragePrice(items, state);
        setstorageitems(calc.totalStorageItems);
        setstorageprice(
            calc.storagePrice + parseFloat(calc.coverageprice)
        );
        setcoveragepriceline(
            `£${calc.coverageprice ? calc.coverageprice : "FREE"}`
        );
        setpricebeforereferral(calc.pricebeforereferral);
    }, [state, coveragePrice]);

    function packingMatsDelivery() {
        return (
            <div className="storage-materials-wrp">
                <div className="brp-total-twoliner-insidewrp-title2wrp">
                    <h4 className="bookings-t-tal-title2">
                        {" "}
                        Packing materials delivery
                    </h4>
                    {pagenr === 3 ? (
                        <div className="bookings-total-remove"></div>
                    ) : (
                        <div
                            className="bookings-total-remove"
                            onClick={() => {
                                sethistorypage(4);
                                setbookingpagenr(3);
                            }}
                        >
                            {" "}
                            Edit
                        </div>
                    )}
                </div>

                <p className="collectiondaterpprice">
                    <span>
                        {state.materials.packingMaterialsDelivery}
                        ,&nbsp;
                        {"08.00 - 18.00"}
                    </span>

                    <span className="collectiondaterightpricespan">
                        £{packingmatsdeliveryprice}
                    </span>
                </p>
            </div>
        );
    }
    function collectionDate() {
        let d = state?.date?.pickUpDate?.trim();

        let time = state?.date?.pickUpTime;

        let day = new Date(d).getDay();

        return (
            <div className="storage-materials-wrp">
                {d ? (
                    <div className="brp-total-twoliner-insidewrp-title2wrp">
                        <h4 className="bookings-t-tal-title2">
                            {" "}
                            Collection date
                        </h4>
                        {pagenr === 4 ? (
                            <div className="bookings-total-remove"></div>
                        ) : (
                            <div
                                className="bookings-total-remove"
                                onClick={() => {
                                    sethistorypage(pagenr);
                                    setbookingpagenr(4);
                                }}
                            >
                                {" "}
                                Edit
                            </div>
                        )}
                    </div>
                ) : null}

                {d ? (
                    <p className="collectiondaterpprice">
                        <span>
                            {" "}
                            {d},&nbsp; &nbsp; {time}{" "}
                        </span>

                        <span className="collectiondaterightpricespan">
                            {time === "08.00 - 18.00"
                                ? "FREE"
                                : "£25.00"}
                        </span>
                    </p>
                ) : (
                    <p></p>
                )}

                {day === 0 || day === 6 ? (
                    <p className="weekendcollectioncharge">
                        <span>Weekend collection charge</span>

                        <span className="collectiondaterightpricespan">
                            {"£25.00"}
                        </span>
                    </p>
                ) : null}

                <div> {collectFrom()}</div>
            </div>
        );
    }
    function collectFrom() {
        let collection = () => {
            if (
                state.checkout.premiumCollection?.includes("doorstep")
            ) {
                return ["Your doorstep", `£${doorstepPrice}`];
            }
            if (
                state.checkout.premiumCollection?.includes("ground")
            ) {
                return ["Your ground floor", "FREE"];
            }
        };

        return (
            <div className="storage-materials-wrp">
                <br />
                {state.checkout.premiumCollection ? (
                    <div className="right-page-collection-liner">
                        <p>{collection()[0]}</p>{" "}
                        <div>{collection()[1]}</div>{" "}
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        );
    }

    function levelOfCoverage() {
        return (
            <div className="storage-materials-wrp">
                {state.checkout.coverageLevel ? (
                    <div className="brp-total-twoliner-insidewrp-title2wrp">
                        <h4 className="bookings-t-tal-title2">
                            {" "}
                            Level of coverage
                        </h4>
                        {pagenr === 5 ? (
                            <div
                                className="bookings-total-remove"
                                onClick={() => {}}
                            >
                                {" "}
                            </div>
                        ) : (
                            <div
                                className="bookings-total-remove"
                                onClick={() => {
                                    sethistorypage(pagenr);
                                    setbookingpagenr(5);
                                }}
                            >
                                {" "}
                                Edit
                            </div>
                        )}
                    </div>
                ) : null}

                <div className="rightpagecoveragepricewrp">
                    <div className="classname">
                        {state.checkout.coverageLevel}
                    </div>
                    <div className="collectiondaterightpricespan">
                        {state?.checkout?.coverageLevel
                            ? coveragepriceline
                            : ""}
                    </div>
                </div>
            </div>
        );
    }
    function referralCode() {
        return (
            <div className="storage-materials-wrp">
                <div className="rightpagecoveragepricewrp">
                    <p className="rightpagediscounttxt">
                        {`-${state.referralCode.discount}% discount applied`}

                        <span style={{fontWeight: "400"}}>
                            {" "}
                            {`saving £${pricebeforereferral.toFixed(
                                2
                            )} every month`}
                        </span>
                    </p>
                </div>
            </div>
        );
    }

    function fullinfo(params) {
        return (
            <section className="booking-right-page">
                <button
                    className="closerightpagetotal"
                    onClick={(params) => {
                        setshowfulltotal(false);
                    }}
                >
                    &#x2715;
                </button>

                <h4 className="boookingrp-h4">
                    {" "}
                    Due now - upfront payment{" "}
                </h4>

                <div className="brp-total-wrp">
                    <div className="booking-right-middle">
                        {storageItems ? storagePerMonth() : null}
                        {collectionAddress()}
                        {packingCount &&
                        state.materials?.packingMaterials
                            ? packingMats()
                            : null}

                        {state.materials.packingMaterials &&
                        state.materials.packingMaterialsDelivery
                            ? packingMatsDelivery()
                            : null}
                        {collectionDate()}
                        {levelOfCoverage()}
                        {state.referralCode.code
                            ? referralCode()
                            : null}
                    </div>

                    <div className="booking-right-subtotal-wrp-today">
                        <div className="booking-right-subtotal">
                            Total due today
                        </div>
                        <div className="classname">
                            {state.referralCode.code ? (
                                <div className="rightpagepricebeforereferral">
                                    &#163;
                                    {(
                                        parseFloat(
                                            pricebeforereferral
                                        ) + total
                                    ).toFixed(2)}
                                </div>
                            ) : null}
                            &#163;{total.toFixed(2)}
                        </div>
                    </div>

                    <div className="booking-right-returncharges-wrp">
                        <div
                            className="returncharges-topwrp"
                            onClick={() => {
                                setshowcharges(
                                    showcharges ? false : true
                                );
                            }}
                        >
                            {" "}
                            <div>Return charges apply</div>
                            <div className="returncharges-arrowdown"></div>
                        </div>

                        <div
                            className={
                                showcharges
                                    ? "returncharges-chargeswrp"
                                    : "returncharges-chargeswrp-hidden"
                            }
                        >
                            <p className="booking-right-fees">
                                Delivery fees are charged when you
                                order your stuff back,{" "}
                                <span
                                    className="booking-right-findout-more"
                                    onClick={() => {
                                        setshowpopup(true);
                                    }}
                                >
                                    find out more here
                                </span>
                                .
                            </p>

                            <p className="return-charges-redbox">
                                FREE to cancel or amend your order if
                                you let us know before 11am two
                                working days prior to your collection
                                or delivery.{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (screenwidth > 1150) {
        return fullinfo();
    } else {
        if (showfulltotal) {
            return fullinfo();
        } else {
            return (
                <div
                    className="rightpagetotalbutton"
                    onClick={() => {
                        setshowfulltotal(true);
                    }}
                >
                    £{total.toFixed(2)}{" "}
                    <div className="righttpagetotalbuttonquestionmark">
                        ?
                    </div>
                </div>
            );
        }
    }
}
