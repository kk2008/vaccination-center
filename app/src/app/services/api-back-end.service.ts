import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiBackEndService {

  constructor(private http: HttpClient) { }

  get_vaccine_center() {
    return this.http.get(`/api/vaccineCenter`, httpOptions);
  }

  get_booking() {
    return this.http.get(`/api/booking`, httpOptions);
  }

  get_booking_by_id(id) {
    return this.http.get(`/api/booking/${id}`, httpOptions);
  }

  register_booking(payload) {
    return this.http.post(`/api/booking`, payload, httpOptions);
  }

  update_booking(payload, id) {
    return this.http.post(`/api/booking/${id}`, payload, httpOptions);
  }

  delete_booking(id) {
    return this.http.delete(`/api/booking/${id}`, httpOptions);
  }
}
