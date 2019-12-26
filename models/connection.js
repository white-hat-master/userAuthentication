const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/ferniture-E-com",
 { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true
  });
const db = mongoose.connection
console.log("Connectiion Done");
module.exports = db;
