import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cartItems, setCartItems }) {
  return (
    <>
      <div className="flex justify-between items-center h-20 bg-gradient-to-r from-indigo-800 to-pink-900">
        <div className="flex items-center space-x-3">
          <img
            src="/one.jpg"
            alt="Logo"
            className="rounded-full w-12 h-12 object-cover shadow-md"
          />
          <span className="text-xl font-bold text-indigo-600 tracking-wide text-white">
            MiniEcommerce
          </span>
        </div>

        <div className="hidden md:flex space-x-8 text-white text-lg">
          <Link to="/" className="font-medium hover:text-indigo-600 transition">
            Home
          </Link>
          <a href="#" className="font-medium hover:text-indigo-600 transition">
            Shop
          </a>
          <Link
            to="/products"
            className="font-medium hover:text-indigo-600 transition"
          >
            Categories
          </Link>
          <Link href="#" className="font-medium hover:text-indigo-600 transition">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="px-10 py-2 rounded-lg font-semibold bg-white text-pink-900 hover:bg-pink-900 hover:text-white transition shadow-md"
          >
            Login
          </a>
          <button className="md:hidden">
            <i
              data-lucide="menu"
              className="w-6 h-6 text-gray-700 hover:text-indigo-600"
            ></i>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-pink-800">🛒 Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={"/pngwing.png"}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-black">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-500">{item.product.description}</p>
                    <p className="text-green-700 font-semibold">
                      ${item.product.price}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-lg">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-500">In Stock</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total Price */}
        <div className="mt-10 text-right">
          <p className="text-xl font-semibold">
            Total:{" "}
            <span className="text-green-800">
              $
              {cartItems
                .reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
