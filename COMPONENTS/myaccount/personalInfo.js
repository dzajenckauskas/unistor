import PersonalDetails from "./editaccount/personalDetails";
import Address from "./editaccount/address";
import Password from "./editaccount/password";
import {useEffect, useState} from "react";
import {fetchData} from "../../HELPERS/fetchdata";

export default function PersonalInfo() {
   const [info, setinfo] = useState(false);

   async function getinfofromserver() {
      let info = await fetchData("/api/myAccount/myaccount", {
         type: "getpersonalinfo",
      });
      if (info) {
         setinfo(info);
      } else {
         alert("something went wrong");
      }
   }

   useEffect(() => {
      getinfofromserver();
   }, []);

   return (
      <div className="personal-info">
         <PersonalDetails info={info} />
         <Address
            info={info}
            setinfo={(el) => {
               setinfo(el);
            }}
         />
         <Password info={info} />
      </div>
   );
}
