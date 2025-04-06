import { useEffect, useState } from "react";
import {productApi} from "../../backend/product.api";
import Loader from "../Loader";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.GetAllProducts(); 
        setProducts(response); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);
  // If products are loading, show a loader
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length === 0 ? (
          <p className="text-center text-lg text-gray-500 col-span-4">No products available.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{product.title.length >15 ?product.title.slice(0,15)+"..." :product.title.length }</h3>
              <p className="text-lg text-green-600 mt-2">${product.price}</p>
              <p className="text-sm text-gray-600 mt-2">{product.description.length >15 ?product.description.slice(0,15)+"..." :product.description.length }</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
