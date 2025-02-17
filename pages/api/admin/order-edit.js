import {
    changeNumberByX,
    findByID,
    removeDocument,
    updateById,
    updateOneDocument,
    updateOneEntry,
} from "../../../BACKEND/mongo";
import {checkAuthorization} from "../../../HELPERS/checkauthorization";

export default async function name(req, res) {
    if (!req.body) {
        res.json(false).end();
    } else {
        let ch = checkAuthorization(req);

        if (!ch) {
            res.json(false).end();
        } else {
            switch (req.body.type) {
                case "getUser":
                    {
                        let f = await findByID(
                            "users",
                            req.body.user
                        );
                        if (f) {
                            delete f.password;
                        }

                        res.json(f ? {user: f} : {user: false});
                    }
                    break;
                case "changeUserData":
                    {
                        let u = await updateById(
                            "users",
                            req.body.user._id,
                            {
                                personalDetails:
                                    req.body.user.personalDetails,
                            }
                        );

                        res.json(u ? true : false);
                    }
                    break;
                case "saveOrder":
                    {
                        delete req.body.order._id;
                        let y = new Date(req.body.order.returnDate)
                            .getFullYear()
                            .toString();

                        let u = await updateOneDocument(
                            req.body.order.status === "returned"
                                ? y
                                : req.body.order.status,
                            {orderNr: req.body.order.orderNr},
                            req.body.order
                        );

                        res.json(u.matchedCount !== 0 ? true : false);
                    }
                    break;
                case "finalPaymentOrder":
                    {
                        delete req.body.order._id;

                        let v = await changeNumberByX(
                            "orderAndInvoiceNr",
                            {type: "order-invoicenr"},
                            {orderNr: 0, invoiceNr: 1}
                        );

                        req.body.order.finalPayment.invoiceNr =
                            v.value.invoiceNr;

                        let y = new Date(req.body.order.returnDate)
                            .getFullYear()
                            .toString();

                        let u = await updateOneDocument(
                            req.body.order.status === "returned"
                                ? y
                                : req.body.order.status,
                            {orderNr: req.body.order.orderNr},
                            req.body.order
                        );
                        res.json(
                            u ? {invoiceNr: v.value.invoiceNr} : false
                        );
                    }
                    break;
                case "customPayment":
                    {
                        delete req.body.order._id;

                        let v = await changeNumberByX(
                            "orderAndInvoiceNr",
                            {type: "order-invoicenr"},
                            {orderNr: 0, invoiceNr: 1}
                        );

                        req.body.order.customPayments[
                            req.body.order.customPayments.length - 1
                        ].invoiceNr = v.value.invoiceNr;

                        let u = await updateOneDocument(
                            req.body.order.status,
                            {orderNr: req.body.order.orderNr},
                            req.body.order
                        );
                        res.json(
                            u ? {invoiceNr: v.value.invoiceNr} : false
                        );
                    }
                    break;
                case "deleteOrder":
                    {
                        let d = await removeDocument(req.body.db, {
                            orderNr: parseInt(req.body.orderNr),
                        });

                        res.json(d ? true : false);
                    }
                    break;

                default:
                    break;
            }
        }
    }
}
