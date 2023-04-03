const User = require('../models/user');
const { check , validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// Signup method
exports.signup = (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save((err,user) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                err : "NOT able to save user in DB!!!"
            })
        }
        res.json(user);
    })
};

// Signin method
exports.signin = (req,res) => {

    const { email, password } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }

    User.findOne({email} ,(err,user) => {
        if(err || !user) {
            return res.status(400).json({
                error : "User email does not exist"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Email and password do not match"
            })
        }

        // Create token
        const token = jwt.sign({_id : user._id}, process.env.SECRET);

        // Put token in to the cookie
        res.cookie("token",token,{expire : new Date + 9999})

        // Send response to front end
        const { _id,name,email,role } = user;
        return res.json({ token,user : { _id,name,email,role }});
    });
}

// Signout method
exports.signout = (req,res) => {
    res.clearCookie("token")
    res.json({
        message : "User sign out successfully!"
    })
};

// Protedcted routes
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"
})

// Custom middlewares 
exports.isAuthenticated = ( req, res, next ) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        res.status(401).json({
            error : "ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin = ( req, res, next ) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error : "You are not admin, Access denied"
        })
    }
    next();
}