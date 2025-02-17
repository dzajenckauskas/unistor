import {
    findAllDocuments,
    findOneDocument,
    getAllCollections,
    insertDocument,
    removeDocument,
    updateOneEntry,
} from "../../../BACKEND/mongo";
import {checkAuthorization} from "../../../HELPERS/checkauthorization";
import {emailOnPickUpDateChangeToUnistor} from "../../../HELPERS/emailsforunistor";
import {sendEmail} from "../../../HELPERS/nodemailer";

export default async function name(req, res) {
    if (!req.body) {
        res.json(false);
    } else {
        let ch = checkAuthorization(req);
        if (!ch) {
            res.json(false);
        } else {
            switch (req.body.type) {
                case "getList":
                    {
                        let f = await findAllDocuments("pickup", {
                            user: ch.user,
                        });
                        let ff = await findAllDocuments("stored", {
                            user: ch.user,
                        });
                        let fff = await findAllDocuments("return", {
                            user: ch.user,
                        });
                        let arr = [...f, ...ff, ...fff];
                        let c = await getAllCollections();
                        for (const el of c) {
                            if (!isNaN(el.name)) {
                                let f = await findAllDocuments(
                                    el.name,
                                    {
                                        user: ch.user,
                                    }
                                );

                                arr = [...arr, ...f];
                            }
                        }

                        res.json({
                            orders: JSON.stringify(arr),
                        });
                    }
                    break;
                case "pickup":
                    {
                        await updateOneEntry(
                            "pickup",
                            {
                                orderNr: req.body.ordernr,
                            },
                            {"state.date": req.body.newDate}
                        );
                        res.json(true);

                        /////////////////

                        let order = await findOneDocument("pickup", {
                            orderNr: req.body.ordernr,
                        });

                        if (order) {
                            let html =
                                emailOnPickUpDateChangeToUnistor(
                                    order
                                );

                            await sendEmail(
                                [`${process.env.email}`],
                                `COLLECTION DATE CHANGE: ${order.state.address.firstName} ${order.state.address.lastName} RESCHEDULED ON ${order.state.date.pickUpDate}`,
                                "",
                                html,
                                false,
                                false
                            );
                        }

                        //////////////////
                    }
                    break;
                case "stored":
                    {
                        let f = await findOneDocument("stored", {
                            orderNr: req.body.ordernr,
                        });

                        if (f) {
                            delete f._id;
                            f.status = "return";
                            f.deliverDate = {
                                date: req.body.newDate.pickUpDate,
                                time: req.body.newDate.pickUpTime,
                                orderTime: Date.now(),
                            };

                            let i = await insertDocument("return", f);

                            if (i) {
                                await removeDocument("stored", {
                                    orderNr: req.body.ordernr,
                                });

                                res.json({order: f});
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
}
