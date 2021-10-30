import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { FormService } from 'src/app/services/form.service';
import { ApiFrontEndService } from 'src/app/services/api-front-end.service';
import { DataService } from 'src/app/services/data.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {

  @Input() action: string = "";
  booking_id: number;

  vaccine_centers: any = [];

  form: FormGroup;

  constructor(
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private FormService: FormService,
    private API: ApiFrontEndService,
    private DataService: DataService
  ) { }

  async ngOnInit() {
    try {
      this.form = this.FormService.booking_form();
      const vaccine_centers = await this.API.to("get_vaccine_center");
      if (vaccine_centers["data"]) this.vaccine_centers = vaccine_centers["data"];
      this.check_action();
    }
    catch (error) {
      console.error(error);
    }
  }

  check_action() {
    try {
      if (this.action == "update") {
        this.ActivatedRoute.params.subscribe(async (params) => {
          if (params["id"]) {
            this.booking_id = params["id"];
            let selected_booking = await this.API.to("get_booking_by_id", params["id"]);
            if (selected_booking["data"]) this.form = this.FormService.booking_form(selected_booking["data"]);
          }
        });
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  get f() {
    return this.form.controls;
  }

  async submit() {
    try {
      this.FormService.markFormGroupTouched(this.form);
      if (this.form.invalid) return;

      let data_to_update_or_register = this.form.value;
      data_to_update_or_register["slot"] = this.DataService.convert_date_n_time(data_to_update_or_register["slot"]);

      let API = "";
      if (this.action == "register") {
        API = "register_booking";
        await this.API.to(API, data_to_update_or_register);
        Swal.fire('', 'Register succesfully!', 'success');
      }
      else if (this.action == "update") {
        API = "update_booking";
        await this.API.to(API, data_to_update_or_register, this.booking_id);
        Swal.fire('', 'Update succesfully!', 'success');
      }
      this.Router.navigate(["bookings"]);
    }
    catch (error) {
      console.error(error);
      if (typeof error != "string") error = "Invalid action. Please contact administrator!";
      Swal.fire('', error, 'error');
    }
  }
}
