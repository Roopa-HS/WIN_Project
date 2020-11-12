var express = require('express')
var Bcrypt = require('bcryptjs')
var UserService = require('./user.service')

var router = express.Router()
// based on what userservice is returning the message the corresponding 
// function/action will be called
// using database
router.post('/signup', function(req,res){
// req.body.password = Bcrypt.hashSync(req.body.password, 10);

  UserService.addUser(req.body)
  .on('ALREADYEXISTS',function(data){
  
  res.status(200).send({
  message:"User With this email already exists"
  })
  
  })
  .on('ERROR',function(){
  res.status(500).send({
  message:"Internal Server Error"
  })
  })
  .on('SUCCESS',function(){
  
  res.status(200).send({
  message:"User Successfully registered"
  })
  })
 })


 router.post('/login', function(req,res){
  // req.body.password = Bcrypt.hashSync(req.body.password, 10);
  // if(!Bcrypt.compareSync(request.body.password, data)) {
  //   return response.status(400).send({ message: "The password is invalid" });
  // }
  UserService.login(req.body)
  .on('ERROR', function(data){
  console.log(data.password)
  res.status(500).send({
  message:"Internal Server Error",data:data.password
  
  })
  
  })
  
  .on('FOUND', function(){
  res.status(200).send({
  message:"Login Success"
  })

  })
  .on('NOTFOUND', function(){
  res.status(200).send({
  message:"INVALID LOGIN"
  })
  })
  
 })

 router.get('/all', function(req,res){
  UserService.findAll()
  .on('ERROR', function(){
  res.status(500).send({
  message:"Internal Server Error"
  })
  })
  .on('SUCCESS', function(data){
  res.status(200).send({
  message:"USERS FOUND",
  data:data
  })
  })
 })
  

 router.post('/verifyemail', function(req,res){
  UserService.verify(req.body)
  .on('ERROR', function(){
  res.status(500).send({
  message:"Internal Server Error"
  })
  })
  .on('FOUND', function(){
  res.status(200).send({
  message:"Email verified successfully"
  })
  })
  .on('NOTFOUND', function(){
  res.status(200).send({
  message:"Your Email not registered..Please register!!!"
  })
  })
  
 })


 router.post('/verifydonors', function(req,res){
  UserService.verifydonor(req.body)
  .on('ERROR', function(){
  res.status(500).send({
  message:"Internal Server Error"
  })
  })
  .on('FOUND', function(){
  res.status(200).send({
  message:"Donor verified successfully"
  })
  })
  .on('NOTFOUND', function(){
  res.status(200).send({
  message:"Donors are not available"
  })
  })
  
 })

 router.post('/delete', function(req,res){
  UserService.deleteUser(req.body)
  .on('DUPLICATE',function(){
  res.status(200).send({
  message:"USer deleted successfully"
  })
  })
  .on('ERRORHOGYA',function(){
  res.status(500).send({
  message:"Internal Server Error"
  })
  })
  .on('SUCCESS',function(){
  console.log("data saved")
  res.status(200).send({
  message:"User Successfully Deleted"
  })
  })
 })

 router.get('/verify/:token', function(req,res){
  UserService.verifyUser(req.params)
  .on('SUCCESS', function(){
  res.send({
  message:"Verified Success"
  })
  })
  .on('ERROR', function(){
  res.send({
  message:"ERROR OCCURED"
  })
  })
 })
  
 router.post('/forgot', function(req,res){
  UserService.sendPassword(req.body)
  .on('ERROR', function(){
  res.status(500).send({
  message:"Internal Server Error"
  })
  })
  .on('SUCCESS', function(){
  res.status(200).send({
  message:"Password Sent at your Email"
  })
  })
  .on('NOTFOUND', function(){
  res.status(200).send({
  message:"Email Not Found"
  })
  })
 })

 router.get('/getdonorlist',function(req,res){
  UserService.getdonorlist()
   .on('ERROR',function(error){
  res.send({
  message:error
   })
   })
   .on('SUCCESS',function(data){
  res.status(200).send({
  message:"Successfully Fetched Donor Records",
  data:data
   })
   })
   })


 router.post('/allDonors', function(req,res){
  UserService.findAllDonors(req.body)
  .on('ERROR', function(){
  res.status(500).send({
  message:"Internal Server Error"
  })
  })
  .on('FOUND', function(data){
    // console.log(data.data.city);
  res.status(200).send({
  message:"Donars FOUND",
  data:data

  })
  
  })
  .on('NOTFOUND', function(){
    res.status(200).send({
    message:"Donars Not Found"
    })
  })
 })
 
 router.get('/allFiles', function(req,res){
  UserService.findAllAndRead()
  .on('ERROR', function(){
  res.status(500).send({
  message:"Internal Server Error"
  })
  })
  .on('SUCCESS', function(data){
  readFiles()
  res.status(200).send({
  message:"Files Read",
  data:data
  })
  })
 })



//  router.get('/getdonorlist',function(req,res){
//   UserService.getdonorlist(req.body)
//   .on('ERROR',function(error){
//   res.send({
//   message:error
//   })
//   })
//   .on('SUCCESS',function(data){
//   res.status(200).send({
//   message:"Successfully Fetched Donor Records",
//   data:data
//   })
//   })
// .on('NOTFOUND', function(){
//   res.status(200).send({
//   message:"Donars Not Found"
//   })
// })
// })

router.post('/updatedetails', function(req,res){
  UserService.sendDetails(req.body)
  .on('ERROR', function(){
  res.status(500).send({
  message:"Internal Server Error"
  })
  })
  .on('SUCCESS', function(data){


console.log(data.userName);

  res.status(200).send({
  message:"Details are updated",
  // data:[data.userName,data.typeGender,data.blood_grp]
  data:data
  })
  })
  .on('NOTFOUND', function(){
  res.status(200).send({
  message:"Details Not Found"
  })
  })
 })

  router.post('/updatedonortrue',function(req,res){
    UserService.save(req.body)
    .on('ERROR',function(error){
    res.send({
    message:error
    })
    })
    .on('FOUND',function(data){
      // console.log(data.donated);
    res.status(200).send({
    message:"Successfully updated Donar Record",
    data:data
    })
    })
    .on('NOTFOUND', function(){
      res.status(200).send({
      message:"Donar Not Found"
      })
    })
  })

  // router.post('/updatedonortrue',function(req,res){
  //   UserService.save(req.body)
  //   .on('ERROR',function(error){
  //   res.send({
  //   message:error
  //   })
  //   })
  //   .on('FOUND',function(data){
  //     // console.log(data.donated);
  //   res.status(200).send({
  //   message:"Successfully updated Donar Record",
  //   data:data
  //   })
  //   })
  //   .on('NOTFOUND', function(){
  //     res.status(200).send({
  //     message:"Donar Not Found"
  //     })
  //   })
  // })

  router.post('/read',function(req,res){
    UserService.read(req.body)

    .on('ERROR',function(error){
    res.send({
    message:error
    })
    })
    .on('FILESFOUND',function(data){
      // console.log(data.donated);
    res.status(200).send({
    message:"Files Read Successfully",
    data:data
    })
    })
  })


module.exports = router;



