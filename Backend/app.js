import express from "express";
import UserRouter from "./src/routes/route.users.js";
import productRouter from "./src/routes/route.product.js";
import paymentRouter from "./src/routes/route.payment.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`, // Allow frontend URL
    credentials: true, // Allow cookies
  }),
);

app.get("/hello", (req, res) => {
  res.send("worker find");
});

app.use("/api/v1/payment", paymentRouter);

app.use(express.json());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/products", productRouter);

export default app;
