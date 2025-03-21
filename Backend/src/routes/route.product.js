import express from 'express'
const productRouter= express.Router()
import { upload } from '../middlewears/multer.middlewear.js'
import {uploadProduct,GetAllProducts,AddtoCart,fetchCartProducts,ClearCart,decrease,removeItem} from '../controllers/product.contoller.js'
import auth from "../middlewears/auth.middlewear.js"
productRouter.post('/upload',auth, upload.single('product'), uploadProduct)
productRouter.post('/all', GetAllProducts)
productRouter.post('/cart/add',auth,AddtoCart)
productRouter.post('/cart/products',fetchCartProducts)
productRouter.post('/cart/clear',auth,ClearCart)
productRouter.post('/cart/decrease',auth,decrease)
productRouter.post('/cart/remove',auth,removeItem)



export default productRouter