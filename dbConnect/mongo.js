const mongoose = require('mongoose');


var mongo = mongoose.connect('mongodb://127.0.0.1:27017/user')
  .then(() => {
    console.log("database connected");
  }).catch(() => {
    console.log("Something went wrong");
  });

  module.exports = mongo;