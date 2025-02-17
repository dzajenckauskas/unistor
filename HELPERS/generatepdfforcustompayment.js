import {dateFormatConverter} from "./dateformatconverter";
import {htmlforlastpayment} from "./htmlforlastpaymentpdf";

import easyinvoice from "easyinvoice";

export async function generatePDFforcustompayment(order, el) {
    let html = htmlforlastpayment();

    function getProducts() {
        let products = [];
        products.push({
            quantity: parseFloat(el.payment.quantity),
            description: el.payment.description,
            price: parseFloat(el.payment.price),
            "tax-rate": 0,
        });

        ///

        return products;
    }

    const data = {
        customize: {
            template: btoa(html), // Your template must be base64 encoded
        },
        images: {
            logo: `https://unistor.co.uk/logo2.png`,
        },
        information: {
            number: el.invoiceNr,
            date: `${dateFormatConverter(
                new Date(el.time).toDateString()
            )}`,
        },

        client: {
            company: `${order.state.address.firstName} ${order.state.address.lastName}`,
            address: `${order.state.address.addressLine1}`,
            zip: `${order.state.address.postcode}`,
            city: `${order.state.address.town}`,
        },

        sender: {
            company: "Unistor Ltd",
            address: "8 Field Road",
            zip: "UB9 4HL",
            city: "Uxbridge",
            country: "United Kingdom",
            //   custom1: "020 8064 1795",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        products: getProducts(),
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`UNISTOR-Nr${el.invoiceNr}`, result.pdf);
}
