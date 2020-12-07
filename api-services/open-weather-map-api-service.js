import fetch from 'node-fetch';

export class OpenWeatherMapApiService {
  constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
    this.iconsBaseUrl = iconsBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;
  }

  async getWeather(cityName) {
    const url = new URL(`${this.apiBaseUrl}/weather`)
    url.searchParams.append('appid',this.apiKey);
    url.searchParams.append('q',cityName);
    url.searchParams.append('units', 'metric');

    try{
      const response = await fetch(url)
      return response.json();
    }catch (err){
      console.log(err)
    }
  }

  getIconUrl(iconCode) {
    return iconCode ? `${this.iconsBaseUrl}/${iconCode}@2x.png` : null;
  }
}

export class OpenWeatherMapMockService {
  async getWeather(cityName) {
    const response = await fetch(`http://localhost:3000/mocks/openweathermap-current`)
    return response.json();
  }

  getIconUrl(iconCode) {
    return iconCode
      ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
      : null;
  }
}