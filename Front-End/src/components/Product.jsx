import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function Product() {
    
    const {state} = useLocation()
    const {image,title,description,price} = state
    console.log(image)  

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-auto rounded-md" 
                    />
                </div>
                <div className="md:w-1/2 md:pl-10 mt-6 md:mt-0">
                    <h1 className="text-4xl font-bold">{title}</h1>
                    <p className="text-2xl text-green-600 mt-4">{price}</p>
                    <p className="mt-4 text-gray-700">{description}</p>
                    <button className="mt-6 bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}