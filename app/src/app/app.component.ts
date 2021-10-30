import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { ApiFrontEndService } from './services/api-front-end.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  links = ['Make A Booking', 'All Bookings'];
  // activeLink = this.links[0];
  activeLink: any;

  constructor(
    private API: ApiFrontEndService,
    private DataService: DataService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute
  ) {
    this.Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes("bookings")) this.activeLink = this.links[1];
        else this.activeLink = this.links[0];
      }
    })
  }

  async ngOnInit() {
  }

  select_link(link) {
    this.activeLink = link;
    if (link == this.links[0]) this.Router.navigate([""]);
    else if (link == this.links[1]) this.Router.navigate(["bookings"]);
  }
}
