let weather = {
    apiKey: "4f41cf693e121f787b9c0acd1d07736d",
    fetchWeatherByZipCode: function (zipCode) {
        fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        let date = new Date().toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric", hour:"numeric", minute:"numeric"});
        let name = data.name;
        let { icon, description } = data.weather[0];
        let { temp, humidity, temp_max, temp_min } = data.main;
        let { speed } = data.wind;
        document.querySelector(".date").innerText = date;
        document.querySelector(".city").innerText = `Today's forecast for ${name}`;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".currentTemp").innerText = `${temp}°F`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind-speed").innerText = `Wind Speed: ${speed} mph`;
        let zipcode = document.querySelector(".searchBar").value;
        document.querySelector(".zipCode").innerText = `Zip code: ${zipcode}`;
        document.querySelector(".highTemp").innerText = `Today's high will be ${temp_max}°F`;
        document.querySelector(".lowTemp").innerText = `Today's low will be ${temp_min}°F`;
    },
    search: function () {
        this.fetchWeatherByZipCode(document.querySelector(".searchBar").value);
    },
}
document.querySelector("button").addEventListener("click", function() {
    return weather.search();
})
document.querySelector(".searchBar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        return weather.search();
    }
});