import { AbstractControl } from '@angular/forms';

export class DateValidator {
  static cannotBePastDate(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00:00 to compare the dates only

    if (selectedDate < today) {
      return { pastDate: true };
    }

    return null;
  }
}
