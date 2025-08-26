import { useDispatch, useSelector } from "react-redux";
import {useState,useEffect} from 'react';
import {editProfile} from '../actions/userAction';
import { Toaster, toast } from "sonner";

export default function UserEdit() {
  const { user, loading ,success} = useSelector((state) => state.authState);
  const dispatch=useDispatch();
  

  const [profile,setProfile]=useState({
    name:"",
    email:""
    });


    const [avatar,setAvatar]=useState("");
    const [preview,setPreview] =useState(user?.avatar || "");





    useEffect(()=>{

        if(user){
        setPreview(user?.avatar);
        setProfile({name:user?.name,email:user?.email});
        }

        if(success){
toast.success("successfully updated");
        }

        


    },[user,success]);

const changeProfile=(e)=>{
        const file=e.target.files[0];
        if(!file){
            return ;
        }


        const reader=new FileReader();
 reader.onload=()=>{

    if(reader.readyState===2){
setPreview(reader.result);
setAvatar(file);

    }
 }


       reader. readAsDataURL(file);
       console.log(reader.readyState);

    }
  
    const onchange=(e)=>{

        setProfile({

           ...profile,[e.target.name]:e.target.value 
    })

    }

    


    const submitHandler=(e)=>{
        e.preventDefault();

const data=new FormData();

data.append('name',profile.name);
data.append('email',profile.email);
data.append('avatar',avatar);

dispatch(editProfile(data));


    }



  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading user data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">No user found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
  <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl overflow-hidden">
    
    <div className="bg-indigo-600 h-32"></div>
<Toaster position="top-right" richColors closeButton />
   <form onSubmit={submitHandler}>
    <div className="relative px-6 pb-10">
      <div className="flex flex-col items-center -mt-16">
        <img
          src={preview}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
        />

       
        <label className="mt-2 text-sm text-indigo-600 cursor-pointer">
          Change Photo
          <input
            type="file"
            placeholder="Paste avatar URL"
            className="hidden"

            onChange={changeProfile}
          />
        </label>
      </div>

     
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"

            onChange={onchange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            placeholder="johndoe@example.com"
            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            onChange={onchange}
          />
        </div>
      </div>

     
      <div className="mt-10 flex justify-center space-x-4">
        <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
          Save Changes
        </button>
        <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition">
          Cancel
        </button>
      </div>
     
    </div>
     </form>
  </div>
</div>

  );
}
