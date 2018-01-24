'use strict';
const User = require('../models/user')
const bearerAuth = require('../lib/middleware/bearer-auth')
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const userRouter = module.exports = require('express').Router();

// userRouter.post('/api/user/post', bearerAuth, bodyParser,(req, res, next) => {
//     console.log("backend user post::::", req.body);
//     let user = new User({});
//     user.save()
//      .then(user => res.send(user))
//      .catch(next)
// })


userRouter.get('/api/user/get', bearerAuth,(req, res, next) => {
    User.findOne({_id:req.body._id})
    .then(userFound=>{
        res.send(userFound)
    })
    .catch(err => res.send(err))    
})

userRouter.put(`/api/user/:id`, bearerAuth, bodyParser, (req, res, next)=>{
    console.log('in edit user', req.params);
        User.findOne({_id:req.params._id})
        .then(user=>{
            if (!req.body.content&!req.body._id) return next({statusCode:400, message: 'no body'});
            if(!user) return next({statusCode:404, message: 'User not found'});
                Object.assign(user, req.body)
                user.save()
                .then(res.send(res.status(200).send(user)))
                .catch(err => res.send(err))
        })
        .catch(next)
})

// userRouter.delete(`/api/user/delete`, bearerAuth, bodyParser,(req, res, next)=>{
//     console.log('in user router delete:::::', req.body);
//     User.findOne({_id:req.body._id})
//     .then( user => {
//         if (user){
//             User.remove({_id:req.body._id})
//             .then(res.send("success!"))
//             .catch(err => res.send(err))
//         }
//         else next({statusCode:404, message: 'USer not found'})
//     })
//     .catch(next)
// })