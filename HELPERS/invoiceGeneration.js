import easyinvoice from "easyinvoice";

export async function downloadInvoice(data) {
   const result = await easyinvoice.createInvoice(data);
   easyinvoice.download("myInvoice.pdf", result.pdf);
   //	you can download like this as well:
   //	easyinvoice.download();
   //	easyinvoice.download('myInvoice.pdf');
}
