import express from 'express'
import UserRouter from './src/routes/route.users.js'
import productRouter from './src/routes/route.product.js'
import paymentRouter from './src/routes/route.payment.js'
import cors from "cors"
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors({
    origin: "http://localhost:5173", // Allow frontend URL
    credentials: true, // Allow cookies
}))



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/v1/users',UserRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/payment',paymentRouter)


export default app