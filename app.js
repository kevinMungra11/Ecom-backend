// import modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product'); 
const orderRoutes = require('./routes/order');
const paymentBRoutes = require("./routes/paymentBRoutes");

// express object & port
const app = express();
const port = process.env.PORT || 1111;

// Connection
mongoose.connect(process.env.DATABASE,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true, 
})
.then(() => {
    console.log("DB IS CONNECTED");
})
.catch((err) => {
    console.log("DB IS NOT CONNECTED");
    console.log(err);
});

// Back here
// { 
//     useNewUrlParser : true, 
//     useUnifiedTopology: true
// }

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);
app.use("/api", paymentBRoutes);


// Starting a server..... 
app.listen(port, () => {
    console.log("Server is running on port 1111.....");
});