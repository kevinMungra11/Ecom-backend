// Import modules
const express = require('express');
const router = express.Router();

const { getProductById,createProduct,getProduct,getAllProducts,getAllUniqueCategories,deleteProduct,updateProduct,photo } = require('../controller/product');
const { isSignedIn,isAuthenticated,isAdmin } = require('../controller/auth');
const { getUserById } = require('../controller/user');

// params
router.param('userId',getUserById);
router.param('productId',getProductById);

// Routes

// --- Create route --- //
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct);

// --- Read routes --- //
router.get('/product/:productId',getProduct);
router.get('/product/photo/:productId',photo);

// --- Update route --- //
router.put('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,updateProduct);

// --- Delete route --- //
router.delete('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteProduct);

// --- Listing route --- //
router.get('/products',getAllProducts);
router.get('/products/categories',getAllUniqueCategories);

// Export router
module.exports = router;