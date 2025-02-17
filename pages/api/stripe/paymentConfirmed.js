import ReactPDF from "@react-pdf/renderer";
import {
    changeNumberByX,
    findByID,
    findOneDocument,
    insertDocument,
    updateOneDocument,
} from "../../../BACKEND/mongo";

import {checkAuthorization} from "../../../HELPERS/checkauthorization";
import {emailFterBookingToUnistor} from "../../../HELPERS/emailsforunistor";
import {sendEmail} from "../../../HELPERS/nodemailer";
import {paymentConfirmedHTMLForEmail} from "../../../HELPERS/paymentconfirmedhtmlforemail";
import {pdfForLabels} from "../../../HELPERS/pdfforlabels";

export default async function name(req, res) {
    if (!req.body) {
        res.json(false);
    } else {
        let ch = checkAuthorization(req);

        if (ch) {
            let v = await changeNumberByX(
                "orderAndInvoiceNr",
                {type: "order-invoicenr"},
                {orderNr: 1, invoiceNr: 1}
            );
            let user = await findByID("users", ch.user);
            req.body.orderTime = Date.now();
            req.body.invoiceNr = v.value.invoiceNr;
            req.body.orderNr = v.value.orderNr;
            req.body.status = "pickup";
            req.body.user = ch.user;
            req.body.state.address.phoneNr =
                user.personalDetails.telephone;
            req.body.bookingState = JSON.parse(
                JSON.stringify(req.body.state)
            );

            await insertDocument("pickup", req.body);
            res.json(true);

            if (user && process.env.production) {
                let html = paymentConfirmedHTMLForEmail(req);

                try {
                    async function sendToClient() {
                        let stream = await ReactPDF.renderToStream(
                            pdfForLabels(req.body)
                        );

                        await sendEmail(
                            [`${user.personalDetails.email}`],
                            "booking confirmation",
                            "",
                            html,
                            false,
                            {
                                filename: "Labels.pdf",
                                contentType: "application/pdf",
                                content: stream,
                            }
                        );
                    }
                    async function sendToUnistor() {
                        let html2 = emailFterBookingToUnistor(
                            req.body
                        );
                        await sendEmail(
                            [`${process.env.email}`],
                            `NEW BOOKING: ${req.body.state.address.firstName} ${req.body.state.address.lastName} COLL ${req.body.state.date.pickUpDate}`,
                            "",
                            html2,
                            false,
                            false
                        );
                    }
                    sendToClient();
                    sendToUnistor();
                } catch (error) {
                    console.log(error);
                }
            }

            if (req?.body?.state?.referralCode?.code) {
                manageCodesCount();
                async function manageCodesCount() {
                    let data = {
                        orderTime: req.body.orderTime,
                        code: req.body.state.referralCode.code,
                    };

                    let y = new Date(data.orderTime).getFullYear();
                    let m = new Date(data.orderTime).getMonth();

                    let f = await findOneDocument("usedCodes", {
                        year: y,
                    });

                    if (!f) {
                        let obj = {
                            year: y,
                            codes: [
                                {
                                    code: data.code,
                                    months: [{month: m, count: 1}],
                                },
                            ],
                        };

                        await insertDocument("usedCodes", obj);
                    } else {
                        let codes = f.codes;

                        let ind = codes.findIndex((el, i) => {
                            if (el.code === data.code) {
                                let mind = el.months.findIndex(
                                    (el, i) => {
                                        if (el.month === m) {
                                            el.count = el.count + 1;
                                        }

                                        return el.month === m;
                                    }
                                );

                                if (mind < 0) {
                                    el.months.push({
                                        month: m,
                                        count: 1,
                                    });
                                }
                            }

                            return el.code === data.code;
                        });

                        if (ind < 0) {
                            codes.push({
                                code: data.code,
                                months: [{month: m, count: 1}],
                            });
                        }

                        await updateOneDocument(
                            "usedCodes",
                            {year: y},
                            {codes}
                        );
                    }
                }
            }
        } else {
            res.json(false);
        }
    }
}
