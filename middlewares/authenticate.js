const jwt=require('jsonwebtoken');

const User=require('../models/UserModel');


exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id);
    req.user = await User.findById(decoded.id);
console.log(decoded.id);
    
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next(); // ✅ 
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized Access" });
  }
};


exports.authorizedRoles = (...role) => {

  return (req,res,next)=>{

    console.log(role);
    if(!role.includes(req.user.role)){

      console.log(req.user.role);
      return res.json({message:"this roles not allowed"});
    }

    next();
  }
}
