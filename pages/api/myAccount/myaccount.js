import {compareBcrypt, hashPassword} from "../../../BACKEND/bcrypt";
import {
   findByID,
   pushToArrayIfNotExists,
   updateById,
   updateObjectInsideArray,
} from "../../../BACKEND/mongo";
import {checkAuthorization} from "../../../HELPERS/checkauthorization";
const ObjectId = require("mongodb").ObjectId;

export default async function name(req, res) {
   if (!req.body) {
      res.json(false);
   } else {
      let ch = checkAuthorization(req);

      if (ch) {
         switch (req.body.type) {
            case "getpersonalinfo":
               {
                  let f = await findByID("users", ch.user);
                  if (f) {
                     delete f._id;
                     delete f.registration;
                     delete f.password;
                  }
                  res.json(f ? f : false);
               }
               break;

            case "saveInfo":
               {
                  delete req.body.type;
                  let u = await updateById("users", ch.user, {
                     personalDetails: req.body,
                  });
                  res.json(u ? true : false);
               }
               break;
            case "saveAddress":
               {
                  delete req.body.type;
                  req.body.id = Date.now();
                  let p = await pushToArrayIfNotExists(
                     "users",
                     ch.user,
                     {address: req.body}
                  );
                  res.json(p ? true : false);
               }
               break;
            case "updateAddress":
               {
                  delete req.body.type;
                  let u = await updateObjectInsideArray(
                     "users",
                     {
                        _id: ObjectId(ch.user),
                        "address.id": req.body.id,
                     },
                     {"address.$": req.body}
                  );
                  res.json(u ? true : false);
               }
               break;
            case "changePassword":
               {
                  delete req.body.type;

                  let f = await findByID("users", ch.user);
                  let c = await compareBcrypt(
                     req.body.password,
                     f.password
                  );
                  if (!c) {
                     res.json(false);
                  } else {
                     let h = await hashPassword(req.body.newPassword);
                     let u = await updateById("users", ch.user, {
                        password: h,
                     });

                     res.json(u ? true : false);
                  }
               }
               break;

            default:
               break;
         }
      } else {
         res.json(false);
      }
   }
}
