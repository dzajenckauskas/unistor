import {hashPassword} from "../../BACKEND/bcrypt";
import {findOneDocument, updateById} from "../../BACKEND/mongo";

export default async function name(req, res) {
    if (!req.body) {
        res.json(false);
    } else {
        const Cryptr = require("cryptr");
        const cryptr = new Cryptr(process.env.cryptokey);
        const dcr = cryptr.decrypt(req.body.id);

        let f = await findOneDocument("users", {
            "personalDetails.email": req.body.email,
            "recovery.key": dcr,
        });

        if (!f) {
            res.json(false);
        } else {
            let minutes = process.env.production ? 15 : 50;
            let time = 1000 * 60 * minutes;
            if (new Date(Date.now()) - f.recovery.date < time) {
                let hash = await hashPassword(req.body.p1);
                let u = await updateById("users", f._id, {
                    password: hash,
                    recovery: Date.now(),
                });
                res.json(u ? true : false);
            } else {
                res.json(false);
            }
        }
    }
}
