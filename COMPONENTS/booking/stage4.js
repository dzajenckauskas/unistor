import {useEffect, useState} from "react";
import {generateDate} from "../../HELPERS/generateDate";
import Calendar from "../global_elements/calendar";
import Time from "../global_elements/time";

export default function Stage4({state, dispatch, pagenr}) {
   useEffect(() => {
      dispatch({t: "pickUpTime", v: "08.00 - 18.00", p: "date"});
   }, []);

   return (
      <div className="stagewrapper">
         <div className="stage4wrp">
            <h3 className="stage3title">
               Select a date for us to come <br></br> pick up your
               stuff
            </h3>

            <Calendar
               pagenr={pagenr}
               state={state}
               showweekends={true}
               dispatch={dispatch}
               priordays={(() => {
                  let md = state?.materials?.packingMaterialsDelivery;
                  let mp = state?.materials?.packingMaterials;
                  if (md && mp) {
                     return generateDate(md, 1, true);
                  }

                  if (!mp) {
                     return generateDate(Date.now(), 4, true);
                  }
               })()}
            />

            <Time
               dispatch={(str) => {
                  dispatch({t: "pickUpTime", v: str, p: "date"});
               }}
               state={state}
            />
            <div className="storageleftbootomwrpsplitter"></div>
         </div>
      </div>
   );
}
