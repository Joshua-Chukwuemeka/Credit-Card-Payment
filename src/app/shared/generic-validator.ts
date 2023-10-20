import { FormControl } from '@angular/forms';

export function validateAmountValue(
  control: FormControl
): { [key: string]: any } {
  return control.value > 0
    ? null
    : { invalidateAmount: 'Value must be greater than zero (0)' };
}

export function validateDateValue(
  control: FormControl
): { [key: string]: any } {
  const cardDateArray = control.value.split(' ');
  const cardDate = new Date(+`20${cardDateArray[2]}`, cardDateArray[0] - 1);
  return new Date() > cardDate
    ? { invalidDate: 'Card date must be greater than todays date' }
    : null;
}
