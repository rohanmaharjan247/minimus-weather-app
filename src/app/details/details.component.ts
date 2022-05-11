import { WeatherService } from './../services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly toUnsubscribe$ = new Subject<void>();
  city: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;

  today: string;

  day1Name: string;
  day1State: string;
  day1Temp: number;

  day2Name: string;
  day2State: string;
  day2Temp: number;

  day3Name: string;
  day3State: string;
  day3Temp: number;

  day4Name: string;
  day4State: string;
  day4Temp: number;

  day5Name: string;
  day5State: string;
  day5Temp: number;

  constructor(
    private activeRouter: ActivatedRoute,
    private weatherService: WeatherService
  ) {}
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit(): void {
    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];

    this.activeRouter.paramMap
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((route: any) => {
        this.city = route.params.city;
        this.getWeather(this.city);
        this.getForecast(this.city, days, todayNumberInWeek);
      });
  }

  getWeather(city: string) {
    this.weatherService
      .getWeatherState(city)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((state: any) => (this.state = state));
    this.weatherService
      .getCurrentTemp(city)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((temperature: any) => (this.temp = temperature));
    this.weatherService
      .getCurrentHum(city)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((humidity: any) => (this.hum = humidity));
    this.weatherService
      .getCurrentWind(city)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((windspeed: any) => (this.wind = windspeed));
  }

  getForecast(city: string, days: Array<string>, todayNumberInWeek: number) {
    this.weatherService
      .getForcast(city)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          const date = new Date(data[i].dt_txt).getDay();
          console.log(days[date]);
          if (
            (date === todayNumberInWeek + 1 ||
              (todayNumberInWeek === 6 && date === 0)) &&
            !this.day1Name
          ) {
            this.day1Name = days[date];
            this.day1State = data[i].weather[0].main;
            this.day1Temp = Math.round(data[i].main.temp);
          } else if (
            !!this.day1Name &&
            !this.day2Name &&
            days[date] !== this.day1Name
          ) {
            this.day2Name = days[date];
            this.day2State = data[i].weather[0].main;
            this.day2Temp = Math.round(data[i].main.temp);
          } else if (
            !!this.day2Name &&
            !this.day3Name &&
            days[date] !== this.day2Name
          ) {
            this.day3Name = days[date];
            this.day3State = data[i].weather[0].main;
            this.day3Temp = Math.round(data[i].main.temp);
          } else if (
            !!this.day3Name &&
            !this.day4Name &&
            days[date] !== this.day3Name
          ) {
            this.day4Name = days[date];
            this.day4State = data[i].weather[0].main;
            this.day4Temp = Math.round(data[i].main.temp);
          } else if (
            !!this.day4Name &&
            !this.day5Name &&
            days[date] !== this.day4Name
          ) {
            this.day5Name = days[date];
            this.day5State = data[i].weather[0].main;
            this.day5Temp = Math.round(data[i].main.temp);
          }
        }
      });
  }
}
