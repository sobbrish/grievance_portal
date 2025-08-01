const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../Frontend')));
app.use(express.static('Frontend')); //i need this for my audio
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: true
}));

// Fake login page 'welcoming page'
app.get('/', (req, res) => {
  res.render('index'); // login form page
});

// Route to show main page (after login)
app.get('/main', checkAuth, (req, res) => {
  res.render('main'); // only shown after login
});

//Route to DENY the wrong person (after WRONG login)
app.get('/DENIED', (req, res) => {
  res.render('DENIED'); // only shown after login
});

// POST login: only Danica allowed
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'danica' && password === '123') {
    req.session.loggedIn = true;
    res.redirect('/main');
  } else {
    res.redirect('/DENIED');
    //res.send('Access denied. Only Danica can use this site.');
  }
});

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:'xiaohan.zhang3@gmail.com',
      pass: 'agnp sfzs artf omox'
    }
  });

app.get('/form', checkAuth, (req,res) =>{
    res.render('form')
});

app.post('/form',(req,res)=>{


  let mailOptions = {
    from:'danicajulia.lisaca@gmail.com',
    to: 'xiaohan.zhang3@gmail.com',
    subject:'Complaint from danica!!!',
    text: `Mood: ${req.body.mood}\nComplaint: ${req.body.complaint}`
  }

  transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
      console.log(error);
      res.send('error')
    }else{
      console.log('Complaint Sent: ' + info.response);
      res.send('success');
    }
  })
});

app.get('/form2', checkAuth, (req,res) =>{
    res.render('form2')
});

app.post('/form2',(req,res)=>{


  let mailOptions = {
    from:'danicajulia.lisaca@gmail.com',
    to: 'xiaohan.zhang3@gmail.com',
    subject:'Date with danica!!!',
    text: `Date: ${req.body.date}\nTime: ${req.body.time}\nPlace: ${req.body.place}\nComment: ${req.body.comment}`
  }

  transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
      console.log(error);
      res.send('error')
    }else{
      console.log('Date Sent: ' + info.response);
      res.send('success');
    }
  })
});

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});


function checkAuth(req, res, next) {
  if (req.session.loggedIn) {
    next(); // User is logged in, allow access
  } else {
    res.redirect('/'); // Redirect to login page
  }
}

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});
