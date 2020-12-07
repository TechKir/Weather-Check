import fetch from 'node-fetch';

export class WeatherBitApiService {
  constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
    this.iconsBaseUrl = iconsBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;
  }

  async getCurrent(cityName) {

    const url = new URL(`${this.apiBaseUrl}/current`)
    url.searchParams.append('key', this.apiKey)
    url.searchParams.append('city',cityName)
    try{
      const response = await fetch(url)
      return response.json();
    }catch (err){
      console.log(err)
    }
  }

  getIconUrl(iconCode) {
    return iconCode ? `${this.iconsBaseUrl}/${iconCode}.png` : null;
  }
}

export class WeatherBitMockService {
  async getCurrent(cityName) {
    const response = await fetch(`http://localhost:3000/mocks/weatherbit-current`);
    return response.json();
  };

  getIconUrl(iconCode) {
    return iconCode
      ? `https://weatherbit.io/static/img/icons/${iconCode}.png`
      : null;
  }
}

