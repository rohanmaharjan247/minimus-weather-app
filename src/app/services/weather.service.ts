import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  apiUrl = 'https://api.openweathermap.org/data/2.5';
  appID = 'b4e1e17ac67bc34668377259fbe6ab4c';
  constructor(private http: HttpClient) {}

  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric') {
    const params = new HttpParams()
      .set('q', city)
      .set('units', metric)
      .set('APPID', this.appID);
    return this.http.get(`${this.apiUrl}/weather`, { params });
  }

  getCitiesWeathersByName(
    cities: Array<string>,
    metric: 'metric' | 'imperial' = 'metric'
  ) {}

  getWeatherState(city: string) {
    const params = new HttpParams().set('q', city).set('APPID', this.appID);
    return this.http.get(`${this.apiUrl}/weather`, { params });
  }

  getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric') {
    const params = new HttpParams()
      .set('q', city)
      .set('units', metric)
      .set('APPID', this.appID);
    return this.http
      .get(`${this.apiUrl}/weather`, { params })
      .pipe((result: any) => result.main.temp);
  }

  getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric') {
    const params = new HttpParams()
      .set('q', city)
      .set('units', metric)
      .set('APPID', this.appID);

    return this.http
      .get(`${this.apiUrl}/weather`, { params })
      .pipe((result: any) => result.main.humidity);
  }

  getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric') {
    const params = new HttpParams()
      .set('q', city)
      .set('units', metric)
      .set('APPID', this.appID);

    return this.http
      .get(`${this.apiUrl}/weather`, { params })
      .pipe((result: any) => result.wind.speed);
  }

  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric') {
    const params = new HttpParams()
      .set('q', city)
      .set('units', metric)
      .set('APPID', this.appID);

    return this.http.get(`${this.apiUrl}/weather`, { params }).pipe((result: any) => {
      let max = result.list[0].main.temp;
      result.list.forEach((val: any) => {
        if (max < val.main.temp) {
          max = val.main.temp;
        }
      });

      return max;
    });
  }

  getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric') {
    const params = new HttpParams()
      .set('q', city)
      .set('units', metric)
      .set('APPID', this.appID);

    return this.http.get(`${this.apiUrl}/weather`, { params }).pipe((result: any) => {
      let min = result.list[0].main.temp;
      result.list.forEach((val: any) => {
        if (min < val.main.temp) {
          min = val.main.temp;
        }
      });

      return min;
    });
  }

  getForcast(city: string, metric: 'metric' | 'imperial' = 'metric') {
    const params = new HttpParams()
      .set('q', city)
      .set('units', metric)
      .set('APPID', this.appID);

    return this.http
      .get(`${this.apiUrl}/forecast`, { params })
      .pipe((result: any) => result.list);
  }
}
