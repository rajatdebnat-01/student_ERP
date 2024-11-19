const { Stream } = require('stream');
const mysql = require("../dbConnect/sql");
const mongo = require("../dbConnect/mongo");
const storage = require("../multer/multer")
const bodyParser = require('body-parser');

const data = (req,res) => {
    var first = req.body.first;
    var second = req.body.second;
    var third = req.body.third;
    var fourth = req.body.fourth;
    var fifth = req.body.fifth;
    var sixth = req.body.sixth;
    var seventh = req.body.seventh;
    var eighth = req.body.eighth;
  
    var sql = `INSERT INTO subject_master (id, 1st,2nd,3rd,4th,5th,6th,7th,8th) VALUES ('', '${first}','${second}','${third}','${fourth}','${fifth}','${sixth}','${seventh}','${eighth}')`;
    
    mysql.query(sql, function (err, result) {
      if (err) console.log(err);
      
      console.log("1 record inserted");
      res.send("data is saved");
    })
  }

  module.exports = data;