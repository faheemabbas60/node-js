const request = require('request')
const geocode = (address, callback) => {
    setTimeout(() => {
        const locationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZmFoZWVtNTEyIiwiYSI6ImNrNnFjMmhrazBnY2gza245Mno0eTB5MTAifQ.sKs1Lf36vxOYIVr-hfr14g'
        request({ url: locationURL, json: true }, (error, response) => {
            if (error) {
                console.log('Fetching location data failed')
            }
            else if (response.body.features.length === 0) {
                console.log('No feature data available')
            }
            else if (response.body.features[0].center.length === 0) {
                console.log('No coordinated data available')
            }
            else {
                const latitude = response.body.features[0].center[1]
                const longitude = response.body.features[0].center[0]
                console.log(latitude + ',' + longitude)
                callback(latitude, longitude)
            }


        })

    }, 2000)

}
module.exports=geocode