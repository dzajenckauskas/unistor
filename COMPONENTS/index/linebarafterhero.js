import Image from "next/image";
import face from "/public/index/face.png";
import coins from "/public/index/coins.png";
import truck from "/public/index/truck.png";

export default function Linebarafterhero() {
   return (
      <section className="linebarafterherowrp">
         <div className="lbafterheroinsidewrp">
            <div className="lbafterheroeml">
               <Image alt="happy face" width={48} src={face}></Image>
               <p className="linertxt">
                  Over &nbsp;
                  <span className="lbafterherostrongertxt">
                     13,000+ &nbsp;
                  </span>
                  happy customers & counting
               </p>
            </div>

            <div className="lbafterheroeml">
               <Image alt="coins" width={48} src={coins}></Image>
               <p className="linertxt">
                  <span className="lbafterherostrongertxt">
                     Low cost &nbsp;
                  </span>
                  student storage. No hidden fees.
               </p>
            </div>

            <div className="lbafterheroeml">
               <Image alt="truck" height={48} src={truck}></Image>
               <p className="linertxt">
                  Store your things without having to leave your&nbsp;
                  <span className="lbafterherostrongertxt">
                     Home!
                  </span>
               </p>
            </div>
         </div>
      </section>
   );
}
