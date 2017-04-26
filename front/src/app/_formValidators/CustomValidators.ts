import { ValidatorFn, AbstractControl } from '@angular/forms'

export class CustomValidators {
  constructor() {
  }

  static maxValue(max:number):ValidatorFn {
    return (control:AbstractControl):{[key: string]: any} => {
      const value = control.value;
      let isValid = true;
      if (value !== null && value !== undefined && value !== '') {
        isValid = value <= max;
      }
      return isValid ? null : {'maxValue': {value}};
    };
  }

  static minValue(min:number):ValidatorFn {
    return (control:AbstractControl):{[key: string]: any} => {
      const value = control.value;
      let isValid = true;
      if (value !== null && value !== undefined && value !== '') {
        isValid = value >= min;
      }
      return isValid ? null : {'minValue': {value}};
    };
  }
}