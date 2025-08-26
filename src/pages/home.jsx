import { useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      

      {/* Hero Section */}
      <section className=" px-6 bg-gradient-to-r from-indigo-800  to-pink-900 h-100">
        <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="one.jpg" alt="Logo" className="rounded-full w-12 h-12 object-cover shadow-md" />
              <span className="text-xl font-bold text-indigo-600 tracking-wide text-white">MiniEcommerce</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex space-x-8 text-white text-lg">
              <a href="#" className=" font-medium hover:text-indigo-600 transition">Home</a>
              <a href="#" className=" font-medium hover:text-indigo-600 transition">Shop</a>
              <Link to="/products" className=" font-medium hover:text-indigo-600 transition">Products</Link>
              <Link href="#" className=" font-medium hover:text-indigo-600 transition">Contact</Link>
            </div>

            {/* Cart + Mobile Menu */}
           <div className="flex items-center space-x-4">
  <Link
    to="/login"
    className="px-10 py-2 rounded-lg font-semibold bg-white text-pink-900 hover:bg-pink-900 hover:text-white transition shadow-md"
  >
    Login
  </Link>
   <Link
    to="/register"
    className="px-10 py-2 rounded-lg font-semibold bg-white text-pink-900 hover:bg-pink-900 hover:text-white transition shadow-md"
  >
    Register
  </Link>

  {/* Mobile Menu Icon (optional) */}
  <button className="md:hidden">
    <i data-lucide="menu" className="w-6 h-6 text-gray-700 hover:text-indigo-600"></i>
  </button>
</div>

          </div>
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          
          {/* Left Text Content */}
          <div className="md:w-1/2 text-center md:text-left mt-[-170px]">
            <h1 className="text-5xl font-bold text-white mb-4">Step Into Style</h1>
            <p className="text-gray-100 mb-6 text-xl">
              Explore our collection of premium shoes designed for comfort and built to last.
            </p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 transition">
              Shop Now
            </button>
          </div>

          {/* Right Shoe Image */}
          <div className="md:w-1/2">
            <img src="pngwing.png" alt="Shoe" className="w-full max-h-[600px] object-contain" />
          </div>
        </div>

        {/* Product Image Collection */}

  <div className="max-w-4xl mx-auto mt-[-240px] ml-[-10px]">
   <h1 className="py-4 text-pink-900 bg-pink-800 w-70 text-white px-8 rounded-lg">More Collection You can See </h1>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-40 mt-10">

      
      <img src="pngwing.png" alt="Shoe 1" className=" rounded-md bg-white  shadow-lg hover:scale-105 transition duration-300 object-cover h-46" />
      <img src="pngwing.png" alt="Shoe 2" className=" rounded-md bg-white shadow-lg hover:scale-105 transition duration-300 object-cover h-46" />
      <img src="pngwing.png" alt="Shoe 3" className=" rounded-md bg-white  shadow-lg hover:scale-105 transition duration-300 object-cover h-46" />
      <img src="pngwing.png" alt="Shoe 4" className=" rounded-md bg-white  shadow-lg hover:scale-105 transition duration-300 object-cover h-46" />
    </div>
  </div>

      </section>
    </div>
  );
}
