// import modules
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

// Schema for order
const ProductCartSchema = new mongoose.Schema({
    product : {
        type : ObjectId,
        ref : "Product"
    },
    name : String,
    count : Number,
    price : Number,

});

const ProductCart = mongoose.model("ProductCart",ProductCartSchema )

// Schema for order
const OrderSchema = new mongoose.Schema({
    products : [ProductCartSchema],
    transaction_id : { },
    amount : {
        type : Number,
    },
    address : String,
    status : {
        type : String,
        default : "Recieved",
        enum : ['Cancelled','Delivered','Shipped','Proccessing','Recieved']
    },
    updated : Date,
    user : {
        type : ObjectId,
        ref : "User"
    }
},{ timestamps : true });

const Order = mongoose.model("Order",OrderSchema);

module.exports = { Order, ProductCart };
