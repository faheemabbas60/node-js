const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port=process.env.PORT||3000
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Set HBS nd views directory
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        name: 'Faheem',
        title: 'Android Developer'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Faheem',
        description: 'Learning MEAN'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Faheem',
        message: 'This is help page.How may i help you.'
    })
})
app.get('/weather', (req, res) => {

    const address = req.query.address;
    console.log(address)
    if (!address) {
        return res.send({
            error: 'Please provide address'
        })
    }
    geocode(address, (latitude, longitude, ) => {
        forecast(latitude, longitude, (error, response) => {
            if (error) {
                return res.send({
                    error: 'Error occured while fetching'
                })
            }
            else {
                return res.send({
                    data: response
                })
               
            }
        })
    })

})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide search term'
        })
    }
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Help articel not found',
        name: 'Faheem'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Page not found',
        name: 'Faheem'
    })
})
app.listen(port, () => {
    console.log('Server is running and up on port '+port)
})