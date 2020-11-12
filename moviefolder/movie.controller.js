var fs = require('fs')
var MovieService = require('./movie.service')
var path = require('path')


exports.createMovie = function(req,res){
console.log("..... create a movie here")
console.log("get all movies from here ")
var filename =  req.body.filename
console.log(" current path " , __dirname, path.resolve(__dirname+'/../assets/'+filename))
if(fs.existsSync(path.resolve(__dirname+'/../assets/'+filename))){
   MovieService.addMovie(req.body)
   .on('SUCCESS', function(result){
         res.send({
             message:"Movie added in db",
             data:result
         })
   })
   .on('ERROR', function(result){
    res.send({
        message:"Error in adding Movie  in db"
    })
   })
  .on('DUPLICATE', function(result){
    res.send({
        message:" Movie is already added in db"
    })
   })
}
else{
    res.send({
        message:'File not present in our assets'
    })
}
}

exports.allMovies = function(req,res){
    MovieService.getAllMovies()
    .on('ERROR', function(){
        res.send({
            message:"Internal Server Error"
        })
    })
    .on('SUCCESS', function(result){
        res.send({
            message:"Movies found",
            data:result
    })
  })
}


exports.streamMovie =  function(req,res){
    console.log(":::::::::")
  const moviepath = path.resolve(__dirname+'/../assets/'+req.query.moviename+'.mp4')
  console.log(">>>>>>>>>>>>>>>>", moviepath)
  const stat = fs.statSync(moviepath)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(moviepath, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(moviepath).pipe(res)
  }
}