import {useEffect, useReducer} from "react";
import {fetchData} from "../../HELPERS/fetchdata";
import {itemsofstorageandmats} from "../../HELPERS/variousVariables";

function reducer(state, action) {
    let c = {...state};

    for (const el of c[action.t]) {
        if (el.pos === action.el) {
            el.price = action.v;
            break;
        }
    }

    return c;
}

export default function Prices() {
    const [state, dispatch] = useReducer(
        reducer,
        itemsofstorageandmats
    );

    useEffect(() => {
        (async () => {
            let f = await fetchData("/api/admin/connected", {
                type: "getPrices",
            });

            if (f) {
                let {prices} = f;
                for (const el of prices.packingMaterials) {
                    dispatch({
                        t: "packingMaterials",
                        el: el.pos,
                        v: el.price,
                    });
                }
                for (const el of prices.storage) {
                    dispatch({
                        t: "storage",
                        el: el.pos,
                        v: el.price,
                    });
                }
            }
        })();
    }, []);

    function genstorage() {
        return (
            <ul className="adminpricesstoragelist">
                <h3>Storage prices</h3>
                {state.storage.map((el, i) => {
                    return (
                        <li key={i} className="adminpricesitemliner">
                            <div className="classname">{el.name}</div>
                            <input
                                placeholder="price"
                                className="adminpricesinput"
                                type={"number"}
                                value={el.price || ""}
                                min={0}
                                onChange={(e) => {
                                    dispatch({
                                        t: "storage",
                                        el: el.pos,
                                        v: e.target.value,
                                    });
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        );
    }
    function genMaterials() {
        return (
            <ul className="adminpricesstoragelist">
                <h3>Packing materials</h3>
                {state.packingMaterials.map((el, i) => {
                    return (
                        <li key={i} className="adminpricesitemliner">
                            <div className="classname">{el.name}</div>
                            <input
                                placeholder="price"
                                className="adminpricesinput"
                                type={"number"}
                                value={el.price || ""}
                                min={0}
                                onChange={(e) => {
                                    dispatch({
                                        t: "packingMaterials",
                                        el: el.pos,
                                        v: e.target.value,
                                    });
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <section className="adminpricesglobalwrp">
            <div className="adminpriceswrp">
                {" "}
                {genstorage()}
                {genMaterials()}
            </div>

            <button
                className="adminsavepricesbutton"
                onClick={async () => {
                    state.type = "savePrices";

                    let f = await fetchData(
                        "/api/admin/connected",
                        state
                    );
                    if (f) {
                        alert("Saved");
                    }
                }}
            >
                Save
            </button>
        </section>
    );
}
