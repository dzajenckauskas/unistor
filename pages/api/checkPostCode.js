import {aroundLondon} from "../../50kmAroundLondon";

export default function name(req, res) {
   if (!req.body) {
      res.json(false);
   } else {
      if (aroundLondon.includes(req.body.code)) {
         res.json(true);
      } else {
         res.json(false);
      }
   }
}
