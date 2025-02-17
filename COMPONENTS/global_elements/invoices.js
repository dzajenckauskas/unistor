import {downloadBookingInvoice} from "../../HELPERS/bookingInvoiceGeneration";
import {dateFormatConverter} from "../../HELPERS/dateformatconverter";
import {generatePDFforcustompayment} from "../../HELPERS/generatepdfforcustompayment";
import {generatePDFforlastpayment} from "../../HELPERS/generatePDFforlastpayment";
import {PDFDownloadLink} from "@react-pdf/renderer";

export default function InvoiceComponent({order}) {
    return (
        <table className="invoiceComponenttable">
            <tbody>
                <tr className="invoiceComponenttablefirsttr">
                    <td>Name:</td>
                    <td>Amount:</td>
                    <td>Date:</td>
                </tr>

                <tr>
                    <td>Booking</td>
                    <td>
                        {" "}
                        {`£${(
                            order?.paymentIntent?.amount / 100
                        ).toFixed(2)}`}
                    </td>
                    <td>
                        {" "}
                        {`${dateFormatConverter(
                            new Date(order.orderTime).toDateString()
                        )}`}
                        :
                    </td>
                    <td>
                        {" "}
                        <PDFDownloadLink
                            document={downloadBookingInvoice(order)}
                            fileName={`BookingInvoiceNr(${order.invoiceNr}).pdf`}
                        >
                            <button>DOWNLOAD</button>
                            {({blob, url, loading, error}) =>
                                "DOWNLOAD"
                            }
                        </PDFDownloadLink>
                    </td>
                </tr>

                {order.customPayments
                    ? order.customPayments.map((el, i) => {
                          return (
                              <tr key={i}>
                                  <td>{el.payment.description}</td>
                                  <td>
                                      {" "}
                                      {`£${(
                                          el.payment?.amount / 100
                                      ).toFixed(2)}`}
                                  </td>
                                  <td>
                                      {" "}
                                      {`${dateFormatConverter(
                                          new Date(
                                              el.time
                                          ).toDateString()
                                      )}`}
                                  </td>
                                  <td>
                                      <button
                                          onClick={() => {
                                              generatePDFforcustompayment(
                                                  order,
                                                  el
                                              );
                                          }}
                                      >
                                          DOWNLOAD
                                      </button>
                                  </td>
                              </tr>
                          );
                      })
                    : null}

                {order.finalPayment ? (
                    <tr>
                        <td>Final payment</td>
                        <td>
                            {`£${(
                                order?.finalPayment?.payment?.amount /
                                100
                            ).toFixed(2)}`}
                        </td>
                        <td>
                            {`${dateFormatConverter(
                                new Date(
                                    order?.finalPayment?.time
                                ).toDateString()
                            )}`}
                            :
                        </td>
                        <td>
                            {" "}
                            <button
                                onClick={() => {
                                    generatePDFforlastpayment(order);
                                }}
                            >
                                DOWNLOAD
                            </button>
                        </td>
                    </tr>
                ) : null}
            </tbody>
        </table>
    );
}
