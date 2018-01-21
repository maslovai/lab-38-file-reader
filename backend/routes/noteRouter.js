'use strict';
const Note = require('../models/note')
const bearerAuth = require('../lib/middleware/bearer-auth')
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const noteRouter = module.exports = require('express').Router();

noteRouter.post('/api/notes/post', bearerAuth, bodyParser,(req, res, next) => {
    console.log("backend post::::", req.body);
    let note = new Note({"content":req.body.content});
    note.save()
     .then(note => res.send(note))
     .catch(next)
})


noteRouter.get('/api/notes/get', bearerAuth,(req, res, next) => {
    Note.find()
    .then(noteArray=>{
        res.send(noteArray)
    })
    .catch(err => res.send(err))    
})

noteRouter.put('/api/notes/edit', bearerAuth, bodyParser, (req, res, next)=>{
    // console.log('in edit user');
        Note.findOne({_id:req.body._id})
        .then(note=>{
            if (!req.body.content&!req.body._id) return next({statusCode:400, message: 'no body'});
            if(!note) return next({statusCode:404, message: 'Note not found'});
                note.content = req.body.content;
                note.save()
                .then(res.send(res.status(200).send(note)))
                .catch(err => res.send(err))
        })
        .catch(next)
})

noteRouter.delete(`/api/notes/delete`, bearerAuth, bodyParser,(req, res, next)=>{
    console.log('in note router delete:::::', req.body);
    Note.findOne({_id:req.body._id})
    .then( note => {
        if (note){
            Note.remove({_id:req.body._id})
            .then(res.send("success!"))
            .catch(err => res.send(err))
        }
        else next({statusCode:404, message: 'Note not found'})
    })
    .catch(next)
})