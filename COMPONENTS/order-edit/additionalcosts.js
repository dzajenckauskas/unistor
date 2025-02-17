import {useRef} from "react";

export default function AdditionalCosts({order, setorder}) {
    const inp1 = useRef();
    const inp2 = useRef();

    function savenewitem() {
        let obj = {
            created: Date.now(),
            service: inp1.current.value,
            price: inp2.current.value,
        };
        let c = {...order};

        if (order?.state?.additionalCosts) {
            c.state.additionalCosts.push(obj);
        } else {
            c.state.additionalCosts = [obj];
        }
        setorder(c);
        inp1.current.value = "";
        inp2.current.value = "";
    }

    return (
        <section className="ordereditcustomitemwrp">
            <strong>Add booking costs</strong>
            <p className="additionaservicesubtitle">
                {`Costs related to this booking, for example "Collection by subby"`}
            </p>

            <div className="ordereditcustomitemsmappedwrp">
                <div className="ordereditcustomitemsmappednavbarcustomorders">
                    <p>Service:</p>
                    <p>Price:</p>
                </div>
                <div className="ordereditcustomitemmappedliner">
                    <input
                        ref={inp1}
                        placeholder="item name"
                        type="text"
                        className="classname"
                        required
                    />
                    <input
                        ref={inp2}
                        placeholder="price"
                        type="text"
                        className="classname"
                        required
                    />

                    <button onClick={savenewitem}> Add </button>
                </div>

                <p className="ordereditcustomitemssplitter">
                    <strong>List of additional service:</strong>
                </p>
                {order?.state?.additionalCosts?.map((el, i) => {
                    return (
                        <div
                            className="ordereditcustomitemmappedliner"
                            key={el.created}
                        >
                            <p>{el.service}</p>
                            <p> £{el.price}</p>
                            <button
                                className="additionalcostsdeleteitembutton"
                                onMouseLeave={(e) => {
                                    e.target.textContent = "\u2715";
                                }}
                                onClick={(e) => {
                                    if (
                                        e.target.textContent !==
                                        "Sure?"
                                    ) {
                                        e.target.textContent =
                                            "Sure?";
                                    } else {
                                        let c = {...order};
                                        let f =
                                            c.state.additionalCosts.filter(
                                                (it) => {
                                                    return (
                                                        it.created !==
                                                        el.created
                                                    );
                                                }
                                            );

                                        c.state.additionalCosts = f;
                                        setorder(c);
                                    }
                                }}
                            >
                                &#x2715;
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
