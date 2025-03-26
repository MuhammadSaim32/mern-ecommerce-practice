import Stripe from "../utils/stripe.js";
import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import 'dotenv/config'

const handlePaymentIntentSucceeded=async(userId)=>{

const user = await userModel.findById(userId)

const productsId=user.cart?.map((val)=>val.product)

const productDetails = await productModel.find({_id:{$in:productsId}})


for(let i=0;i<productDetails.length;i++){

  productDetails[i].stock-=user.cart[i].quantity
  if( productDetails[i].stock<=0){
    productDetails[i].stock=0
    
  }
  await productDetails[i].save()    //only works on  single document now arrays

}

user.cart=[]

await user.save()

}


const StripeWebhook=async(req,res)=>{
    const rawbody = req.body;
    const sig = req.headers['stripe-signature'];

    let even;
  
    try {
      even = Stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
    }
    catch (err) {
    return   res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    const event = JSON.parse(rawbody.toString())

    switch (event.type) {
      case 'payment_intent.succeeded':

      const paymentIntentId = event.data.object.id;
      const  sessions = await Stripe.checkout.sessions.list({
        payment_intent: paymentIntentId, // Link to the Payment Intent
        limit: 1,
      });
      const {userId}=sessions.data[0].metadata
      handlePaymentIntentSucceeded(userId);
       return   res.json({received: true});
         break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
 return    res.json({received: true});
  }
  


export {
    StripeWebhook
}