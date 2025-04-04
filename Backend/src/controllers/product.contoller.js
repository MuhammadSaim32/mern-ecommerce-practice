import productModel from '../models/product.model.js'
import uploadImageOncloudinary from "../utils/cloudinary.js"
import userModel from '../models/user.model.js'

const uploadProduct=async(req, res) => {
const {id}= req.user
    const {title,description,price,stock}=req.body

if([title,description,price,stock].some((val)=>val=="")){

    return res.status(400).send('All Fields are required')
}  
 if (!req.file) {
        return res.status(400).json({ error: "No file uploaded!" });
    }

const productImagePath=req.file.path;
const ImageUrl = await uploadImageOncloudinary(productImagePath)

const uploadedProduct = await productModel.create({title,description,price,stock,image:ImageUrl,sellerId:id})
 

    res.status(200).json({
        message: "Product  uploaded successfully!",
        uploadedProduct,
    });

}

const GetAllProducts=async(req,res)=>{
  const products= await productModel.find()

  res.status(200).json({
    products
  })
}

const AddtoCart=async(req,res)=>{

    const {product,quantity} = req.body

    const user = await userModel.findById(req.user.id); // return single document
    if(!user){
        return res.status(400).json({
            message:"user not found"
        })
    }

   const index= user.cart.findIndex((value)=>value.product?.toString()==product)

    if(index!=-1){
    user.cart[index].quantity+=quantity;
}   else{
 user.cart.push({product,quantity}) // save in node js hearp mempory (process) 
}
await user.save(); // update in db ...

    res.status(200).json({
        message:"Item added to cart"
    })
}


const fetchCartProducts=async(req,res)=>{

const response  = await productModel.find({_id:{$in:req.body}})
return res.status(200).json({
    products:response
})
}


const ClearCart=async(req,res)=>{
 const user =   await userModel.findById(req.user.id)
    user.cart=[]
   const resp=  await  user.save()
   res.status(200)
}



const decrease=async(req,res)=>{
    
        console.log(req.body)
        const {product,quantity} = req.body

    const user  = await userModel.findById(req.user.id);
  const objIndex=  user.cart.findIndex((val)=>val.product==product)
    if(user.cart[objIndex].quantity==0){
        res.status(400)
    }
        user.cart[objIndex].quantity-=quantity
    if(user.cart[objIndex].quantity==0){
        user.cart.splice(objIndex,1)
    }

    await user.save();
    
    const findUpdatedUser = await userModel.findById(req.user.id)
   return  res.status(200).json({
    findUpdatedUser
   })

}


const removeItem=async(req,res)=>{
    const {product,quantity}=req.body
    const user= await userModel.findById(req.user.id)

    const produtIndex = user.cart.findIndex((val)=> val.product==product)

        user.cart.splice(produtIndex,1)
        await user.save()

      return   res.status(200)
}

const SellerSpecficProducts=async(req,res)=>{
    if (req.user.role !== 'seller') {
        return res.status(403).json({
          message: 'Access denied. Only sellers are allowed to access this resource.'
        });
      }
      const sellerId = req.user.id; 
    const SellerProducts = await productModel.find({sellerId})
return res.json({
    products:SellerProducts
})
      
}


const DeleteProduct=async(req,res)=>{
console.log(req.query)
    const {id} = req.query
   await  productModel.findByIdAndDelete(id)
return res.json({
    message:"product Deleted Successfully"
})
}


export {
    uploadProduct,
    GetAllProducts,
    AddtoCart,
    fetchCartProducts,
    ClearCart,
    decrease,
    removeItem,
    SellerSpecficProducts,
    DeleteProduct
}


