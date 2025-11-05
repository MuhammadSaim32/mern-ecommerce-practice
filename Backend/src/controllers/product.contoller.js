import productModel from "../models/product.model.js";
import uploadImageOncloudinary from "../utils/cloudinary.js";
import userModel from "../models/user.model.js";
import mongoose from "mongoose";

const uploadProduct = async (req, res) => {
  const { id } = req.query;
  if (id) {
    const { title, description, price, stock } = req.body;

    if ([title, description, price, stock].some((val) => val == "")) {
      return res.status(400).send("All Fields are required");
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    const productImagePath = req.file.path;
    const ImageUrl = await uploadImageOncloudinary(productImagePath);

    const uploadedProduct = await productModel.create({
      title,
      description,
      price,
      stock,
      image: ImageUrl,
      sellerId: id,
    });

    return res.status(200).json({
      message: "Product  uploaded successfully!",
      uploadedProduct,
    });
  } else {
    const { title, description, price, stock } = req.body;

    if ([title, description, price, stock].some((val) => val == "")) {
      return res.status(400).send("All Fields are required");
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }
    const productImagePath = req.file.path;
    const ImageUrl = await uploadImageOncloudinary(productImagePath);
    const existingproduct = await productModel.findById(id);
    existingproduct.title = title;
    existingproduct.description = description;
    existingproduct.price = price;
    existingproduct.stock = stock;
    existingproduct.image = ImageUrl;
    await existingproduct.save();
    const response = await productModel.findById(id);

    return res.status(200).json({
      message: "product updated successfully",
      product: response,
    });
  }
};

const GetAllProducts = async (req, res) => {
  const products = await productModel.find();

  res.status(200).json({
    products,
  });
};

const AddtoCart = async (req, res) => {
  const { product, quantity } = req.body;

  const user = await userModel.findById(req.user.id); // return single document
  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }

  const index = user.cart.findIndex(
    (value) => value.product?.toString() == product,
  );

  if (index != -1) {
    user.cart[index].quantity += quantity;
  } else {
    user.cart.push({ product, quantity }); // save in node js hearp mempory (process)
  }
  await user.save(); // update in db ...

  res.status(200).json({
    message: "Item added to cart",
  });
};

const fetchCartProducts = async (req, res) => {
  console.log(req.body);
  const response = await productModel.find({ _id: { $in: req.body } });
  console.log(response);
  return res.status(200).json({
    products: response,
  });
};

const ClearCart = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  user.cart = [];
  const resp = await user.save();
  res.status(200);
};

const decrease = async (req, res) => {
  console.log(req.body);
  const { product, quantity } = req.body;

  const user = await userModel.findById(req.user.id);
  const objIndex = user.cart.findIndex((val) => val.product == product);
  if (user.cart[objIndex].quantity == 0) {
    res.status(400);
  }
  user.cart[objIndex].quantity -= quantity;
  if (user.cart[objIndex].quantity == 0) {
    user.cart.splice(objIndex, 1);
  }

  await user.save();

  const findUpdatedUser = await userModel.findById(req.user.id);
  return res.status(200).json({
    findUpdatedUser,
  });
};

const removeItem = async (req, res) => {
  const { product, quantity } = req.body;
  const user = await userModel.findById(req.user.id);

  const produtIndex = user.cart.findIndex((val) => val.product == product);

  user.cart.splice(produtIndex, 1);
  await user.save();

  return res.status(200);
};

const SellerSpecficProducts = async (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({
      message:
        "Access denied. Only sellers are allowed to access this resource.",
    });
  }
  const sellerId = req.user.id;
  const SellerProducts = await productModel.find({ sellerId });
  return res.json({
    products: SellerProducts,
  });
};

const DeleteProduct = async (req, res) => {
  console.log(req.query);
  const { id } = req.query;
  await productModel.findByIdAndDelete(id);
  return res.json({
    message: "product Deleted Successfully",
  });
};

const OutOfStockProducts = async (req, res) => {
  const { id } = req.user;
  const products = await productModel.find({
    sellerId: id,
    stock: 0,
  });

  return res.json({
    products: products,
  });
};

//for both user and seller

const GetOrderOfSeller = async (req, res) => {
  const sellerId = req.user.id;
  const SellerProducts = await userModel.findOne({ _id: sellerId });
  return res.json({
    Orders: SellerProducts.SellerOrders,
  });
};

const GetOrdersOfuser = async (req, res) => {
  const UserId = req.user.id;
  const UserProducts = await userModel.findOne({ _id: UserId });
  return res.json({
    Orders: UserProducts.UserOrders,
  });
};

const GetProductById = async (req, res) => {
  const productDetails = [];
  for (let i = 0; i < req.body.length; i++) {
    const response = await productModel.findOne({ _id: req.body[i] });
    productDetails.push(response);
  }
  return res.status(200).json({
    productDetails,
  });
};

const changeOrderStatus = async (req, res) => {
  const userid = req.body.userid;
  console.log(req.user);
  const userDetails = await userModel.findOne({ _id: userid });
  for (let i = 0; i < userDetails.UserOrders.length; i++) {
    if (userDetails.UserOrders[i].productid == req.body.productid) {
      userDetails.UserOrders[i].status = req.body.updaterequest;
      await userDetails.save();
    }
  }

  const sellerDetails = await userModel.findOne({ _id: req.user.id });
  for (let i = 0; i < sellerDetails.SellerOrders.length; i++) {
    if (
      sellerDetails.SellerOrders[i].productid == req.body.productid &&
      sellerDetails.SellerOrders[i].userid == userid
    ) {
      sellerDetails.SellerOrders[i].status = req.body.updaterequest;
      await sellerDetails.save();
    }
  }

  res.send("done ");
};

const AddReview = async (req, res) => {
  const data = await productModel.findOne({ _id: req.body.productid });
  if (req.body.content == "") return res.send("not review added");
  let obj = {
    username: req.user.username,
    userid: req.user.id,
    content: req.body.content,
  };
  let bool = true;
  for (let i = 0; i < data.review.length; i++) {
    if (data.review[i].userid == req.user.id) {
      data.review[i] = obj;
      bool = false;
    }
  }
  if (bool) {
    data.review.push(obj);
  }
  await data.save();
  res.send("ok");
};

const getproductByproductid = async (req, res) => {
  const product = await productModel.findOne({ _id: req.body.id });
  res.json({
    product,
  });
};

const deleteReview = async (req, res) => {
  const userid = req.user.id;
  let productid = req.body.productid;
  console.log(productid);
  const product = await productModel.findOne({ _id: productid });
  product.review = product.review.filter((val) => val.userid != userid);
  await product.save();
  return res.send("ok");
};

export {
  uploadProduct,
  GetAllProducts,
  AddtoCart,
  fetchCartProducts,
  ClearCart,
  decrease,
  removeItem,
  SellerSpecficProducts,
  DeleteProduct,
  OutOfStockProducts,
  GetOrderOfSeller,
  GetProductById,
  GetOrdersOfuser,
  changeOrderStatus,
  AddReview,
  deleteReview,
  getproductByproductid,
};
