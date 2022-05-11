import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  darkMode =false;
  condition = 'Clouds';
  currentTemp = '22';
  minTemp = '22';
  maxTemp = '22';

  constructor() { }

  ngOnInit(): void {
  }

  openDetails(){

  }
}
