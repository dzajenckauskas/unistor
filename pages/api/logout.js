import cookie from "cookie";

export default function Logout(req, res) {
   if (!req.body) {
      res.json(false);
   } else {
      let options = {
         httpOnly: false,
         secure: false,
         sameSite: "strict",
         maxAge: -1, //seconds
         path: "/",
      };

      res.setHeader(
         "Set-Cookie",
         cookie.serialize("uniStor", null, options)
      );

      res.json(true);
   }
}
