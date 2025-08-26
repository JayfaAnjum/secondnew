const express=require("express");

const multer=require("multer");
const path=require('path');


const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserProfile, changePassword, updateProfile, getAllUsers, getUser, updateUser, deleteUser } = require("../controller/AuthController");

const {isAuthenticatedUser,authorizedRoles}=require('../middlewares/authenticate');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads/user"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // get file extension
    cb(null, Date.now() + ext); // unique filename
  }
});
const router=express.Router();
const upload = multer({ storage });

router.route('/register').post(upload.single('avatar'),registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile);
router.route('/myprofile/change').put(isAuthenticatedUser,changePassword);
router.route('/update').put(isAuthenticatedUser,upload.single('avatar'),updateProfile);

//admin routes
router.route('/admin/users').get(isAuthenticatedUser,authorizedRoles('admin'),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizedRoles('admin'),getUser);
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizedRoles('admin'),updateUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizedRoles('admin'),deleteUser)




module.exports=router;