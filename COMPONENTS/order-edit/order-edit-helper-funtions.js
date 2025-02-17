import {
    coverageprices,
    coverageTxt,
    packingMaterialsDeliveryPrice,
    postcodeDistancePrice,
    precollprice,
    precolltxt,
    returnDeliveryPerItem,
    times,
    weekendCollectionPrice,
} from "../../HELPERS/variousVariables";

export function calcmatsprice(items, order) {
    let packingMaterialsPrice = 0;

    for (const item of items.packingMaterials) {
        if (order.state?.materials?.[item.pos]) {
            packingMaterialsPrice =
                order.state.materials[item.pos] *
                    parseFloat(item.price) +
                packingMaterialsPrice;
        }
    }

    let price =
        packingMaterialsPrice +
        parseFloat(packingMaterialsDeliveryPrice);

    return packingMaterialsPrice ? price.toFixed(2) : 0;
}

export function calcboxesprice(items, order) {
    let price = 0;

    for (const item of items.storage) {
        if (order.state?.storage?.[item.pos]) {
            price =
                order.state.storage[item.pos] *
                    parseFloat(item.price) +
                price;
        }
    }

    if (order?.state?.customItems) {
        for (const item of order.state.customItems) {
            price =
                price +
                parseFloat(item.quantity) * parseFloat(item.price);
        }
    }
    if (order?.state?.referralCode?.code) {
        let place = order?.state?.referralCode;
        let d = (price * parseFloat(place.discount)) / 100;

        price = price - d;
    }

    return price ? price.toFixed(2) : 0;
}

export function monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    if (d2.getDate() >= d1.getDate()) months++;

    return months <= 0 ? 0 : months;
}

function getPackageAtCollectionPrice(order, items) {
    let price = 0;

    let premiumCollection =
        order?.state?.corrections?.premiumCollection ||
        order.state.checkout.premiumCollection;
    if (premiumCollection === precolltxt[1]) {
        price = price + precollprice[1];
    }

    let pickuptime =
        order?.state?.corrections?.pickUpTime ||
        order?.state?.date?.pickUpTime;

    if (pickuptime !== times[0]) {
        price = price + 25;
    }

    let ch = checkifweekend(
        order.state?.corrections?.pickUpDate ||
            order.state?.date?.pickUpDate
    );
    if (ch) {
        price = price + weekendCollectionPrice;
    }

    let matsprc = calcmatsprice(items, order);

    if (matsprc) {
        price = price + parseFloat(matsprc);
    }
    if (order.state.address.postcodeDistance > 50) {
        price = price + parseFloat(postcodeDistancePrice);
    }

    return price;
}

