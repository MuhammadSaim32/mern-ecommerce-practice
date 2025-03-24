import express from 'express'
import {checkoutSession} from '../controllers/payment.controller.js'
import auth from "../middlewears/auth.middlewear.js"
import {StripeWebhook} from '../webhook/webhook.stripe.js'
const paymentRouter= express.Router()


paymentRouter.post('/stripeSession',auth,checkoutSession)
paymentRouter.post('/stripewebhook',StripeWebhook)


export default paymentRouter