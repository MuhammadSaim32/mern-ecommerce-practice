import express from "express";
const productRouter = express.Router();
import { upload } from "../middlewears/multer.middlewear.js";
import {
  GetProductById,
  GetOrderOfSeller,
  uploadProduct,
  GetAllProducts,
  OutOfStockProducts,
  AddtoCart,
  fetchCartProducts,
  DeleteProduct,
  ClearCart,
  decrease,
  removeItem,
  GetOrdersOfuser,
  SellerSpecficProducts,
  changeOrderStatus,
  AddReview,
  deleteReview,
  getproductByproductid,
} from "../controllers/product.contoller.js";
import auth from "../middlewears/auth.middlewear.js";

productRouter.post("/upload", auth, upload.single("product"), uploadProduct);
productRouter.post("/all", GetAllProducts);
productRouter.post("/cart/add", auth, AddtoCart);
productRouter.post("/cart/products", fetchCartProducts);
productRouter.post("/cart/clear", auth, ClearCart);
productRouter.post("/cart/decrease", auth, decrease);
productRouter.post("/cart/remove", auth, removeItem);
productRouter.post("/seller/product", auth, SellerSpecficProducts);
productRouter.delete("/seller/delete/product", auth, DeleteProduct);
productRouter.post("/seller/outofstock", auth, OutOfStockProducts);
productRouter.post("/seller/orders", auth, GetOrderOfSeller);
productRouter.post("/user/product", GetProductById);
productRouter.post("/user/orders", auth, GetOrdersOfuser);
productRouter.post("/seller/changestatus", auth, changeOrderStatus);
productRouter.post("/review", auth, AddReview);
productRouter.post("/review/delete", auth, deleteReview);
productRouter.post("/productByid", getproductByproductid);
export default productRouter;
