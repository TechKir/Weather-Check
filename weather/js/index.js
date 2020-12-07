import { html, render } from './../node_modules/lit-html/lit-html.js';
import { classMap } from './../node_modules/lit-html/directives/class-map.js';

// APPLICATION BOOTSTRAP
const appElement = document.querySelector('#app');

const onWeatherSearchSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const mainElement = document.querySelector('#main');
  render(loadingTemplate(), mainElement);

  fetch(`weather?city=${formData.get('city')}`, {
    method: 'GET',
    headers: myHeaders,
  })
    .then((response) => response.json())
    .then((weatherData) => {
      render(weatherDataTemplate(weatherData), mainElement);
    });
};

const welcomeTemplate = () => html`
  <section class="welcome">
    <h1>Welcome to WeatherFeed!</h1>
    <p>
      Type in name of any city around the world to get weather feed from three
      different API providers.
    </p>
  </section>
`;

const loadingTemplate = () => html`
  <div class="loader-container">
    <div class="loader"></div>
  </div>
`;

const weatherDataTemplate = ({
  openWeatherMap,
  weatherBit,
  accuWeather,
}) => html`
  <ul class="weather-list">
    <li>
      ${weatherItemTemplate({
        weatherItem: openWeatherMap,
        apiProvider: 'OpenWeather',
      })}
    </li>
    <li>
      ${weatherItemTemplate({
        weatherItem: weatherBit,
        apiProvider: 'WeatherBit',
      })}
    </li>
    <li>
      ${weatherItemTemplate({
        weatherItem: accuWeather,
        apiProvider: 'AccuWeather',
      })}
    </li>
  </ul>
`;

const weatherItemTemplate = ({ weatherItem, apiProvider }) => {
  const formattedDate = weatherItem.lastObservationTime
    ? new Date(weatherItem.lastObservationTime).toLocaleDateString('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    : null;

  const temperatureClassMap = classMap({
    degree:
      weatherItem.weather.currentTemperature !== undefined &&
      weatherItem.weather.currentTemperature !== null,
    temperature: true,
  });

  const minClassMap = classMap({
    degree:
      weatherItem.weather.minTemperature !== undefined &&
      weatherItem.weather.minTemperature !== null,
  });

  const maxClassMap = classMap({
    degree:
      weatherItem.weather.maxTemperature !== undefined &&
      weatherItem.weather.maxTemperature !== null,
  });

  return html`
    <section class="weather-item">
      <h1 class="api-provider">${apiProvider}</h1>
      <div class="location-and-time">
        <p class="location">
          ${weatherItem.location.cityName || 'n/a'},
          ${weatherItem.location.countryCode || 'n/a'}
        </p>
        <small class="time">${formattedDate || 'n/a'}</small>
      </div>
      <img
        src=${weatherItem.weather.iconUrl}
        class="weather-icon"
        alt=${weatherItem.weather.description}
      />
      <span class=${temperatureClassMap}
        >${weatherItem.weather.currentTemperature || 'n/a'}</span
      >
      <div class="min-max">
        <span class=${minClassMap}
          >${weatherItem.weather.minTemperature || 'n/a'}</span
        >
        /
        <span class=${maxClassMap}
          >${weatherItem.weather.maxTemperature || 'n/a'}</span
        >
      </div>
      <p class="description">${weatherItem.weather.description || 'n/a'}</p>
    </section>
  `;
};

const appTemplate = () => html`
  <aside class="search-container">
    <form class="search-form" @submit=${onWeatherSearchSubmit}>
      <input
        class="search-input"
        type="text"
        role="search"
        name="city"
        placeholder="City name"
        autofocus
      />
      <button class="search-button" type="submit">Search</button>
    </form>
  </aside>

  <main id="main" class="main-container">
    ${welcomeTemplate()}
  </main>
  <footer><a href='https://www.freepik.com/photos/background'>Background photo created by evening_tao - www.freepik.com</a>; Satellite photo taken from <a href='https://www.pexels.com/pl-pl/zdjecie/latanie-ziemia-kosmos-technologia-60132/'>www.pexels.com</a>, licence:CC0 </footer>
`;

render(appTemplate(), appElement);
