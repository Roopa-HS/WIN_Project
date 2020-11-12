var Mongoose = require('mongoose');


var MovieSchema = new Mongoose.Schema({
    title:{type:String,required:true,unique:true},
    thumbnail:{type:String},
    filename:{type:String , unique:true},
    likes:{type:Number , default:0},
    dislikes:{type:Number, default:0},
    views:{type:Number, default:0},
    minagegroup:{type:Number, default:18},
    ratings:{type:Number, default:0},
    year:{type:Number , required:true},
    visible:{type:Boolean,default:true},
    description:{type:String},
    duration:{type:Number, required:true},
    langauges:[{type:String}],
    genre :[{type:String}],
    paid:{type:Boolean , default:false},
    uploaded:{type:Date,default:new Date()},
})

var MovieModel = Mongoose.model('videos', MovieSchema);

module.exports = MovieModel;