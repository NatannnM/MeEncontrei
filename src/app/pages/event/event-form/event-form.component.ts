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
    id_facility: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    photo: new FormControl('', Validators.required),
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

  arquivoSelecionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;

        this.eventsForm.get('photo')?.setValue(base64String);
      };

      reader.readAsDataURL(file);
    }
  }

  save(){
    let { value } = this.eventsForm;
    this.eventsService.save({
      ...value,
    }).subscribe({
      next:() => {
        this.toastController.create({
          message: 'Evento salvo com sucesso!',
          duration: 3000,
          position: 'bottom',
          cssClass: 'toast-design'
        }).then(toast => toast.present());
        this.router.navigate(['/event']);
      },
      error: (error) => {
        this.toastController.create({
          message: error.error.message,
          header: 'Erro ao salvar o evento' + value.nome + '!',
          color: 'danger',
          position: 'top',
          buttons: [
            { text: 'X', role: 'cancel'}
          ]
        }).then(toast => toast.present())
          console.error(error);
          console.error(error.error.details);
      }
    })
  }

  hasError(field: string, error: string) {
    const formControl = this.eventsForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

}