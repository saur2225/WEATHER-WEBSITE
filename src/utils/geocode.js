const request = require('request')

const geocode = (address, callback) => {
    const geocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2F1cjIyMjUiLCJhIjoiY2s3eWtjMzVoMDdpNjNkcnRmd2ZobWp4cSJ9.7WjvfXD-BKgjKnnzv9L4tg';
    request({url: geocode, json:true},(error, {body})=>{
    if(error){
        callback("unable to connect")
    }
    else if(body.features.length === 0){
        callback("unable to find location, try again")
    }
    else{
        callback(undefined, {
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name
        })
    }
    })
}
module.exports = geocode