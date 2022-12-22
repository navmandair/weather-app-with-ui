const request = require('postman-request')

MAPBOX_API_TOKEN = process.env.MAPBOX_API_TOKEN 
MAPBOX_API_LIMIT = 1

const geocode = (locationSearch, callback) => {
    const GeoApiURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(locationSearch) + '.json?access_token=' + MAPBOX_API_TOKEN + '&limit=' + MAPBOX_API_LIMIT
    request({url: GeoApiURL, json: true}, (error, response) =>{
    if(error){
        callback('GeoCode:' + error, undefined)
    } else if (response.body.message){
        callback('GeoCode:' + response.body.message, undefined)
        
    } else if (!response.body.features){
        callback('Location not found: ' + locationSearch, undefined)
        
    } else if (response.body.features.length > 0){  
        const features = response.body.features[0]
        const placeName = features.place_name
        const lat = features.center[0]
        const long = features.center[1]
        callback(undefined, {lat, long, placeName})
    } else {
        callback('Location not valid: ' + locationSearch, undefined)
    }
})
}

module.exports = geocode