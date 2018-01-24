'use strict';

const User = require('../models/user');
const basicHTTP = require('../lib/middleware/basic-https');
const bearerAuth = require('../lib/middleware/bearer-auth')
// const jwtAuthz = require('express-jwt-authz');
const checkToken = require('../lib/middleware/bearer-auth');
const bodyParser = require('body-parser').json();
const authRouter = module.exports = require('express').Router();

authRouter.post('/api/signup', bodyParser, (req, res, next) => {
    console.log('in authRouter.post:::::',req.body)
    let password = req.body.password;
    delete req.body.password;
    let newUser = new User(req.body);
    newUser.generateHash(password)
    .then(user => {
         user.save()
         .then( user => {
             let token = user.generateToken();
             res.cookie('auth', token);
             console.log(' in auth post - cookie::::', res.cookie);
             res.send({user,token});
         })
         .catch(next)
    })
     .catch(next)
})


authRouter.get('/api/signin', basicHTTP, (req, res, next) => {
    // console.log ('in sign in, req::::', req.auth)
    User.findOne({username: req.auth.username})
    .then(userFound => {
        // console.log('found:::::', userFound)
        if (userFound){
            userFound.comparePasswords(req.auth.password)
            .then(userAuthorized => {
                console.log('checking pass');
                if(userAuthorized) {
                    let token = userAuthorized.generateToken();
                    res.cookie('auth', token)
                    res.send({userAuthorized,token});
                }
                else next({statusCode:404, message:'not authorized'})
            })
            .catch(next)
        } 
        else next({statusCode:404, message:'User not found'})
    })
    .catch(next)
})

authRouter.get('/api/validate', bearerAuth, (req, res, next) => {
    User.findOne({_id: req.userID})
        .then(user => {
            let token = user.generateToken();
            res.cookie('auth', token);
            res.send({user,token});
        })
        .catch(next);
});
//delete user:
// authRouter.delete('/api/delete/:id', checkToken, bodyParser, (req, res, next)=>{
//     User.findOne({_id:req.params.id})
//     .then( user => {
//         if (user){
//             User.remove({_id:req.params.id})
//             .then(res.send("success!"))
//             .catch(err => res.send(err))
//         }
//         else next({statusCode:404, message: 'User not found'})
//     })
//     .catch(next)
// })
