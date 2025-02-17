import {useEffect, useRef} from "react";

export default function Stage1({state, dispatch, clickNext}) {
   const form = useRef();

   function submitForm(e) {
      if (form.current.checkValidity()) {
         e.preventDefault();
         clickNext(Date.now());
      }
   }

   let boxes = [
      {name: "Small box", obj: "smallBox"},
      {name: "Medium  suitcase", obj: "mediumSuitcase"},
      {name: "Medium box", obj: "mediumBox"},
      {name: "Large  suitcase", obj: "largeSuitcase"},
      {name: "Large box", obj: "largeBox"},
   ];
   let otherStuff = [
      {name: "Bike", obj: "bike", txt2: "Must be in a box"},
      {name: "Guitar", obj: "guitar", txt2: "Must be in a box"},
      {name: "Keyboard", obj: "keyboard", txt2: "Must be in a box"},
      {name: "TV", obj: "tv", txt2: "Must be in a box"},
      {name: "Clothes rack", obj: "clothesRack"},
      {name: "Ironing board", obj: "ironingBoard"},
      {
         name: "Other small item",
         obj: "otherSmallItem",
         txt2: "Must be smaller than 150cm\nin combined lenght, width and height",
      },
   ];

   return (
      <div className="stagewrapper">
         <h2 className="stagetitle">Select your storage</h2>

         <div className="stagemainbottomwrapper">
            <section className="stagewrapperleftwrp">
               <h3 className="stagewrapperlefttitle">
                  Select number of boxes or suitcases you would like
                  to store
               </h3>

               <div className="storageleftboxeswrapper">
                  {boxes.map((el) => {
                     return (
                        <div
                           className="storageleftboxliner"
                           key={el.obj}>
                           <form
                              id="stage-form"
                              ref={form}
                              onSubmit={submitForm}
                              className="boxlinerinputwrp">
                              <span
                                 className="boxlinertoparrow"
                                 onClick={() => {
                                    dispatch({
                                       t: el.obj,
                                       v: state.storage[el.obj]
                                          ? state.storage[el.obj] + 1
                                          : 1,
                                       p: "storage",
                                    });
                                 }}>
                                 {" "}
                              </span>{" "}
                              <input
                                 step="any"
                                 min={0}
                                 max={99}
                                 onChange={(e) => {
                                    if (e.target.value.length < 3) {
                                       dispatch({
                                          t: el.obj,
                                          v: parseInt(e.target.value),
                                          p: "storage",
                                       });
                                    }
                                 }}
                                 value={
                                    state.storage[el.obj] > 0
                                       ? state.storage[
                                            el.obj
                                         ].toString()
                                       : 0
                                 }
                                 type={"number"}
                                 className={
                                    state.storage[el.obj] &&
                                    state.storage[el.obj] !== 0
                                       ? "boxlinerinputmarked"
                                       : "boxlinerinput"
                                 }></input>{" "}
                              <span
                                 className="boxlinerbottomarrow"
                                 onClick={() => {
                                    dispatch({
                                       t: el.obj,
                                       v:
                                          state.storage[el.obj] &&
                                          state.storage[el.obj] !== 0
                                             ? state.storage[el.obj] -
                                               1
                                             : null,
                                       p: "storage",
                                    });
                                 }}></span>
                           </form>
                           <div className="classname">{el.name}</div>
                        </div>
                     );
                  })}
               </div>
               <div className="stagewrappersplitter"></div>
               <section className="stagewrapperleftbootwrp">
                  <h3 className="stagewrapperlefttitlebottom">
                     Got a bike, furniture or <br></br> other stuff?
                  </h3>

                  <p className="stgwrpbottomexplainer">
                     Your larger box or furniture must be able to be
                     lifted and moved by our driver. Your box or piece
                     of furniture cannot have a combined width, height
                     and length greater than 150cm. Our drivers will
                     refuse the collection of your larger box or
                     furniture if it exceeds 150cm.
                  </p>
                  <div className="storageleftitemswrapper">
                     {otherStuff.map((el) => {
                        return (
                           <div
                              className="storageleftboxliner"
                              key={el.obj}>
                              <div className="boxlinerinputwrp">
                                 <span
                                    className="boxlinertoparrow"
                                    onClick={() => {
                                       dispatch({
                                          t: el.obj,
                                          v: state.storage[el.obj]
                                             ? state.storage[el.obj] +
                                               1
                                             : 1,
                                          p: "storage",
                                       });
                                    }}>
                                    {" "}
                                 </span>{" "}
                                 <input
                                    step="any"
                                    min={0}
                                    max={99}
                                    onChange={(e) => {
                                       if (
                                          e.target.value.length < 3
                                       ) {
                                          dispatch({
                                             t: el.obj,
                                             v: parseInt(
                                                e.target.value
                                             ),
                                             p: "storage",
                                          });
                                       }
                                    }}
                                    value={
                                       state.storage[el.obj] > 0
                                          ? state.storage[
                                               el.obj
                                            ].toString()
                                          : 0
                                    }
                                    type={"number"}
                                    className={
                                       state.storage[el.obj] &&
                                       state.storage[el.obj] !== 0
                                          ? "boxlinerinputmarked"
                                          : "boxlinerinput"
                                    }></input>{" "}
                                 <span
                                    className="boxlinerbottomarrow"
                                    onClick={() => {
                                       dispatch({
                                          t: el.obj,
                                          v:
                                             state.storage[el.obj] &&
                                             state.storage[el.obj] !==
                                                0
                                                ? state.storage[
                                                     el.obj
                                                  ] - 1
                                                : null,
                                          p: "storage",
                                       });
                                    }}></span>
                              </div>
                              <div className="storageboxnamewrp">
                                 <div className="classname">
                                    {el.name}
                                 </div>
                                 {el.txt2 ? (
                                    <div className="txt2txt">
                                       {el.txt2}
                                    </div>
                                 ) : null}
                              </div>
                           </div>
                        );
                     })}
                  </div>
                  <div className="storageleftbootomwrpsplitter"></div>
               </section>
            </section>
         </div>
      </div>
   );
}
