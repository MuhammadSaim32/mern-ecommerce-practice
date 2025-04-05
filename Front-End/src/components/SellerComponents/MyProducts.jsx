import React, { useEffect,useState  } from 'react'
import { productApi } from '../../backend/product.api'
import { useSelector } from 'react-redux';
import {Loader} from "../export"
import  {Link} from "react-router-dom"

function MyProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  const token = useSelector(state=> state.AuthSlice.userDetails)

const DeleteProduct =(data)=>{
  productApi.DeleteProduct(data._id).then((data)=>{
    GetAllproducts(token)
  })
}

   function GetAllproducts(token){
        productApi.GetSellerProducts(token).then((data)=>{
            setProducts(data.data.products);
            setLoading(false);
        })
      }

    useEffect(()=>{
      GetAllproducts(token)
    },[])


    if (loading) {
        return <Loader/>;
      }
    return (
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold text-center mb-6">Your Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length === 0 ? (
              <p>No products found. Add new products!</p>
            ) : (
              products?.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                  <img
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="text-lg text-gray-700 mt-2">${product.price}</p>
                  <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                  <div className="mt-4">
                    <Link state={product} 
                      to='/SellerDashborad/add-product'
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 hover:cursor-pointer transition">
                      Edit Product
                    </Link>
                    <button 
                    onClick={()=>DeleteProduct(product)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition ml-4">
                      Delete Product
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    };
    
    export default MyProducts;