const mongoose = require('mongoose');
const Details = require("../models/details");
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const { Stream } = require('stream');
const mysql = require("../dbConnect/sql");
const mongo = require("../dbConnect/mongo");
const storage = require("../multer/multer")
const bodyParser = require('body-parser');

const backend = (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const newImage = new Details({
    userId: req.body.username,
    name: req.body.name,
    password: req.body.password,
    roll: req.body.roll,
    class: req.body.class,
    fees: req.body.fees,
    imgPath: '/uploads/' + req.files.image1[0].filename,
    res: '/uploads/' + req.files.image2[0].filename,
    address: req.body.address,
    stream: req.body.stream,
    exp: req.body.exp,
    college: req.body.col

  });

  newImage.save()
    .then(() => {
      res.redirect('/')
    })
    .catch((e) => {
      console.log(e)
    });
}

module.exports = backend;