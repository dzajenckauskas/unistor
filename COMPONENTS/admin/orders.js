import {useEffect, useState} from "react";
import {fetchData} from "../../HELPERS/fetchdata";
import {types} from "../../HELPERS/variousVariables";
import {datePicker} from "../order-edit/order-edit-helper-funtions";
import CompletedOrders from "./completedOrders";
import ListRenderer from "./listRenderer";

const list = ["Material delivery", "Collection", "Return"];
const sort = [
    {name: "ID.", sortable: false},
    {name: "Type", sortable: false},
    {name: "Date", sortable: true},
    {name: "Postcode", sortable: false},
    {name: "Time", sortable: false},
    {name: "Name", sortable: false},
    {name: "Phone number", sortable: false},

    {name: "Action", sortable: false},
];

export default function Orders({showpage}) {
    const [orders, setorders] = useState([]);
    const [years, setyears] = useState([]);
    const [submenu, setsubmenu] = useState(false);
    const [filters, setfilters] = useState([...list]);
    const [year, setyear] = useState(false);
    const [listtorender, setlisttorender] = useState([]);
    const [sortby, setsortby] = useState({
        name: sort[2].name,
        inverted: false,
    });
    const [searchtxt, setsearchtxt] = useState("");

    useEffect(() => {
        async function getData() {
            let f = await fetchData("/api/admin/connected", {
                type: types[2],
            });

            if (f && f.orders) {
                setyears(f.orders);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            let f = await fetchData("/api/admin/connected", {
                type: "getYearCollection",
                year,
            });

            if (f) {
                setorders(f.orders);
            }
        }

        if (year) {
            getData();
        }
    }, [year]);

    useEffect(() => {
        if (submenu === types[2] && years.length !== [0]) {
            setyear(years[0]);
        }
    }, [years, submenu]);

    useEffect(() => {
        async function getData() {
            let f = await fetchData("/api/admin/connected", {
                type: submenu,
            });

            if (f && f.orders) {
                setorders(f.orders);
            }
        }

        if (submenu && submenu !== types[2]) {
            getData();
            setyear(false);
        }
    }, [submenu]);

    useEffect(() => {
        if (types.includes(showpage)) {
            setorders([]);
            setsubmenu(showpage);
        } else {
            setorders([]);
        }
    }, [showpage]);

    useEffect(() => {
        let copy = JSON.parse(JSON.stringify(orders));

        if (!filters.includes(list[0])) {
            copy = copy.filter((el, i) => {
                return !el.packingMaterials;
            });
        }
        if (!filters.includes(list[1])) {
            copy = copy.filter((el, i) => {
                return el.packingMaterials || el.status !== "pickup";
            });
        }
        if (!filters.includes(list[2])) {
            copy = copy.filter((el, i) => {
                return el.status !== "return";
            });
        }

        switch (sortby.name) {
            case sort[2].name:
                {
                    copy = copy.sort((a, b) => {
                        a = datePicker(a);
                        b = datePicker(b);

                        a = new Date(a);
                        b = new Date(b);

                        if (sortby.inverted) {
                            return b - a;
                        } else {
                            return a - b;
                        }
                    });
                }
                break;

            default:
                break;
        }

        if (searchtxt) {
            let txt = searchtxt.toLowerCase();

            copy = copy.filter((el, i) => {
                console.log(el);
                return (
                    el.packingMaterialsDelivery
                        ?.toLowerCase()
                        .includes(txt) ||
                    el.state?.date?.pickUpDate
                        ?.toLowerCase()
                        .includes(txt) ||
                    el.orderNr.toString().includes(txt) ||
                    el.state?.address?.postcode
                        ?.toLowerCase()
                        .includes(txt) ||
                    el.state?.address?.addressLine1
                        ?.toLowerCase()
                        .includes(txt) ||
                    el.state?.address?.addressLine2
                        ?.toLowerCase()
                        .includes(txt) ||
                    el.state?.address?.town
                        ?.toLowerCase()
                        .includes(txt) ||
                    el.state?.address?.firstName
                        ?.toLowerCase()
                        .includes(txt) ||
                    el.state?.address?.lastName
                        ?.toLowerCase()
                        .includes(txt) ||
                    el.state?.address?.buildingnrname
                        ?.toLowerCase()
                        .includes(txt) ||
                    el.address?.phoneNr
                        ?.toLowerCase()
                        .includes(txt) ||
                    el.state?.address?.phoneNr
                        ?.toLowerCase()
                        .includes(txt)
                );
            });
        }

        setlisttorender(copy);
    }, [filters, orders, sortby, searchtxt]);

    function filterbar() {
        return (
            <ul className="admin_orders_filterbar">
                Type of job:
                {list.map((el, i) => {
                    return (
                        <li key={i}>
                            <input
                                placeholder=""
                                type="checkbox"
                                className="admin_orders_filterbar_checkbox"
                                defaultChecked={true}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setfilters([...filters, el]);
                                    } else {
                                        setfilters(
                                            filters.filter((f, i) => {
                                                return f !== el;
                                            })
                                        );
                                    }
                                }}
                            />{" "}
                            {el}
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <div className="adminorders_global_wrapper">
            <div className="adminorders_searchbar">
                <input
                    placeholder="search"
                    type="text"
                    className="adminorders_searchinput"
                    value={searchtxt}
                    onChange={(e) => {
                        setsearchtxt(e.target.value);
                    }}
                />
            </div>

            {submenu === types[0] ? filterbar() : null}

            <ListRenderer
                years={years}
                year={year}
                setyear={(y) => {
                    setyear(y);
                }}
                orders={orders}
                sort={sort}
                sortby={sortby}
                setsortby={(el) => {
                    setsortby(el);
                }}
                listtorender={listtorender}
                submenu={submenu}
                setorders={(el) => {
                    setorders(el);
                }}
            />
        </div>
    );
}
