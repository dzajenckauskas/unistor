import {
    changeNumberByX,
    findByID,
    insertDocument,
    removeDocument,
    updateById,
    updateOneDocument,
    updateOneEntry,
} from "../../../BACKEND/mongo";
import {checkAuthorization} from "../../../HELPERS/checkauthorization";
import {emailAfterFinalPaymentToUnistor} from "../../../HELPERS/emailsforunistor";
import {sendEmail} from "../../../HELPERS/nodemailer";

export default async function name(req, res) {
    if (!req.body) {
        res.json(false).end();
    } else {
        let ch = checkAuthorization(req);

        if (!ch) {
            res.json(false).end();
        } else {
            delete req.body.order._id;

            let v = await changeNumberByX(
                "orderAndInvoiceNr",
                {type: "order-invoicenr"},
                {orderNr: 0, invoiceNr: 1}
            );

            req.body.order.finalPayment.invoiceNr = v.value.invoiceNr;
            req.body.order.status = "return";
            let i = await insertDocument("return", req.body.order);

            if (i) {
                await removeDocument("stored", {
                    orderNr: req.body.order.orderNr,
                });

                res.json(i ? {order: req.body.order} : false);

                let order = req.body.order;
                let html = emailAfterFinalPaymentToUnistor(order);
                await sendEmail(
                    [`${process.env.email}`],
                    `DELIVERY REQUESTED: ${order.state.address.firstName} ${order.state.address.lastName} DELIVERY ON ${order.deliverDate.date}`,
                    "",
                    html,
                    false,
                    false
                );
            }
        }
    }
}
