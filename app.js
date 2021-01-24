var swift = require('./function')  //Import Function from Swift.js

const express = require('express');
const app = express();
var port = 3000


// create route
app.get("/", function(req,res,next){
  res.send("Welcome")
})

app.get("/data", function(req,res,next){
  res.send(swift.data)
})

app.get("/max",function(req,res,next){
  let value = swift.findMax(swift.data)
  var maxVal = JSON.stringify({
    "Max": value
  }) 
  res.send(maxVal)
});

app.get("/min",function(req,res,next){
  let value = swift.findMin(swift.data)
  var minVal = JSON.stringify({
    "Min": value
  })
  res.send(minVal)
})

app.get("/average",function(req,res,next){
  let value = swift.findAvg(swift.data)
  var avgVal = JSON.stringify({
    "Average": value
  })
  res.send(avgVal)
})

// Split Array
var splitArray = swift.dataSplit(swift.data,size = 200)

for(let i=0; i<splitArray.length ; i++){
  app.get("/section"+i,function(req,res,next){
    let value = swift.dataSplit(swift.data,size=200)
    var split_df = value
    res.send(split_df[i])
  })
}

app.get("/1daypredict",function(req,res,next){
  let value = swift.getPredict(swift.data,day=1)
  var result = JSON.stringify({
    "Predict": value
  })
  res.send(result)
})

app.get("/7daypredict",function(req,res,next){
  let value = swift.getPredict(swift.data,day=7)
  var result = JSON.stringify({
    "Predict": value
  })
  res.send(result)
})


//Listen Port
app.listen(port, function(){
  console.log("Started on port: 3000")
})



