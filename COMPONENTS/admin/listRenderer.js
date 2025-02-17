import {useRouter} from "next/router";
import {useState} from "react";

import {fetchData} from "../../HELPERS/fetchdata";
import {types} from "../../HELPERS/variousVariables";
import {datePicker} from "../order-edit/order-edit-helper-funtions";

export default function ListRenderer({
    sort,
    sortby,
    listtorender,
    setsortby,
    submenu,
    setorders,
    orders,
    years,
    year,
    setyear,
}) {
    const router = useRouter();
    const [suretxt, setsuretxt] = useState(false);

    function renderList() {
        let rendered = listtorender.map((el, i) => {
            return (
                <tr key={i} className="admin_orderslist_liner">
                    <td
                        className="adminorderlistordernr"
                        onClick={() => {
                            if (
                                !el.status &&
                                el.packingMaterials === true
                            ) {
                                el.status = "pickup";
                            }

                            let db =
                                submenu === types[2]
                                    ? year
                                    : el.status;

                            router.push({
                                pathname: "/admin/order-edit",
                                query: {
                                    orderNr: el.orderNr,
                                    db,
                                },
                            });
                        }}
                    >
                        {el.orderNr}
                    </td>
                    <td className="listrenderertypebuttons">
                        {el.packingMaterials ? (
                            <button className="typepmats">
                                MATERIAL
                            </button>
                        ) : null}
                        {el.status === "pickup" ? (
                            <button className="typepu">
                                COLLECTION
                            </button>
                        ) : null}
                        {el.status === "stored" ? (
                            <button className="typere">STORED</button>
                        ) : null}
                        {el.status === "return" ? (
                            <button className="typere">RETURN</button>
                        ) : null}
                    </td>

                    <td
                        className="classname"
                        style={{position: "relative"}}
                    >
                        {datePicker(el)}

                        <p
                            style={{
                                position: "absolute",
                                fontSize: "12px",
                                bottom: "4px",
                                right: "4px",
                                color: "grey",
                            }}
                        >
                            {new Date(
                                el.orderTime
                            ).toLocaleTimeString("gb")}
                        </p>
                    </td>

                    <td>
                        {el?.state?.address?.postcode ||
                            el?.address?.postcode ||
                            ""}
                    </td>
                    <td className="classname">
                        {el.state?.date?.pickUpTime ||
                            el.deliverDate?.time ||
                            "N/A"}
                    </td>

                    <td className="classname">
                        {el?.state?.address?.firstName ||
                            el?.address?.firstName ||
                            ""}
                        &nbsp;
                        {el?.state?.address?.lastName ||
                            el?.address?.lastName ||
                            ""}
                    </td>

                    <td className="classname">
                        {el?.state?.address?.phoneNr ||
                            el?.address?.phoneNr ||
                            ""}
                    </td>

                    <td className="adminordersmarkcompletedbuttontdwrapper">
                        <button
                            disabled={
                                el.status === "stored" ? true : false
                            }
                            onMouseLeave={(e) => {
                                let txt;
                                el.packingMaterials
                                    ? (txt = "SENT")
                                    : null;
                                el.status === "pickup"
                                    ? (txt = "COLLECTED")
                                    : null;
                                el.status === "stored"
                                    ? (txt = "STORED")
                                    : null;
                                el.status === "return"
                                    ? (txt = "RETURNED")
                                    : null;
                                el.status === "returned"
                                    ? (txt = "COMPLETED")
                                    : null;

                                e.target.textContent = txt;
                                setsuretxt(false);
                            }}
                            className="adminordersmarkcompletedbutton"
                            style={
                                el.status === "returned" ||
                                el.status === "stored"
                                    ? {background: "grey"}
                                    : {}
                            }
                            onClick={async (e) => {
                                if (el.status !== "returned") {
                                    if (
                                        suretxt !==
                                        el.orderNr.toString() + i
                                    ) {
                                        setsuretxt(
                                            el.orderNr.toString() + i
                                        );
                                    } else {
                                        let f = await fetchData(
                                            "/api/admin/connected",
                                            {
                                                type: "markAsCompleted",
                                                el,
                                            }
                                        );

                                        if (f) {
                                            setorders(
                                                orders.filter(
                                                    (item, i) => {
                                                        if (
                                                            el.packingMaterials
                                                        ) {
                                                            return (
                                                                !item.packingMaterials ||
                                                                item.orderNr !==
                                                                    el.orderNr
                                                            );
                                                        } else {
                                                            return (
                                                                el.orderNr !==
                                                                item.orderNr
                                                            );
                                                        }
                                                    }
                                                )
                                            );
                                            setsuretxt(false);
                                        }
                                    }
                                }
                            }}
                        >
                            {suretxt === el.orderNr?.toString() + i
                                ? "SURE?"
                                : el.packingMaterials
                                ? "SENT"
                                : el.status === "pickup"
                                ? "COLLECTED"
                                : el.status === "return"
                                ? "RETURNED"
                                : el.status === "stored"
                                ? "STORED"
                                : el.status === "returned"
                                ? "COMPLETED"
                                : null}
                        </button>
                    </td>
                </tr>
            );
        });

        return rendered;
    }

    function renderYears() {
        return (
            <ul className="admincompletedyearswrp">
                {years.map((y, i) => {
                    return (
                        <li
                            onClick={() => {
                                setyear(y);
                            }}
                            className={
                                year === y
                                    ? "admincompletedyearbutton_clicked"
                                    : "admincompletedyearbutton"
                            }
                            key={y}
                        >
                            {y}
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <div className="adminlistrendererglobalwrp">
            {submenu === types[2] ? renderYears() : null}

            {listtorender.length !== 0 ? (
                <table className="admin_rders_rendered_list">
                    <tbody>
                        <tr className="adminorders_sorttable">
                            {sort.map((s, i) => {
                                return (
                                    <th
                                        className="adminsorttable_name"
                                        key={i}
                                        onClick={() => {
                                            if (
                                                sortby.name === s.name
                                            ) {
                                                setsortby({
                                                    name: s.name,
                                                    inverted:
                                                        sortby.inverted
                                                            ? false
                                                            : true,
                                                });
                                            } else {
                                                if (s.sortable) {
                                                    setsortby({
                                                        name: s.name,
                                                        inverted: false,
                                                    });
                                                }
                                            }
                                        }}
                                    >
                                        {submenu === "In storage" &&
                                        s.name === "Date"
                                            ? "From Date"
                                            : s.name}

                                        {sortby.name === s.name ? (
                                            sortby.inverted ? (
                                                <span>&#10514;</span>
                                            ) : (
                                                <span>&#10515;</span>
                                            )
                                        ) : null}
                                    </th>
                                );
                            })}
                        </tr>
                        {renderList()}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
}
