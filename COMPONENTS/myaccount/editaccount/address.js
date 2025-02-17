import {useEffect, useReducer, useRef, useState} from "react";
import {fetchData} from "../../../HELPERS/fetchdata";

const init = {};

function reducer(state, action) {
   let c = {...state};

   c[action.t] = action.v;

   return c;
}

export default function Address({info, setinfo}) {
   const form = useRef();
   const [edit, setedit] = useState(false);
   const [state, dispatch] = useReducer(reducer, init);
   const [button, setbutton] = useState(false);

   let arr = [
      {label: "Building number/name", r: false, t: "text", pos: "buildingnrname"},
      {label: "Address line 1", r: false, t: "text", pos: "addressLine1"},
      {label: "Address line 2", r: false, t: "text", pos: "addressLine2"},
      {label: "Town", r: false, t: "text", pos: "town"},
      {label: "Postcode", r: false, t: "text", pos: "postcode"},
      {label: "Address name", r: false, t: "text", pos: "addressName"},
   ];

   async function submitInfo(e) {
      if (form.current.checkValidity()) {
         e.preventDefault();

         state.type = button === "edit" ? "updateAddress" : "saveAddress";

         let f = await fetchData("/api/myaccount", state);
         if (f) {
            if (button === "edit") {
               let c = JSON.parse(JSON.stringify(info));
               for (const el of c.address) {
                  if (el.id === state.id) {
                     for (const key of Object.keys(state)) {
                        el[key] = state[key];
                     }
                  }
               }
               setinfo(c);
            }

            if (button === "new") {
               let c = JSON.parse(JSON.stringify(info));
               c.address ? c.address.push(state) : (c.address = [state]);

               setinfo(c);
            }

            setedit(false);
         } else {
            alert("something went wrong");
         }
      }
   }

   function personalDetails(params) {
      return (
         <div className="personal-info-details">
            <h4>Address</h4>
            <div className="pd-address-map">
               {info?.address?.map((el, i) => {
                  return (
                     <ul className="personal-info-list" key={i}>
                        <li className="personal-info-li-bold">{el.addressName}</li>
                        <li>{el.buildingnrname}</li>
                        <li>{el.addressLine1}</li>
                        <li>{el.addressLine2}</li>
                        <li>{el.town}</li>
                        <li>{el.postcode}</li>
                        <div
                           className="personal-info-details-edit-button-inside"
                           onClick={() => {
                              for (const pos of arr) {
                                 dispatch({t: pos.pos, v: el[pos.pos]});
                              }
                              dispatch({t: "id", v: el.id});
                              setedit(true);
                              setbutton("edit");
                           }}>
                           Edit
                        </div>
                     </ul>
                  );
               })}
            </div>
            <div
               className="personal-info-details-edit-button"
               onClick={() => {
                  setbutton("new");

                  for (const el of arr) {
                     dispatch({t: el.pos, v: ""});
                  }
                  setedit(true);
                  setbutton("new");
               }}>
               Add new address
            </div>
         </div>
      );
   }

   function personalDetailsEdit(params) {
      return (
         <div className="personal-info-details-edit">
            <h4>Address</h4>

            <form onSubmit={submitInfo} ref={form} className="personal-info-details-edit-form">
               {arr.map((el, i) => {
                  return (
                     <label className="myaccount-edit-label" key={i}>
                        {el.label}
                        <input
                           required={el.r}
                           type={el.t}
                           maxLength={"100"}
                           value={state[el.pos] || ""}
                           onChange={(e) => {
                              dispatch({t: el.pos, v: e.target.value});
                           }}
                           className="myaccount-edit-input"></input>
                     </label>
                  );
               })}
               <button className="personal-info-submit-button" type="submit">
                  save changes
               </button>
            </form>
         </div>
      );
   }

   if (edit) {
      return personalDetailsEdit();
   } else {
      return personalDetails();
   }
}
