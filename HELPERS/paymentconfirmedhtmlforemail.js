import { getStoragePrice } from "../COMPONENTS/order-edit/order-edit-helper-funtions";

export function paymentConfirmedHTMLForEmail(req) {
   return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta
         name="viewport"
         content="width=device-width,initial-scale=1" />
      <title>Document</title>
   </head>
   <body style="margin: 0; padding: 0">
      <div>
         <table
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0">
            <tbody>
               <tr>
                  <td
                     style="
                        background-color: #fff;
                        padding: 10px;
                        padding-top: 24px;
                        padding-bottom: 24px;
                     "
                     valign="top"
                     bgcolor="#fff"
                     align="center">
                     <table width="620">
                        <tbody>
                           <tr>
                              <td
                                 style="
                                    padding: 15px 0;
                                    text-align: center;
                                 ">
                                 <a
                                    rel="nofollow noopener noreferrer"
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://www.unistor.co.uk"
                                    style="text-decoration: none">
                                    <img
                                       src= "https://unistor.co.uk/logo2.png"
                                       alt="unistor.co.uk"
                                       width="187"
                                       height="65" />
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
                        border="0">
                        <tbody>
                           <tr>
                              <td valign="top">
                                 <table
                                    class="yiv3315712550content"
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0">
                                    <tbody>
                                       <tr>
                                          <td
                                             style="
                                                background-color: #fff;
                                                padding: 30px;
                                             "
                                             valign="top"
                                             bgcolor="#fff"
                                             align="left">
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
                                                ">
                                            
                                                
                                             </p>

                                
                                             <p
                                                style="
                                                   font-size: 24px;
                                                   color: #594a43;
                                                   margin: 0;
                                                   line-height: 24px;
                                                   font-family: Arial,
                                                      Helvetica,
                                                      sans-serif;
                                                   text-align: left;
                                                   margin-bottom: 56px;
                                                ">
                                              <strong
                                              >Hi, ${req.body.state
         .address
         .firstName
      } ${req.body.state.address.lastName
      }!</strong
                                             </p>

                                          <p        style="
                                          font-size: 16px;
                                          color: #594a43;
                                          margin: 0;
                                          line-height: 24px;
                                          font-family: Arial,
                                             Helvetica,
                                             sans-serif;
                                          text-align: left;
                                          margin-bottom: 24px;
                                       ">Thank you for your booking 😊</p>

                                          <p        style="
                                          font-size: 16px;
                                          color: #594a43;
                                          margin: 0;
                                          line-height: 24px;
                                          font-family: Arial,
                                             Helvetica,
                                             sans-serif;
                                          text-align: left;
                                          margin-bottom: 24px;
                                       ">You have successfully paid for the first month of your storage, we will generate the final bill when you schedule your return, which can be done – through our website.</p>
                                          <p        style="
                                          font-size: 16px;
                                          color: #594a43;
                                          margin: 0;
                                          line-height: 24px;
                                          font-family: Arial,
                                             Helvetica,
                                             sans-serif;
                                          text-align: left;
                                          margin-bottom: 24px;
                                       ">Price per month: <strong>£${getStoragePrice(
         req.body
      )}</strong></p>
                                       <p   style="
                                       font-size: 16px;
                                       color: #594a43;
                                       margin: 0;
                                       line-height: 24px;
                                       font-family: Arial,
                                          Helvetica,
                                          sans-serif;
                                       text-align: left;
                                       margin-bottom: 24px;
                                    "   > <strong>Please print & securely attach labels to your boxes</strong> (we have generated more labels in case you forgot something, but don’t forget more boxes will mean higher monthly costs) </p>
                                       <p   style="
                                       font-size: 16px;
                                       color: #594a43;
                                       margin: 0;
                                       line-height: 24px;
                                       font-family: Arial,
                                          Helvetica,
                                          sans-serif;
                                       text-align: left;
                                       margin-bottom: 24px;
                                    "   > <strong>Your empty box delivery date:</strong> ${req.body.state.materials
         .packingMaterialsDelivery
      } (Please note: Delivery time will be in between 08:00 – 18:00) </p>
                                       <p   style="
                                       font-size: 16px;
                                       color: #594a43;
                                       margin: 0;
                                       line-height: 24px;
                                       font-family: Arial,
                                          Helvetica,
                                          sans-serif;
                                       text-align: left;
                                       margin-bottom: 24px;
                                    "   > <strong>Your collection of packed items date:</strong>${req.body.state.date.pickUpDate
      }
    <ol style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
       Helvetica,
       sans-serif;
    text-align: left;
    margin-bottom: 24px;
 "    >
      <li   >Collection time: ${req.body.state.date.pickUpTime}</li>
      <li   >${req.body.state.checkout.premiumCollection}</li>
      <li   >Packing service</li>
    </ol></p>



    <p  style="
    font-size: 16px;
    color: #594a43;
    margin: 0;
    line-height: 24px;
    font-family: Arial,
       Helvetica,
       sans-serif;
    text-align: left;
    margin-bottom: 56px;
 "  >If you have any questions, please send us an email on <strong><a href="mailto:hello@unistor.co.uk">hello@unistor.co.uk</a></strong>  or contact us by phone  <strong><a href="tel:+20 8064 1795">020 8064 1795</a>  </strong> </p>

<p    style="
font-size: 16px;
color: #594a43;
margin: 0;
line-height: 24px;
font-family: Arial,
   Helvetica,
   sans-serif;
text-align: left;
margin-bottom: 8px;
"   >Kind regards,</p>


                                       
                                             <p
                                                style="
                                                   font-size: 16px;
                                                   color: #473933;
                                                   margin: 0;
                                                   line-height: 26px;
                                                   font-family: Arial,
                                                      Helvetica,
                                                      sans-serif;
                                                   text-align: left;
                                                   font-style: normal;
                                                ">
                                                <strong>
                                                   Team
                                                   Unistor</strong
                                                >
                                             </p>
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
</html>
`;
}
