import {
    findAllDocuments,
    findOneDocument,
    getAllCollections,
    insertDocument,
    removeDocument,
    updateOneEntry,
} from "../../../BACKEND/mongo";
import {checkAuthorization} from "../../../HELPERS/checkauthorization";

export default async function name(req, res) {
    if (!req.body) {
        res.json(false);
    } else {
        let ch = checkAuthorization(req);

        if (ch?.type === "admin") {
            switch (req.body.type) {
                /////////////////////////

                case "getPrices":
                    {
                        let f = await findOneDocument("admin", {
                            type: "prices",
                        });

                        res.json(f ? {prices: f.prices} : false);
                    }
                    break;
                case "savePrices":
                    {
                        delete req.body.type;
                        let u = await updateOneEntry(
                            "admin",
                            {type: "prices"},
                            {prices: req.body}
                        );

                        try {
                            await res.revalidate("/booking");
                        } catch (error) {
                            console.log(error);
                        }

                        res.json(u ? true : false);
                    }
                    break;

                case "All jobs":
                    {
                        let f = await findAllDocuments("pickup", {});
                        let pickups = [];

                        if (f) {
                            for (const or of f) {
                                pickups.push(or);

                                let pm =
                                    or?.state?.materials
                                        ?.packingMaterials;

                                if (
                                    pm &&
                                    !or.state.materials.delivered
                                ) {
                                    or.state.materials.address =
                                        or.state.address;
                                    or.state.materials.user = or.user;
                                    or.state.materials.orderNr =
                                        or.orderNr;
                                    pickups.push(or.state.materials);
                                }
                            }
                        }

                        let de = await findAllDocuments("return", {});

                        pickups = [...pickups, ...de];

                        res.json({orders: pickups});
                    }
                    break;
                case "In storage":
                    {
                        let f = await findAllDocuments("stored", {});

                        res.json(f ? {orders: f} : {orders: []});
                    }
                    break;
                case "Returned":
                    {
                        let c = await getAllCollections();
                        let colls = [];

                        if (c) {
                            for (const el of c) {
                                if (!isNaN(el.name)) {
                                    colls.push(parseInt(el.name));
                                }
                            }
                        }
                        let sorted = colls.sort((a, b) => {
                            return b - a;
                        });
                        res.json({orders: sorted});
                    }
                    break;

                case "getYearCollection":
                    {
                        let f = await findAllDocuments(
                            req.body.year.toString(),
                            {}
                        );

                        res.json({orders: f});
                    }
                    break;

                case "markAsCompleted":
                    {
                        let ob1 = req.body?.el?.packingMaterials;
                        let ob2 =
                            req.body.el?.state?.materials
                                ?.packingMaterials;

                        let delivered =
                            req.body?.el?.state?.materials?.delivered;

                        if (
                            (ob1 && !delivered) ||
                            (ob2 && !delivered)
                        ) {
                            let u = await updateOneEntry(
                                "pickup",
                                {orderNr: req.body.el.orderNr},
                                {"state.materials.delivered": true}
                            );

                            res.json(u ? true : false);
                        } else {
                            ///
                            if (req.body.el.status === "pickup") {
                                let f = await findOneDocument(
                                    "pickup",
                                    {
                                        orderNr: req.body.el.orderNr,
                                    }
                                );
                                ///

                                if (f) {
                                    delete f._id;
                                    f.status = "stored";
                                    let i = await insertDocument(
                                        "stored",
                                        f
                                    );
                                    if (i) {
                                        let d = await removeDocument(
                                            "pickup",
                                            {
                                                orderNr:
                                                    req.body.el
                                                        .orderNr,
                                            }
                                        );
                                        res.json(d ? true : false);
                                    }
                                }
                            }
                            ///
                            if (req.body.el.status === "stored") {
                                let f = await findOneDocument(
                                    "stored",
                                    {
                                        orderNr: req.body.el.orderNr,
                                    }
                                );
                                ///

                                if (f) {
                                    delete f._id;
                                    f.status = "return";
                                    let i = await insertDocument(
                                        "return",
                                        f
                                    );
                                    if (i) {
                                        let d = await removeDocument(
                                            "stored",
                                            {
                                                orderNr:
                                                    req.body.el
                                                        .orderNr,
                                            }
                                        );
                                        res.json(d ? true : false);
                                    }
                                }
                            }

                            ///
                            if (req.body.el.status === "return") {
                                let el = req.body.el;
                                el.status = "returned";
                                el.returnDate = Date.now();
                                delete el._id;
                                let y = new Date(
                                    Date.now()
                                ).getFullYear();

                                let i = await insertDocument(
                                    y.toString(),
                                    el
                                );

                                if (i) {
                                    await removeDocument("return", {
                                        orderNr: el.orderNr,
                                    });
                                }
                                res.json(i ? true : false);
                            }
                        }
                    }
                    break;

                default:
                    break;
            }
        } else {
            res.json(false);
        }
    }
}
