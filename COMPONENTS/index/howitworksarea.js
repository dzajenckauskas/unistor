import Image from "next/image";
import box1 from "../../public/index/Step1.svg";
import box2 from "../../public/index/Step2.svg";
import box3 from "../../public/index/Step3.svg";
import box4 from "../../public/index/Step4.svg";
import box5 from "../../public/index/Step5.svg";
import box6 from "../../public/index/Step6.svg";

export default function Howitworksarea({setshowquote}) {
   const hiw = [
      {
         txt: "Order it",
         img: box1,
      },
      {
         txt: "We send you boxes",
         img: box2,
         txt2: "or you can use your own",
      },
      {
         txt: "You pack your things",
         img: box3,
         txt2: "or we can pack it for you",
      },
      {
         txt: "We come to collect",
         img: box4,
      },
      {
         txt: "We store it",
         img: box5,
      },
      {
         txt: "We deliver it when you ready",
         img: box6,
      },
   ];

   return (
      <div className="howitworksareawrapper">
         <div className="howitworkscenterwrp">
            <div className="howitworksdiamond"></div>

            <h2 className="howitworkstitle">How it works</h2>

            <div className="howitworkselementswrp">
               {hiw.map((el, i) => {
                  return (
                     <div className="hoitelliner" key={i}>
                        <div className="howitworksabsolutenr">
                           {i + 1}
                        </div>
                        <h3 className="howitworksinsidetitle">
                           {el.txt}
                        </h3>
                        {el.txt2 ? (
                           <div className="hoittxt2">{el.txt2}</div>
                        ) : null}
                        <Image
                           alt="image explaining how it works"
                           className="howitlinerimg"
                           src={el.img}></Image>
                     </div>
                  );
               })}
            </div>
            <div className="howitworksquotebuttonwrp">
               {" "}
               <button
                  onClick={() => {
                     setshowquote(true);
                  }}
                  className="getquoteorengebutton">
                  {" "}
                  get a quote
               </button>
            </div>
         </div>
      </div>
   );
}
