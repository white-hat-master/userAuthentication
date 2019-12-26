const express = require('express');
// const path = require('path');
// const indexModel = require('../models/indexModel');
// const adminModel = require('../models/adminModel');
// const userModel = require('../models/userModel');
const router = express.Router();

//Middleware to check user
router.use((req, res, next) => {
  if (req.session.sunm == undefined || req.session.srole != 'user') {
    console.log('Invalid user login..!')
    res.redirect('/login')
  }
  next();
})



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('dashbord', { 'sunm': req.session.sunm });
});


router.get('/buy', (req, res, next) => { res.render('buy', {'sunm': req.session.sunm, 'output': '' }) });

router.get('/cart', (req, res, next) => { res.render('cart', { 'sunm': req.session.sunm , 'output': '' }) });

router.get('/products', (req, res, next) => { res.render('products', { 'sunm': req.session.sunm, 'output': '' }) });

router.get('/checkout', (req, res, next) => { res.render('checkout', { 'sunm': req.session.sunm ,'output': '' }) });

router.post('/checkout',(req,res,next)=>{
  
})




module.exports = router;
