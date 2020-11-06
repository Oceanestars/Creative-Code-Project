console.log("server is starting");
var express = require('express');
var app = express();
var server = app.listen(3000, listening);
//Tried this did not work
// var firebase = require('firebase/app');
// require('firebase/auth');
// require('firebase/database');
function listening(){  //callback
  console.log("listening...");
}
app.use(express.static('website')); //host static files like img
