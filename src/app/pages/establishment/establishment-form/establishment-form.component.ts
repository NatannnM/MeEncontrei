import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-establishment-form',
  templateUrl: './establishment-form.component.html',
  styleUrls: ['./establishment-form.component.scss'],
  standalone: false,
})
export class EstablishmentFormComponent implements OnInit {

  establishmentForm: FormGroup = new FormGroup ({
    location: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(255)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(800)]),
    owner: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]),
    photo_url: new FormControl('', Validators.required)
  })
  constructor() { }

  ngOnInit() { }

  save(){
    
  }

  hasError(field: string, error: string) {
    const formControl = this.establishmentForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

}