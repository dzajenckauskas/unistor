import {useEffect, useReducer, useRef, useState} from "react";
import {fetchData} from "../../../HELPERS/fetchdata";

const init = {};

function reducer(state, action) {
   let c = {...state};

   c[action.t] = action.v;

   return c;
}

export default function PersonalDetails({info}) {
   const form = useRef();
   const [edit, setedit] = useState(false);
   const [state, dispatch] = useReducer(reducer, init);
   const [error, seterror] = useState(false);

   function personalDetails(params) {
      return (
         <div className="personal-info-details">
            <h4>Password</h4>
            <ul className="personal-info-list">
               <li>********</li>
            </ul>
            <div
               className="personal-info-details-edit-button"
               onClick={() => {
                  setedit(true);
               }}>
               Edit
            </div>
         </div>
      );
   }

   async function submitInfo(e) {
      if (form.current.checkValidity()) {
         e.preventDefault();

         let ch = state.newPassword === state.passwordRepeat;

         if (!ch) {
            seterror("Passwords does not match");
         } else {
            seterror(false);
            state.type = "changePassword";
            let f = await fetchData("/api/myaccount", state);
            if (f) {
               setedit(false);
            } else {
               alert("something went wrong");
            }
         }
      }
   }

   function personalDetailsEdit(params) {
      let arr = [
         {label: "Current password", r: true, t: "password", pos: "password"},
         {label: "New password", r: true, t: "password", pos: "newPassword"},
         {label: "Confirm new password", r: true, t: "password", pos: "passwordRepeat"},
      ];

      return (
         <div className="personal-info-details-edit">
            <h4>Change password</h4>

            <form onSubmit={submitInfo} ref={form} className="personal-info-details-edit-form">
               {arr.map((el, i) => {
                  return (
                     <label className="myaccount-edit-label" key={i}>
                        {el.label}
                        <input
                           required={el.r}
                           type={el.t}
                           minLength={"8"}
                           maxLength={"100"}
                           value={state[el.pos] || ""}
                           onChange={(e) => {
                              dispatch({t: el.pos, v: e.target.value.trim()});
                           }}
                           className="myaccount-edit-input"></input>
                     </label>
                  );
               })}
               {error ? <p className="myaccount-password-error">{error}</p> : null}
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
