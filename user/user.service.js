var EventEmitter = require('events');
var jwt=require("jsonwebtoken")
var fs = require('fs')
var async=require('async')
var UserModel= require('./user.model')
var Mailer =require("../mailer")

   //using database
//signup function
   exports.addUser = function(payload){ // ur task is to accept payload and do ur respective
    // task i.e saving the received data into users collection in data 
    // it doesnot matter who is asking u to do the task
    let emitter = new EventEmitter()
    payload.id = Date.now() // adding a field at server level
    var userdata = new UserModel(payload) // it will return the shaped or modeled data 
    userdata.save(function(err,newuser){
    if(err){
    if(err.code==11000){
    return emitter.emit("ALREADYEXISTS")
    }
    else{
    return emitter.emit('ERROR')
    }
    
    }
    else{
    return emitter.emit('SUCCESS')
    }
    })
    
    return emitter
   }


   //login function
   exports.login = function(payload){
    var emitter = new EventEmitter()

    UserModel.findOne({email:payload.email,password:payload.password}, function(err,user){
    if(err){
    console.log("error in finding user ", err)
    return emitter.emit('ERROR')
    }
    else{
    if(user){
    console.log("Finding user operation done", user)
    return emitter.emit("FOUND")
    }
    else{
    return emitter.emit("NOTFOUND")
    }
    }
    })
    
    return emitter
   }
  

//verify the user using email id and sending token
exports.verifyUser = function(payload){ // {token:"sjdsdjdnsjfndsjfnjdsn"}
var emitter = new EventEmitter()
 var data = jwt.decode(payload.token) // {email:"some users' email"}
 console.log(">>>>>>>>>>> data in verify", data)
 UserModel.updateOne({email:data.email},{$set:{verified:true}}, function(err,updateduser){
 if(err){
 console.log(".......error in updating the user", err )
 return emitter.emit('ERROR')
 }
 else{
 console.log("User is verified", updateduser)
 if(updateduser.nModified==1){
 return emitter.emit('SUCCESS')
 }
 else{
 return emitter.emit('ERROR')
 }
 }
 })
 
 return emitter
}


// //verify the user using email id and sending token
// exports.User = function(payload){ // {token:"sjdsdjdnsjfndsjfnjdsn"}
// var emitter = new EventEmitter()
//  var data = jwt.decode(payload.token) // {email:"some users' email"}
//  console.log(">>>>>>>>>>> data in verify", data)
//  UserModel.updateOne({email:data.email},{$set:{verified:true}}, function(err,updateduser){
//  if(err){
//  console.log(".......error in updating the user", err )
//  return emitter.emit('ERROR')
//  }
//  else{
//  console.log("User is verified", updateduser)
//  if(updateduser.nModified==1){
//  return emitter.emit('SUCCESS')
//  }
//  else{
//  return emitter.emit('ERROR')
//  }
//  }
//  })
 
//  return emitter
// }



exports.verifydonor = function(payload){
   var emitter = new EventEmitter()
   UserModel.find({blood_grp:payload.blood_grp,state:payload.state,city:payload.city}, { } ,function(err,user){
   if(err){
   console.log("error in finding donor ", err)
   return emitter.emit('ERROR')
   }
   else{
   if(user){
   console.log("Finding donor operation done", user)
   return emitter.emit("FOUND")
   }
   else{
   return emitter.emit("NOTFOUND")
   }
   }
   })
   
   return emitter
  }


   //verify the user using email id
   exports.verify = function(payload){
      var emitter = new EventEmitter()
      UserModel.findOne({email:payload.email}, function(err,user){
      if(err){
      console.log("error in finding user ", err)
      return emitter.emit('ERROR')
      }
      else{
      if(user){
      console.log("Finding user operation done", user)
      return emitter.emit("FOUND")
      }
      else{
      return emitter.emit("NOTFOUND")
      }
      }
      })
      
      return emitter
     }
//
exports.sendDetails = function(payload){
   var emitter = new EventEmitter()
   UserModel.findOne({email:payload.email}, function(err,userfound){
   if(err){
   return emitter.emit('ERROR')
   }
   else{
   if(userfound){

   return emitter.emit('SUCCESS',userfound) 
   }
   else{
   return emitter.emit("NOTFOUND")
   }
   }
   })
   return emitter
  }