export function calculatePaymentSections(order, items) {
    let addonsOnCollection = 0;
    let packageAtCollection = 0;
    let addonsOnDelivery = 0;
    let cstordersprc = 0;
    let storagepriceandmonths = {};

    let bc = calculateBoxesCount(order);

    packageAtCollection =
        packageAtCollection +
        getPackageAtCollectionPrice(order, items);

    let prc = bc * parseFloat(returnDeliveryPerItem);
    addonsOnDelivery = addonsOnDelivery + prc;

    if (order?.state?.additionalServices) {
        for (const el of order.state.additionalServices) {
            cstordersprc = cstordersprc + parseFloat(el.price);
        }
    }

    if (order.state?.customItems) {
        for (const el of order.state.customItems) {
            addonsOnCollection =
                addonsOnCollection +
                parseFloat(el.quantity) * el.price;
        }
    }

    if (order?.state?.corrections?.premiumCollection) {
        let prcoll = order.state.checkout.premiumCollection;
        let cprcoll = order?.state?.corrections?.premiumCollection;

        if (prcoll !== cprcoll) {
            if (prcoll.includes("from doorstep")) {
                addonsOnCollection =
                    addonsOnCollection - parseFloat(precollprice[1]);
            } else {
                addonsOnCollection =
                    addonsOnCollection + parseFloat(precollprice[1]);
            }
        }
    }

    if (order?.state?.corrections?.premiumReturn) {
        let prcoll = order?.deliverDate?.premiumReturn;
        let cprcoll = order?.state?.corrections?.premiumReturn;

        if (prcoll && cprcoll && prcoll !== cprcoll) {
            if (prcoll.includes("to doorstep")) {
                addonsOnDelivery =
                    addonsOnDelivery - parseFloat(precollprice[1]);
            } else {
                addonsOnDelivery =
                    addonsOnDelivery + parseFloat(precollprice[1]);
            }
        }

        if (!prcoll && cprcoll) {
            if (cprcoll.includes("to doorstep")) {
                addonsOnDelivery =
                    addonsOnDelivery + parseFloat(precollprice[1]);
            }
        }
    }

    if (
        order?.state?.corrections?.pickUpTime &&
        order?.state?.corrections?.pickUpTime !==
            order.state.date.pickUpTime
    ) {
        if (order.state.date.pickUpTime === times[0]) {
            addonsOnCollection = addonsOnCollection + precollprice[1];
        } else {
            if (order.state.corrections.pickUpTime === times[0]) {
                addonsOnCollection =
                    addonsOnCollection - precollprice[1];
            }
        }
    }

    if (
        order?.state?.corrections?.returnTime &&
        order?.deliverDate?.time &&
        order?.state?.corrections?.returnTime !==
            order?.deliverDate?.time
    ) {
        if (order.deliverDate.time === times[0]) {
            addonsOnDelivery = addonsOnDelivery + precollprice[1];
        } else {
            if (order.state.corrections.returnTime === times[0]) {
                addonsOnDelivery = addonsOnDelivery - precollprice[1];
            }
        }
    }

    if (
        order?.state?.corrections?.returnTime &&
        !order?.deliverDate?.time
    ) {
        if (order.state.corrections.returnTime !== times[0]) {
            addonsOnDelivery = addonsOnDelivery + precollprice[1];
        }
    }

    let chorder = checkifweekend(order.state.date.pickUpDate);
    let chcorrection = checkifweekend(
        order?.state?.corrections?.pickUpDate
    );

    if (chorder !== chcorrection) {
        if (chorder && !chcorrection && chcorrection !== undefined) {
            addonsOnCollection =
                addonsOnCollection - weekendCollectionPrice;
        }
        if (!chorder && chcorrection) {
            addonsOnCollection =
                addonsOnCollection + weekendCollectionPrice;
        }
    }

    if (order?.state?.corrections?.materials) {
        let matsprc = calcmatsprice(items, order);

        let cmpr = 0;

        for (const item of items.packingMaterials) {
            let pos = order.state.corrections.materials[item.pos];

            if (pos !== undefined) {
                cmpr =
                    parseFloat(cmpr) +
                    parseFloat(pos) * parseFloat(item.price);
            }
        }
        addonsOnCollection = addonsOnCollection + cmpr;
        if (order.state.materials.packingMaterials && !matsprc) {
            addonsOnCollection =
                addonsOnCollection -
                parseFloat(packingMaterialsDeliveryPrice);
        }
        if (!order.state.materials.packingMaterials && matsprc) {
            addonsOnCollection =
                addonsOnCollection +
                parseFloat(packingMaterialsDeliveryPrice);
        }
    }

    if (order?.state?.corrections?.storage) {
        let cmpr = 0;

        for (const item of items.storage) {
            let pos = order.state.corrections.storage[item.pos];

            if (pos !== undefined) {
                cmpr =
                    parseFloat(cmpr) +
                    parseFloat(pos) * parseFloat(item.price);
            }
        }
        addonsOnCollection = addonsOnCollection + cmpr;
    }

    if (
        order?.state?.corrections?.coverageLevel &&
        order?.state?.corrections?.coverageLevel !==
            order?.state.checkout.coverageLevel
    ) {
        let o = order.state.checkout.coverageLevel;
        let c = order.state.corrections.coverageLevel;

        if (o === coverageTxt[0]) {
            for (let i = 0; i < coverageTxt.length; i++) {
                if (coverageTxt[i] === c) {
                    let price = coverageprices[i - 1];

                    let tprc = 0;
                    Object.keys(order.state.storage).forEach(
                        (key, i) => {
                            tprc =
                                tprc +
                                order.state.storage[key] * price;
                        }
                    );
                    addonsOnCollection =
                        addonsOnCollection + parseFloat(tprc);

                    if (order.state.customItems && price) {
                        for (const el of order.state.customItems) {
                            addonsOnCollection =
                                addonsOnCollection +
                                parseFloat(el.quantity) * price;
                        }
                    }
                }
            }
        } else {
            let boxescount = 0;

            Object.keys(order.state.storage).forEach((key, i) => {
                boxescount = boxescount + order.state.storage[key];
            });

            for (let i = 0; i < coverageTxt.length; i++) {
                if (o === coverageTxt[i]) {
                    addonsOnCollection =
                        addonsOnCollection -
                        parseFloat(
                            boxescount * coverageprices[i - 1]
                        );
                }
            }

            if (c !== coverageTxt[0]) {
                for (let i = 0; i < coverageTxt.length; i++) {
                    if (c === coverageTxt[i]) {
                        addonsOnCollection =
                            addonsOnCollection +
                            parseFloat(
                                boxescount * coverageprices[i - 1]
                            );
                    }
                }
            }
        }
    }

    let months = monthDiff(
        new Date(
            order?.state?.corrections?.pickUpDate ||
                order?.state?.date?.pickUpDate
        ),
        new Date(
            order?.deliverDate?.date
                ? order.deliverDate.date
                : Date.now()
        )
    );

    storagepriceandmonths = {price: getStoragePrice(order), months};

    let c = calculateStoragePrice(
        order.state.prices.items,
        order.state
    );

    let ttl =
        parseFloat(addonsOnCollection) +
        parseFloat(addonsOnDelivery) +
        parseFloat(
            storagepriceandmonths.price * storagepriceandmonths.months
        ) +
        parseFloat(cstordersprc);

    let discount = order?.state?.corrections?.discount;
    if (discount) {
        ttl = ttl - parseFloat(discount);
    }

    return {
        addonsOnCollection,
        packageAtCollection,
        addonsOnDelivery,
        cstordersprc,
        monthlyCoveragePrice: c.coverageprice,
        monthlyStoragePrice: c.storagePrice,
        monthlyDiscountPrice: c.pricebeforereferral,
        storagepriceandmonths,
        total: ttl.toFixed(2),
    };
}

