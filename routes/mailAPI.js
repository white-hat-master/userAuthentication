var nodemailer = require('nodemailer');

function myMail(userDetails) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tesu.mail.demo@gmail.com',
      pass: 'tesu9981148976'
    }
  });

  var mailOptions = {
    from: 'tesu.mail.demo@gmail.com',
    to: userDetails.email,
    subject: 'Sending Email using Node.js',
    html: "<h1>Welcome To Bidding Web Solution</h1><p>You have successfully registered on our application , your login credentials are below</p><h2>Username : "+userDetails.email+"</h2><h2>Password : "+userDetails.password+"</h2><h1>Click on the link below to verify your account</h1>http://localhost:3000/verify?email="+userDetails.email
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = myMail