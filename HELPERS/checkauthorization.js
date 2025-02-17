import cookie from "cookie";
import {verifyJWT} from "../BACKEND/jwt";

export function checkAuthorization(req) {
   var cookies = cookie.parse(req.headers.cookie || "");

   var token = cookies.uniStor;
   if (token) {
      let v = verifyJWT(token);
      if (v) {
         return v.data;
      }
   }
   return false;
}
