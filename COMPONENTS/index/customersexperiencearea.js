import {useEffect, useRef, useState} from "react";
import Image from "next/image";
let revs = [
    {
        title: "The experience was really good and simple",
        txt: "The experience was really good and simple. You pack your boxes stick a label and you’re done. The driver arrived within the time period provided by Unistor. Particularly would like to thank you driver, who helped me carry some of the heavy boxes to the ground floor. ",
        author: "University of Oxford, Sam White",
    },
    {
        title: "Big thanks to Chris",
        txt: "Big thanks to Chris who collected my boxes. He contacted me in advance to advise expected arrival time, and arrived as he said he would. He was friendly and helpful when collecting my stuff - it all went really smoothly!",
        author: "University of Cambridge, Darren Radcliffe",
    },
    {
        title: "Really easy to use website and book a collection",
        txt: "Really easy to use website and book a collection. Driver called 10 minutes before to let us know he was on his way. Great experience so you know what to expect and not waste your time waiting around!",
        author: "University of London, Aleksandra Barkowiak",
    },
    {
        title: "Straightforward, honest, and very kind!",
        txt: "Straightforward, honest, and very kind! Charlie answered all my queries and solved all my issues, truly making my day despite the hassle of packing and moving.",
        author: "The University of Manchester, Monika Erminaite",
    },
    {
        title: "Very quick response",
        txt: "Very quick response and they have offered a flexible yet effective solution. They have even advised that they will help me to move my belonging back to India, after I finish Uni!",
        author: "University of Birmingham, Kumar Singh",
    },
];

export default function Customersexperiencearea() {
    const customerswrp = useRef();
    const [page, setpage] = useState(1);

    function stars() {
        let st = [];

        for (let i = 0; i < 5; i++) {
            st.push(
                <div className="customersexpstar" key={i}>
                    <Image
                        width={16}
                        height={16}
                        src={"/smallStar.svg"}
                        alt="star"
                    ></Image>
                </div>
            );
        }

        return st;
    }

    function pageMarker() {
        let pgmrk = [];

        for (let i = 0; i < 5; i++) {
            pgmrk.push(
                <div
                    key={i}
                    onClick={() => {
                        setpage(i + 1);
                    }}
                    className={
                        page - 1 === i
                            ? "pagemarkerfull"
                            : "pagemarkergrey"
                    }
                ></div>
            );
        }
        return pgmrk;
    }

    useEffect(() => {
        let tgt = customerswrp.current;
        tgt.scroll({
            behavior: "smooth",
            top: 0,
            left: tgt.offsetWidth * (page - 1),
        });
        //  anime({ targets: tgt, translateX: 504 * page });
    }, [page]);

    return (
        <div className="customersexperienceareawrp">
            <div className="customersexpcenterwrp">
                <div className="diamond"></div>
                <h2 className="customersrevtitle">
                    Our Customers Experience
                </h2>

                <div className="customersexpreviewswrp">
                    <div
                        className="custexpleftslide"
                        onClick={() => {
                            if (page > 1) {
                                setpage(page - 1);
                            }
                        }}
                    ></div>
                    <div
                        className="customersrevwrp"
                        ref={customerswrp}
                    >
                        {revs.map((el, i) => {
                            return (
                                <div
                                    className="customersreviewelement"
                                    key={i}
                                >
                                    <div className="customersexpstarswrapper">
                                        {stars()}
                                    </div>
                                    <div className="custreveltitle">
                                        {el.title}
                                    </div>
                                    <p className="custreveltxt">
                                        {el.txt}
                                    </p>
                                    <div className="custrevelauthor">
                                        {el.author}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div
                        className="custexprightslide"
                        onClick={() => {
                            if (page < 5) {
                                setpage(page + 1);
                            }
                        }}
                    ></div>
                </div>
                <div className="custextpagemarker">
                    {pageMarker()}
                </div>
            </div>
        </div>
    );
}
