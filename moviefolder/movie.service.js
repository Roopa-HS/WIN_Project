var EventEmitter = require('events').EventEmitter
var MovieModel  = require('./movie.model')


exports.addMovie = function(payload){
    var emitter = new EventEmitter()
    var movidedata = new MovieModel(payload)
    movidedata.save(function(err,newmovie){
        if(err){
            console.log("error in movie creation", err)
            if(err.code==11000){
                return emitter.emit('DUPLICATE')
            }
            else{
                return emitter.emit('ERROR')
            }
        }
        else{
            console.log("new movie created", newmovie)
            return emitter.emit('SUCCESS', newmovie)
        }
    })
    return emitter
}

exports.getAllMovies =  function(data){
    var emitter = new EventEmitter()
    var skip = data && data.skip || 0
    var limit = data && data.skip || 20
    var query = MovieModel.find({}).skip(skip).limit(limit)
    query.exec(function(error,moviesfound){
        console.log("result of all movies operation", error , moviesfound)
        if(error){
            return emitter.emit('ERROR')
        }
        else{
            return emitter.emit('SUCCESS', moviesfound)
        }
    })

    return emitter
}