import Customersexperiencearea from "../COMPONENTS/index/customersexperiencearea";
import Howitworksarea from "../COMPONENTS/index/howitworksarea";
import HeroArea from "../COMPONENTS/index/heroarea";
import Linebarafterhero from "../COMPONENTS/index/linebarafterhero";
import Studentstoragearea from "../COMPONENTS/index/studentstoragearea";

import Professionalpackigarea from "../COMPONENTS/index/professionalpackigarea";
import Faq from "../COMPONENTS/index/faq";
import Aboutus from "../COMPONENTS/index/aboutus";
import Getintoucharea from "../COMPONENTS/index/getintoucharea";
import { useEffect, useRef, useState } from "react";
import ShowQuoteArea from "../COMPONENTS/global_elements/showquotearea";
import { PageHead } from "../COMPONENTS/global_elements/PageHead";
import { getData } from "../UTILS/getData";

export default function Home({ scrollintoview, homePage }) {
   const [showquote, setshowquote] = useState(false);
   const [hideherowarning, sethideherowarning] = useState<any>(false);
   const propack = useRef(null);
   const howitworks = useRef(null);
   const sutdentStorage = useRef(null);
   const faq = useRef(null);
   const about = useRef(null);
   const contact = useRef(null);
   const top = useRef(null);

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
      <>
         <PageHead
            title={homePage?.data?.attributes?.seo?.seoTitle}
            description={homePage?.data?.attributes?.seo?.seoDescription}
            keywords={homePage?.data?.attributes?.seo?.seoKeywords}
         />
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
      </>
   );
}


export async function getServerSideProps() {
   console.log('lala');

   try {
      const homePage = await getData(`${process.env.NEXT_PUBLIC_API_URL}/api/home-page?populate=seo`)
      console.log(homePage, "homePage");

      return {
         props: {
            homePage,
            error: null
         }
      }
   } catch (error: any) {
      return {
         props: {
            articles: [],
            error: error.message
         }
      }
   }
}

