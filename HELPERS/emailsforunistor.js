import {itemsofstorageandmats} from "./variousVariables";

export function emailFterBookingToUnistor(order) {
    function packingMats() {
        function mapped() {
            let arr = [];

            itemsofstorageandmats.packingMaterials.map((mat, i) => {
                if (order?.state?.materials?.[mat.pos]) {
                    let elm = `<p
                            style="font-size: 16px;
        color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
       Helvetica,
       sans-serif;
    text-align: left;
    "
                        >
                            ${order.state.materials[mat.pos]} X ${
                        mat.name
                    }
                        </p>`;
                    if (elm) {
                        arr.push(elm);
                    }
                }
            });
            return arr.join("");
        }

        return ` <div style="   margin-bottom: 32px;" >
                <p
                    style="
font-size: 16px;
color: #594a43;
margin: 0;
line-height: 24px;
font-family: Arial,
Helvetica,
sans-serif;
text-align: left;
"
                >
                    <strong>BOX DELIVERY:</strong>
                    ${
                        order?.state?.materials
                            ?.packingMaterialsDelivery
                    }
                </p>
                <p
                    style="
font-size: 16px;
color: #594a43;
margin: 0;
line-height: 24px;
font-family: Arial,
Helvetica,
sans-serif;
text-align: left;
margin-bottom: 8px;
"
                >
                    <strong>REQUIRED:</strong>
                </p>

                ${mapped()}
            </div>`;
    }

    function collectionAddress(params) {
        let arr = [
            "buildingnrname",
            "addressLine1",
            "addressLine2",
            "town",
            "postcode",
        ];
        let txt = [];
        for (const el of arr) {
            if (order?.state?.address[el]) {
                txt.push(order.state.address[el]);
            }
        }
        return txt.join(", ");
    }

    function storageOfItems() {
        function mapped() {
            let arr = [];

            itemsofstorageandmats.storage.map((st, i) => {
                if (order?.state?.storage?.[st.pos]) {
                    let elm = `<p
                            style="font-size: 16px;
        color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
       Helvetica,
       sans-serif;
    text-align: left;
    "
                        >
                            ${order.state.storage[st.pos]} X ${
                        st.name
                    }
                        </p>`;
                    if (elm) {
                        arr.push(elm);
                    }
                }
            });
            return arr.join("");
        }

        return ` <div  style=" margin-bottom: 48px;" >
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>COLLECTION DATE:</strong>
                    ${order?.state?.date?.pickUpDate || ""}
                </p>
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>NAME:</strong>
                    ${order?.state?.address?.firstName} ${
            order?.state?.address?.lastName
        }
                </p>
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
    margin-bottom: 8px;
"
                >
                    <strong>ADDRESS:</strong>
                    ${collectionAddress()}
                </p>
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>INVENTORY:</strong>
                </p>
                ${mapped()}
            </div>`;
    }

    let html = `<!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta charset="UTF-8" />
                <meta
                    http-equiv="X-UA-Compatible"
                    content="IE=edge"
                />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
            </head>
            <body style="margin: 0; padding: 0">
                <div>
                    <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                    >
                        <tbody>
                            <tr>
                                <td
                                    style="
                                    background-color: silver;
                                    padding: 10px;
                                    padding-top: 24px;
                                    padding-bottom: 24px;
                                "
                                    valign="top"
                                    bgcolor="#fff"
                                    align="center"
                                >
                                    <table width="620">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style="
                                                    padding: 15px 0;
                                                    text-align: center;
                                                "
                                                >
                                                    <a
                                                        rel="nofollow noopener noreferrer"
                                                        target="_blank"
                                                        href="https://www.unistor.co.uk"
                                                        style="
                                                        text-decoration: none;
                                                    "
                                                    >
                                                        <img
                                                            src="https://unistor.co.uk/logo2.png"
                                                            alt="unistor.co.uk"
                                                            width="187"
                                                            height="65"
                                                        />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table
                                        style="
                                        border-spacing: 0;
                                        border: 1px solid #ccc;
                                        border-top: 3px solid #ccc;
                                        border-bottom: 3px solid #d80b65;
                                        margin: 0;
                                    "
                                        width="620"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td valign="top">
                                                    <table
                                                        class="yiv3315712550content"
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                    background-color: #fff;
                                                                    padding: 30px;
                                                                "
                                                                    valign="top"
                                                                    bgcolor="#fff"
                                                                    align="left"
                                                                >
                                                                    <p
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #473933;
                                                                        margin: 0;
                                                                        line-height: 26px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: center;
                                                                        font-style: normal;
                                                                    "
                                                                    ></p>

                                                                    <p
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #594a43;
                                                                        margin: 0;
                                                                        line-height: 24px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: left;
                                                                        margin-bottom: 56px;
                                                                    "
                                                                    >
                                                                        <strong>
                                                                            NEW
                                                                            BOOKING
                                                                            HAS
                                                                            BEEN
                                                                            COMPLETED,
                                                                            PLEASE
                                                                            SEE
                                                                            DETAILS
                                                                            BELOW,
                                                                        </strong>
                                                                    </p>
                                                                    ${
                                                                        order
                                                                            ?.state
                                                                            ?.materials
                                                                            ?.packingMaterials
                                                                            ? packingMats()
                                                                            : null
                                                                    }
                                                       
                                                                    ${storageOfItems()}
                                                                    <a
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #fff;
                                                                        margin: 0;
                                                                        line-height: 24px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: left;
                                                                        background-color: #d80b65;
                                                                        padding: 16px
                                                                            16px;
                                                                        cursor: pointer;
                                                                    "
                                                                        href="https://unistor.co.uk/admin/connected"
                                                                    >
                                                                        GO
                                                                        TO
                                                                        ADMIN
                                                                        PANEL
                                                                    </a>
                                                                    <br />
                                                                    <br />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>`;

    return html;
}
export function emailAfterFinalPaymentToUnistor(order) {
    function collectionAddress(params) {
        let arr = [
            "buildingnrname",
            "addressLine1",
            "addressLine2",
            "town",
            "postcode",
        ];
        let txt = [];
        for (const el of arr) {
            let addr = order?.state?.dropoff || order?.state?.address;

            if (addr[el]) {
                txt.push(addr[el]);
            }
        }
        return txt.join(", ");
    }

    function storageOfItems() {
        function mapped() {
            let arr = [];

            itemsofstorageandmats.storage.map((st, i) => {
                if (order?.state?.storage?.[st.pos]) {
                    let elm = `<p
                            style="font-size: 16px;
        color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
       Helvetica,
       sans-serif;
    text-align: left;
    "
                        >
                            ${order.state.storage[st.pos]} X ${
                        st.name
                    }
                        </p>`;
                    if (elm) {
                        arr.push(elm);
                    }
                }
            });

            if (order?.state?.customItems) {
                order.state.customItems.map((el, i) => {
                    let elm = `<p
                            style="font-size: 16px;
        color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
       Helvetica,
       sans-serif;
    text-align: left;
    "
                        >
                            ${el.quantity} X ${el.name}
                        </p>`;
                    if (elm) {
                        arr.push(elm);
                    }
                });
            }

            return arr.join("");
        }

        return ` <div  style=" margin-bottom: 48px;" >
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>DELIVERY DATE:</strong>
                    ${order?.deliverDate?.date || ""}
                </p>
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>NAME:</strong>
                    ${order?.state?.address?.firstName} ${
            order?.state?.address?.lastName
        }
                </p>
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
    margin-bottom: 8px;
"
                >
                    <strong>ADDRESS:</strong>
                    ${collectionAddress()}
                </p>
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>INVENTORY:</strong>
                </p>
                ${mapped()}
            </div>`;
    }

    let html = `<!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta charset="UTF-8" />
                <meta
                    http-equiv="X-UA-Compatible"
                    content="IE=edge"
                />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
            </head>
            <body style="margin: 0; padding: 0">
                <div>
                    <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                    >
                        <tbody>
                            <tr>
                                <td
                                    style="
                                    background-color: silver;
                                    padding: 10px;
                                    padding-top: 24px;
                                    padding-bottom: 24px;
                                "
                                    valign="top"
                                    bgcolor="#fff"
                                    align="center"
                                >
                                    <table width="620">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style="
                                                    padding: 15px 0;
                                                    text-align: center;
                                                "
                                                >
                                                    <a
                                                        rel="nofollow noopener noreferrer"
                                                        target="_blank"
                                                        href="https://www.unistor.co.uk"
                                                        style="
                                                        text-decoration: none;
                                                    "
                                                    >
                                                        <img
                                                            src="https://unistor.co.uk/logo2.png"
                                                            alt="unistor.co.uk"
                                                            width="187"
                                                            height="65"
                                                        />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table
                                        style="
                                        border-spacing: 0;
                                        border: 1px solid #ccc;
                                        border-top: 3px solid #ccc;
                                        border-bottom: 3px solid #d80b65;
                                        margin: 0;
                                    "
                                        width="620"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td valign="top">
                                                    <table
                                                        class="yiv3315712550content"
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                    background-color: #fff;
                                                                    padding: 30px;
                                                                "
                                                                    valign="top"
                                                                    bgcolor="#fff"
                                                                    align="left"
                                                                >
                                                                    <p
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #473933;
                                                                        margin: 0;
                                                                        line-height: 26px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: center;
                                                                        font-style: normal;
                                                                    "
                                                                    ></p>

                                                                    <p
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #594a43;
                                                                        margin: 0;
                                                                        line-height: 24px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: left;
                                                                        margin-bottom: 56px;
                                                                    "
                                                                    >
                                                                        <strong>
                                                                      CUSTOMER HAVE JUST PAID IN FULL AND SCHEDULED A RETURN
                                                                        </strong>
                                                                    </p>
                                                       
                                                                    ${storageOfItems()}
                                                                    <a
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #fff;
                                                                        margin: 0;
                                                                        line-height: 24px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: left;
                                                                        background-color: #d80b65;
                                                                        padding: 16px
                                                                            16px;
                                                                        cursor: pointer;
                                                                    "
                                                                        href="https://unistor.co.uk/admin/connected"
                                                                    >
                                                                        GO
                                                                        TO
                                                                        ADMIN
                                                                        PANEL
                                                                    </a>
                                                                    <br />
                                                                    <br />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>`;

    return html;
}
export function emailOnPickUpDateChangeToUnistor(order) {
    function collectionAddress(params) {
        let arr = [
            "buildingnrname",
            "addressLine1",
            "addressLine2",
            "town",
            "postcode",
        ];
        let txt = [];
        for (const el of arr) {
            let addr = order?.state?.dropoff || order?.state?.address;

            if (addr[el]) {
                txt.push(addr[el]);
            }
        }
        return txt.join(", ");
    }

    function storageOfItems() {
        function mapped() {
            let arr = [];

            itemsofstorageandmats.storage.map((st, i) => {
                if (order?.state?.storage?.[st.pos]) {
                    let elm = `<p
                            style="font-size: 16px;
        color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
       Helvetica,
       sans-serif;
    text-align: left;
    "
                        >
                            ${order.state.storage[st.pos]} X ${
                        st.name
                    }
                        </p>`;
                    if (elm) {
                        arr.push(elm);
                    }
                }
            });

            if (order?.state?.customItems) {
                order.state.customItems.map((el, i) => {
                    let elm = `<p
                            style="font-size: 16px;
        color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
       Helvetica,
       sans-serif;
    text-align: left;
    "
                        >
                            ${el.quantity} X ${el.name}
                        </p>`;
                    if (elm) {
                        arr.push(elm);
                    }
                });
            }

            return arr.join("");
        }

        return ` <div  style=" margin-bottom: 48px;" >
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>DELIVERY DATE:</strong>
                    ${order.state.date.pickUpDate || ""}
                </p>
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>NAME:</strong>
                    ${order?.state?.address?.firstName} ${
            order?.state?.address?.lastName
        }
                </p>
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
    margin-bottom: 8px;
"
                >
                    <strong>ADDRESS:</strong>
                    ${collectionAddress()}
                </p>
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>INVENTORY:</strong>
                </p>
                ${mapped()}
            </div>`;
    }

    let html = `<!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta charset="UTF-8" />
                <meta
                    http-equiv="X-UA-Compatible"
                    content="IE=edge"
                />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
            </head>
            <body style="margin: 0; padding: 0">
                <div>
                    <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                    >
                        <tbody>
                            <tr>
                                <td
                                    style="
                                    background-color: silver;
                                    padding: 10px;
                                    padding-top: 24px;
                                    padding-bottom: 24px;
                                "
                                    valign="top"
                                    bgcolor="#fff"
                                    align="center"
                                >
                                    <table width="620">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style="
                                                    padding: 15px 0;
                                                    text-align: center;
                                                "
                                                >
                                                    <a
                                                        rel="nofollow noopener noreferrer"
                                                        target="_blank"
                                                        href="https://www.unistor.co.uk"
                                                        style="
                                                        text-decoration: none;
                                                    "
                                                    >
                                                        <img
                                                            src="https://unistor.co.uk/logo2.png"
                                                            alt="unistor.co.uk"
                                                            width="187"
                                                            height="65"
                                                        />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table
                                        style="
                                        border-spacing: 0;
                                        border: 1px solid #ccc;
                                        border-top: 3px solid #ccc;
                                        border-bottom: 3px solid #d80b65;
                                        margin: 0;
                                    "
                                        width="620"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td valign="top">
                                                    <table
                                                        class="yiv3315712550content"
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                    background-color: #fff;
                                                                    padding: 30px;
                                                                "
                                                                    valign="top"
                                                                    bgcolor="#fff"
                                                                    align="left"
                                                                >
                                                                    <p
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #473933;
                                                                        margin: 0;
                                                                        line-height: 26px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: center;
                                                                        font-style: normal;
                                                                    "
                                                                    ></p>

                                                                    <p
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #594a43;
                                                                        margin: 0;
                                                                        line-height: 24px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: left;
                                                                        margin-bottom: 56px;
                                                                    "
                                                                    >
                                                                        <strong>
                                                                      CUSTOMER JUST CHANGED THEIR COLLECTION DATE TO ${
                                                                          order
                                                                              .state
                                                                              .date
                                                                              .pickUpDate
                                                                      }
                                                                        </strong>
                                                                    </p>
                                                       
                                                                    ${storageOfItems()}
                                                                    <a
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #fff;
                                                                        margin: 0;
                                                                        line-height: 24px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: left;
                                                                        background-color: #d80b65;
                                                                        padding: 16px
                                                                            16px;
                                                                        cursor: pointer;
                                                                    "
                                                                        href="https://unistor.co.uk/admin/connected"
                                                                    >
                                                                        GO
                                                                        TO
                                                                        ADMIN
                                                                        PANEL
                                                                    </a>
                                                                    <br />
                                                                    <br />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>`;

    return html;
}
export function emailOnContactMessage(order) {
    function storageOfItems() {
        return ` <div  style=" margin-bottom: 48px;" >

                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>NAME:</strong>
                    ${order?.yourName}
                </p>
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>COMPANY:</strong>
                    ${order.company || ""}
                </p>
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>TELEPHONE:</strong>
                    ${order.telephone || ""}
                </p>           
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
"
                >
                    <strong>EMAIL:</strong>
                    ${order.email}
                </p>           
                <p
                    style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
        Helvetica,
        sans-serif;
    text-align: left;
margin-bottom:24px;
"
                >
                    <strong>CONTENT:</strong>
                    <br/>

<div                      style="

white-space:pre-wrap;
overflow-wrap:break-word;
"  >  ${order.message}</div>

                  
                </p>           
            </div>`;
    }

    let html = `<!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta charset="UTF-8" />
                <meta
                    http-equiv="X-UA-Compatible"
                    content="IE=edge"
                />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
            </head>
            <body style="margin: 0; padding: 0">
                <div>
                    <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                    >
                        <tbody>
                            <tr>
                                <td
                                    style="
                                    background-color: silver;
                                    padding: 10px;
                                    padding-top: 24px;
                                    padding-bottom: 24px;
                                "
                                    valign="top"
                                    bgcolor="#fff"
                                    align="center"
                                >
                                    <table width="620">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style="
                                                    padding: 15px 0;
                                                    text-align: center;
                                                "
                                                >
                                                    <a
                                                        rel="nofollow noopener noreferrer"
                                                        target="_blank"
                                                        href="https://www.unistor.co.uk"
                                                        style="
                                                        text-decoration: none;
                                                    "
                                                    >
                                                        <img
                                                            src="https://unistor.co.uk/logo2.png"
                                                            alt="unistor.co.uk"
                                                            width="187"
                                                            height="65"
                                                        />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table
                                        style="
                                        border-spacing: 0;
                                        border: 1px solid #ccc;
                                        border-top: 3px solid #ccc;
                                        border-bottom: 3px solid #d80b65;
                                        margin: 0;
                                    "
                                        width="620"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td valign="top">
                                                    <table
                                                        class="yiv3315712550content"
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                    background-color: #fff;
                                                                    padding: 30px;
                                                                "
                                                                    valign="top"
                                                                    bgcolor="#fff"
                                                                    align="left"
                                                                >
                                                                    <p
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #473933;
                                                                        margin: 0;
                                                                        line-height: 26px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: center;
                                                                        font-style: normal;
                                                                    "
                                                                    ></p>

                                                                    <p
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #594a43;
                                                                        margin: 0;
                                                                        line-height: 24px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: left;
                                                                        margin-bottom: 56px;
                                                                    "
                                                                    >
                                                                        <strong>
                                                               NEW MESSAGE HAVE BEEN SENT USING FORM ON THE WEBSITE
                                                                        </strong>
                                                                    </p>
                                                       
                                                                    ${storageOfItems()}
                                                                    <a
                                                                        style="
                                                                        font-size: 16px;
                                                                        color: #fff;
                                                                        margin: 0;
                                                                        line-height: 24px;
                                                                        font-family: Arial,
                                                                            Helvetica,
                                                                            sans-serif;
                                                                        text-align: left;
                                                                        background-color: #d80b65;
                                                                        padding: 16px
                                                                            16px;
                                                                        cursor: pointer;
                                                                    "
                                                                        href="https://unistor.co.uk/admin/connected"
                                                                    >
                                                                        GO
                                                                        TO
                                                                        ADMIN
                                                                        PANEL
                                                                    </a>
                                                                    <br />
                                                                    <br />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>`;

    return html;
}
