
// Read Raw Data
const fs = require('fs')
let rawdata = fs.readFileSync('response.json');
let data = JSON.parse(rawdata);

// Pass Function to Index.js
var exports= module.exports

//DataSet
exports.data = data

//Export Function
exports.findMax = function(data){
    var maxVar = 0
    for(let i in data){
        if(maxVar>data[i]['data']){
            maxVar = maxVar
        }
        else{
            maxVar = data[i]['data']
        }   
    }
    return maxVar
}

exports.findMin = function(data){
    var minvar 
    for(let i in data){
        if(i == 0){
            minvar = data[i]['data']
        }
        else if(minvar>data[i]['data']){
            minvar = data[i]['data']
        }
        else{
            minvar = minvar
        }
    }
    return minvar
}

exports.findAvg = function(data){
    var sum = 0
    for(let i in data){
        sum+=data[i]['data']
    }
    return parseFloat(sum/data.length).toFixed(2)
}

exports.dataSplit = function(data,size){
    var tempArray = [];
    for (let index = 0; index < data.length; index += size) {
        df = data.slice(index, index+size);
        tempArray.push(df);
    }
    return tempArray;
}

exports.getPredict = function(data, day){
    //convert day to second
    var daytoSeconds = 1*24*60*60

    //Interval
    var interval = 30 
    const numDay = (data.length/daytoSeconds)*interval 

    //Call Min and Max function
    var max= exports.findMax(data)
    var min = exports.findMin(data)

    //Calculate average increase in 1day
    var movingAvg = (max-min)/numDay     //(Max-Min)/day
    
    //Final prediction 
    var lastData = data[data.length-1]['data']
    var myPredict = lastData+(movingAvg*day)

    return parseFloat(myPredict).toFixed(2)
}

