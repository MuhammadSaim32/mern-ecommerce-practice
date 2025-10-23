import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";
import Stripe from "../utils/stripe.js";
import mongoose from "mongoose";

const checkoutSession = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  const productsIdsTofetchProductsDetails = user.cart.map((val) => val.product);
  const products = await productModel.find({
    _id: { $in: productsIdsTofetchProductsDetails },
  });

  for (let i = 0; i < products.length; i++) {
    products[i].quantity = user.cart[i].quantity;
  }

  try {
    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      metadata: { userId: user._id.toString() }, // Attach your user ID here
      line_items: products.map((item) => {
        return {
          price_data: {
            currency: "PKR",
            product_data: {
              name: item.title,
              images: [item.image],
            },
            unit_amount: 150 * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/checkout`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });
    res.json({ session: session });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export { checkoutSession };
