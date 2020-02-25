console.log('client side javascript file loaded!')
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })

// })

const weatherForm = document.querySelector('form')
const serach = document.querySelector('#location')
const locationLabel=document.querySelector('#locationLabel')
const timezone=document.querySelector('#timezone')
const forecast=document.querySelector('#forecast')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = serach.value
    locationLabel.textContent='Location: '+location
    getForecast(location)
})
function getForecast(location) {
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {

            if (data.error) {
                timezone.textContent='Error: '+data.error;
                
            }
            else {
                timezone.textContent='Timezone: '+data.data.body.timezone;
                forecast.textContent='Forecast: '+data.data.body.daily.summary
               
            }
        })



    })
}