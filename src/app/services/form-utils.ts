import {AbstractControl} from "@angular/forms";
import {of} from "rxjs";

export function israeliIdValidator(control: AbstractControl) {
  const idRegex = /^[0-9]{9}$/;
  const isValidLength = idRegex.test(control.value)
  if (!isValidLength) return of({"invalidIsraeliId": true})

  const idDigits = String(control.value).split('').map(Number);

  // Calculate the checksum
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    let digit = idDigits[i] * ((i % 2) + 1);
    sum += digit > 9 ? digit - 9 : digit;
  }
  const checksum = (10 - (sum % 10)) % 10;

  // Compare the calculated checksum with the last digit of the ID
  return of(checksum === idDigits[8] ? null : {"invalidIsraeliId": true})
}

export function phoneNumberValidator(control: AbstractControl) {
  const phoneRegex = /^05\d{8}$/
  const isValid = phoneRegex.test(control.value)
  return of(isValid ? null : {"invalidIsraeliPhone": true})
}

export function minDateValidator(control: AbstractControl) {
  if (!control.value) return null
  const inputDate = new Date(control.value)
  return inputDate < new Date(Date.now() - 24 * 60 * 60 * 1000) ? null : {"minDate": true}
}

export function maxDateValidator(control: AbstractControl) {
  if (!control.value) return null
  const inputDate = new Date(control.value)
  return inputDate > new Date(Date.now() - 24 * 60 * 60 * 1000) ? null : {"maxDate": true}
}
