import {verifyJWT} from "../../BACKEND/jwt";

export default function name(req, res) {
   if (!req.body) {
      res.json(false);
   } else {
      let ch = verifyJWT(req.body);
      if (!ch) {
         res.json(false);
      } else {
         res.json(ch);
      }
   }
}
