'use strict';
const mongoose = require('mongoose');

const note = new mongoose.Schema({
  content: {type:String, required:true}
});

module.exports = mongoose.model('Note', note);