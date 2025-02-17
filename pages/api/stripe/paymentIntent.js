import {checkAuthorization} from "../../../HELPERS/checkauthorization";
import Stripe from "stripe";
import {findByID} from "../../../BACKEND/mongo";

export default async function name(req, res) {
    if (!req.body) {
        res.json(false);
    } else {
        let ch = checkAuthorization(req);
        if (!ch) {
            res.json(false);
        } else {
            try {
                let stripe;

                if (process.env.production) {
                    stripe = new Stripe(
                        process.env.stripePrivateProd
                    );
                } else {
                    stripe = new Stripe(process.env.stripePrivate);
                }
                const pi = await stripe.paymentIntents.create({
                    amount:
                        req?.body?.order?.amount || req?.body?.amount,
                    currency:
                        req?.body?.order?.currency ||
                        req?.body?.currency,
                });
                if (pi?.client_secret) {
                    let user = await findByID(
                        "users",
                        ch.type === "admin"
                            ? req.body.userID
                            : ch.user
                    );

                    if (user) {
                        res.json({
                            client_secret: pi.client_secret,
                            email: user.personalDetails.email,
                        });
                    } else {
                        res.json(false);
                    }
                } else {
                    res.json(false);
                }
            } catch (error) {
                console.log(error);
                res.json(false);
            }
        }
    }
}
