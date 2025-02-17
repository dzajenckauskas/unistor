import {
    Document,
    Page,
    Text,
    View,
    Font,
    Image,
} from "@react-pdf/renderer";
import {calculateBoxesCount} from "../COMPONENTS/order-edit/order-edit-helper-funtions";

let font1, font2;

if (process.env.production) {
    font1 = "https://unistor.co.uk/fonts/Calibri.ttf";
    font2 = "https://unistor.co.uk/fonts/calibrib.ttf";
} else {
    font1 = "http://localhost:3000/fonts/Calibri.ttf";
    font2 = "http://localhost:3000/fonts/calibrib.ttf";
}

Font.register({
    family: "sans",
    fonts: [
        {
            src: font1,
        },
        {
            src: font2,
            fontWeight: "bold",
        },
    ],
});

const MyDoc = ({p}) => {
    let order = p.order;
    let bc = calculateBoxesCount(p.order);

    function generateLabels(params) {
        let lb = [];
        function headerLine(i) {
            return (
                <View
                    style={{
                        fontFamily: "sans",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 32,
                            fontWeight: "bold",
                            fontFamily: "sans",
                            paddingLeft: 4,
                        }}
                    >
                        Item {i < bc ? i + 1 : "_ _ _"} of _ _ _ _ _ _
                    </Text>

                    <Text
                        style={{
                            color: "white",
                            backgroundColor: "black",
                            fontSize: 32,
                            fontWeight: "bold",
                            fontFamily: "sans",
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingLeft: 16,
                            paddingRight: 16,
                        }}
                    >
                        {" "}
                        {order.state.address.postcode.substring(0, 4)}
                    </Text>
                </View>
            );
        }

        function bodyLine(i) {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        borderTopColor: "black",
                        borderTopWidth: 1,
                        flexGrow: 10,
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingLeft: 4,
                            paddingRight: 4,
                            width: 96,
                        }}
                    >
                        <Image
                            style={{
                                width: 96,
                                height: 96,
                            }}
                            src={
                                process.env.production
                                    ? "https://unistor.co.uk/logoBlack.png"
                                    : "http://localhost:3000/logoBlack.png"
                            }
                        ></Image>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            backgroundColor: "black",
                            color: "white",
                            width: 96,
                        }}
                    >
                        <Text
                            style={{
                                paddingTop: 8,
                                paddingBottom: 8,
                                borderBottomWidth: 1,
                                borderBottomColor: "white",
                                textAlign: "right",
                                height: 32,
                                fontFamily: "sans",
                            }}
                        >
                            Reference:{"  "}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "sans",
                                paddingTop: 8,
                                paddingBottom: 8,
                                borderBottomWidth: 1,
                                borderBottomColor: "white",
                                textAlign: "right",
                                height: 32,
                            }}
                        >
                            Surname:{"  "}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "sans",
                                paddingTop: 8,
                                paddingBottom: 8,
                                textAlign: "right",
                                height: 32,
                            }}
                        >
                            Address:{"  "}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            flexGrow: 10,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                height: 32,
                                flexDirection: "row",
                                alignItems: "center",
                                flexGrow: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: "black",
                            }}
                        >
                            <Text
                                style={{
                                    paddingLeft: 8,
                                    fontFamily: "sans",
                                }}
                            >
                                1127U{order.orderNr}
                            </Text>
                        </View>
                        <View
                            style={{
                                height: 32,
                                flexDirection: "row",
                                alignItems: "center",
                                flexGrow: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: "black",
                            }}
                        >
                            <Text
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    fontFamily: "sans",
                                    paddingLeft: 8,
                                    margin: 0,
                                }}
                            >
                                {order.state.address.lastName}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "column",
                                paddingLeft: 8,
                                paddingTop: 4,
                                paddingBottom: 4,
                                gap: 4,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "sans",
                                    width: 200,
                                }}
                            >
                                {order.state.address
                                    .buildingnrname ? (
                                    <Text
                                        style={{fontFamily: "sans"}}
                                    >
                                        {order.state.address
                                            .buildingnrname + ", "}
                                    </Text>
                                ) : null}
                                <Text
                                    style={{
                                        fontFamily: "sans",
                                    }}
                                >
                                    {order.state.address.addressLine1}
                                </Text>
                            </Text>

                            {order.state.address.addressLine2 ? (
                                <Text
                                    style={{
                                        width: 200,
                                        fontFamily: "sans",
                                    }}
                                >
                                    {order.state.address.addressLine2.trim()}
                                </Text>
                            ) : null}
                            <Text
                                style={{
                                    width: 200,
                                    fontFamily: "sans",
                                }}
                            >
                                {order.state.address.town}
                            </Text>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontFamily: "sans",
                                }}
                            >
                                {order.state.address.postcode}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }

        for (let i = 0; i < bc + 3; i++) {
            lb.push(
                <View
                    key={i}
                    wrap={false}
                    style={{
                        borderColor: "black",
                        borderWidth: 2,
                        borderStyle: "dashed",
                        marginBottom: 24,
                    }}
                >
                    {headerLine(i)}
                    {bodyLine(i)}
                </View>
            );
        }
        return lb;
    }
    return (
        <Document>
            <Page
                size="A4"
                style={{
                    fontSize: 16,
                    paddingTop: 32,
                    paddingBottom: 32,
                    paddingLeft: 96,
                    paddingRight: 96,
                    lineHeight: 1,
                }}
            >
                {generateLabels()}
            </Page>
        </Document>
    );
};

export function pdfForLabels(order) {
    return <MyDoc p={{order}} />;
}
