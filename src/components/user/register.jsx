import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import {register} from '../../actions/userAction';




export default function Register(){

const dispatch=useDispatch();
const navigate=useNavigate();
const[userData,setUserData]=useState({
    name: "",
    email: "",
    password: ""
})

const[fileName,setFileName]=useState("");


const[avatar,setAvatar]=useState("");
const[avatarPreview,setAvatarPreview]=useState("/images/one.jpg");

const onChange=(e)=>{
  

  if(e.target.name === 'avatar'){
    const reader=new FileReader();
    const file=e.target.files[0]
   setFileName(file.name);

    reader.onload=()=>{
      if(reader.readyState === 2){
        setAvatarPreview(reader.result)
        setAvatar(e.target.files[0])
      }
    }

    reader.readAsDataURL(e.target.files[0])
  }else{
setUserData({...userData,[e.target.name]:e.target.value})
  }

}

const submitHandler=(e)=>{
e.preventDefault();

console.log(userData.name)

const formData=new FormData();
formData.append('name',userData.name)
formData.append('email',userData.email)
formData.append('password',userData.password)
formData.append('avatar',avatar)


dispatch(register(formData))

}


const {error,isAuthenticated }=useSelector(state=>state.authState);

useEffect(()=>{

if(error){

  toast.error(error);
}

if(isAuthenticated){
  toast.success("sucessfully registered")
  navigate('/products')
}


},[error,isAuthenticated])











return(
<section className="bg-gray-50 dark:bg-gray-900">
   <Toaster position="top-right" richColors closeButton />
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form onSubmit={submitHandler} className="space-y-4 md:space-y-6" action="#">

                <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" name="name" id="name" placeholder="your name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                      value={userData.name}
                      
                      onChange={onChange}/>
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                      value={userData.email}
                      onChange={onChange}
                      />
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                      value={userData.password}
                      
                      onChange={onChange}/>
                  </div>

                <div className="relative flex items-center space-x-4 mb-4 border border-gray-300 rounded-lg ml-20 ">
  <img
    src={avatarPreview}
    alt="Preview"
    className="w-16 h-16 rounded-full object-cover border absolute ml-[-70px]"
  />
  <input
    id="profile"
    type="file"
    
    name="avatar"
    accept="image/*"
    className="hidden"
    onChange={onChange}
  />
  <label
    htmlFor="profile"
    className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-blue-600 "
  >
    Choose File
  </label>

  <span className="text-gray-700">{fileName}</span>
</div>


                 
                  
                  
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-violet-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-violet-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-violet-600 hover:underline dark:text-violet-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-violet-600 hover:underline dark:text-violet-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
)
}