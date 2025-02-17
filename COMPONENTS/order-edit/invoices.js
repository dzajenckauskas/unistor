import {generatePDFforlastpayment} from "../../HELPERS/generatePDFforlastpayment";
import InvoiceComponent from "../global_elements/invoices";

export default function Invoices({order}) {
    return (
        <div className="ordereditinvoicesglobalwrp">
            <div className="ordereditinvoicestitleinvoices">
                <p>
                    {" "}
                    <strong>Invoices</strong>{" "}
                </p>

                <p className="additionaservicesubtitle">
                    {`All invoices that were generated for customer`}
                </p>
            </div>
            <InvoiceComponent order={order} />
        </div>
    );
}
