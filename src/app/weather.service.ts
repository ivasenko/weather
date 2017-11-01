import { Injectable } from '@angular/core';
import {CurrentWeather} from "./current/current-weather";
import {Http, Response} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Forecast} from './forecast/forecast';



@Injectable()
export class WeatherService {
  myWeather: CurrentWeather;
  location
  constructor(private http: Http) {}

  localWeather() {
    return new Promise ((res, rej) =>{
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0bde15c95815c2f86dc8b338224ce5f&units=metric`)
          .map((response: Response) => response.json())
          .toPromise()
          .then(
            (data) => {
              console.log(data);
              this.myWeather = new CurrentWeather(
                data.name,
                data.main.temp,
                data.weather[0].icon,
                data.weather[0].description,
                data.main.temp_max,
                data.main.temp_min,
                data.sys.sunrise);

              res (this.myWeather);
            }
          )
      })
    })
  }
  anotherCityWeather(city: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0bde15c95815c2f86dc8b338224ce5f&units=metric`)
      .map((response: Response) => response.json());
  }
  fiveDayForecast(city: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a0bde15c95815c2f86dc8b338224ce5f&units=metric`)
      .map((response: Response) => response.json());
  }
}
