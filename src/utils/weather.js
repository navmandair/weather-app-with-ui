const request = require('postman-request')

WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY

const weather = (Lat, Long, callback) =>{ 
    QUERY =  Long+','+Lat
    const weatherURL = 'http://api.weatherstack.com/current?access_key='+WEATHERSTACK_API_KEY+'&query='+QUERY

    request({url: weatherURL, json: true}, (error, response) =>{
        if(error){
            callback('Weather: ERROR ' + error, undefined)
        } else if (response.body.error){
            callback('Weather: ERROR ' + response.body.error, undefined)
        } else{
            const current = response.body.current;
            const temperature = current.temperature;
            const feelsLike = current.feelslike;
            const humidity = current.humidity;
            callback(undefined, {temperature, feelsLike, humidity})
        }
    })
}

module.exports = weather