import {COOKIE_NAME_PRERENDER_BYPASS} from "next/dist/server/api-utils";
import Image from "next/image";
import pfaimg from "../../public/index/Pro-packing.svg";

export default function Professionalpackigarea({setshowquote}) {
   return (
      <div className="professionalpackingareawrp">
         <div className="profareacenterwrp">
            <div className="profarealeftimg">
               <Image
                  alt="box with stuff inside"
                  className="pfaimg"
                  src={pfaimg}></Image>
            </div>

            <div className="pfarigttwrp">
               <div className="pfareadiamond"></div>
               <h2 className="pfareatitle">Professional packing</h2>
               <div className="pfareatxt">
                  <p>{`We can pack your belongings for you if you don’t have the time!`}</p>
                  <br></br>
                  <p>{`Using our high-quality packing materials, we can come in and pack your belongings professionally for you. Our drivers will also take inventory of everything we have packed so you know what’s in each box.`}</p>
                  <br></br>
                  <p>{`We can organise a packing service for you by selecting on your online form or simply call us or email us to advise that such service will be required and a member of our team can make these arrangements for you.`}</p>
               </div>

               <button
                  onClick={() => {
                     setshowquote(true);
                  }}
                  className="pfareagetquotebutton">
                  get a quote
               </button>
            </div>
         </div>
      </div>
   );
}
