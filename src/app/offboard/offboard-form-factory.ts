import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface OffboardFormGroup {
  email: FormControl<string>;
  phone: FormControl<string>;
  notes: FormControl<string>;
  address: FormGroup<AddressFormGroup>;
}

interface AddressFormGroup {
  receiver: FormControl<string>;
  streetLine1: FormControl<string>;
  city: FormControl<string>;
  postalCode: FormControl<string>;
  country: FormControl<string>;
}

export class OffboardFormFactory {
  static create(): FormGroup {
    const form = new FormGroup({
      email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
      phone: new FormControl('', {nonNullable: true, validators: Validators.required}),
      notes: new FormControl('', {nonNullable: true, validators: Validators.required}),
      address: new FormGroup({
        receiver: new FormControl('', {nonNullable: true, validators: Validators.required}),
        streetLine1: new FormControl('', {nonNullable: true, validators: Validators.required}),
        postalCode: new FormControl('', {nonNullable: true, validators: Validators.required}),
        country: new FormControl('', {nonNullable: true, validators: Validators.required}),
        city: new FormControl('', {nonNullable: true, validators: Validators.required}),
      })
    })

    // // TODO: Debug purposes - remove later
    // form.setValue({
    //   "address": {
    //     "streetLine1": "Kocmyrzowska 1",
    //     "country": "Poland",
    //     "postalCode": "13-231",
    //     "receiver": "Stefan Batory",
    //     "city": "Poznań"
    //   },
    //   "notes": "some text",
    //   "phone": "+48123123123",
    //   "email": "someemail@gmail.com"
    // })

    return form;
  }
}
