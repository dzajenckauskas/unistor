import cookie from "cookie";

import {createJWT} from "../BACKEND/jwt";
export function createJWTAndSetHeader(
   res,
   data,
   path,
   expiration,
   cookieExpinS
) {
   let jwt;
   if (cookieExpinS > 0) {
      jwt = createJWT(expiration, data);
   } else {
      jwt = null;
   }

   let options = {
      httpOnly: true,
      secure: process.env.production ? true : false,
      sameSite: "strict",
      maxAge: cookieExpinS, //seconds
      path: path,
   };

   res.setHeader(
      "Set-Cookie",
      cookie.serialize("uniStor", jwt, options)
   );
}
