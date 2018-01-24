'use strict';
const jwt = require('jsonwebtoken');
// const jwtAuthz = require('express-jwt-authz');
const User = require('../../models/user');

module.exports = (req, res, next) => {
    if(!req.headers.authorization) return next({statusCode:401, message:'you must authorize'});
    // console.log('in bearer auth, req.headers:',req.headers)
    let token = req.headers.authorization.split('Bearer ')[1];
    if(!token) return next({statusCode:401, message:'invalid authorization'});

    let secret = process.env.APP_SECRET||'encryptthis';
    // console.log("in bearer auth , token:", token);
    
    let decodedToken = jwt.verify(token, secret);
    // console.log("in bearer auth , decoded token:", decodedToken);

    User.findOne({_id:decodedToken.id})
    .then(user =>{
        console.log('user : ',user._id)
        req.userID = user._id;
        next()
    })
    .catch(next)
}