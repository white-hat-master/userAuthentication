const request = require('request');
const otpgenerator = require('otp-generator');
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


function otpGenerator(length){
    return(otpgenerator.generate(length,{ digits:true,alphabets:false,upperCase:false,specialChars:false }));
}

function sendsms(mobile,cb)
{
let message = encodeURI("Welcome To Bidding Web Solution Your OTP For Registration is "+otpGenerator(6)+" Thank You for registration for any query visit on http://www.google.com");
console.log(message);
request("https://www.fast2sms.com/dev/bulk?authorization=Zl1TRj2zNvyixJFG6fQOI30cHdwMpbUSDm7gquPKV5kCLtn49EJ7uDat9jr8SzUdofPW6ZYpNOyvxeG5&sender_id=FSTSMS&message="+message+"&language=english&route=p&numbers="+mobile,(error,response,body)=>{
    console.log(error);
    console.log(response);
    console.log(body);
    cb();
});
}

module.exports=sendsms
