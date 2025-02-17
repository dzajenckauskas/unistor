import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Open_Sans} from "@next/font/google";
const openSans = Open_Sans();
import AdminNavbar from "../../COMPONENTS/admin/navbar";
import Orders from "../../COMPONENTS/admin/orders";
import Prices from "../../COMPONENTS/admin/prices";
import Referrals from "../../COMPONENTS/admin/referrals";
import {types} from "../../HELPERS/variousVariables";
import Profit from "../../COMPONENTS/admin/profit";

export default function Connected() {
   const router = useRouter();
   const [showpage, setshowpage] = useState("");

   useEffect(() => {
      if (router.query.location) {
         setshowpage(router.query.location);
      } else {
         setshowpage(types[0]);
      }
   }, [router]);

   function setnavbar(e) {
      setshowpage(e);
   }

   return (
      <div
         className={`adminconnectedglobalwrapper ${openSans.className}`}>
         <AdminNavbar setnavbar={setnavbar} showpage={showpage} />
         {types.includes(showpage) ? (
            <Orders showpage={showpage} />
         ) : null}
         {showpage === "Settings" ? <Prices /> : null}
         {showpage === "Referrals" ? <Referrals /> : null}
         {showpage === "Profit" ? <Profit /> : null}
      </div>
   );
}
