var express = require('express');
// const path = require('path');
// const adminModel = require('../models/adminModel');
// const indexModel = require('../models/indexModel');
var router = express.Router();
// const fs = require('fs');
// // Middleware to check admin
router.use((req, res, next)=>{
  if (req.session.sunm==undefined || req.session.srole!='admin')
  {
    console.log('Invalid admin login..!')
    res.redirect('/login')
  }
  next();
})

/* GET admin listing. */
router.get('/', function(req, res, next) {
  res.send('admin-home',{'sunm':req.session.sunm});
});


// view all users

// router.get('/view-user', function(req, res, next){
//   adminModel.viewUser().then((result)=>{
//     res.render('view-user',{'result':result,'sunm':req.session.sunm});
//   }).catch((err)=>{
//     console.log(err)
//   })
// });

// // Middleware for manage user status

// router.get('/manage-user-status', function(req, res, next){
//   adminModel.manageUserStatus(req.query).then((result)=>{
//     res.redirect('/admin/view-user');
//   }).catch((err)=>{
//     console.log(err)
//   })
// });

module.exports = router;
