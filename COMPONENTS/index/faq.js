import {useState} from "react";

let faqs = [
   {
      q: "How does it work?",
      a: `1. Simply fill in our 5 steps online form to book your collection<br></br>2. Pay for your first month of storage, plus any additions you would like to add.<br></br>3. We can send you packing boxes (if you require)<br></br>4. We will come to collect your belongings on your required date (we can pack for you if you require)<br></br>5. We bring back to store.<br></br>6. Once you are ready for your items to be returned, simply log in to our portal and book the next available slot.<br></br>7. Pay the outstanding amount for number of months your goods have been in store.`,
   },
   {
      q: "How quickly will my stuff be collected and delivered?",
      a: `You can choose when you’d like your stuff to be collected / delivered when booking through our website.`,
   },
   {
      q: "What are collection times?",
      a: `So there are few options, we can offer 08:00 – 18:00 slot which is completely free of charge, but also you can choose AM or PM collection for an additional £25.00, but no matter what option you have chosen we will email you day prior and provide 3 hours window, so you don’t get stuck all day in-doors 😊`,
   },
   {
      q: "Will you collect and store my furniture?",
      a: `Yes, using our online booking system you can add bits such as Bike, Guitar, Keyboard, TV, Clothes rack, Ironing board or Other small items which can’t exceed 150cm combined length, width and height`,
   },
   {
      q: "I have got a larger furniture that require 2 man?",
      a: `If such is the case, please get in touch via email or phone and we will be able to help, but would need to generate a dedicated quote.`,
   },
   {
      q: "How is Unistor different from self-storage?",
      a: `Our storage is much more convenient than traditional self-storage because you don’t have to leave home or drive to a storage unit. We can do all the work for you!<br></br>
      It’s also cheaper because you can pay based on exactly how many pieces you  have, rather than a standard storage unit that you might not fill. 
      You also don’t have to commit to an exact date you want your belongings returned you can do this whenever you are ready and pay as you go.`,
   },
   {
      q: "Can you do packing?",
      a: `Absolutely, once the booking is completed, please call us or email us on hello@unistor.co.uk, for us to arrange such.`,
   },
];

export default function Faq({scrollto}) {
   const [button, setButton] = useState(false);

   return (
      <div className="faqglobalwrp">
         <div className="faqcenterwrp">
            <div className="faqdiamond"></div>
            <h2 className="faqtxt">Frequently Asked Questions</h2>

            <div className="faqquwrp">
               {faqs.map((f, i) => {
                  return (
                     <div className="faqquliner" key={i}>
                        <div className="faqqlinerleftwrp">
                           <div className="faqqulinerqu">{f.q}</div>
                           <div
                              className={
                                 button === i
                                    ? "faqqulinera"
                                    : "faqqulinerahidden"
                              }
                              dangerouslySetInnerHTML={{
                                 __html: f.a,
                              }}></div>
                        </div>
                        <div className="faqqulinerrightwrp">
                           <button
                              className={
                                 i === button
                                    ? "gaqqulineropenqbuttonclicked"
                                    : "gaqqulineropenqbutton"
                              }
                              onClick={() => {
                                 setButton(button === i ? false : i);
                              }}>
                              {button === i ? "-" : "+"}
                           </button>
                        </div>
                     </div>
                  );
               })}
            </div>
            <div
               className="cantfindanswerbutton"
               onClick={() => {
                  scrollto();
               }}>
               {"can't find your answer? ask us "}
            </div>
         </div>
      </div>
   );
}





