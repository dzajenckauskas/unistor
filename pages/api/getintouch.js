import {emailOnContactMessage} from "../../HELPERS/emailsforunistor";
import {sendEmail} from "../../HELPERS/nodemailer";

export default async function name(req, res) {
    if (!req.body) {
        res.json(false);
    } else {
        res.json(true);

        let html = emailOnContactMessage(req.body);

        await sendEmail(
            [`${process.env.email}`],
            `NEW MESSAGE HAVE BEEN SENT USING FORM ON THE WEBSITE`,
            "",
            html,
            false,
            false
        );
    }
}
