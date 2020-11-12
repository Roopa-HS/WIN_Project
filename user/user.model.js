var Mongoose = require('mongoose')
 
var Schema = Mongoose.Schema
 
var UserSchema = new Schema({
    userName:{type:String, required:true},
    password:{type:String, required:true},
    phoneNumber:{type:Number},
    typeGender:{type:String},
    email:{type:String, required:true, unique:true},
    date:{type:Date},
    blood_grp:{type:String},
    state:{type:String},
    city:{type:String},
    // id:{type:Number, unique:true , required:true},
    verified:{type:Boolean,default:false},
    donated:{type:Boolean,default:false}
})
 
var UserModel = Mongoose.model('WIN',UserSchema)
module.exports = UserModel;




















 
// Usermodel is mapped with users collection in the database everytime we need to do anything
// in usrers table or collection we can bring usermodel and it will do our task
 
// usermodel will ensure the schema of USER schema mentiioned from line 6 
 
// for example if some one is not senidng the email it will not allow 
//to save anything in users collection due to required is true




















// Usermodel is mapped with users collection in the database everytime we need to do anything
// in usrers table or collection we can bring usermodel and it will do our task

// usermodel will ensure the schema of USER schema mentiioned from line 6 

// for example if some one is not senidng the email it will not allow 
//to save anything in users collection due to required is true

