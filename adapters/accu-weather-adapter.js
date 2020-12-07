import get from 'lodash.get';

import { emptyWeatherObject } from './empty-weather-object.js';

export class AccuWeatherAdapter {
  constructor(accuWeatherApiService) {
    this.accuWeatherApiService = accuWeatherApiService;
  }

  async getWeather(cityName) {
    try {
      const location = await this.accuWeatherApiService.getLocation(cityName);
      const firstLocation = location[0];

      const [currentCondition, dailyForecast] = await Promise.all([
        this.accuWeatherApiService
          .getCurrentConditions(firstLocation.Key)
          .then((conditions) => conditions[0])
          .catch(() => ({})),
        this.accuWeatherApiService
          .getDailyForecast(firstLocation.Key)
          .catch(() => ({})),
      ]);

      return {
        lastObservationTime: get(currentCondition, 'LocalObservationDateTime')
          ? new Date(currentCondition.LocalObservationDateTime)
          : null,
        location: {
          cityName: get(firstLocation, 'LocalizedName'),
          countryCode: get(firstLocation, 'Country.ID'),
        },
        weather: {
          currentTemperature: get(currentCondition, 'Temperature.Metric.Value'),
          minTemperature: get(
            dailyForecast,
            'DailyForecasts[0].Temperature.Minimum.Value',
          ),
          maxTemperature: get(
            dailyForecast,
            'DailyForecasts[0].Temperature.Maximum.Value',
          ),
          units: 'C',
          description: get(currentCondition, 'WeatherText'),
          iconUrl: this.accuWeatherApiService.getIconUrl(
            currentCondition.WeatherIcon,
          ),
        },
      };
    } catch {
      return emptyWeatherObject;
    }
  }
}
