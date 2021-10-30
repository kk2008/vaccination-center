import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule, FormsModule, FormArray, FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';

import { InputValidationService } from './inputValidation.service';

@Injectable()
export class FormService {

    constructor(
        private InputValidation: InputValidationService,
        private FormBuilder: FormBuilder
    ) { }

    public markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).keys(formGroup.controls).map(control => {
            formGroup.controls[control].markAsTouched();
        });
    }

    booking_form(data?) {
        let slot = new Date();
        if (data) {
            if (data["slot"]) {
                let s = data["slot"].split(" ");
                slot = new Date(`${s[0]} ${s[1]}`);
            }
        }
        let form = this.FormBuilder.group({
            "nric": [data ? (data["nric"] ? data["nric"] : '') : '', [
                Validators.required
            ]],
            "name": [data ? (data["name"] ? data["name"] : '') : '', [
                Validators.required
            ]],
            "vaccine_center_id": [data ? (data["vaccine_center_id"] ? data["vaccine_center_id"] : '') : '', [
                Validators.required
            ]],
            "slot": [slot, [
                Validators.required
            ]],
        });
        return form;
    }
}