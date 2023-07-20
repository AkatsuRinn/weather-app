const apiKey = "0ad3df4030a233c298c8cf93b05395a7"

fetchData()

document.querySelector("#btn-change").addEventListener('click', () =>{

    let val = document.querySelector('#exampleDataList').value === "" ? document.querySelector('#exampleDataList').innerHTML = "Иваново" : document.querySelector('#exampleDataList').value

    fetchData(val)
    
})

async function fetchData(cityName="Иваново") {
    
    let url = "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&lang=ru&units=metric"
    
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log("response: ", response, "Data: ", data)

        changeContent(data)

        console.log(data.name)
    } catch (error) {
        console.log(error)
    }
}

function getCurDate() {
    let dateTime = new Date()

    const weekdays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
    const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октярбя','ноября','декабря']
    let weekday = weekdays[dateTime.getDay()]
    let month = months[dateTime.getMonth()]
    let day = dateTime.getDate()
    let hours = dateTime.getHours() < "10" ? "0" + dateTime.getHours() : dateTime.getHours()
    let minutes = dateTime.getMinutes() < "10" ? "0" + dateTime.getMinutes() : dateTime.getMinutes()


    return weekday + ", " + day + " " + month + " " + hours + ":" + minutes
}

function changeContent(data) {

    document.querySelector("#cityname").innerHTML = data.name
    document.querySelector("#temperature").innerHTML = Math.round(data.main.temp)+"°C"
    document.querySelector("#datetime").innerHTML = getCurDate()
    document.querySelector("#condition").innerHTML = data.weather[0].description
    document.querySelector(".feels-like").innerHTML = "Ощущается как " + Math.round(data.main.feels_like) + "°C"
    document.querySelector("#wind-speed").innerHTML = data.wind.speed + " " + "м/c"
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%"
    document.querySelector("#pressure").innerHTML = Math.round(data.main.pressure*0.75) + " мм рт. ст."
    document.querySelector(".card-img-left").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
}


