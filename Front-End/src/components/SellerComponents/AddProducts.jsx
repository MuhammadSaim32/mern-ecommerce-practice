import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { productApi } from '../../backend/product.api';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate} from 'react-router-dom';

export default function AddProducts() {
  const {state}= useLocation()
  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues:{
      title:state?.title || "",
      description:state?.description|| "",
      price:state?.price|| "",
      stock:state?.stock|| ""

    } 
  });




    const token = useSelector((state)=>state.AuthSlice.userDetails)
  

  const onSubmit = async(data) => {
 const formData = new FormData() //This line creates an empty container (FormData) for storing key-value pairs—including files—for a multipart/form-data request.
formData.append('product',data.product[0]) 

formData.append('title',data.title) 
formData.append('description',data.description) 
formData.append('price',data.price) 
formData.append('stock',data.stock)
const id=state?._id ? state._id :""

const response = await productApi.uploadProduct(formData,token,id)
 .then(()=>{
  navigate('/')
 })
 .catch((err)=>{
    console.log(err)
   })
  
}

   

  

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Seller Dashboard</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="image">
              Product Image
            </label>
            <input
              type="file"
              id="products"
              {...register('product', { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">Product image is required</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter product title"
              {...register('title', { minLength: 30, maxLength: 60, required: true  })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              placeholder="Enter product description"
              {...register('description', { minLength:150, maxLength: 300, required: true  })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">Description is required</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter product price"
              {...register('price', { required: true, valueAsNumber: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">Price is required</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="stock">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              placeholder="Enter product stock quantity"
              {...register('stock', { required: true, valueAsNumber: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">Stock is required</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:cursor-pointer transition duration-300"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
}
