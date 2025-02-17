import {useEffect, useState} from "react";
import {fetchData} from "../../HELPERS/fetchdata";
import {months} from "../../HELPERS/variousVariables";

export default function Referrals() {
    const [codeslist, setcodeslist] = useState([]);
    const [usedCodesList, setUsedCodesList] = useState([]);
    const [newcode, setnewcode] = useState("");
    const [newdiscount, setnewdiscount] = useState("");
    const [editorder, seteditorder] = useState({});
    const [listofyears, setlistofyears] = useState([]);
    const [chosenyear, setchosenyear] = useState(
        new Date(Date.now()).getFullYear()
    );
    const [sortedlist, setsortedlist] = useState([]);
    const [showyeardropdown, setshowyeardropdown] = useState(false);

    const link = "/api/admin/referrals";

    useEffect(() => {
        (async () => {
            let codes = await fetchData(link, {
                type: "getCodes",
            });

            if (codes) {
                let list = JSON.parse(codes);
                setcodeslist(list.codes);
                setUsedCodesList(list.usedCodes);

                if (list?.usedCodes) {
                    let l = list.usedCodes.map((el, i) => {
                        return el.year;
                    });

                    setlistofyears(
                        l.sort((a, b) => {
                            return b - a;
                        })
                    );
                }
            }
        })();
    }, []);

    useEffect(() => {
        if (chosenyear && usedCodesList.length !== 0) {
            let el = usedCodesList.filter((el, i) => {
                return el.year === chosenyear;
            });

            if (el[0]) {
                let sorted = el[0].codes.sort((a, b) => {
                    if (a.code < b.code) {
                        return -1;
                    }
                    if (a.code > b.code) {
                        return 1;
                    }
                    return 0;
                });
                setsortedlist(sorted);
            }
        }
    }, [chosenyear, usedCodesList]);

    function addReferralCode() {
        return (
            <section className="listofcodes">
                <div className="referralsaddcodeglobalwrp">
                    <p>Code</p>
                    <p>Discount %</p>
                    <p>Action</p>
                    <input
                        onFocus={() => {
                            seteditorder({});
                        }}
                        placeholder="Code"
                        type="text"
                        className="classname"
                        value={newcode || ""}
                        onChange={(e) => {
                            setnewcode(e.target.value);
                        }}
                    />
                    <input
                        onFocus={() => {
                            seteditorder({});
                        }}
                        placeholder="%"
                        type="text"
                        className="classname"
                        value={newdiscount || ""}
                        onChange={(e) => {
                            setnewdiscount(e.target.value);
                        }}
                    />
                    <div
                        className="referalcodeaddbutton"
                        onClick={async () => {
                            if (newcode && newdiscount) {
                                let obj = {
                                    type: "saveNewCode",
                                    code: newcode,
                                    discount: newdiscount,
                                    id: Date.now(),
                                };

                                let f = await fetchData(link, obj);

                                if (f) {
                                    delete obj.type;
                                    setcodeslist([...codeslist, obj]);
                                    setnewcode("");
                                    setnewdiscount("");
                                }
                            }
                        }}
                    >
                        ADD
                    </div>
                </div>
                <div className="refferalyearsselector">
                    Select a year:{" "}
                    <div
                        className="referralsyearselectorwrp"
                        onClick={() => {
                            setshowyeardropdown(
                                showyeardropdown ? false : true
                            );
                        }}
                    >
                        {chosenyear}
                        {showyeardropdown ? (
                            <div className="listofyearsglobalwrp">
                                {listofyears.map((el, i) => {
                                    return (
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                setchosenyear(el);
                                                setshowyeardropdown(
                                                    false
                                                );
                                            }}
                                            key={i}
                                        >
                                            {el}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>
        );
    }

    function changeValuesofInputs(id, pos, value) {
        let c = {...editorder};
        c[pos] = value;

        seteditorder(c);
    }

    function listOfCodes() {
        return (
            <section className="listofcodes">
                <div className="listofcodescodeslist">
                    {codeslist.map((el, i) => {
                        return (
                            <div
                                className="referralslistofcodesliner"
                                key={el.id}
                            >
                                <input
                                    readOnly={
                                        editorder.id === el.id
                                            ? false
                                            : true
                                    }
                                    placeholder="Code"
                                    type="text"
                                    value={
                                        editorder.id === el.id
                                            ? editorder.code
                                            : null || el.code || ""
                                    }
                                    className={
                                        editorder.id === el.id
                                            ? "referralsinputedit"
                                            : "referralsinputeditnooutline"
                                    }
                                    onChange={(e) => {
                                        changeValuesofInputs(
                                            el.id,
                                            "code",
                                            e.target.value
                                        );
                                    }}
                                />
                                <input
                                    readOnly={
                                        editorder.id === el.id
                                            ? false
                                            : true
                                    }
                                    placeholder="%"
                                    type="text"
                                    value={
                                        editorder.id === el.id
                                            ? editorder.discount
                                            : null ||
                                              el.discount ||
                                              ""
                                    }
                                    className={
                                        editorder.id === el.id
                                            ? "referralsinputedit"
                                            : "referralsinputeditnooutline"
                                    }
                                    onChange={(e) => {
                                        changeValuesofInputs(
                                            el.id,
                                            "discount",
                                            e.target.value
                                        );
                                    }}
                                />
                                <button
                                    type=""
                                    onClick={async (e) => {
                                        if (
                                            e.target.textContent ===
                                            "EDIT"
                                        ) {
                                            seteditorder(el);
                                        }

                                        if (
                                            e.target.textContent ===
                                            "SAVE"
                                        ) {
                                            let c = {...editorder};
                                            delete c?._id;

                                            c.type = "update";

                                            let f = await fetchData(
                                                link,
                                                c
                                            );

                                            if (f) {
                                                delete c.type;
                                                let listcopy = [
                                                    ...codeslist,
                                                ];
                                                listcopy.filter(
                                                    (el, i) => {
                                                        if (
                                                            el.id ===
                                                            c.id
                                                        ) {
                                                            listcopy[
                                                                i
                                                            ] = c;
                                                        }
                                                    }
                                                );

                                                setcodeslist(
                                                    listcopy
                                                );
                                            }
                                            seteditorder(false);
                                        }
                                    }}
                                >
                                    {editorder.id === el.id
                                        ? "SAVE"
                                        : "EDIT"}
                                </button>
                                <button
                                    className="referralsdeletebutton"
                                    onMouseLeave={(e) => {
                                        e.target.textContent =
                                            "DELETE";
                                    }}
                                    onClick={async (e) => {
                                        seteditorder({});
                                        if (
                                            e.target.textContent ===
                                            "SURE?"
                                        ) {
                                            let f = await fetchData(
                                                link,
                                                {
                                                    type: "delete",
                                                    id: el.id,
                                                }
                                            );
                                            if (f) {
                                                setcodeslist(
                                                    codeslist.filter(
                                                        (code, i) => {
                                                            return (
                                                                code.id !==
                                                                el.id
                                                            );
                                                        }
                                                    )
                                                );
                                            }
                                        } else {
                                            e.target.textContent =
                                                "SURE?";
                                        }
                                    }}
                                >
                                    DELETE
                                </button>
                            </div>
                        );
                    })}
                </div>
                {listOfUsedCodes()}
            </section>
        );
    }

    function listOfUsedCodes() {
        function getMonthPositions(mn) {
            let arr = [];

            for (let i = 0; i < 12; i++) {
                let f = mn.filter((el) => {
                    return el.month === i;
                });

                if (f[0]) {
                    arr.push(<td key={i}>{f[0].count}</td>);
                } else {
                    arr.push(<td key={i}>{0}</td>);
                }
            }

            return arr;
        }

        return (
            <table className="referralstableusedcodes">
                <tbody>
                    <tr>
                        <td>
                            <strong>Code</strong>
                        </td>
                        {months.map((el, i) => {
                            return (
                                <td key={i}>
                                    <strong>
                                        {el.substring(0, 3)}
                                    </strong>
                                </td>
                            );
                        })}
                    </tr>

                    {sortedlist.map((el, i) => {
                        return (
                            <tr key={i + "m"}>
                                <td>
                                    {" "}
                                    <strong>{el.code}</strong>
                                </td>

                                {getMonthPositions(el.months)}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

    return (
        <div className="globalWrapper">
            {addReferralCode()}
            <div className="referralssectionssplit"></div>
            <div className="classname">{listOfCodes()}</div>
        </div>
    );
}
