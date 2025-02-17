import {findByID} from "../../BACKEND/mongo";
import {checkAuthorization} from "../../HELPERS/checkauthorization";

export default async function name(req, res) {
   if (!req.body) {
      res.json(false);
   } else {
      let ch = checkAuthorization(req);

      if (!ch) {
         res.json(false);
      } else {
         let f = await findByID("users", ch.user);

         res.json(
            f
               ? {
                    firstName: f.personalDetails.firstName,
                    lastName: f.personalDetails.lastName,
                 }
               : false
         );
      }
   }
}
