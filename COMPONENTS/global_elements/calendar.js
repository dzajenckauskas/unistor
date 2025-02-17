import {createElement, useEffect, useState} from "react";
import {dateFormatConverter} from "../../HELPERS/dateformatconverter";
import {months, weekdays} from "../../HELPERS/variousVariables";

export default function Calendar({
    state,
    dispatch,
    priordays,
    showweekends,
    pagenr,
    orderedit,
}) {
    let [year, setyear] = useState("");
    let [month, setmonth] = useState("");
    let [day, setday] = useState("");

    let [daystorender, setdaystorender] = useState([]);
    const [clickedday, setclickedday] = useState("");

    useEffect(() => {
        let date = new Date(priordays);
        let y = date.getFullYear();
        let m = date.getMonth();
        setyear(y);
        setmonth(m);
        let d = date.getDate();
        setday(d);
    }, []);
    useEffect(() => {
        let pmd = state?.materials?.packingMaterialsDelivery;
        let pud = state?.date?.pickUpDate;

        if (pmd && pagenr === 3) {
            setclickedday(new Date(pmd).toDateString());
        } else if (pud && pagenr === 4) {
            if (pmd) {
                setclickedday(new Date(priordays).toDateString());
            } else {
                setclickedday(new Date(pud).toDateString());
            }
        } else {
            setclickedday(new Date(priordays).toDateString());
        }
    }, []);

    function arrowLeft(params) {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth();
        if (month !== m || year !== y) {
            if (month === 0) {
                setyear(--year);
                setmonth(11);
            } else {
                setmonth(--month);
            }
        }
    }
    function arrowRight() {
        if (month === 11) {
            setyear(++year);
            setmonth(0);
        } else {
            setmonth(++month);
        }
    }

    useEffect(() => {
        if (clickedday) {
            dispatch({
                t: "pickUpDate",
                v: dateFormatConverter(clickedday),
                p: "date",
            });
        }
    }, [clickedday]);

    useEffect(() => {
        if (typeof year === "number" && typeof month === "number") {
            let totalMonthDays = new Date(year, month + 1, 0);
            let days = [];
            let firstweekday = new Date(year, month, 0).getDay();
            let previousmonthdayscount = new Date(
                year,
                month,
                0
            ).getDate();

            for (let i = 0; i < totalMonthDays.getDate(); i++) {
                let dt = new Date(year, month, i + 1);
                let day = dt.getDay();
                let ds = dt.toDateString();

                let cn = "calendar-current-month-day";

                ///
                if (clickedday === ds) {
                    cn = cn + ` clicked-month-day`;
                }
                if (orderedit) {
                    if (new Date(ds) > new Date(Date.now())) {
                        cn = cn + ` calendar-day`;
                    }
                }

                if (new Date(ds) > new Date(priordays)) {
                    cn = cn + ` calendar-day`;
                }
                if (ds === new Date(priordays).toDateString()) {
                    cn = cn + ` calendar-day`;
                }
                if (new Date(Date.now()).toDateString() === ds) {
                    cn = cn + ` calendar-current-day`;
                }
                if (!showweekends) {
                    if (day === 6 || day === 0) {
                        cn = cn + ` calendar-day-grey`;
                    }
                }
                ///

                let elm = createElement(
                    "div",
                    {
                        className: cn,
                        key: i + "c",
                        onClick: () => {
                            if (cn.includes("calendar-day")) {
                                setclickedday(ds);
                            }
                        },
                    },
                    i + 1
                );

                days.push(elm);
            }

            for (let i = 0; i < firstweekday; i++) {
                days.unshift(
                    <div
                        className={`calendar-current-month-day calendar-day calendar-day-grey`}
                        key={i + "p"}
                    >
                        {/* {previousmonthdayscount - i} */}
                    </div>
                );
            }
            let neededLength = Math.ceil(days.length / 7) * 7;
            let i = 1;
            while (days.length < neededLength) {
                days.push(
                    <div
                        className="calendar-current-month-day calendar-day calendar-day-grey"
                        key={i + "f"}
                    >
                        {" "}
                        {/* {i} */}
                    </div>
                );
                i++;
            }

            setdaystorender(days);
        }
    }, [year, month, clickedday]);

    return (
        <div className="stage4-calendar">
            <div className="calendar-year-and-month">
                <div
                    className="calendar-left-arrow"
                    onClick={arrowLeft}
                ></div>

                <div className="calendar-month">{months[month]}</div>
                <div className="calendar-year">{year}</div>

                <div
                    className="calendar-right-arrow"
                    onClick={arrowRight}
                ></div>
            </div>

            <div className="calendar-bottom">
                {weekdays.map((el, i) => {
                    return (
                        <div className="calendar-weekday" key={el}>
                            {el}
                        </div>
                    );
                })}
                {daystorender.map((day, i) => {
                    return day;
                })}
            </div>
        </div>
    );
}
