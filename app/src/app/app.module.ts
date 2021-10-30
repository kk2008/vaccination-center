import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { ApiBackEndService } from './services/api-back-end.service';
import { ApiFrontEndService } from './services/api-front-end.service';
import { DataService } from './services/data.service';
import { FormService } from './services/form.service';
import { InputValidationService } from './services/inputValidation.service';

import { bookingFilterPipe } from './services/filter.pipe';

import { AppComponent } from './app.component';
import { BookingNewComponent } from './bookings/booking-new/booking-new.component';
import { BookingUpdateComponent } from './bookings/booking-update/booking-update.component';
import { BookingAllComponent } from './bookings/booking-all/booking-all.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';

@NgModule({
  declarations: [
    bookingFilterPipe,
    AppComponent,
    BookingNewComponent,
    BookingUpdateComponent,
    BookingAllComponent,
    BookingFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,

    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    // AngularDateTimePickerModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  providers: [
    ApiBackEndService,
    ApiFrontEndService,
    DataService,
    FormService,
    InputValidationService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', hasBackDrop: false } },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    // RegNewIndividualComponent
  ]
})
export class AppModule { }
