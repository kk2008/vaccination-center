import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingNewComponent } from './bookings/booking-new/booking-new.component';
import { BookingUpdateComponent } from './bookings/booking-update/booking-update.component';
import { BookingAllComponent } from './bookings/booking-all/booking-all.component';

const routes: Routes = [
  { path: '', component: BookingNewComponent },
  { path: 'bookings', component: BookingAllComponent },
  { path: 'bookings/:id', component: BookingUpdateComponent },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
