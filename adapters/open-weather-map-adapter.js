import get from 'lodash.get';

import { emptyWeatherObject } from './empty-weather-object.js';

export class OpenWeatherMapAdapter {
  constructor(openWeatherMapAdapter) {
    this.openWeatherMapAdapter = openWeatherMapAdapter;
  }

  async getWeather(cityName) {
    try {
      const weather = await this.openWeatherMapAdapter.getWeather(cityName.trim())

      return {
        lastObservationTime: get(weather, 'dt', null)
          && new Date(weather.dt*1000),
        location: {
          cityName: get(weather, 'name', null),
          countryCode: get(weather, 'sys.country', null),
        },
        weather: {
          currentTemperature: get(weather, 'main.temp', null),
          minTemperature: get(weather, 'main.temp_min', null),
          maxTemperature: get(weather, 'main.temp_max', null),
          units: "C",
          description: get(weather, 'weather[0].description', null),
          iconUrl: this.openWeatherMapAdapter.getIconUrl(
            get(weather, 'weather[0].icon'),
          ),
        }
      }
    } catch (err) {
      console.log(err)
      return emptyWeatherObject
    }
  }
}
