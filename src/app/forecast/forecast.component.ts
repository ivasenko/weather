import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Forecast} from './forecast';
import {WeatherService} from '../weather.service';

@Component({
  selector: 'wa-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor(private ws: WeatherService) { }

  forecastForm: FormGroup;
  cityForecast: Forecast[] = [];

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('')
    });
  }
  onSubmit() {
    this.cityForecast.splice(0, this.cityForecast.length);
    this.ws.fiveDayForecast(this.forecastForm.value.forecastCity).subscribe(
      (data) => {
      console.log(data);
      for (let i = 0; i < data.list.length; i = i + 8) {
        const temporary = new Forecast(data.list[i].dt_txt,
        data.list[i].weather[0].icon,
        data.list[i].main.temp_max,
        data.list[i].main.temp_min)
        this.cityForecast.push(temporary);
      }
      console.log(this.cityForecast);
      return this.cityForecast;
    }
    )
  }
}
