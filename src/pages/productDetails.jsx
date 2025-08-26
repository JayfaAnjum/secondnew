 import { useParams, Link } from 'react-router-dom';
 import {useState,useEffect} from 'react';
 import { useDispatch,useSelector } from 'react-redux';
 import {getsingleproduct} from '../actions/productAction';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.productState);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    dispatch(getsingleproduct(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  
  const increase = () => {
    if (parseInt(product.stock) > qty) setQty(prev => prev + 1);
  };

  const decrease = () => {
    if (qty > 0) setQty(prev => prev - 1);
  };

  
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
               <Link to="/products" className=" font-medium hover:text-indigo-600 transition">Categories</Link>
               <Link href="#" className=" font-medium hover:text-indigo-600 transition">Contact</Link>
  <Link className="ml-16 text-yellow-200 text-lg" to="/cart">
         itemadded
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
                <i data-lucide="menu" className="w-6 h-6 text-gray-700 hover:text-indigo-600"></i>               </button>
            </div>
       </div>
      <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="flex justify-center items-center">
  <img
    src='/pngwing.png'
    alt={product.name}
    className="w-full h-auto max-w-md object-contain rounded-lg "
  />
</div>


          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-4 text-indigo-800">{product.name}</h1>
            <p className="text-gray-600 mb-4 text-xl mt-6">{product.description}</p>
            
            <div className="flex space-x-5">
              <button
                onClick={increase}
                className="text-white mb-2 text-2xl mt-6 cursor-pointer px-4 bg-gradient-to-r from-purple-800 to-pink-900"
              >
                +
              </button>
              <p className="text-pink-800 mb-2 text-xl mt-6">{qty}</p>
              <button
                onClick={decrease}
                className="text-white mb-2 text-2xl mt-6 cursor-pointer px-4 bg-gradient-to-r from-purple-800 to-pink-900"
              >
                -
              </button>
              <p className="text-pink-800 mb-2 text-xl mt-6">Stock: {product.stock}</p>
            </div>
            <p className="text-green-600 font-bold text-4xl mb-6">${product.price}</p>

            <button
           
              disabled={parseInt(product.stock) === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition duration-200 ${
                parseInt(product.stock) === 0
                  ? 'bg-pink-100 cursor-not-allowed text-white'
                  : 'bg-pink-700 text-white hover:bg-pink-800'
              }`}
            >
              Add to Cart
            </button>

            <Link
              to="/products"
              className="mt-4 text-sm text-blue-600 underline hover:text-blue-800"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
