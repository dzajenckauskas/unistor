import {NextResponse} from "next/server";

import {fetchData} from "./HELPERS/fetchdata";

export async function middleware(req) {
   let token = req.cookies.get("uniStor");
   let path = req.nextUrl.pathname;
   let origin;

   if (process.env.production) {
      origin = "https://unistor.co.uk";
   } else {
      origin = `http://localhost:3000`;
   }

   if (path === "/my_account") {
      if (token) {
         let ch = await fetchData(
            `${origin}/api/checkAuthorization`,
            token.value
         );

         if (!ch) {
            return NextResponse.redirect(`${origin}/`);
         } else {
            if (ch.data?.type === "admin") {
               return NextResponse.redirect(
                  `${origin}/admin/connected`
               );
            }
         }
      } else {
         return NextResponse.redirect(`${origin}/`);
      }
   }

   if (path === "/admin") {
      if (token) {
         let ch = await fetchData(
            `${req.nextUrl.origin}/api/checkAuthorization`,
            token.value
         );
         if (ch && ch.data?.type === "admin") {
            return NextResponse.redirect(`${origin}/admin/connected`);
         }
      }
   }
   if (path === "/admin/connected") {
      if (!token) {
         return NextResponse.redirect(`${origin}/admin`);
      } else {
         let ch = await fetchData(
            `${origin}/api/checkAuthorization`,
            token.value
         );
         if (!ch && ch.data?.type === "admin") {
            return NextResponse.redirect(`${origin}/admin`);
         }
      }
   }
}
