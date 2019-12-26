const express = require('express');
const indexModel = require('../models/indexModel');
const myCrypto = require('./myCrypto');
const myMail = require('./mailAPI');
const router = express.Router();


//middleware to check user
router.use((req, res, next) => {
  if (req.url == '/product' || req.url == '/shop' || req.url == '/' || req.url == '/register') {
    if (req.session.sunm != undefined) {
      if (req.session.srole == 'admin')
        res.redirect('/admin');
      else if (req.session.srole == 'user')
        res.redirect('/users')
      else
        res.redirect('/login')
    }
    else
      next();
  }
  else
    next();
})


//Middleware to check cookies
var cunm = "", cpass = ""
router.use('/login', (req, res, next) => {
  if (req.cookies.cunm != undefined) {
    cunm = myCrypto.mydecrypt(req.cookies.cunm);
    cpass = myCrypto.mydecrypt(req.cookies.cpass);
  }
  next();
})




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { output: '' });
});

router.get('/shop', (req, res, next) => { res.render('shop', { output: '' }) });

router.get('/product', (req, res, next) => { res.render('product', { output: '' }) });

router.get('/login', (req, res, next) => { res.render('login', { output: '' }) });

router.post('/login', function (req, res, next) {
  indexModel.login(req.body).then((result) => {
    if (result.length > 0) {
      // set user details in session
      req.session.sunm = result[0].email;
      req.session.srole = result[0].role;

      //set user details in cookies
      if (req.body.chk != undefined) {
        cunm_data = mycrypto.myencrypt(result[0].email);
        cpass_data = mycrypto.myencrypt(result[0].password);
        res.cookie('cunm', cunm_data, { maxAge: 60000 * 60 * 24 });
        res.cookie('cpass', cpass_data, { maxAge: 60000 * 60 * 24 });
      }

      if (result[0].role == 'user')
        res.redirect('/users');
      else if (result[0].role == 'admin')
        res.redirect('/admin');
      else
        res.redirect('/login')
    }
    else
      res.render('login', { 'output': 'Invalid username or Verify your account' });
  }).catch((err) => {
    console.log(err);
  })
})


router.get('/logout', function (req, res, next) {
  req.session.destroy();
  console.log('user logged out');
  res.redirect('/login')

});

router.get('/verify', function (req, res, next) {
  var emailID = req.query.email
  indexModel.verify(emailID).then((result) => {
    res.redirect('/login')
  }).catch((err) => {
    console.log(err);
  })
});


router.get('/register', (req, res, next) => { res.render('register', { 'title': '', 'output': '' }) });

router.post('/register', (req, res, next) => {

  indexModel.register(req.body).then((result) => {
    console.log(req.body);
    myMail(req.body)
    mySMS(req.body.mobile, () => {
      res.render('register', { title: req.body.email, success: 'Register Successfully..!' })
    })
  }).catch(() => {
    console.log(err);
  })
});

module.exports = router;
