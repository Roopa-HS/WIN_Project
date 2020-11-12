var MovieController = require('./movie.controller')
var Express = require('express')

var router = Express.Router()


// middle wares are functions that are called before reaching the destination//
// gor example we checked the authentication in middle ware and than we only allowed to got it to the destinantion

router.post('/create', function(req,res,next){
    var role = req.get('userrole')
    console.log("role is", role)
    if(role=="admin"){
        next()     // next call is takeing our request to next level i.e function 
    }
    else{
        res.send({
            message:"Unauthorised Access"
        })
    }

} , MovieController.createMovie) // not calling only copying here
router.get('/all', MovieController.allMovies)
router.get('/play', function(req,res,next){
    console.log("//////////////////////////")
    next()
} , MovieController.streamMovie)





// exports.login = function(payload){
//     var userfound;
//     var emitter = new EventEmitter()
//     console.log("payload received", payload)
//     if(fs.existsSync('users.txt')){
//     fs.readFile('users.txt', function(err,data){
//     console.log("data from file", data)
//     var users = data.toString().split("\n")
//     users.pop()
//     console.log("users", users)
//     for(var i=0;i<users.length;i++){
//     var user = JSON.parse(users[i])
//     if(user.email==payload.email && user.password == payload.password){
//     userfound = user;
//     break
//     }
//     }
//     if(userfound){
//     console.log("if block")
//     emitter.emit('SUCCESS')
//     }
//     else{
//     console.log("else block")
//     emitter.emit('INVALIDLOGIN')
//     }
//     })
//     }
    
//     return emitter
//    }







module.exports = router