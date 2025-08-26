import React from "react";
import { Link } from 'react-router-dom';


export default function ProductCard({product}) {

  console.log(product);

    const product1 = {
   
    
    image: "/pngwing.png",
  };
  return (
   <div className="max-w-80 bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition mx-auto ">
      <img
        src={product1.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600 mt-2">{product.desription}</p>
      <p className="text-gray-500 mt-2">Stock: {product.stock}</p>
      <p className="text-green-600 font-bold mt-4 text-lg">${product.price}</p>
      <p className="text-white py-2 px-4 font-bold mt-4 text-lg bg-gradient-to-r from-purple-800  to-pink-900 text-center">
         <Link to={`/product/${product.id}`} >ViewDetails</Link>
      </p>
     
    </div>
  );
}
