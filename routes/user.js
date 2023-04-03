// Import modules
const express = require('express');
const router = express.Router();
const { isSignedIn,isAuthenticated,isAdmin } = require('../controller/auth');
const { getUserById,getUser,updateUser,userPurchaseList } = require('../controller/user');

router.param('userId', getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);

module.exports = router;