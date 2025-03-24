import productModel from '../models/product.model.js'
import userModel from '../models/user.model.js'
import Stripe from '../utils/stripe.js'
import mongoose from 'mongoose'

const checkoutSession=async(req,res)=>{

const user= await userModel.findById(req.user.id)

  const productsIdsTofetchProductsDetails = user.cart.map((val)=>  val.product)
  const products=await productModel.find({_id:{$in:productsIdsTofetchProductsDetails}})

  for(let i=0;i<products.length;i++){
    products[i].quantity=user.cart[i].quantity
  }

  try {

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: products.map(item => {
      
        return {
          price_data: {
            currency: "PKR",
            product_data: {
              name: item.title,
              images:[item.image]
            },
            unit_amount: 150*100,
          },
          quantity: item.quantity,
        }
      }),
      success_url: 'http://localhost:5173/checkout',
      cancel_url:'http://localhost:5173/cancel'
    })
    console.log(session)
    res.json({ session: session })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}



export {
    checkoutSession
}