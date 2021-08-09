 let weather = {
    "apiKey": "dda20b3ac2b4400187022018212703",
    fetchWeather: function (city) {
        fetch("https://api.weatherapi.com/v1/forecast.json?key=" + this.apiKey + "&q=" + city + "&days=5&aqi=no&alerts=no")
            .then((res) => res.json())
            .then((data) => {
                this.showWeather(data)
                this.showDailyWeather(data)
                this.lastSearched(data)
            })
    },
        search: function () {
            this.fetchWeather(document.querySelector(".search-bar").value)
        },
    showWeather: function (data) {
        const { name } = data.location;
        const { icon, text } = data.current.condition;
        const { temp_c, humidity, wind_kph } = data.current;
        document.querySelector(".city").innerText = "Počasí v " + name;
        document.querySelector(".weather-icon").src = "https:" + icon;
        document.querySelector(".desc").innerText = text;
        document.querySelector(".temp").innerText = temp_c + "°C";
        document.querySelector(".humidity p").innerText = "Vlhkost: " + humidity + "%";
        document.querySelector(".wind p").innerText = "Rychlost Větru: " + wind_kph + " km/h";
        document.querySelector(".weather").classList.remove("loaded")
        document.querySelector(".weather-daily").classList.remove("loaded")
        document.querySelector(".weather-forecast").classList.remove("loaded")
        document.querySelector(".recently-searched").classList.remove("loaded")
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"

    },
    showDailyWeather: function (data) {
        const firstDate = new Date(data.forecast.forecastday[0].date);
        const secondDate = new Date(data.forecast.forecastday[1].date);
        const thirdDate = new Date(data.forecast.forecastday[2].date);

        const firstAvgTemp = data.forecast.forecastday[0].day.avgtemp_c;
        const secondAvgTemp = data.forecast.forecastday[1].day.avgtemp_c;
        const thirdAvgTemp = data.forecast.forecastday[2].day.avgtemp_c;
        
        const firstConditionText = data.forecast.forecastday[0].day.condition.text;
        const secondConditionText = data.forecast.forecastday[1].day.condition.text;
        const thirdConditionText = data.forecast.forecastday[2].day.condition.text;
        
        const firstConditionIcon = data.forecast.forecastday[0].day.condition.icon;
        const secondConditionIcon = data.forecast.forecastday[1].day.condition.icon;
        const thirdConditionIcon = data.forecast.forecastday[2].day.condition.icon;
        document.querySelector(".day-1").innerText = firstDate.toLocaleString("default", { weekday: "long" })
        document.querySelector(".day-2").innerText = secondDate.toLocaleString("default", { weekday: "long" })
        document.querySelector(".day-3").innerText = thirdDate.toLocaleString("default", { weekday: "long" })

        document.querySelector(".temp-1").innerText = firstAvgTemp + "°C";
        document.querySelector(".temp-2").innerText = secondAvgTemp + "°C";
        document.querySelector(".temp-3").innerText = thirdAvgTemp + "°C";

        document.querySelector(".day-1-desc p").innerText = firstConditionText;
        document.querySelector(".day-1-desc img").src = firstConditionIcon;
        
        document.querySelector(".day-2-desc p").innerText = secondConditionText;
        document.querySelector(".day-2-desc img").src = secondConditionIcon;
        
        document.querySelector(".day-3-desc p").innerText = thirdConditionText;
        document.querySelector(".day-3-desc img").src = thirdConditionIcon;

    },
    lastSearched: function(data){
        let lastCities = JSON.parse(localStorage.getItem("cities")) || []; 
        
        const lastCity = data.location.name;
        const temp = data.current.temp_c;
        const icon = data.current.condition.icon;
        
        lastCities.push({
          "city": lastCity,
          "temp": temp,
          "icon": icon
        })
		
        localStorage.setItem('cities', JSON.stringify(lastCities));
        
        let list = "";
        for(let i = 0; i < lastCities.length; i++){
          list += "<li class='last-searched-city'>";
          list += "<h1 class='last-searched-city-name'>"+lastCities[i].city + "</h1>" + "<br/>";
          list += "<p class='last-searched-temp'>"+lastCities[i].temp + "°C" +"</p>";
          list += "<img class='last-searched-icon' src="+lastCities[i].icon+">" + " ";
          list += "</li>";
        }
		
        document.querySelector(".cities-searched").innerHTML = list;
        document.querySelector(".reset-storage").addEventListener("click", ()=>{
            localStorage.clear();
            document.querySelector(".cities-searched").innerHTML = "";
        })
    },

}
    document.querySelector(".search button").addEventListener("click", () => {
    weather.search();
    document.querySelector(".search-bar").value = "";
    weather.lastSearched();

});

const summaryBtn = document.querySelector(".summary-button")
summaryBtn.addEventListener("click", ()=>{
    summaryBtn.classList.toggle("is-dark")
})