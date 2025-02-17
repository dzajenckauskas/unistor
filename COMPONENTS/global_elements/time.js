import {useEffect, useState} from "react";
import {times} from "../../HELPERS/variousVariables";

export default function Time({dispatch, state}) {
   const [time, settime] = useState(times[0]);
   const [showtimewrp, setshowtimewrp] = useState(false);

   function timeFormat(time) {
      return (
         <div className="timewrprightdropdown">
            {time}
            <span className="timeafterelm">
               {time === times[0] ? "FREE" : "£25.00"}
            </span>
         </div>
      );
   }

   useEffect(() => {
      if (state?.date?.pickUpTime) {
         settime(state.date.pickUpTime);
      }
   }, []);

   function gentimes() {
      return (
         <ul className="stage4alltimeswrp">
            {times.map((el, i) => {
               return (
                  <li
                     className="timewrprightdropdownliner"
                     key={i}
                     onClick={(e) => {
                        e.stopPropagation();
                        settime(el);
                        setshowtimewrp(false);
                        dispatch(el);
                     }}>
                     {el}
                     <span>
                        <span className="timeafterelm">
                           {el === times[0] ? "FREE" : "£25.00"}
                        </span>
                     </span>
                  </li>
               );
            })}
         </ul>
      );
   }

   return (
      <div
         className="stage4timewrp"
         onClick={() => {
            setshowtimewrp(true);
         }}>
         <div className="timewrpleft">Time:</div>

         {showtimewrp ? gentimes() : timeFormat(time)}

         <div className="arrowdown"></div>
      </div>
   );
}
