import {insertDocument} from "../../BACKEND/mongo";
import {checkAuthorization} from "../../HELPERS/checkauthorization";

export default async function Bookorder(req, res) {
   if (!req.body) {
      res.json(false);
   } else {
      let ch = checkAuthorization(req);
      if (ch) {
         let order = req.body;
         order.orderTime = Date.now();
         order.status = "pending";
         order.user = ch.user;

         let y = new Date(Date.now()).getFullYear().toString();
         let i = await insertDocument(y, order);

         res.json(i ? true : false);
      } else {
         res.json(false);
      }
   }
}
