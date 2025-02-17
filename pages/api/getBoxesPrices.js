import {findOneDocument} from "../../BACKEND/mongo";

export default async function name(req, res) {
   if (!req.body) {
      res.json(false);
   } else {
      let prices = await findOneDocument("admin", {type: "prices"});

      res.json(prices ? {prices: prices.prices} : false);
   }
}
