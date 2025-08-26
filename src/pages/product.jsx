import { useEffect, useState } from "react";
import ProductCard from '../components/productCard.jsx';
import { Link } from "react-router-dom";
import { fetchProducts } from "../actions/productsAction.jsx";
import { logout} from "../actions/userAction.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export default function Product() {
  

 const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
const navigate=useNavigate();
  const dispatch = useDispatch();

  const { loading, products, totalPages, error } = useSelector((state) => state.productsState);

  useEffect(() => {
    dispatch(fetchProducts(query, page));
  }, [dispatch, query, page]);


const logout1 = async () => {
  await dispatch(logout());
  navigate('/'); // redirect after logout
};
  
const {user,isAuthenticated}=useSelector((state)=>state.authState);

  



  return (
    <>
      <div className="flex justify-between items-center h-20 bg-gradient-to-r from-indigo-800  to-pink-900">
        <div className="flex items-center space-x-3">
          <img src="/one.jpg" alt="Logo" className="rounded-full w-12 h-12 object-cover shadow-md" />
          <span className="text-xl font-bold text-indigo-600 tracking-wide text-white">MiniEcommerce</span>
        </div>

        <div className="hidden md:flex space-x-8 text-white text-lg">
          <Link to="/" className=" font-medium hover:text-indigo-600 transition">Home</Link>
          <a href="#" className=" font-medium hover:text-indigo-600 transition">Shop</a>
          <Link to="/products" className=" font-medium hover:text-indigo-600 transition">Products</Link>
          <Link href="#" className=" font-medium hover:text-indigo-600 transition">Contact</Link>
        </div>

        <div className="flex items-center space-x-4">

        {isAuthenticated?
        
       <Menu as="div" className="relative inline-block">
      <MenuButton className=" w-30 flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-9 h-9 rounded-full object-cover border"
        />
        <span>{user.name}</span>
      </MenuButton>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              License
            </a>
          </MenuItem>
         
            <MenuItem>
              <button onClick={logout1}
               type="button" 
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Sign out
              </button>
            </MenuItem>
         
        </div>
      </MenuItems>
    </Menu>:
          <Link
            to="/login"
            className="px-10 py-2 rounded-lg font-semibold bg-white text-pink-900 hover:bg-pink-900 hover:text-white transition shadow-md"
          >
            Login
          </Link>
}
          <button className="md:hidden">
            <i data-lucide="menu" className="w-6 h-6 text-gray-700 hover:text-indigo-600"></i>
          </button>
        </div>
      </div>

      <div className='flex items-center justify-center p-4'>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setPage(1); //  Reset page on new search
            setQuery(e.target.value);
          }}
          className="w-full md:w-150 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-800 focus:border-transparent transition-all duration-300"
        />
      </div>

      <section className="mt-5 grid grid-cols-4 gap-4 px-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>

      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded ${
              page === i + 1 ? 'bg-pink-700 text-white' : 'bg-white text-pink-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}

