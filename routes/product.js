const express = require('express');
const {
  getProducts,
  
  createCollection,
  importToTypesense,
  searchProducts,
  getSingleProduct,
  createProducts,
  updateProduct,
  deleteProduct,
 
} = require('../controller/ProductController');

const {isAuthenticatedUser, authorizedRoles}=require('../middlewares/authenticate');

const router = express.Router();

router.route('/product').get(isAuthenticatedUser,authorizedRoles('user'),getProducts);
router.route('/create').post(isAuthenticatedUser,authorizedRoles('user'),createProducts);
router.route('/update').put(isAuthenticatedUser,authorizedRoles('user'),updateProduct);
router.route('/delete').delete(isAuthenticatedUser,authorizedRoles('user'),deleteProduct);
 
 

router.route('/product/search').get(searchProducts);

router.route('/product/create-collection').post(createCollection);
 router.route('/product/:id').get(getSingleProduct);

router.route('/product/import').get(importToTypesense);



module.exports = router;
