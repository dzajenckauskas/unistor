import {
    findAllDocuments,
    findOneDocument,
    insertDocument,
    pushToArrayIfNotExistsNoId,
    pushToArrayWithoutID,
    removeDocument,
    updateOneDocument,
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
                case "getCodes":
                    {
                        let f = await findAllDocuments("referrals");
                        let fu = await findAllDocuments("usedCodes");

                        res.json(
                            JSON.stringify({codes: f, usedCodes: fu})
                        );
                    }
                    break;
                case "saveNewCode":
                    {
                        delete req.body.type;
                        let s = await insertDocument(
                            "referrals",
                            req.body
                        );

                        res.json(s ? true : false);
                    }
                    break;
                case "delete":
                    {
                        let d = await removeDocument("referrals", {
                            id: req.body.id,
                        });

                        res.json(d ? true : false);
                    }
                    break;
                case "update":
                    {
                        delete req.body.type;
                        let u = await updateOneDocument(
                            "referrals",
                            {id: req.body.id},
                            req.body
                        );
                        res.json(u.modifiedCount ? true : false);
                    }
                    break;

                default:
                    break;
            }
        }
    }
}
