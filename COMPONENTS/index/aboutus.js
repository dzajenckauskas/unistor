export default function Aboutus({scrollto}) {
    return (
        <div className="aboutusglobalwrp">
            <div className="aboutusmainwrp">
                <div className="aboutusleftwrp">
                    <div className="aboutusdiamond"></div>
                    <h2 className="aboutusaboutus">About us</h2>

                    <div className="aboutustxt">
                        <div className="aboutusrightlogowrp">
                            <div className="aboutuslogopointhider"></div>
                            <div className="aboutuslogodiamond"></div>
                            uni<br></br>stor
                        </div>
                        <p>{`We began our journey in 2022, with several of our family members currently at university expressing the hassle of finding a reliable, easy and cost sensitive solution for students who require long or short term storage; especially in between terms when you plan to go back home and visit family.`}</p>
                        <br></br>
                        <p>{`Our team went out and visited students at their current universities to gain some market research and we have listened to students when building our website. `}</p>
                        <br></br>
                        <p>{`The feedback we received, and the most common problems student have been facing was the following:`}</p>
                        <br></br>
                        <p>{`Costs – Most students we met their budgets are tight, some local storage depots are extremely expensive and only charge for a certain amount of space even if you only have 5 boxes they will also try and tie you in for a minimum amounts of months. With Unistor you are only charged on the amount of boxes / pieces you store and we give you a monthly cost so there are no hidden fees. `}</p>
                        <br></br>
                        <p>{`Busy – Student life can be busy and most of the students we spoke with, mentioned that websites they visited were not accommodating towards them. We have asked students to test our website and they found it flexible and very straight forward to book and manage their own booking online.`}</p>
                        <br></br>
                        <p>{`Communication – Sometimes you have special requirements, and your standard storage company cannot accommodate you. At Unistor we are always happy to help and you can always call us if your needs are specific. For example, you need your belongings packed the next day, before 10am and its on the 4th floor we will always try and help you with a friendly voice at the end of the line.`}</p>
                        <br></br>
                        <p>{`Trust – Student need to trust companies to store their belongings safely and responsibly, many storage companies do not have any previous knowledge in this industry and outsource the storage with no way of recording what has gone in and out of their warehouse. Our team have been working in storage and removals for over 15 years and to this day have never lost anything in our warehouse. everything is logged and accounted for.`}</p>
                    </div>

                    <div
                        className="aboutusbuttongetintouch"
                        onClick={() => {
                            scrollto();
                        }}
                    >
                        {" "}
                        get in touch with us
                    </div>
                </div>
            </div>
        </div>
    );
}
