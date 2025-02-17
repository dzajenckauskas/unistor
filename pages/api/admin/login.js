import {compareBcrypt} from "../../../BACKEND/bcrypt";
import {createJWTAndSetHeader} from "../../../HELPERS/createjwtsetheaders";

export default async function adlogin(req, res) {
   if (!req.body) {
      res.json(false);
   } else {
      let chname = await compareBcrypt(
         req.body.name,
         process.env.adminName
      );

      if (!chname) {
         res.json(false);
      } else {
         let chpass = await compareBcrypt(
            req.body.pass,
            process.env.adminPass
         );
         if (!chpass) {
            res.json(false);
         } else {
            createJWTAndSetHeader(
               res,
               {type: "admin"},
               "/",
               "15min",
               900
            );

            res.json(true);
         }
      }
   }
}
