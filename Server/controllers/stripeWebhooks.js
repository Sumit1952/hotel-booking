import stripe from 'stripe';


// api to handle stripe webhooks

export const stripeWebhooks = async (req , res)=>{
    //stripe gateway insitixe

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
    const sig = req.headers['stripe-signature'];
    let event ;

    try{
     eveny = stripeInstance.webhooks.constructEvent(req.body , sig , process.env.STRIPE_WEBHOOK_SECRET)
    }
    catch(error){
        res.status(400).send('WEBHOOK ERROR:${error.message}');

    }

    if(event.type === "payment_intent.succeeded"){
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;


        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntentId,
        })

        const {bookingId} =   session.data[0].metadata;
        //mark payment as pay

        await Booking.findByIdAndUpdate(bookingId , {isPaid : true , paymentMethod : "Stripe"});



    }
    else{
        console.log("Unhandle event type : " , event.type)
    }
    res.json({received:true});




}