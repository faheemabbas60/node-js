const request = require('request')
const forecast = (latitude, longitude, callback) => {
    setTimeout(() => {
        const url = 'https://api.darksky.net/forecast/4cce90ca929d5a01b01f0e4682b229ed/' + latitude + ',' + longitude
        request({ url: url, json: true }, (error, response) => {
            if (error) {
                callback(error, undefined)
            }
            else {

                callback(undefined, response)
            }

        })
    }, 2000)
}
module.exports = forecast