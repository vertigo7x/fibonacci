import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function sequenceIndexValidator(): ValidatorFn {

    const config = {
        errorBiggerThanOne: 'Please type a number bigger than 1.',
        errorLessThhanFiveDigits: 'Please type a number less than 5 digits.',
    }

    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value === null || value === undefined || value === '') {
            return null;
        }
        if (value <= 1) {
            return {
                sequenceIndex: {
                    valid: false,
                    message: config.errorBiggerThanOne
                }
            };
        } else if (value.toString().length > 5) {
            return {
                sequenceIndex: {
                    valid: false,
                    message: config.errorLessThhanFiveDigits
                }
            };
        } else {
            return null;
        }
    }
}