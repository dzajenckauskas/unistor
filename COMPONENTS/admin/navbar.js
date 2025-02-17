import {addonstotypes, types} from "../../HELPERS/variousVariables";
import Image from "next/image";
import {fetchData} from "../../HELPERS/fetchdata";
import {useRouter} from "next/router";

export default function AdminNavbar({setnavbar, showpage}) {
   const router = useRouter();
   return (
      <nav className="adminnavbarwrapper">
         <ul className="adminnavbar">
            {types.map((el, i) => {
               return (
                  <li
                     className={
                        showpage === el
                           ? "adminnavbar_li_clicked"
                           : "adminnavbar_li"
                     }
                     onClick={() => {
                        setnavbar(el);
                     }}
                     key={i}>
                     {el}
                  </li>
               );
            })}
            {addonstotypes.map((el, i) => {
               return (
                  <li
                     className={
                        showpage === el
                           ? "adminnavbar_li_clicked"
                           : "adminnavbar_li"
                     }
                     onClick={() => {
                        setnavbar(el);
                     }}
                     key={i}>
                     {el}
                  </li>
               );
            })}
         </ul>
         <Image
            onClick={async () => {
               let f = await fetchData("/api/logout");

               if (f) {
                  router.push("/admin");
               }
            }}
            className="adminexitimage"
            alt="exit"
            width={24}
            height={24}
            text="sign out"
            src={"/exit.png"}></Image>
      </nav>
   );
}
