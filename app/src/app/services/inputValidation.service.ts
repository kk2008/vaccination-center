import { Injectable } from '@angular/core';
import { ValidationErrors, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {

  constructor() { }

  email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  first_name_pattern = `[a-zA-Z ]+$`;
  last_name_pattern = `[a-zA-Z ]+$`;
  chinese_name_pattern = `[\u4E00-\u9FA5\uF900-\uFA2D][^a-zA-Z0-9-‘'!@#$%^&*()_+={}[:;<>?,/"~-】【。！￥……；：“’《》，。？]{0,250}$`;
  school_name_eng_pattern = `[a-zA-Z 0-9!@#$%^&*()_+={}[:;<>?,/"'~.-][^\u4E00-\u9FA5\uF900-\uFA2D]{0,49}$`;
  school_name_chi_pattern = `[\u4E00-\u9FA5\uF900-\uFA2D][^a-zA-Z0-9-‘'!@#$%^&*()_+={}[:;<>?,/"~-】【。！￥……；：“’《》，。？]{0,250}$`;
  numberOnly = `[0-9]+$`;

  // namePattern_en: string = `[a-zA-Z][^\u4E00-\u9FA5\uF900-\uFA2D0-9!@#$%^&*()_+={}[:;<>?/"~]{0,21}$`; // -,.'
  // companyPattern: string = `[a-zA-Z0-9!@#$%^&*()_+={}[:;<>?/~.'-][^"]{0,250}$`;
  // namePattern_cn: string = `[\u4E00-\u9FA5\uF900-\uFA2D][^a-zA-Z0-9-‘'!@#$%^&*()_+={}[:;<>?,/"~-】【。！￥……；：“’《》，。？]{0,250}$`;
  // phoneNumberPattern: string = `[45679][^a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D!@#$%^&*_={}[:;<>?,/"~.]{6,24}$`;
  // ID_NumberPattern: string = `[a-zA-Z0-9][^\u4E00-\u9FA5\uF900-\uFA2D-()+!@#$%^&*_={}[:;<>?,/"~.]{3,3}$`;
  // emergencyContactPattern: string = `[+0-9-()][^a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D!@#$%^&*_={}[:;<>?,/"~.]{6,24}$`;
  // userNamePattern: string = `[a-zA-Z0-9][^\u4E00-\u9FA5\uF900-\uFA2D!@#$%^&*()_+={}[:;<>?/"~]{0,21}$`;

  password_hasNumber() {
    const pattern = /\d/;
    return this.passwordPattern(pattern, { hasNumber: true });
  }
  password_hasCapitalCase() {
    const pattern = /[A-Z]/;
    return this.passwordPattern(pattern, { hasCapitalCase: true });
  }
  password_hasSmallCase() {
    const pattern = /[a-z]/;
    return this.passwordPattern(pattern, { hasSmallCase: true });
  }
  password_hasSpecialCharacters() {
    const pattern = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return this.passwordPattern(pattern, { hasSpecialCharacters: true });
  }

  passwordPattern(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  MatchValue(firstControlName: string, secondControlName: string) {
    return (formGroup: FormGroup) => {
      const firstControl = formGroup.controls[firstControlName];
      const secondControl = formGroup.controls[secondControlName];
      // return null if controls haven't initialised yet
      if (!firstControl || !secondControl || !firstControl.value || !secondControl.value) {
        return null;
      }
      if (secondControl.errors && !secondControl.errors.matchValueError) {
        return null;
      }
      if (firstControl.value !== secondControl.value) {
        secondControl.setErrors({ matchValueError: true });
      } else {
        secondControl.setErrors(null);
      }
    }
  }

  mustmorethan(type, firstControlName, secondControlName) {
    return (formGroup: FormGroup) => {
      const firstControl = formGroup.controls[firstControlName];
      const secondControl = formGroup.controls[secondControlName];
      // return null if controls haven't initialised yet
      if (!firstControl || !secondControl || !firstControl.value || !secondControl.value) {
        return null;
      }
      if (secondControl.errors && !secondControl.errors.mustMoreThanError) {
        return null;
      }
      if (firstControl.value < secondControl.value && type == "qty") {
        secondControl.setErrors({ mustMoreThanError: true });
      }
      else if (firstControl.value > secondControl.value && type == "time") {
        secondControl.setErrors({ mustMoreThanError: true });
      }
      else {
        secondControl.setErrors(null);
      }
    }
  }

  atLeastOneCheckboxCheckedValidator(minChecked, maxChecked): ValidatorFn {
    return function validate(formGroup: FormGroup) {
      let checked = 0;
      // let minChecked = 1;
      // let maxChecked = 3;

      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];

        if (control.value === true) {
          checked++;
        }
      });

      if (checked < minChecked) {
        return { minChecked };
      }
      else if (checked > maxChecked) {
        return { maxChecked };
      }
      return null;
    };
  }

}


