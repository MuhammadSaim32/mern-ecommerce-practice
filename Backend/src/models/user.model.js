import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, // Refers to a document
        ref: "product", // Specifies the collection where the document exists
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
  Orders: [
    {
      productid: {
        type: String,
      },
      status: {
        type: String,
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;

