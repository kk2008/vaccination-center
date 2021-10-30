import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiFrontEndService } from '../services/api-front-end.service';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  convert_date_n_time(dateTime) {
    return `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1)}-${dateTime.getDate()} ${dateTime.getHours()}:${dateTime.getMinutes()}:00`;
  }

  constructor(
    private Router: Router,
    private API: ApiFrontEndService,
  ) { }

  private user = new BehaviorSubject<any>(undefined);
  current_user = this.user.asObservable();
  update_user(value) {
    this.user.next(value);
  }
}
