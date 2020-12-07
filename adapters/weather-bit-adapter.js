import moment from 'moment-timezone';
import get from 'lodash.get';

import {
  emptyWeatherObject
} from './empty-weather-object.js';

export class WeatherBitAdapter {
  constructor(weatherBitApiService) {
    this.weatherBitApiService = weatherBitApiService;
  }

  async getWeather(cityName) {
    try {
      const current = await this.weatherBitApiService.getCurrent(cityName.trim())
      const firstDataObject = get(current, 'data[0]')

      return {
        lastObservationTime: get(firstDataObject, 'ob_time', null),
        location: {
          cityName: get(firstDataObject, 'city_name', null),
          countryCode: get(firstDataObject, 'country_code', null),
        },
        weather: {
          currentTemperature: get(firstDataObject, 'temp', null),
          minTemperature: null,
          maxTemperature: null,
          units: "C",
          description: get(firstDataObject, 'weather.description', null),
          iconUrl: this.weatherBitApiService.getIconUrl(
            get(firstDataObject, 'weather.icon'),
          ),
        }
      }
    } catch (err) {
      console.log(err)
      return emptyWeatherObject
    }
  }
}