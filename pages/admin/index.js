import {useRef, useState} from "react";
import {fetchData} from "../../HELPERS/fetchdata";
import {useRouter} from "next/dist/client/router";

export default function Loginform() {
   const form = useRef();
   const router = useRouter();

   const [name, setname] = useState("");
   const [pass, setpass] = useState("");

   async function login(e) {
      e.preventDefault();
      if (form.current.checkValidity()) {
         let f = await fetchData("/api/admin/login", {name, pass});

         if (!f) {
            alert("Something went wrong");
         } else {
            router.push("/admin/connected");
         }
      }
   }

   return (
      <section className="adminloginsection">
         <form className="adminloginform" ref={form} onSubmit={login}>
            <input
               required
               placeholder="name"
               type="text"
               className="classname"
               name="name"
               value={name || ""}
               onChange={(e) => {
                  setname(e.target.value);
               }}
            />
            <input
               type="password"
               required
               name="password"
               placeholder="password"
               className="classname"
               value={pass || ""}
               onChange={(e) => {
                  setpass(e.target.value);
               }}
            />
            <button className={"adminloginbutton"} type="submit">
               Login
            </button>
         </form>
      </section>
   );
}
