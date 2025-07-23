const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../Frontend')));
app.use(express.static('Frontend')); //i need this for my audio
app.use(bodyParser.urlencoded({ extended: false }));

// Fake login page 'welcoming page'
app.get('/', (req, res) => {
  res.render('index'); // login form page
});

// Route to show main page (after login)
app.get('/main', (req, res) => {
  res.render('main'); // only shown after login
});

//Route to DENY the wrong person (after wrong login)
app.get('/DENIED', (req, res) => {
  res.render('DENIED'); // only shown after login
});

// POST login: only Danica allowed
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'danica' && password === 'secret123') {
    res.redirect('/main');
  } else {
    res.redirect('/DENIED');
    //res.send('Access denied. Only Danica can use this site.');
  }
});


app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

