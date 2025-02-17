import {
   findAllDocuments,
   getAllCollections,
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
            case "getYear":
               {
                  let f = await findAllDocuments(
                     req.body.year.toString()
                  );

                  res.json(f ? {list: f} : false);
               }
               break;
            case "getAllYearsList":
               {
                  let c = await getAllCollections();
                  let colls = [];

                  if (c) {
                     for (const el of c) {
                        if (!isNaN(el.name)) {
                           colls.push(parseInt(el.name));
                        }
                     }
                  }
                  let sorted = colls.sort((a, b) => {
                     return b - a;
                  });
                  res.json({orders: sorted});
               }
               break;
            case "delete":
               {
               }
               break;
            case "update":
               {
               }
               break;

            default:
               break;
         }
      }
   }
}
