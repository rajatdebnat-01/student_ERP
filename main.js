const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Details = require("./models/details");
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const { Stream } = require('stream');
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));


//mongoose connect
mongoose.connect('mongodb://127.0.0.1:27017/user')
  .then(() => {
    console.log("database connected");
  }).catch(() => {
    console.log("Something went wrong");
  });



//storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {

    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


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
app.post('/signup', upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const newImage = new Details({
    userId: req.body.username,
    name: req.body.name,
    password: req.body.password,
    roll: req.body.roll,
    class: req.body.class,
    fees: req.body.fees,
    imgPath: '/uploads/' + req.file.filename,
    address: req.body.address,
    stream: req.body.stream,
    exp: req.body.exp,
    college: req.body.col,
    
  });

  newImage.save()
    .then(() => {
      res.redirect('/')
    })
    .catch((e) => {
      console.log(e)
    });
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

app.get('/home/user', async(req,res)=>{
  
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
app.get('/home/info', async(req,res)=>{
  
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
app.get('/home/payment', async(req,res)=>{
  
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