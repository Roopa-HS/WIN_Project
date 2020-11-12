var express =  require ( 'express' ) 
var bodyparser = require ( 'body-parser' ) 
var Mongoose = require('mongoose')
var Port = 2000
 
var dburl = "mongodb://testuser:test12345@ds045704.mlab.com:45704/hcldatabase"
// var localdburl = "mongodb://localhost:27017/nameofyourdatabase"
Mongoose.connect(dburl, function(err,client){
 if(err){
 console.log("Error in connecting to db")
 }
 else{
 console.log(">>>>>>>", "connected to database")
 }
})
 
  
var server = express () 
  
console . log ( ">>>>>>>. current path" ,  __dirname ) 
  
// __dirname it is read as underscore underscore dirname which giver you the current working path 
server.use(bodyparser.json ()) 
server.use(express.static ( __dirname+ '/client' )) 
server.use(require('./routes'));
  
server.get ( '/',function ( req , res ){ 
     console.log("base route that means some xyz.com" ) 
     res.sendFile(__dirname + '/client/index.html' ) 
}) 
server.use('/movie', require('./moviefolder'));
 
server.listen( Port ,  function (){ 
     console.log("Server is running at" ,  Port ) 
})