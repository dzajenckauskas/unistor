import Customersexperiencearea from "../COMPONENTS/index/customersexperiencearea";
import Howitworksarea from "../COMPONENTS/index/howitworksarea";
import HeroArea from "../COMPONENTS/index/heroarea";
import Linebarafterhero from "../COMPONENTS/index/linebarafterhero";
import Studentstoragearea from "../COMPONENTS/index/studentstoragearea";

import Professionalpackigarea from "../COMPONENTS/index/professionalpackigarea";
import Faq from "../COMPONENTS/index/faq";
import Aboutus from "../COMPONENTS/index/aboutus";
import Getintoucharea from "../COMPONENTS/index/getintoucharea";
import {useEffect, useRef, useState} from "react";
import ShowQuoteArea from "../COMPONENTS/global_elements/showquotearea";

export default function Home({scrollintoview}) {
   const [showquote, setshowquote] = useState(false);
   const [hideherowarning, sethideherowarning] = useState(false);
   const propack = useRef();
   const howitworks = useRef();
   const sutdentStorage = useRef();
   const faq = useRef();
   const about = useRef();
   const contact = useRef();
   const top = useRef();

   useEffect(() => {
      document.body.style.overflow = "auto";
   }, []);

   useEffect(() => {
      setshowquote(false);
      sethideherowarning(Date.now());

      switch (scrollintoview) {
         case "How it works?":
            scrollinto(howitworks.current);
            break;
         case "top":
            scrollinto(top.current);
            break;
         case "Student storage":
            scrollinto(sutdentStorage.current);
            break;
         case "Professional packing":
            scrollinto(propack.current);
            break;
         case "FAQ":
            scrollinto(faq.current);
            break;
         case "About us":
            scrollinto(about.current);
            break;
         case "Contact us":
            scrollinto(contact.current);
            break;
         default:
            break;
      }
   }, [scrollintoview]);

   function scrollinto(el) {
      el.scrollIntoView({
         behavior: "smooth",
         block: "start",
         inline: "nearest",
      });
   }

   return (
      <div className="indexglobalwrapper">
         {showquote ? (
            <ShowQuoteArea
               setshowquote={(v) => {
                  setshowquote(v);
               }}
            />
         ) : null}
         <section ref={top}>
            <HeroArea hideherowarning={hideherowarning} />
         </section>
         <section>
            <Linebarafterhero />
         </section>
         <section ref={howitworks}>
            <Howitworksarea
               setshowquote={(v) => {
                  setshowquote(v);
               }}
            />
         </section>
         <section ref={sutdentStorage}>
            <Studentstoragearea
               setshowquote={(v) => {
                  setshowquote(v);
               }}
            />
         </section>
         <section ref={propack}>
            <Professionalpackigarea
               setshowquote={(v) => {
                  setshowquote(v);
               }}
            />
         </section>
         <section>
            <Customersexperiencearea />
         </section>
         <section ref={faq}>
            <Faq
               scrollto={() => {
                  scrollinto(contact.current);
               }}
            />
         </section>
         <section ref={about}>
            <Aboutus
               scrollto={() => {
                  scrollinto(contact.current);
               }}
            />
         </section>
         <section ref={contact}>
            <Getintoucharea />
         </section>
      </div>
   );
}
