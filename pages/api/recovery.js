import { hashPassword } from "../../BACKEND/bcrypt";
import { findOneDocument, updateById } from "../../BACKEND/mongo";
import { sendEmail } from "../../HELPERS/nodemailer";

export default async function name(req, res) {
   if (!req.body) {
      res.json(false);
   } else {
      switch (req.body.type) {
         case "sendRecovery":
            {
               let f = await findOneDocument("users", {
                  "personalDetails.email": req.body.email,
               });
               if (!f) {
                  res.json({
                     status: false,
                     msg: "email not found",
                  });
               } else {
                  const Cryptr = require("cryptr");
                  const cryptr = new Cryptr(
                     process.env.cryptokey
                  );

                  const encryptedString = cryptr.encrypt(
                     req.body.uniqueid
                  );

                  let u = await updateById("users", f._id, {
                     recovery: {
                        date: Date.now(),
                        key: req.body.uniqueid,
                     },
                  });

                  if (u.modifiedCount !== 0) {
                     let url;

                     if (process.env.production) {
                        url = `https://unistor.co.uk/password_recovery/${encryptedString}`;
                     } else {
                        url = `http://localhost:3000/password_recovery/${encryptedString}`;
                     }

                     let html = `<!DOCTYPE html>
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
                                             padding-top: 20px;
                                             padding-bottom: 20px;
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
                                                            src='https://unistor.co.uk/logo2.png'
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
                                                                     <strong
                                                                        >You have selected
                                                                        “Forgot my
                                                                        password”.</strong
                                                                     >
                                                                  </p>
                     
                                                                  <p
                                                                     style="
                                                                        margin: 18px 0 0;
                                                                        border-top: 1px
                                                                           solid #dedbd9;
                                                                        padding: 0;
                                                                     ">
                                                                     &nbsp;
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
                                                                        font-style: italic;
                                                                        margin-bottom: 24px;
                                                                     ">
                                                                     Please recover your
                                                                     password by clicking
                                                                     the link below:
                                                                  </p>
                     
                                                                  <p
                                                                     style="
                                                                        font-size: 16px;
                                                                        color: #fff;
                                                                        margin: 0;
                                                                        line-height: 26px;
                                                                        font-family: Arial,
                                                                           Helvetica,
                                                                           sans-serif;
                     
                                                                        font-style: normal;
                                                                     ">
                                                                     <a
                                                                        rel="nofollow noopener noreferrer"
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        href="${url}"
                                                                        style="
                                                                           background: #d80b65;
                                                                           color: #ffffff !important;
                                                                           display: inline-block;
                                                                           font-family: Helvetica,
                                                                              Arial,
                                                                              sans-serif;
                                                                           font-size: 18px;
                                                                           font-weight: bold;
                                                                           line-height: 50px;
                                                                           text-align: center;
                                                                           text-decoration: none;
                                                                           width: 285px;
                                                                           border-radius: 5px;
                                                                        "
                                                                        >Recover my
                                                                        password</a
                                                                     >
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
                                                                        margin-top: 56px;
                                                                     ">
                                                                     If it wasn’t you –
                                                                     please ignore this
                                                                     email.
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
                                                                        margin-top: 16px;
                                                                     ">
                                                                     Many thanks,
                                                                  </p>
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

                     let s = await sendEmail(
                        [`${f.personalDetails.email}`],
                        "password-recovery",
                        "",
                        html,
                        false
                     );

                     if (!s) {
                        res.json({
                           status: false,
                           msg: "something went wrong",
                        });
                     } else {
                        res.json({
                           status: true,
                        });
                     }
                  } else {
                     res.json({
                        status: false,
                        msg: "something went wrong",
                     });
                  }
               }
            }

            break;
         case "changePassword":
            {
               let hash = await hashPassword(req.body.newpass);

               let u = await updateById("users", req.body.id, {
                  password: hash,
                  recovery: new Date(Date.now()).toDateString(
                     "gb-GB"
                  ),
               });

               if (u.modifiedCount !== 0) {
                  res.json(true);
               } else {
                  res.json(false);
               }
            }
            break;

         default:
            break;
      }
   }
}
