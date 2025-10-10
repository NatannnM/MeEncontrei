import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, maskitoElement } from 'src/app/core/constants/mask.constants';
import { Establishment } from '../../establishment/models/establishment.type';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { eventsService } from '../event-services/event.service';
import { EstablishmentService } from '../../establishment/establishment-services/establishment.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  standalone: false,
})
export class EventFormComponent implements OnInit {

  dateMask = dateMask;
  maskitoElement = maskitoElement;
  establishment: Establishment[] = [];

  eventsForm: FormGroup = new FormGroup ({
    owner: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]), 
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]), 
    address: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(255)]), 
    city: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]), 
    info: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(800)]), 
    begin_date: new FormControl('', [Validators.required]), 
    end_date: new FormControl('', [Validators.required]),
    id_facility: new FormControl('', [Validators.required])
  })

  constructor(
    private eventsService: eventsService,
    private establishmentService: EstablishmentService,
    private router: Router,
    private toastController: ToastController,
  ) { }

  ngOnInit() { 
    this.establishmentService.getList().subscribe({
      next: (data) => {
        this.establishment = data.facility;
      },
      error: (error) => {
        alert('Erro ao carregar os estabelecimentos.');
        console.error(error)
      },
    });
  }

  save(){
    
  }

  hasError(field: string, error: string) {
    const formControl = this.eventsForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

}