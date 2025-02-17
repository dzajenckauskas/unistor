import {useEffect, useState} from "react";
import {downloadBookingInvoice} from "../../HELPERS/bookingInvoiceGeneration";
import {fetchData} from "../../HELPERS/fetchdata";
import {generatePDFforcustompayment} from "../../HELPERS/generatepdfforcustompayment";
import {generatePDFforlastpayment} from "../../HELPERS/generatePDFforlastpayment";
import {PDFDownloadLink} from "@react-pdf/renderer";

export default function Payments({mobile}) {
    const [payments, setpayments] = useState([]);

    const menu = [
        "Invoice",
        "Order ID",
        "Date",
        "Type",
        "Amount",

        "",
    ];

    useEffect(() => {
        (async () => {
            let f = await fetchData("/api/myAccount/myBookings", {
                type: "getList",
            });
            if (f.orders) {
                setpayments(JSON.parse(f.orders));
            }
        })();
    }, []);

    function generatepdfpayments() {
        return (
            <table className="myaccountpaymenttable">
                <tbody>
                    <tr>
                        {menu.map((el, i) => {
                            return (
                                <td
                                    key={i + "tsdf"}
                                    className="myaccountpaymentstablemenu"
                                >
                                    {" "}
                                    <strong>{el}</strong>
                                </td>
                            );
                        })}
                    </tr>
                </tbody>

                {payments.map((el, i) => {
                    return (
                        <tbody
                            className="myaccountpaymentstbody"
                            key={i + "mngk"}
                        >
                            {el.paymentIntent ? (
                                <tr>
                                    <td className="classname">
                                        {el.invoiceNr}
                                    </td>
                                    <td className="classname">
                                        {el.orderNr}
                                    </td>
                                    <td className="classname">
                                        {new Date(
                                            el.orderTime
                                        ).toDateString("gb")}
                                    </td>
                                    <td>Initial payment</td>
                                    <td className="classname">
                                        £
                                        {(
                                            el.paymentIntent.amount /
                                            100
                                        ).toFixed(2)}
                                    </td>
                                    <td className="userpaymenttdbuttonwrapper">
                                        <PDFDownloadLink
                                            className="downloadjobbuttonpayments"
                                            document={downloadBookingInvoice(
                                                el
                                            )}
                                            fileName="bookingInvoice.pdf"
                                        >
                                            <button
                                                className="myaccount_payments_downloadpdf_button_payments"
                                                type=""
                                            >
                                                DOWNLOAD
                                            </button>
                                            {({
                                                blob,
                                                url,
                                                loading,
                                                error,
                                            }) => "DOWNLOAD"}
                                        </PDFDownloadLink>
                                    </td>
                                </tr>
                            ) : null}

                            {el.customPayments &&
                            el.customPayments.length !== 0
                                ? el.customPayments.map((cp, i) => {
                                      return (
                                          <tr key={i + "cp"}>
                                              <td className="classname">
                                                  {cp.invoiceNr}
                                              </td>
                                              <td className="classname">
                                                  {el.orderNr}
                                              </td>
                                              <td className="classname">
                                                  {new Date(
                                                      cp.time
                                                  ).toDateString(
                                                      "gb"
                                                  )}
                                              </td>
                                              <td>Custom payment</td>
                                              <td className="classname">
                                                  £
                                                  {(
                                                      cp.payment
                                                          .amount /
                                                      100
                                                  ).toFixed(2)}
                                              </td>
                                              <button
                                                  onClick={() => {
                                                      generatePDFforcustompayment(
                                                          el,
                                                          cp
                                                      );
                                                  }}
                                                  className="myaccount_payments_downloadpdf_button_payments"
                                                  type=""
                                              >
                                                  DOWNLOAD
                                              </button>
                                          </tr>
                                      );
                                  })
                                : null}

                            {el.finalPayment ? (
                                <tr>
                                    <td className="classname">
                                        {el.finalPayment.invoiceNr}
                                    </td>
                                    <td className="classname">
                                        {el.orderNr}
                                    </td>
                                    <td className="classname">
                                        {new Date(
                                            el.finalPayment.time
                                        ).toDateString("gb")}
                                    </td>
                                    <td>Final payment</td>
                                    <td className="classname">
                                        £
                                        {(
                                            el.finalPayment.payment
                                                .amount / 100
                                        ).toFixed(2)}
                                    </td>
                                    <div className="classname">
                                        <button
                                            onClick={() => {
                                                generatePDFforlastpayment(
                                                    el
                                                );
                                            }}
                                            className="myaccount_payments_downloadpdf_button_payments"
                                            type=""
                                        >
                                            DOWNLOAD
                                        </button>
                                    </div>
                                </tr>
                            ) : null}
                        </tbody>
                    );
                })}
            </table>
        );
    }

    return (
        <div style={{overflowX: "auto", width: "100%"}}>
            {generatepdfpayments()}
        </div>
    );
}
