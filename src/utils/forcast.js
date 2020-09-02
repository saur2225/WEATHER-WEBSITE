const request = require('request')

const forcast = (latitude, longitude, callback)=>{
const url = 'https://api.darksky.net/forecast/141b49a629f5a90883195a70b68b14aa/'+latitude+','+longitude+'?units=si';
request({url, json:true},(error, {body})=>{
    if(error){
        callback("unable to connect to weather services",undefined)
    }
    else if(body.error){
        callback("unable to find location",undefined)
    }
    else{
        callback(undefined,body.currently.summary+", It is currently "+body.currently.temperature+" degrees out there and the probability of raining is " +body.currently.precipProbability);
    }
})
}
module.exports = forcast