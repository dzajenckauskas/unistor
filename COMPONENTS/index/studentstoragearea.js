import Image from "next/image";

import sstimg from "../../public/index/Student-storage.svg";

export default function Studentstoragearea({setshowquote}) {
   return (
      <div className="studentstorageareawrp">
         <div className="studentstorageleftwrp">
            <div className="sstoragediamond"></div>
            <h2 className="sstoragetitle">Student storage</h2>
            <div className="sstrgtxt">
               <p>{`
Whether you’re storing a few boxes over the summer or your whole flat during your year abroad, we have got you covered. `}</p>
               <br></br>
               <p>{`When you’re ready, simply get a free quotation on our website and book in for the next available collection date. We don’t ask for any commitment in regards to length of time you wish to store. When you want your belongings returned - simply log back into your account and schedule your return, we will bring it all back to your chosen UK address, even if it is a new location.`}</p>
            </div>
            <button
               onClick={() => {
                  setshowquote(true);
               }}
               className="getquoteorengebutton">
               {" "}
               get a quote
            </button>
         </div>

         <div className="studentsstoragerightimgwrp">
            <Image
               alt="student sitting on the box"
               className="sstgimg"
               src={sstimg}></Image>
         </div>
      </div>
   );
}
