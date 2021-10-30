import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { ApiFrontEndService } from '../../services/api-front-end.service';
import { DataService } from '../../services/data.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-booking-all',
  templateUrl: './booking-all.component.html',
  styleUrls: ['./booking-all.component.scss']
})
export class BookingAllComponent implements OnInit {

  vaccine_centers: any = [];
  all_bookings: any = [];

  filtered = {
    "vaccine_center_id": 0,
    "search": "",
    "result": {
      data: []
    }
  }
  p: number = 1;

  constructor(
    private Router: Router,
    private API: ApiFrontEndService,
    private DataService: DataService
  ) { }

  async ngOnInit() {
    try {
      const vaccine_centers = await this.API.to("get_vaccine_center");
      if (vaccine_centers["data"]) {
        this.vaccine_centers = vaccine_centers["data"];
        this.vaccine_centers.unshift({
          "id": 0,
          "name": "All"
        });
      }

      const all_bookings = await this.API.to("get_booking");
      if (all_bookings["data"]) this.all_bookings = all_bookings["data"];
    }
    catch (error) {
      console.error(error);
    }
  }

  pageChange(e) {
    this.p = e;
  }

  edit(b) {
    this.Router.navigate([`bookings/${b.id}`]);
  }

  delete(b) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this booking!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        try {
          await this.API.to("delete_booking", b["id"]);
          Swal.fire('Delete successfully!', '', 'success');
          const all_bookings = await this.API.to("get_booking");
          if (all_bookings["data"]) this.all_bookings = all_bookings["data"];
        }
        catch(error) {
          console.error(error);
          if (typeof error != "string") error = "Invalid action. Please contact administrator!";
          Swal.fire('', error, 'error');
        }
      } 
      // else if (result.dismiss === Swal.DismissReason.cancel) {}
    })
  }
}
