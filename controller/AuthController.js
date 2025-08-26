const User = require("../models/UserModel");
const sendEmail = require("../utils/email");
const crypto=require('crypto');



//registered user
exports.registerUser = async (req, res, next) => {
  const { name, email, password} = req.body;
let avatar;
  if(req.file){
   avatar = `${req.protocol}://${req.get('host')}/uploads/user/${req.file.filename}`;

  }

  const user1 = await User.create({ name, email, password, avatar });

  const token = user1.getJwtToken();
  const option = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
   
  };

  return res
    .status(201)
    .cookie('token', token, option)
    .json({ success: true, user: user1, token });
};


//login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter email and password" });
  }

  const user2 = await User.findOne({ email }).select('+password');

  if (!user2) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await user2.isValidPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  const token = user2.getJwtToken();

  const option = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
         
  };

  return res
    .status(200)
    .cookie('token', token, option)
    .json({ success: true, user: user2, token });
};


//logout user
exports.logout= (req,res,next) => {

    
  res.cookie('token',null,{
    expires:new Date(Date.now()),
    httpOnly:true
  }).status(200).json({sucess:"succesfully logedout"});


   
}
//forgot password
exports.forgotPassword = async (req, res, next) => {
  
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User email does not exist" });
    }

    // Generate reset token
    const resetToken = await user.getResetToken();

    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/auth/password/reset/${resetToken}`;

    const message = `Your password reset token URL is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, please ignore it.`;

    
    try{


      sendEmail({
        email:user.email,
        subject:"jvlcode password recovery",
        message:message
      })

      res.status(200).json({message:`sucesfully email to ${user.email}  sucesfully`,

      })
    }

   catch (error) {
    // Clean up token fields if something goes wrong
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({ message: error.message });
  }
};

//resetpassword
exports.resetPassword=async (req,res,next) =>{

 const resetPasswordToken= crypto.createHash('sha256').update(req.params.token).digest('hex');

 const user=await User.findOne({

  resetPasswordToken,
  resetPasswordTokenExpire:{
    $gt : Date.now()
  }
 })


 if(!user){

  return res.json({message:"token is invalid or expired"});
 }


 if(req.body.password !==req.body.confirmPassword){
  res.json({message:"password does not match"})
 }

user.password=req.body.password;
user.resetPasswordToken=undefined;
user.resetPasswordTokenExpire=undefined;
await user.save({validateBeforeSave:false})


const token = user.getJwtToken();

  const option = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
         
  };

  return res
    .status(200)
    .cookie('token', token, option)
    .json({ success: true, user: user, token });
}


exports.getUserProfile = async(req,res,next)=>{

 const user= await User.findById(req.user.id)
 res.status(200).json({
  sucess:true,
  user
 })
}


exports.changePassword =async(req,res,next)=>{
const user=await User.findById(req.user.id).select('+password');
//check old password

if(await user.isValidPassword(req.body.oldPassword)){
  return res.json({message:"old password is incorrect"})
}


//assigning new password

user.password =req.body.password;
await user.save();

}



   
  exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    let newUserData = { name, email };

    
    if (req.file) {
      newUserData.avatar = `${req.protocol}://${req.get('host')}/uploads/user/${req.file.filename}`;
    }

    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,          
      runValidators: true 
    });

    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




exports.getAllUsers = async(req,res,next) =>{

  const users =await User.find();
  res.status(200).json({message:"all users get to the adminpanel sucessfully",users});
}


exports.getUser =async(req,res,next)=>{

  const user =await User.findById(req.params.id);
  if(!user){
    return res.json({message:"this is user id is not exist in the field"})
  }

  res.status(200).json({message:"this user get to the adminpanel sucessfully",user});

}


exports.updateUser =async(req,res,next)=>{

  const newUserData = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }

  const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators: true,

  })

  res.status(200).json({
    sucess:true,user
  })

}

//api service delete user

exports.deleteUser =async(req,res,next)=>{
 const user =await User.findById(req.params.id);
  if(!user){
    return res.json({message:"this is user id is not exist in the field"})
  }
await user.remove()
  res.status(200).json({message:"this user delete from  adminpanel sucessfully"});
}
