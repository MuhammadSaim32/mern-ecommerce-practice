import mongoose from 'mongoose'

const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength: 30, 
        maxlength: 60,
    },
    description:{
        type:String,
        required:true,
        minlength: 150, 
        maxlength: 300,
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required: true 
        }, 
    stock:{
        type: Number,
        required: true
    }
    })

const productModel = mongoose.model('product',productSchema)

export default productModel