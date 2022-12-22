const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

// Paths for Express
const publicDirPath = path.join(__dirname,'../public')
const viewsDirPath = path.join(__dirname,'../templates/views')
const partialsDirPath = path.join(__dirname,'../templates/partials')

const app = express()

// Setup HandleBars Views Path and Engine
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) =>{
    const data = {
        title: 'Weather App'
    }
    res.render('index', data)
})

app.get('/about', (req, res) =>{
    const data = {
        title: 'About',
        author: 'Nav Mandair'
    }
    res.render('about', data)
})

app.get('/help', (req, res) =>{
    const data = {
        title: 'Help',
        help_message: 'How can we help you !'
    }
    res.render('help', data)
})

app.get('/weather', (req, res)=>{
    let location = req.query.location
    if(!location){
        return res.send({error: 'You must provide location'})
    }
    else {
        geocode(location, (error, {lat, long, placeName} = {}) => {
            if (error) {
                return res.send({error:'ERROR: ' + error})
            } else {
                weather(lat, long, (error, data) => {
                    const {temperature, feelsLike, humidity} = data
                    if (error) {
                        return res.send({error:'ERROR: ' + error})
                    } else {
                        return res.send({location: location, forecast: 'In ' + placeName + ' It is currently ' + temperature + ' degrees out. But It feels like ' + feelsLike + ' degrees. There is ' + humidity + '% humidity'})
                    }
                })
            }
        })
    }
}) 

app.get('/help/*', (req, res)=>{
    res.render('404', {error_message: 'Help Article not found'})
}) 

app.get('*', (req, res)=>{
    res.render('404', {error_message: 'Page not found'})
}) 

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

