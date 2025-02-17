import {useEffect, useState} from "react";
import {boxes} from "../../HELPERS/boxes";
import {fetchData} from "../../HELPERS/fetchdata";

export default function CompletedOrders({years}) {
   const [year, setyear] = useState();
   const [orders, setorders] = useState([]);

   useEffect(() => {
      if (years.length !== 0) {
         setyear(years[0]);
      }
   }, [years]);

   function renderorders() {
      let nav = [
         "Picked up",
         "Delivered",
         "Materials",
         "Client",
         "Address",
         "Order nr.",
      ];

      return (
         <section className="admincompletedrightsection">
            <ul className="admincompletednavbar">
               {nav.map((el, i) => {
                  return (
                     <li className="adminsorttable_name" key={i}>
                        {el}
                     </li>
                  );
               })}
            </ul>
            {orders.map((el, i) => {
               return (
                  <ul key={i} className="admincompletednavbarlist">
                     <li className="classname">
                        {" "}
                        {el.state.date.pickUpDate}
                     </li>
                     <li className="classname">
                        {" "}
                        {el.deliverDate?.date || ""}
                     </li>
                     <li className="classname"> {boxes(el)}</li>
                     <li className="classname">
                        {" "}
                        {el.state.address.firstName}
                        <br></br> {el.state.address.lastName}
                     </li>
                     <li>
                        {el.state.address.buildingnrname}&nbsp;
                        {el.state.address.addressLine1}
                        <br />
                        {el.state.address.town}
                        <br />
                        {el.state.address.postcode}
                     </li>
                     <li>
                        U{el.orderNr?.toString().padStart(3, "0")}
                     </li>
                  </ul>
               );
            })}
         </section>
      );
   }

   return (
      <section className="admincompletedordersglobalwrp">
         {renderYears()}

         {renderorders()}
      </section>
   );
}
