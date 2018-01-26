'use strict';
const aws = require('../lib/s3');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'))


const userSchema = new mongoose.Schema({
  username: {type:String, required:true},
  password:{type: String, required:true},
  email:{type:String, required:true},
  avatar: {type: String, required: false},
  preview:{type:String, required:false}
});

userSchema.methods.attachFiles = function(files) {
  
  let record = this;
  let file = files[0];
  let key = `${file.filename}-${file.originalname}`;
  // console.log('in attach files, file.path::::', file.path, key);
  aws.upload(file.path, key)
  .then(url=>{
    console.log('in attach file, url::::', url);
    record.avatar = url;
    record.save()
    .then(user => {
      console.log('in attach file::::', user);
      return user
    })
    .catch(console.error)
  })
  .catch(console.error)
}

userSchema.methods.generateHash = function(password){
  
  return bcrypt.hashAsync(password,10)
  .then(hash => {
      this.password = hash;
      return this;
  })
}

userSchema.methods.comparePasswords = function(password){
  return bcrypt.compareAsync(password, this.password)
  .then(result => {
      if (result) return this;
      throw new Error('password did not match')
  })
}

userSchema.methods.generateToken = function(){
  let secret = process.env.APP_SECRET;
  return jwt.sign({id:this._id}, secret);
}

module.exports = mongoose.model('User', userSchema);