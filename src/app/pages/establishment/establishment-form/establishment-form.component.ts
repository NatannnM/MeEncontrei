import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstablishmentService } from '../establishment-services/establishment.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-establishment-form',
  templateUrl: './establishment-form.component.html',
  styleUrls: ['./establishment-form.component.scss'],
  standalone: false,
})
export class EstablishmentFormComponent implements OnInit {

  establishmentForm: FormGroup = new FormGroup ({
    location: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(255)]),
    city: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(800)]),
    owner: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]),
    photo: new FormControl('', Validators.required),
    map: new FormControl('', Validators.required)
  })

  constructor(
    private establishmentService: EstablishmentService,
    private router: Router,
    private toastController: ToastController,

  ) { }

  ngOnInit() { }

  arquivoSelecionado(event: Event, controlName: 'photo' | 'map'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;

        this.establishmentForm.get(controlName)?.setValue(base64String);
      };

      reader.readAsDataURL(file);
    }
  }

  save(){
    let { value } = this.establishmentForm;
    this.establishmentService.save({
      ...value,
    }).subscribe({
      next:() => {
        this.toastController.create({
          message: 'Estabelecimento salvo com sucesso!',
          duration: 3000,
          position: 'bottom',
          cssClass: 'toast-design'
        }).then(toast => toast.present());
        this.router.navigate(['/establishment']);
      },
      error: (error) => {
        console.log(value);
        this.toastController.create({
          message: error.error.message,
          header: 'Erro ao salvar o estabelecimento ' + value.nome + '!',
          color: 'danger',
          position: 'top',
          buttons: [
            { text: 'X', role: 'cancel' }
          ]
          }).then(toast => toast.present())
          console.error(error);
          console.error(error.error.details);
      }
    });
  }

  hasError(field: string, error: string) {
    const formControl = this.establishmentForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

}