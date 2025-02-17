import {useRef} from "react";

export default function Additionalservice({order, setorder}) {
    const inp1 = useRef();
    const inp2 = useRef();

    function savenewitem() {
        //Add additional service
        console.log("cia?");

        let obj = {
            created: Date.now(),
            service: inp1.current.value,
            price: inp2.current.value,
        };
        let c = {...order};

        if (c.state?.additionalServices) {
            c.state.additionalServices.push(obj);
        } else {
            c.state.additionalServices = [obj];
        }
        setorder(c);
        inp1.current.value = "";
        inp2.current.value = "";
    }

    return (
        <section className="ordereditcustomitemwrp">
            <strong>Add additional service</strong>
            <p className="additionaservicesubtitle">
                {` For example "Export pack", cost will be added on the final
         bill`}
            </p>

            <div className="ordereditcustomitemsmappedwrp">
                <div className="ordereditcustomitemsmappednavbarcustomorders">
                    <p>Service:</p>
                    <p>Price:</p>
                </div>
                <div className="ordereditcustomitemmappedliner">
                    <input
                        ref={inp1}
                        type="text"
                        className="classname"
                        required
                    />
                    <input
                        ref={inp2}
                        type="text"
                        className="classname"
                        required
                    />

                    <button onClick={savenewitem}> Add </button>
                </div>
                <p className="ordereditcustomitemssplitter">
                    <strong>List of additional service:</strong>
                </p>
                {order?.state?.additionalServices?.map((el, i) => {
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
                                            c.state.additionalServices.filter(
                                                (it) => {
                                                    return (
                                                        it.created !==
                                                        el.created
                                                    );
                                                }
                                            );

                                        c.state.additionalServices =
                                            f;
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
