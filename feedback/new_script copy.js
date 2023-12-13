const latitude = 32.881106;
const longitude = -117.237211;

class WeatherWidget extends HTMLElement {
  constructor() {
      super();

      this.attachShadow({mode: 'open'});
      this.fetchWeather();
  }

  async fetchWeather() {
      const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
      const weather = await response.json();
      const responseNew = await fetch(weather.properties.forecast);
      const weatherJson = await responseNew.json();
      const data = weatherJson.properties.periods[0]
      this.currentWeather = document.createElement('h1');
      this.currentWeather.innerHTML = `Current Weather`;
      this.conditionVal = document.createElement('h3');
      this.temperatureVal = document.createElement('h3');
      this.humidityVal = document.createElement('h3');
      const picVal = document.createElement('img');
      picVal.src = data.icon;
      picVal.alt = 'icon';
      this.conditionVal.innerHTML = `Condition: ` + data.shortForecast
      this.temperatureVal.innerHTML = `Temperature: ` + data.temperature + ` ` + data.temperatureUnit
      this.humidityVal.innerHTML = `Humidity: ` + data.relativeHumidity.value + `%`;
      this.shadowRoot.appendChild(this.currentWeather);
      this.shadowRoot.appendChild(picVal);
      this.shadowRoot.appendChild(this.conditionVal);
      this.shadowRoot.appendChild(this.temperatureVal);
      this.shadowRoot.appendChild(this.humidityVal);
  }
}


window.customElements.define('weather-widget', WeatherWidget);