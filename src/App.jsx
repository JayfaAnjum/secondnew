
import Home from './pages/home.jsx';
import Demo from './pages/demo.jsx';
import Login from './components/user/login.jsx';
import Register from './components/user/register.jsx';
import Cart from './pages/cart.jsx';
import ProductDetails from './pages/productDetails.jsx';
import { useDispatch } from "react-redux";
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Product from './pages/product.jsx';

 import {useState,useEffect} from 'react';



import {loadUser} from "./actions/userAction.jsx";
import UserEdit from './pages/userSetting.jsx';



function App() {
const dispatch = useDispatch();
  useEffect(()=>{

    dispatch(loadUser())
  },[dispatch])
  const [cartItems,setCartItems]=useState([]);




  return (
    <>
       


      <BrowserRouter>
      <Routes>
        <Route path='/products' element={<Product/>}>
        
        </Route>
        <Route path='/myprofile' element={<UserEdit/>}></Route>
         
          <Route path='/' element={<Home/>}></Route>
           <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          <Route path='/demo' element={<Demo/>}></Route>
             <Route path='/product/:id' element={<ProductDetails cartItems={cartItems}  setCartItems={setCartItems}/>}></Route> 
             <Route path='/cart' element={<Cart cartItems={cartItems}  setCartItems={setCartItems}/>}></Route> 
            

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
