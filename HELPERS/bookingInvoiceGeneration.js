import {
    Document,
    Page,
    Text,
    View,
    Font,
    Image,
} from "@react-pdf/renderer";
import {checkifweekend} from "../COMPONENTS/order-edit/order-edit-helper-funtions";

import {dateFormatConverter} from "./dateformatconverter";

import {
    coverageprices,
    coverageTxt,
    credentials,
    packingMaterialsDeliveryPrice,
    postcodeDistancePrice,
    precollprice,
    precolltxt,
    times,
    weekendCollectionPrice,
} from "./variousVariables";

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
    function header() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 48,
                }}
            >
                <Image
                    style={{height: 32}}
                    src={"/logo2.png"}
                ></Image>
                <Text style={{fontWeight: "bold", fontSize: 24}}>
                    INVOICE
                </Text>
            </View>
        );
    }

    function unistorCredentials() {
        return (
            <View
                style={{
                    paddingRight: 48,
                }}
            >
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "flex-end",
                    }}
                >
                    <Text
                        style={{
                            display: "flex",
                            alignSelf: "flex-end",
                            family: "sans",
                            fontWeight: "bold",
                        }}
                    >
                        {credentials.company}
                    </Text>
                    <Text
                        style={{
                            display: "flex",
                            alignSelf: "flex-end",
                        }}
                    >
                        {credentials.address}
                    </Text>
                    <Text
                        style={{
                            display: "flex",
                            alignSelf: "flex-end",
                        }}
                    >
                        {credentials.zip}, {credentials.city}
                    </Text>
                    <Text
                        style={{
                            display: "flex",
                            alignSelf: "flex-end",
                        }}
                    >
                        {credentials.country}
                    </Text>
                </View>
            </View>
        );
    }

    function customerCredentialsDateInvoiceNr() {
        function address() {
            return (
                <View style={{paddingLeft: 48}}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{fontWeight: "bold", height: 18}}
                        >
                            Customer:
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text>
                            {p.order?.state?.dropoff
                                ?.buildingnrname ||
                            p.order?.state?.address.buildingnrname
                                ? p.order?.state?.dropoff
                                      ?.buildingnrname ||
                                  p.order?.state?.address
                                      .buildingnrname
                                : null}
                            {p.order?.state?.dropoff
                                ?.buildingnrname ||
                            p.order?.state?.address.buildingnrname
                                ? ", "
                                : null}

                            {p.order?.state?.dropoff?.addressLine1 ||
                            p.order?.state?.address.addressLine1
                                ? p.order?.state?.dropoff
                                      ?.addressLine1 ||
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
                                ? p.order?.state?.dropoff
                                      ?.addressLine2 ||
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

        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 64,
                    paddingTop: 16,
                    paddingBottom: 16,
                    borderTopColor: "black",
                    borderBottomColor: "black",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                }}
            >
                {address()}
                <View style={{paddingRight: 48}}>
                    {" "}
                    <View style={{flexDirection: "row"}}>
                        <Text
                            style={{
                                fontFamily: "sans",
                                fontWeight: "bold",
                                width: 70,
                                textAlign: "right",
                            }}
                        >
                            Invoice no.:
                        </Text>
                        <Text> {p.order.invoiceNr}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text
                            style={{
                                fontFamily: "sans",
                                fontWeight: "bold",
                                width: 70,
                                textAlign: "right",
                            }}
                        >
                            Date:
                        </Text>
                        <Text>
                            {" "}
                            {dateFormatConverter(
                                new Date(
                                    p.order.orderTime
                                ).toDateString()
                            )}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
    function products() {
        let prodcount = 0;
        let discountPrice = 0;
        function productscounter() {
            let order = p.order;
            let products = [];

            let storageprice = 0;
            for (const item of order.state.prices.items.storage) {
                if (
                    order.bookingState.storage[item.pos] !==
                        undefined &&
                    order.bookingState.storage[item.pos] !== 0
                ) {
                    storageprice =
                        storageprice +
                        order.bookingState.storage[item.pos] *
                            parseFloat(item.price);

                    let obj = {
                        quantity:
                            order.bookingState.storage[item.pos],
                        description: item.name,

                        price: item.price,
                    };
                    prodcount =
                        prodcount +
                        order.bookingState.storage[item.pos];
                    if (obj.quantity !== 0) {
                        products.push(obj);
                    }
                }
            }

            if (p.order.state.referralCode.discount) {
                let dsc =
                    (storageprice *
                        parseFloat(
                            p.order.state.referralCode.discount
                        )) /
                    100;

                storageprice = storageprice - dsc;
                discountPrice = dsc;
            }

            if (
                order.state.checkout.coverageLevel !== coverageTxt[0]
            ) {
                for (let i = 0; i < coverageTxt.length; i++) {
                    if (
                        coverageTxt[i] ===
                        order.state.checkout.coverageLevel
                    ) {
                        storageprice =
                            storageprice +
                            coverageprices[i - 1] *
                                parseFloat(prodcount);
                    }
                }
            }

            return {products, storageprice};
        }
        function packingMatsCounter() {
            let order = p.order;

            let products = [];
            let price = 0;

            for (const item of order.state.prices.items
                .packingMaterials) {
                if (order.bookingState.materials[item.pos]) {
                    let obj = {
                        quantity:
                            order.bookingState.materials[item.pos],
                        description: item.name,
                        price: item.price,
                    };

                    price =
                        price + parseFloat(obj.price) * obj.quantity;

                    products.push(obj);
                }
            }

            if (products.length !== 0) {
                price =
                    price + parseFloat(packingMaterialsDeliveryPrice);
            }
            if (products.length !== 0) {
                products.unshift({
                    quantity: 1,
                    description: "Delivery by courier",
                });
            }
            return {products, price};
        }
        function addonsCounter() {
            let order = p.order;
            let products = [];
            let price = 0;

            if (order.state.date.pickUpTime !== times[0]) {
                products.push({
                    quantity: 1,
                    description: "Time slot",
                    price: precollprice[1],
                });
                price = price + precollprice[1];
            }

            if (
                order.state.checkout.premiumCollection ===
                precolltxt[1]
            ) {
                products.push({
                    quantity: 1,
                    description: precolltxt[1],
                    price: precollprice[1],
                });
                price = price + precollprice[1];
            }

            if (order.state.address.postcodeDistance > 50) {
                products.push({
                    quantity: 1,
                    description: "Out of area pickup",
                    price: parseFloat(postcodeDistancePrice),
                });
                price = price + parseFloat(postcodeDistancePrice);
            }

            let chifw = checkifweekend(order.state.date.pickUpDate);
            if (chifw) {
                products.push({
                    quantity: 1,
                    description: "Weekend collection",
                    price: weekendCollectionPrice,
                });
                price = price + weekendCollectionPrice;
            }

            return {products, price};
        }

        let prdc = productscounter();
        let pmc = packingMatsCounter();
        let adc = addonsCounter();
        let total = prdc.storageprice + pmc.price + adc.price;

        function productsLiner() {
            return (
                <View>
                    {prdc.products.map((el, i) => {
                        return (
                            <View
                                key={i}
                                style={{
                                    flexDirection: "row",

                                    justifyContent: "space-between",
                                    paddingLeft: 48,
                                    paddingRight: 48,
                                }}
                            >
                                <Text>{el.description.trim()}</Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                    }}
                                >
                                    {" "}
                                    <Text
                                        style={{
                                            width: 64,
                                            textAlign: "center",
                                        }}
                                    >
                                        {el.quantity}
                                    </Text>
                                    <Text style={{width: 80}}></Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            );
        }
        function packingMatsLiner() {
            return (
                <View>
                    {pmc.products.map((el, i) => {
                        return (
                            <View
                                key={i}
                                style={{
                                    flexDirection: "row",

                                    justifyContent: "space-between",
                                    paddingLeft: 48,
                                    paddingRight: 48,
                                }}
                            >
                                <Text>{el.description}</Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                    }}
                                >
                                    {" "}
                                    <Text
                                        style={{
                                            width: 64,
                                            textAlign: "center",
                                        }}
                                    >
                                        {el.quantity}
                                    </Text>
                                    <Text style={{width: 80}}></Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            );
        }
        function addonsLiner() {
            return (
                <View>
                    {adc.products.map((el, i) => {
                        return (
                            <View
                                key={i}
                                style={{
                                    flexDirection: "row",

                                    justifyContent: "space-between",
                                    paddingLeft: 48,
                                    paddingRight: 48,
                                }}
                            >
                                <Text>{el.description}</Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                    }}
                                >
                                    {" "}
                                    <Text
                                        style={{
                                            width: 64,
                                            textAlign: "center",
                                        }}
                                    >
                                        {el.quantity}
                                    </Text>
                                    <Text style={{width: 80}}></Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            );
        }

        let flstyle = {
            marginTop: 8,
            flexDirection: "row",
            fontFamily: "sans",
            fontWeight: "bold",
            justifyContent: "space-between",
            marginLeft: 48,
            marginRight: 48,
            backgroundColor: "#e9e9e9",
            marginBottom: 4,
            alignItems: "center",
            height: 16,
        };

        function productsTitlesLine() {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        fontFamily: "sans",
                        fontWeight: "bold",
                        justifyContent: "space-between",
                        paddingLeft: 48,
                        paddingRight: 48,
                    }}
                >
                    <Text>Products</Text>

                    <View style={{flexDirection: "row"}}>
                        {" "}
                        <Text
                            style={{width: 64, textAlign: "center"}}
                        >
                            Quantity
                        </Text>
                        <Text style={{width: 80, textAlign: "right"}}>
                            Price
                        </Text>
                    </View>
                </View>
            );
        }

        function productsFirstMonthLine() {
            return (
                <View style={flstyle}>
                    <Text
                        style={{
                            fontFamily: "sans",
                            fontWeight: "bold",
                            transform: "translateY(2)",
                        }}
                    >
                        Storage(1st month payment)
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            transform: "translateY(2)",
                        }}
                    >
                        <Text>£{prdc.storageprice.toFixed(2)}</Text>
                    </View>
                </View>
            );
        }
        function addonsFirstLine() {
            return (
                <View style={flstyle}>
                    <Text
                        style={{
                            fontFamily: "sans",
                            fontWeight: "bold",
                            transform: "translateY(2)",
                        }}
                    >
                        Add-ons
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            transform: "translateY(2)",
                        }}
                    >
                        <Text>£{adc.price.toFixed(2)}</Text>
                    </View>
                </View>
            );
        }
        function totalFirstLine() {
            return (
                <View style={flstyle}>
                    <Text
                        style={{
                            fontFamily: "sans",
                            fontWeight: "bold",
                        }}
                    ></Text>

                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                width: 64,
                                textAlign: "center",
                                transform: "translateY(2)",
                            }}
                        >
                            Total:
                        </Text>
                        <Text
                            style={{
                                width: 80,
                                textAlign: "right",
                                transform: "translateY(2)",
                            }}
                        >
                            £{total.toFixed(2)}
                        </Text>
                    </View>
                </View>
            );
        }
        function packingMaterialsFirstLine() {
            return (
                <View style={flstyle}>
                    <Text
                        style={{
                            fontFamily: "sans",
                            fontWeight: "bold",
                            transform: "translateY(2)",
                        }}
                    >
                        Packing Materials
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            transform: "translateY(2)",
                        }}
                    >
                        <Text>£{pmc.price.toFixed(2)}</Text>
                    </View>
                </View>
            );
        }
        function discount() {
            return (
                <View
                    style={{
                        flexDirection: "row",

                        justifyContent: "space-between",
                        paddingLeft: 48,
                        paddingRight: 48,
                    }}
                >
                    <Text>{`Student discount (Referral code:${p.order.state.referralCode.code})`}</Text>

                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                width: 64,
                                textAlign: "center",
                            }}
                        >
                            {p.order.state.referralCode.discount}%
                        </Text>
                        <Text style={{width: 80, textAlign: "right"}}>
                            -£
                            {discountPrice.toFixed(2)}
                        </Text>
                    </View>
                </View>
            );
        }

        return (
            <View
                style={{
                    flexDirection: "column",
                    marginTop: 64,
                }}
            >
                {productsTitlesLine()}
                <View
                    style={{
                        borderTopColor: "black",
                        marginTop: 4,
                        borderTopWidth: 1,
                    }}
                ></View>
                {productsFirstMonthLine()}
                {productsLiner()}
                {p.order.state.referralCode.code ? discount() : null}
                {pmc.products.length !== 0
                    ? packingMaterialsFirstLine()
                    : null}
                {pmc.products.length !== 0
                    ? packingMatsLiner()
                    : null}
                {adc.products.length !== 0 ? addonsFirstLine() : null}
                {adc.products.length !== 0 ? addonsLiner() : null}
                {totalFirstLine()}
            </View>
        );
    }

    /////////////////////////////////

    return (
        <Document>
            <Page
                size="A4"
                style={{
                    fontSize: 12,
                    fontFamily: "sans",
                }}
            >
                {header()}
                {unistorCredentials()}
                {customerCredentialsDateInvoiceNr()}
                {products()}
            </Page>
        </Document>
    );
};
////////////////////////////////

export function downloadBookingInvoice(order) {
    return <MyDoc p={{order}} />;
}
