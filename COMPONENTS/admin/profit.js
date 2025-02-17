import {useEffect, useState} from "react";
import {fetchData} from "../../HELPERS/fetchdata";

export default function Profit() {
    const [dropdown, setdropdown] = useState(
        new Date().getFullYear()
    );
    const [datalist, setdatalist] = useState([]);
    const [yearlylist, setyearlylist] = useState([]);
    const [showdropdown, setshowdropdown] = useState(false);
    const [totalrevenue, settotalrevenue] = useState(0);
    const [totalprofit, settotalprofit] = useState(0);
    const [table, settable] = useState("");

    useEffect(() => {
        async function getyearlydata() {
            let f = await fetchData("/api/admin/profit", {
                type: "getYear",
                year: dropdown,
            });
            if (f) {
                setdatalist(f.list);
            }
        }
        if (dropdown) {
            getyearlydata();
        }
    }, [dropdown]);

    useEffect(() => {
        (async () => {
            let f = await fetchData("/api/admin/profit", {
                type: "getAllYearsList",
            });
            if (f) {
                setyearlylist(f.orders);
            }
        })();
    }, []);

    function showdropdownfn(params) {
        return (
            <ul className="profitearlylistwrp">
                {yearlylist.map((el, i) => {
                    return (
                        <li
                            className="profitearlylistwrpliner"
                            key={el}
                            onClick={() => {
                                setdropdown(el);
                            }}
                        >
                            {el}
                        </li>
                    );
                })}
            </ul>
        );
    }

    function selectAyearwrp() {
        return (
            <section className="selectayearinsidewrp">
                <p>Select a year:</p> &nbsp;&nbsp;
                <div
                    className="profitselectyearbutton"
                    onClick={() => {
                        setshowdropdown(showdropdown ? false : true);
                    }}
                >
                    {dropdown}
                    {showdropdown ? showdropdownfn() : null}
                    <p> &#8964;</p>
                </div>
            </section>
        );
    }

    function colorfulboxeswrp() {
        return (
            <section className="colorfulboxeswrpprofit">
                <div className="profitcolorfulboxesbox boxpink">
                    <strong>Total revenue</strong>
                    <p>£{totalrevenue}</p>
                </div>
                <div className="profitcolorfulboxesbox boxviolet">
                    <strong>Number of jobs </strong>
                    <p>{datalist.length}</p>
                </div>
                <div className="profitcolorfulboxesbox ">
                    <strong>Gross operating profit</strong>
                    <p>£{totalprofit}</p>
                </div>
            </section>
        );
    }

    useEffect(() => {
        if (datalist) {
            let calculated = [];
            let totalrev = 0;
            let totalprof = 0;
            let months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            let lefttitles = [
                "",
                "Revenue",
                "Expense",
                "Materials",

                "Stripe",
                "Profit",
                "Jobs",
            ];

            function calculateRevenueAndStripe(order) {
                function calculateStripe(v) {
                    let st = 0;
                    st = (1.4 * v) / 100 + 0.2;
                    return st;
                }

                let rev = 0;
                let str = 0;
                rev =
                    rev +
                    parseFloat(order.paymentIntent.amount / 100);
                str =
                    str +
                    calculateStripe(
                        parseFloat(order.paymentIntent.amount / 100)
                    );

                rev =
                    rev +
                    parseFloat(
                        order.finalPayment.payment.amount / 100
                    );
                str =
                    str +
                    calculateStripe(
                        parseFloat(
                            order.finalPayment.payment.amount / 100
                        )
                    );

                if (order.customPayments) {
                    for (const pay of order.customPayments) {
                        rev =
                            rev +
                            parseFloat(pay.payment.amount / 100);
                        str =
                            str +
                            calculateStripe(
                                parseFloat(pay.payment.amount / 100)
                            );
                    }
                }

                return {rev, str};
            }

            function calculateMaterialsExpensePrice(order) {
                let exp = 0;

                if (order?.state?.materials?.packingMaterials) {
                    if (order?.state?.materials?.mediumBoxEmpty) {
                        let mbe =
                            order.state.materials.mediumBoxEmpty * 5;
                        exp = exp + mbe;
                    }
                    if (order?.state?.materials?.largeBoxEmpty) {
                        let lbe =
                            order.state.materials.largeBoxEmpty * 5;
                        exp = exp + lbe;
                    }
                    if (order?.state?.materials?.packingTape) {
                        let pbe =
                            order.state.materials.packingTape * 2;
                        exp = exp + pbe;
                    }
                }

                return exp;
            }

            function calculateExpense(order) {
                let exp = 0;
                if (order?.state?.additionalCosts) {
                    for (const el of order?.state?.additionalCosts) {
                        exp = exp + parseFloat(el.price);
                    }
                }

                return exp;
            }

            for (const [i, month] of months.entries()) {
                let obj = {
                    month: [i, month],
                    revenue: 0,
                    expense: 0,
                    materials: 0,

                    stripe: 0,
                    profit: 0,
                    jobs: 0,
                };

                for (const order of datalist) {
                    if (order?.finalPayment?.time) {
                        let m = new Date(
                            order.finalPayment.time
                        ).getMonth();
                        if (m === i) {
                            obj.jobs = obj.jobs + 1;
                            let cmatsexp =
                                calculateMaterialsExpensePrice(order);
                            let srandrev =
                                calculateRevenueAndStripe(order);
                            obj.revenue = obj.revenue + srandrev.rev;
                            obj.stripe = obj.stripe + srandrev.str;
                            obj.expense =
                                obj.expense +
                                calculateExpense(order) +
                                cmatsexp;

                            obj.profit =
                                obj.revenue -
                                obj.expense -
                                obj.stripe;
                            obj.materials = cmatsexp;
                        }
                    }
                }

                calculated.push(obj);
                totalrev = totalrev + obj.revenue;
                totalprof = totalprof + obj.profit;
            }

            settotalprofit(totalprof.toFixed(2));
            settotalrevenue(totalrev.toFixed(2));

            let revenue = [];
            let expense = [];
            let materials = [];
            let stripe = [];
            let profit = [];
            let jobs = [];

            calculated.map((el, i) => {
                revenue.push(
                    <td key={i}>
                        {el.revenue && el.revenue !== 0
                            ? el.revenue.toFixed(2)
                            : ""}
                    </td>
                );
                expense.push(
                    <td key={i}>
                        {el.expense && el.expense !== 0
                            ? el.expense.toFixed(2)
                            : ""}
                    </td>
                );
                materials.push(
                    <td key={i}>
                        {el.materials && el.materials !== 0
                            ? el.materials.toFixed(2)
                            : ""}
                    </td>
                );
                stripe.push(
                    <td key={i}>
                        {el.stripe && el.stripe !== 0
                            ? el.stripe.toFixed(2)
                            : ""}
                    </td>
                );
                profit.push(
                    <td key={i}>
                        {el.profit && el.profit !== 0
                            ? el.profit.toFixed(2)
                            : ""}
                    </td>
                );
                jobs.push(<td key={i}>{el.jobs || ""}</td>);
            });

            settable(
                <section className="profittablessection">
                    <table className="profittableleft">
                        <tbody>
                            {lefttitles.map((el, i) => {
                                return (
                                    <tr key={i}>
                                        <td
                                            className={
                                                i === 0
                                                    ? "profittablemaintd"
                                                    : "profitlefttitle"
                                            }
                                        >
                                            {el}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <table className="profittable">
                        <tbody>
                            <tr>
                                {months.map((el, i) => {
                                    return (
                                        <td
                                            className="profittablemaintd"
                                            key={i}
                                        >
                                            {el}
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>{revenue}</tr>
                            <tr>{expense}</tr>
                            <tr>{materials}</tr>
                            <tr>{stripe}</tr>
                            <tr>{profit}</tr>
                            <tr>{jobs}</tr>
                        </tbody>
                    </table>
                </section>
            );
        }
    }, [datalist]);

    return (
        <div className="globalWrapper">
            {selectAyearwrp()}

            {colorfulboxeswrp()}

            {table ? table : null}
        </div>
    );
}
