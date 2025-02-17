import {useRef} from "react";
import {dateFormatConverter} from "../../HELPERS/dateformatconverter";
import {generateDate} from "../../HELPERS/generateDate";
import Calendar from "../global_elements/calendar";

export default function Stage3({
   state,
   dispatch,
   items,
   clickNext,
   pagenr,
}) {
   const form = useRef();

   function submitForm(e) {
      if (form.current.checkValidity()) {
         e.preventDefault();
         clickNext(Date.now());
      }
   }

   return (
      <div className="stagewrapper">
         <div className="stage3wrp">
            <h3 className="stage3title">
               Would you like <br></br> packing materials?
            </h3>

            <p className="stage3packingtitle2">
               {
                  "We'll send you enough to pack everything you want to store."
               }
            </p>

            <div className="stage3radiobuttons">
               <div className="page3rbwrp">
                  <div
                     className="page3rb"
                     onClick={() => {
                        dispatch({
                           t: "packingMaterials",
                           v: true,
                           p: "materials",
                        });
                     }}>
                     {state.materials.packingMaterials ? (
                        <div className="page3rbinside"></div>
                     ) : null}
                  </div>

                  <div
                     className="page3txt"
                     onClick={() => {
                        dispatch({
                           t: "packingMaterials",
                           v: true,
                           p: "materials",
                        });
                     }}>
                     <div className="classname">
                        {`Yes (expected materials delivery: ${dateFormatConverter(
                           generateDate(
                              Date.now(),
                              4,
                              false
                           ).toDateString("gb-GB")
                        )})`}
                     </div>

                     <div className="earliestcollpage3">
                        {`Earliest storage collection: ${dateFormatConverter(
                           generateDate(Date.now(), 7).toDateString(
                              "gb-GB"
                           )
                        )}`}
                     </div>
                  </div>
               </div>

               <div className="page3rbwrp">
                  <div
                     className="page3rb"
                     onClick={() => {
                        dispatch({
                           t: "packingMaterials",
                           v: false,
                           p: "materials",
                        });
                     }}>
                     {!state.materials.packingMaterials ? (
                        <div className="page3rbinside"></div>
                     ) : null}
                  </div>
                  <div
                     className="page3txt"
                     onClick={() => {
                        dispatch({
                           t: "packingMaterials",
                           v: false,
                           p: "materials",
                        });
                     }}>
                     <div className="classname">No</div>
                     <div className="earliestcollpage3">
                        {`Earliest storage collection: ${dateFormatConverter(
                           generateDate(
                              Date.now(),
                              4,
                              true
                           ).toDateString("gb-GB")
                        )}`}
                     </div>
                  </div>
               </div>
               {state.materials.packingMaterials ? (
                  <Calendar
                     state={state}
                     pagenr={pagenr}
                     priordays={(() => {
                        return generateDate(Date.now(), 4, false);
                     })()}
                     dispatch={(t) => {
                        if (t.v) {
                           dispatch({
                              t: "packingMaterialsDelivery",
                              v: t.v,
                              p: "materials",
                           });
                        }
                     }}
                  />
               ) : null}
               {state.materials.packingMaterials ? (
                  <div className="stage3calendarspacer"></div>
               ) : null}
            </div>
            <div className="storageleftbootomwrpsplitter"></div>
            {state.materials.packingMaterials ? (
               <h3 className="stage3title2">
                  What packing materials would you like?
               </h3>
            ) : null}
            {state.materials.packingMaterials ? (
               <div className="storageleftitemswrapper">
                  {items.packingMaterials.map((el) => {
                     return (
                        <div
                           className="storageleftboxliner"
                           key={el.pos}>
                           <form
                              className="boxlinerinputwrp"
                              id="stage-form"
                              ref={form}
                              onSubmit={submitForm}>
                              <span
                                 className="boxlinertoparrow"
                                 onClick={() => {
                                    dispatch({
                                       t: el.pos,
                                       v: state.materials[el.pos]
                                          ? state.materials[el.pos] +
                                            1
                                          : 1,
                                       p: "materials",
                                    });
                                 }}></span>
                              <input
                                 step="any"
                                 min={0}
                                 max={99}
                                 onChange={(e) => {
                                    if (e.target.value.length < 3) {
                                       dispatch({
                                          t: el.pos,
                                          v: parseInt(e.target.value),
                                          p: "materials",
                                       });
                                    }
                                 }}
                                 value={
                                    state.materials[el.pos] > 0
                                       ? state.materials[
                                            el.pos
                                         ].toString()
                                       : 0
                                 }
                                 type={"number"}
                                 className={
                                    state.materials[el.pos] &&
                                    state.materials[el.pos] !== 0
                                       ? "boxlinerinputmarked"
                                       : "boxlinerinput"
                                 }></input>{" "}
                              <span
                                 className="boxlinerbottomarrow"
                                 onClick={() => {
                                    dispatch({
                                       t: el.pos,
                                       v:
                                          state.materials[el.pos] &&
                                          state.materials[el.pos] !==
                                             0
                                             ? state.materials[
                                                  el.pos
                                               ] - 1
                                             : null,
                                       p: "materials",
                                    });
                                 }}></span>
                           </form>
                           <div className="storageboxnamewrp">
                              <div className="classname">
                                 {el.name}
                              </div>

                              {items.packingMaterials.map(
                                 (item, i) => {
                                    if (
                                       item.pos === el.pos &&
                                       parseFloat(item.price).toFixed(
                                          2
                                       )
                                    ) {
                                       return (
                                          <div
                                             className="txt2txt"
                                             key={i}>
                                             &#163;
                                             {parseFloat(
                                                item.price
                                             ).toFixed(2)}
                                          </div>
                                       );
                                    }
                                 }
                              )}
                           </div>
                        </div>
                     );
                  })}
               </div>
            ) : null}
            {state.materials.packingMaterials ? (
               <div className="storageleftbootomwrpsplitter"></div>
            ) : null}
         </div>
      </div>
   );
}