export function calculateBoxesCount(order) {
    let boxescount = 0;
    if (order) {
        Object.keys(order?.state?.storage).forEach((key, i) => {
            boxescount = boxescount + order.state.storage[key];
        });

        if (order?.state?.customItems) {
            for (const el of order.state.customItems) {
                boxescount = boxescount + parseFloat(el.quantity);
            }
        }
    }

    return boxescount;
}

export function calculateStoragePrice(items, state) {
    if (items && state) {
        let totalStorageItems = 0;
        let storagePrice = 0;
        let coverageprice = 0;
        let pricebeforereferral = 0;

        for (const item of items.storage) {
            if (state.storage[item.pos]) {
                totalStorageItems =
                    totalStorageItems + state.storage[item.pos];
                storagePrice =
                    state.storage[item.pos] * parseFloat(item.price) +
                    storagePrice;
            }
        }

        if (state.referralCode.code) {
            let d =
                (parseFloat(storagePrice) *
                    parseFloat(state.referralCode.discount)) /
                100;

            pricebeforereferral = d;

            storagePrice = storagePrice - d;
        }
        function calcprice(pr) {
            let quantity = 0;

            Object.keys(state.storage).map((el, i) => {
                quantity = quantity + state.storage[el];
            });

            let p = quantity * pr.toFixed(2);

            return p;
        }

        let cv =
            state?.corrections?.coverageLevel ||
            state?.checkout?.coverageLevel;
        if (cv) {
            if (cv.includes("£250")) {
                coverageprice = calcprice(coverageprices[0]).toFixed(
                    2
                );
            }
            if (cv.includes("£500")) {
                coverageprice = calcprice(coverageprices[1]).toFixed(
                    2
                );
            }
        }

        return {
            storagePrice,
            totalStorageItems,
            coverageprice,
            pricebeforereferral,
        };
    }
}

export function checkifweekend(date) {
    if (date) {
        let nd = new Date(date).getDay();

        if (nd === 6 || nd === 0) {
            return true;
        } else {
            return false;
        }
    }
}

export function getStoragePrice(el) {
    let c = calculateStoragePrice(el.state.prices.items, el.state);

    let t = parseFloat(c.storagePrice) + parseFloat(c.coverageprice);
    return t.toFixed(2);
}

export function datePicker(el) {
    let rt;
    switch (el.status) {
        case "pickup":
            {
                rt =
                    el.state?.corrections?.pickUpDate ||
                    el.state?.date?.pickUpDate;
            }
            break;

        case "return":
            {
                rt = el.deliverDate?.date;
            }

            break;
        case "stored":
            {
                rt =
                    el.state?.corrections?.pickUpDate ||
                    el.state?.date?.pickUpDate;
            }

            break;

        case undefined:
            {
                rt = el.packingMaterialsDelivery;
            }
            break;
        default:
            {
            }
            break;
    }

    return rt;
}
