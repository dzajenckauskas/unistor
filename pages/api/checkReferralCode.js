import {findOneDocument} from "../../BACKEND/mongo";

export default async function name(req, res) {
   if (!req.body) {
      res.json(false);
   } else {
      let f = await findOneDocument("referrals", {
         code: req.body.code,
      });

      res.json(f ? f : false);
   }
}