//updating donar with the field donated:true
exports.save= function(payload){
   var emitter = new EventEmitter()
   UserModel.update({email:payload.email}, {$set:{donated:true}}, function(err,user){
   if(err){
   console.log("error in finding user ", err)
   return emitter.emit('ERROR')
   }
   else{
   if(user){
   console.log("Successfully updated Donar Record", user)
   return emitter.emit("FOUND",user)
   }
   else{
   return emitter.emit("NOTFOUND")
   }
   }
   })
   
   return emitter
  }

  exports.getdonorlist = function (payload) {
   var emitter = new EventEmitter()
   UserModel.find({}, { _id: 0}, function (err, list) {
   if (err) {
   console.log("fetch list error", err);
   return emitter.emit("ERROR", err);
    } else {
   console.log("Fetching succesfully", list);
   return emitter.emit("SUCCESS", list);
    }
    });
   return emitter;
   };

//finding all donars
  exports.findAllDonors = function(payload){
   var emitter = new EventEmitter()
   UserModel.find({blood_grp:payload.blood_grp,city:payload.city,state:payload.state},{userName:1,email:1,city:1,state:1,blood_grp:1,phoneNumber:1,typeGender:1},function(err,users){
   if(err){
   return emitter.emit('ERROR')
   }
   else{
      if(users){
      console.log("Donars are available", users)
      return emitter.emit("FOUND",users)
      }
      else{
      console.log("Donars not available");
      return emitter.emit("NOTFOUND")

      }
      }
      })
    
    return emitter
   }



  //finding all the users
exports.findAll = function(){
    var emitter = new EventEmitter()
    UserModel.find({},{userName:1, verified:1, email:1,_id:0, city:1,donated:1,blood_grp:1,state:1,phoneNumber:1,typeGender:1,date:1},
       function(err,users){
    if(err){
    return emitter.emit('ERROR')
    }
    else{
      if(users){
      console.log("users are available", users)
      return emitter.emit("FOUND",users)
      }
      else{
      console.log("users not available");
      return emitter.emit("NOTFOUND")

      }
      }
      })
    
    return emitter
   }
    
   //sending the password to user
exports.sendPassword = function(payload){
    var emitter = new EventEmitter()
    UserModel.findOne({email:payload.email}, function(err,userfound){
    if(err){
    return emitter.emit('ERROR')
    }
    else{
    if(userfound){
    Mailer.sendMail(userfound.email,"Your password is --- " + " " + userfound.password)
    return emitter.emit('SUCCESS') 
    }
    else{
    return emitter.emit("NOTFOUND")
    }
    }
    })
    return emitter
   }

//read files
   exports.read  =  function(payload){
      var emitter = new EventEmitter()
      
      var files= payload.files;
      var fileslen =files.length;
      console.log(" Files are ",files );
     for(i=0; i<fileslen ;i++){
    console.log("inside for loop");

     fs.readFile('./files/'+files[i], function(err,data){
      if(err){
      console.log("error in finding files ", err)
      return emitter.emit('ERROR')
      }
      else{ 
      console.log("Data in the file is : ", data.toString());
      return emitter.emit("FILESFOUND")
      }
      
      })
   }    
       return emitter
     }

   //   exports.readd = function(payload){
   //    var tasks=[];
   //    var files= payload.files;
   //    var fileslen =files.length;
   //    for(var i=0;i<fileslen;i++){
   //       tasks.push(read.bind(null,files[i]))
   //    }
   //    async.series(tasks,function(err,results){
   //       console.log("err and results",err,results)
   //    })
   //  }
   
   

   //   exports.getdonorlist = function (payload) {
   //    var emitter = new EventEmitter()
   //    DonorModel.find({}, { _id: 0 }, function (err, list) {
   //    if (err) {
   //    console.log("fetch list error", err);
   //    return emitter.emit("ERROR", err);
   //    } else {
   //    console.log("Fetching succesfully", list);
   //    return emitter.emit("SUCCESS", list);
   //    }
   //    });
   //    return emitter;
   //    };