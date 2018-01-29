'use strict';

const mongoose = require("mongoose");
const uuidv1 =  require('uuid/v1')

const clientSchema = mongoose.Schema({
  name: String,
  image: String,
  addr1: String,
  addr2: String,
  city: String,
  state: String,
  zip: String,
  contact: String,
  phone: String,
  postdate: { type: Date, default: Date.now },
  id: { type: String, default: uuidv1() }
})

module.exports = mongoose.model('Client', clientSchema);
