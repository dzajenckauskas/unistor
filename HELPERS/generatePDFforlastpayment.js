import {dateFormatConverter} from "./dateformatconverter";
import {htmlforlastpayment} from "./htmlforlastpaymentpdf";

import easyinvoice from "easyinvoice";
import {
    calcmatsprice,
    calculateBoxesCount,
    monthDiff,
} from "../COMPONENTS/order-edit/order-edit-helper-funtions";
import {
    coverageprices,
    packingMaterialsDeliveryPrice,
    precollprice,
    prerettxt,
    returnDeliveryPerItem,
    times,
} from "./variousVariables";

export async function generatePDFforlastpayment(order) {
    let html = htmlforlastpayment();

    function getProducts() {
        let products = [];

        //////////////////////////////
        if (
            order?.state?.corrections?.pickUpTime &&
            order?.state?.corrections?.pickUpTime !==
                order.state.date.pickUpTime
        ) {
            let t = order.state.corrections.pickUpTime;
            if (order.state.date.pickUpTime === times[0]) {
                products.push({
                    quantity: 1,
                    description: `${
                        t === times[1]
                            ? "AM"
                            : t === times[2]
                            ? "PM"
                            : "Daily"
                    } pick up slot`,
                    price: parseFloat(precollprice[1]),
                    "tax-rate": 0,
                });
            } else {
                if (order.state.corrections.pickUpTime === times[0]) {
                    products.push({
                        quantity: 1,
                        description: `${
                            t === times[1]
                                ? "AM"
                                : t === times[2]
                                ? "PM"
                                : "Daily"
                        } pick up slot`,
                        price: parseFloat(-precollprice[1]),
                        "tax-rate": 0,
                    });
                }
            }
        }
        ///////////////////////////////////////
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
        let adjmatsprc = 0;
        if (order?.state?.corrections?.materials) {
            let matsprc = calcmatsprice(
                order.state.prices.items,
                order
            );

            for (const item of order.state.prices.items
                .packingMaterials) {
                let pos = order.state.corrections.materials[item.pos];

                if (pos !== undefined) {
                    products.push({
                        quantity: parseFloat(pos),
                        description: item.name,
                        price: parseFloat(item.price),
                        "tax-rate": 0,
                    });
                }
            }

            if (order.state.materials.packingMaterials && !matsprc) {
                adjmatsprc =
                    adjmatsprc -
                    parseFloat(packingMaterialsDeliveryPrice);
            }
        }
        ///storage items
        let bc = calculateBoxesCount(order);

        for (const item of order.state.prices.items.storage) {
            let pos = order.state.storage[item.pos];
            if (pos) {
                products.push({
                    quantity: parseFloat(pos),
                    description: item.name,
                    price:
                        months !== 0
                            ? parseFloat(item.price * months)
                            : 0.0,
                    "tax-rate": 0,
                });
            }
        }
        ///
        if (
            order?.state?.corrections?.returnTime &&
            order?.state?.corrections?.returnTime !== times[0]
        ) {
            let t = order?.state?.corrections?.returnTime;
            products.push({
                quantity: 1,
                description: `${
                    t === times[1]
                        ? "AM"
                        : t === times[2]
                        ? "PM"
                        : "Daily"
                } return time slot`,
                price: !t ? 0 : parseFloat(precollprice[1]),
                "tax-rate": 0,
            });
        }
        /////////////////////////
        if (order?.state?.corrections?.premiumReturn) {
            let prcoll = order?.deliverDate?.premiumReturn;
            let cprcoll = order?.state?.corrections?.premiumReturn;

            if (prcoll && cprcoll && prcoll !== cprcoll) {
                if (prcoll.includes("to doorstep")) {
                    products.push({
                        quantity: 1,
                        description: prerettxt[1],
                        price: -parseFloat(precollprice[1]),
                        "tax-rate": 0,
                    });
                } else {
                    products.push({
                        quantity: 1,
                        description: prerettxt[1],
                        price: parseFloat(precollprice[1]),
                        "tax-rate": 0,
                    });
                }
            }

            if (!prcoll && cprcoll) {
                if (cprcoll.includes("to doorstep")) {
                    products.push({
                        quantity: 1,
                        description: prerettxt[1],
                        price: parseFloat(precollprice[1]),
                        "tax-rate": 0,
                    });
                }
            }
        }
        ////////////////////////

        let coverageprice = 0;
        let cv =
            order?.state?.corrections?.coverageLevel ||
            order?.state?.checkout?.coverageLevel;
        if (cv) {
            if (cv.includes("£250")) {
                coverageprice = coverageprices[0];
            }
            if (cv.includes("£500")) {
                coverageprice = coverageprices[1];
            }

            products.push({
                quantity: bc,
                description: cv,
                price: parseFloat(coverageprice * months),
                "tax-rate": 0,
            });
        }

        products.push({
            quantity: parseFloat(bc),
            description: `Return costs for ${bc} items`,
            price: parseFloat(returnDeliveryPerItem),
            "tax-rate": 0,
        });
        if (order?.state?.corrections?.storage) {
            let cmpr = 0;

            for (const item of order.state.prices.items.storage) {
                let pos = order.state.corrections.storage[item.pos];

                if (pos !== undefined) {
                    cmpr =
                        parseFloat(cmpr) +
                        parseFloat(pos) * parseFloat(item.price);
                }
            }
            products.push({
                quantity: 1,
                description: `Inventory corrections`,
                price: cmpr,
                "tax-rate": 0,
            });
        }

        return products;
    }

    const data = {
        customize: {
            template: btoa(html), // Your template must be base64 encoded
        },
        images: {
            logo: `https://unistor.co.uk/logo2.png`,
        },
        information: {
            number: order?.finalPayment?.invoiceNr,
            date: `${dateFormatConverter(
                new Date(order?.finalPayment?.time).toDateString()
            )}`,
        },

        client: {
            company: `${order.state.address.firstName} ${order.state.address.lastName}`,
            address: `${order.state.address.addressLine1}`,
            zip: `${order.state.address.postcode}`,
            city: `${order.state.address.town}`,
        },

        sender: {
            company: "Unistor Ltd",
            address: "8 Field Road",
            zip: "UB9 4HL",
            city: "Uxbridge",
            country: "United Kingdom",
            //   custom1: "020 8064 1795",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        products: getProducts(),
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(
        `UNISTOR-Nr${order?.finalPayment?.invoiceNr}`,
        result.pdf
    );
}
