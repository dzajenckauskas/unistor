import {findOneDocument, insertDocument} from "../../BACKEND/mongo";
import websiteLogs from "../../HELPERS/websiteLogs";
import {compareBcrypt, hashPassword} from "../../BACKEND/bcrypt";
import {createJWTAndSetHeader} from "../../HELPERS/createjwtsetheaders";

export default async function name(req, res) {
   if (!req.body) {
      res.json(false);
   } else {
      switch (req.body.type) {
         case "in":
            {
               delete req.body.type;

               let f = await findOneDocument("users", {
                  "personalDetails.email": req.body.email,
               });
               if (!f) {
                  res.json("notFound");
                  websiteLogs(`[NOT-FOUND]: ${req.body.email}`);
               } else {
                  let ch = await compareBcrypt(
                     req.body.password,
                     f.password
                  );
                  if (!ch) {
                     res.json("wrong");
                     websiteLogs(
                        `[WRONG-PASSWORD]: ${req.body.email}`
                     );
                  } else {
                     createJWTAndSetHeader(
                        res,
                        {user: f._id.toString()},
                        "/",
                        "15min",
                        900
                     );
                     res.json({
                        status: true,
                        name: {
                           name: f.personalDetails.firstName,
                           lastName: f.personalDetails.lastName,
                        },
                     });
                     websiteLogs(`[LOGIN]: ${req.body.email}`);
                  }
               }
            }
            break;

         case "up":
            {
               let f = await findOneDocument("users", {
                  "personalDetails.email": req.body.email,
               });
               if (f) {
                  res.json("exists");
                  websiteLogs(`[EXISTS]: ${req.body.email}`);
               } else {
                  delete req.body.type;
                  let h = await hashPassword(req.body.password);
                  delete req.body.password;
                  let obj = {
                     personalDetails: req.body,
                     password: h,
                     registration: Date.now(),
                  };
                  let ins = await insertDocument("users", obj);
                  createJWTAndSetHeader(
                     res,
                     {user: ins.insertedId.toString()},
                     "/",
                     "15min",
                     900
                  );
                  res.json(
                     ins
                        ? {
                             status: true,
                             name: {
                                name: req.body.firstName,
                                lastName: req.body.lastName,
                             },
                          }
                        : "error"
                  );
                  websiteLogs(`[REGISTRATION]: ${req.body.email}`);
               }
            }
            break;

         default:
            break;
      }
   }
}
