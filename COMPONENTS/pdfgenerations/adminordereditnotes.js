import {
    Document,
    Page,
    Text,
    View,
    Font,
    Image,
} from "@react-pdf/renderer";

Font.register({
    family: "sans",
    fonts: [
        {
            src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
        },
        {
            src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
            fontWeight: 600,
        },
    ],
});

const MyDoc = ({p}) => {
    function getlistandquantityofitems() {
        let arr = [];
        if (p?.items?.storage) {
            for (const el of p.items.storage) {
                if (p?.order?.state?.storage?.[el.pos]) {
                    arr.push({
                        q: p.order.state.storage[el.pos],
                        n: el.name,
                    });
                }
            }
        }

        if (p?.order?.state?.customItems) {
            for (const el of p.order.state.customItems) {
                arr.push({q: el.quantity, n: el.name});
            }
        }

        return arr;
    }
    function header() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Image
                    style={{width: 80, height: 80}}
                    src={"/logo.png"}
                    alt={"logo"}
                ></Image>
                <Text style={{fontWeight: "bold", fontSize: 24}}>
                    {p.type === "collection"
                        ? "COLLECTION"
                        : "DELIVERY"}{" "}
                    NOTE
                </Text>
            </View>
        );
    }

    function nameandphone() {
        return (
            <View style={{marginTop: 40}}>
                <View
                    style={{
                        flexDirection: "row",
                        height: 18,
                        alignItems: "center",
                    }}
                >
                    <Text style={{fontWeight: "bold"}}>Name:</Text>
                    <Text style={{marginLeft: 18}}>
                        {p.user?.personalDetails?.firstName}{" "}
                        {p.user?.personalDetails?.lastName}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        height: 18,
                        alignItems: "center",
                        backgroundColor: "#e9e9e9",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        Phone:
                    </Text>
                    <Text
                        style={{
                            marginLeft: 18,
                        }}
                    >
                        {p.user?.personalDetails?.telephone}
                    </Text>
                </View>
            </View>
        );
    }

    function address() {
        return (
            <View style={{marginTop: 40}}>
                <View
                    style={{
                        fontWeight: "bold",
                        height: 18,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        {p.type === "collection"
                            ? "Collection"
                            : "Delivery"}{" "}
                        address
                    </Text>
                </View>

                <View
                    style={{
                        backgroundColor: "#e9e9e9",
                        height: 18,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        {p.order?.state?.dropoff?.buildingnrname ||
                        p.order?.state?.address.buildingnrname
                            ? p.order?.state?.dropoff
                                  ?.buildingnrname ||
                              p.order?.state?.address.buildingnrname
                            : null}
                        {p.order?.state?.dropoff?.buildingnrname ||
                        p.order?.state?.address.buildingnrname
                            ? ", "
                            : null}

                        {p.order?.state?.dropoff?.addressLine1 ||
                        p.order?.state?.address.addressLine1
                            ? p.order?.state?.dropoff?.addressLine1 ||
                              p.order?.state?.address.addressLine1
                            : null}
                    </Text>
                </View>

                <View
                    style={{
                        height: 18,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        {p.order?.state?.dropoff?.addressLine2 ||
                        p.order?.state?.address.addressLine2
                            ? p.order?.state?.dropoff?.addressLine2 ||
                              p.order?.state?.address.addressLine2
                            : null}
                        {p.order?.state?.dropoff?.addressLine2 ||
                        p.order?.state?.address.addressLine2
                            ? ", "
                            : null}

                        {p.order?.state?.dropoff?.town ||
                        p.order?.state?.address.town
                            ? p.order?.state?.dropoff?.town ||
                              p.order?.state?.address.town
                            : null}
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor: "#e9e9e9",
                        height: 18,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        {p.order?.state?.dropoff?.postcode ||
                            p.order?.state?.address.postcode}
                    </Text>
                </View>
            </View>
        );
    }

    function confirmedinventory() {
        let arr = getlistandquantityofitems();
        if (p.type === "collection") {
            for (let i = 0; i < 6; i++) {
                arr.push(" ");
            }
        }
        let q = 0;
        return (
            <View style={{marginTop: 40}}>
                <Text style={{fontWeight: "bold"}}>
                    {p.type === "collection"
                        ? `Confirmed inventory (driver to adjust if incorrect)`
                        : `Full inventory`}
                </Text>

                {arr.map((el, i) => {
                    q = q + parseFloat(el.q);
                    return (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                height: 18,
                                backgroundColor:
                                    i % 2 === 0 ? "#e9e9e9" : "white",
                            }}
                            key={i}
                        >
                            <Text
                                style={{
                                    width: 18,
                                    fontWeight: "bold",
                                }}
                            >
                                {el.q}
                            </Text>
                            <Text>{el.n}</Text>
                        </View>
                    );
                })}
                {p.type !== "collection" ? (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            height: 18,
                            fontWeight: "bold",
                            backgroundColor:
                                arr.length % 2 === 0
                                    ? "#e9e9e9"
                                    : "white",
                        }}
                        key={"ppw"}
                    >
                        <Text
                            style={{
                                width: 18,
                            }}
                        >
                            {q}
                        </Text>
                        <Text>Total count</Text>
                    </View>
                ) : null}
            </View>
        );
    }

    function specialInstructions() {
        if (p.type === "collection") {
            return (
                <View style={{marginTop: 18, lineHeight: 1.3}}>
                    <Text style={{fontWeight: "bold"}}>
                        Special Instructions:
                    </Text>
                    <Text style={{lineHeight: 1.8}}>
                        {p.order.state.address.specialInstructions}
                    </Text>
                </View>
            );
        }
    }

    function bottomText() {
        if (p.type === "collection") {
            return (
                <View style={{marginTop: 18, lineHeight: 1.3}}>
                    <Text style={{lineHeight: 1.8}}>
                        By signing here, I confirm that the instrument
                        in question was collected from myself today:
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={{marginTop: 18}}>
                    <Text style={{lineHeight: 1.8}}>
                        By signing here, I confirm that the instrument
                        in question was delivered the same condition
                        as it was upon collection:
                    </Text>
                </View>
            );
        }
    }
    function signatureWindow() {
        return (
            <View style={{fontWeight: "bold", marginTop: 16}}>
                <View
                    style={{
                        flexDirection: "row",

                        alignItems: "center",
                    }}
                >
                    <Text style={{width: 80}}>Name:</Text>
                    <View
                        style={{
                            height: 30,
                            borderColor: "black",
                            border: 1,
                            width: "100%",
                        }}
                    ></View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 16,
                    }}
                >
                    <Text style={{width: 80, marginTop: 8}}>
                        Signature:
                    </Text>
                    <View
                        style={{
                            height: 60,
                            borderColor: "black",
                            border: 1,
                            width: "100%",
                        }}
                    ></View>
                </View>
            </View>
        );
    }

    return (
        <Document>
            <Page
                size="A4"
                style={{
                    padding: 48,
                    fontSize: 12,
                    fontFamily: "sans",
                }}
            >
                {header()}
                {nameandphone()}
                {address()}
                {p.type === "collection" &&
                p.order.state.address.specialInstructions
                    ? specialInstructions()
                    : null}
                {confirmedinventory()}

                {bottomText()}
                {signatureWindow()}
            </Page>
        </Document>
    );
};

export function generateCollectionNote(order, type, user, items) {
    return <MyDoc p={{order, type, user, items}} />;
}
