// Import modules
const express = require('express');
const router = express.Router();

const { isSignedIn,isAuthenticated,isAdmin } = require('../controller/auth');
const { getUserById,pushOrderInPurchaseList } = require('../controller/user');
const { updateStock } = require('../controller/product')
const { getOrderById,createOrder,getAllOrder,getOrderStatus,updateStatus } = require('../controller/order');

// Routes

// ---Params--- //
router.param('userId',getUserById);
router.param('orderId',getOrderById);

// ---Create--- //
router.post('/order/create/:userId',isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);

// ---Read--- //
router.get('/order/all/:userId',isSignedIn,isAuthenticated,isAdmin,getAllOrder);

// ---Status--- //
router.get('order/status/:userId',isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put('order/:orderId/status/:userId',isSignedIn,isAuthenticated,isAdmin,updateStatus);

// ---Delete--- //

// Export the router
module.exports = router;