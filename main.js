const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Details = require("./models/details");
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const { Stream } = require('stream');
const mysql = require("./dbConnect/sql");
const mongo = require("./dbConnect/mongo");
const storage = require("./multer/multer")
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//middlewares


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));


//storage
const upload = multer({ storage: storage });
const cpUpload = upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }])

//sign up things

const backend = (req,res) => {
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


// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// let a = "47";
// var sql = `INSERT INTO class_master (id, name) VALUES ('', '${a}')`;
// mysql.query(sql, function(err,
// result){
//   if (err) console.log(err);
//     console.log("1 record inserted");
// })

//routes
//index route
app.get('/', (req, res) => {
  res.render('login');
})

//signup route
app.get('/signup', (req, res) => {
  res.render('signup');
})

//signup details sending route
app.post('/signup', cpUpload, (req, res) => {
  backend(req,res);
});

app.get('/data', cpUpload, (req, res) => {
  res.render('class');
});
app.post('/data', cpUpload, (req, res) => {
 
  data(req,res);
});

//login details send route

app.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username and password
  const user = await Details.findOne({ userId: username, password: password });

  if (user) {
    // Store the user ID in session
    req.session.userId = user._id;
    res.redirect('home');
  } else {
    res.send('Invalid Details');
  }
});

//login route
app.get('/home', async (req, res) => {
  if (req.session.userId) {
    const user = await Details.findById(req.session.userId);

    if (user) {
      // Render the user data on the home
      res.render('home', { user: user });
    } else {
      res.send('User not found');
    }
  } else {
    res.redirect('/');
  }

});

app.get('/home/user', async (req, res) => {

  if (req.session.userId) {
    const user = await Details.findById(req.session.userId);

    if (user) {
      // Render the user data on the home
      res.render('profile', { user: user });
    } else {
      res.send('User not found');
    }
  } else {
    res.redirect('/');
  }
})
app.get('/home/info', async (req, res) => {

  if (req.session.userId) {
    const user = await Details.findById(req.session.userId);

    if (user) {
      // Render the user data on the home
      res.render('contact', { user: user });
    } else {
      res.send('User not found');
    }
  } else {
    res.redirect('/');
  }
})
app.get('/home/payment', async (req, res) => {

  if (req.session.userId) {
    const user = await Details.findById(req.session.userId);

    if (user) {
      // Render the user data on the home
      res.render('payment', { user: user });
    } else {
      res.send('User not found');
    }
  } else {
    res.redirect('/');
  }
})


//logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});