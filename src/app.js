const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express Configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebar locations and setup locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup statis directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ratnadeep'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ratnadeep'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Please email us at ratna9429@gmail.com',
    name: 'Ratnadeep'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an valid address to proceed'
    })
  }
  geocode(req.query.address, (error, {
    latitude,
    longitude,
    location
  } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: data,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ratnadeep',
    messageTitle: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    messageTitle: 'No such page found',
    name: 'Ratnadeep'
  })
})

app.listen(port, () => {
  console.log('Server is running on port: ' + port)
})