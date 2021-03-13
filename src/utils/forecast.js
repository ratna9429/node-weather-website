const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=747560c57b5793108c6a1d405859c072&query=' + latitude + ',' + longitude
  request({
    url,
    json: true
  }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, 'Today temperature is ' + body.current.temperature + '* Celcius.' + ' Todays weather seems to be ' + body.current.weather_descriptions[0] + '.')
    }
  })
}

module.exports = forecast