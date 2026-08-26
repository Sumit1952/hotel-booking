import stripe from 'stripe';
import Booking from '../models/Booking.js';

// API to handle Stripe webhooks
export const stripeWebhooks = async (req, res) => {
    const stripeSecretKey = (process.env.STRIPE_SECRET_KEY || '').trim();
    const stripeWebhookSecret = (process.env.STRIPE_WEBHOOK_SECRET || '').trim();
    const stripeInstance = new stripe(stripeSecretKey);

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
    } catch (error) {
        console.error("Webhook signature verification failed:", error.message);
        return res.status(400).send(`WEBHOOK ERROR: ${error.message}`);
    }

    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const bookingId = session.metadata?.bookingId;

            if (bookingId) {
                await Booking.findByIdAndUpdate(bookingId, {
                    isPaid: true,
                    paymentMethod: "Stripe",
                    status: "confirmed"
                });
                console.log(`Booking ${bookingId} successfully marked as paid.`);
            }
        } else if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const sessions = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            if (sessions.data && sessions.data.length > 0) {
                const bookingId = sessions.data[0].metadata?.bookingId;
                if (bookingId) {
                    await Booking.findByIdAndUpdate(bookingId, {
                        isPaid: true,
                        paymentMethod: "Stripe",
                        status: "confirmed"
                    });
                    console.log(`Booking ${bookingId} marked as paid via PaymentIntent.`);
                }
            }
        } else {
            console.log("Unhandled event type:", event.type);
        }
    } catch (err) {
        console.error("Error updating booking status from webhook:", err);
    }

    res.json({ received: true });
};