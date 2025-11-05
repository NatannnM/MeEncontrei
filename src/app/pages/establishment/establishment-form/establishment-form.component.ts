import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstablishmentService } from '../establishment-services/establishment.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../user/models/user.type';

@Component({
  selector: 'app-establishment-form',
  templateUrl: './establishment-form.component.html',
  styleUrls: ['./establishment-form.component.scss'],
  standalone: false,
})
export class EstablishmentFormComponent implements OnInit {

  establishmentForm: FormGroup = new FormGroup({
    location: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(255)]),
    city: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(800)]),
    owner: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]),
    photo: new FormControl('', Validators.required),
    public: new FormControl(''),
  });

  user: User | null = null;
  establishmentId!: string;
  origin!: string;

  constructor(
    private establishmentService: EstablishmentService,
    private router: Router,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    const origin = this.activatedRoute.snapshot.params['origin'];
    this.origin = origin;

    const establishmentId = this.activatedRoute.snapshot.params['id_facility'];

    if (establishmentId) {
      this.establishmentService.getById(establishmentId).subscribe({
        next: (response) => {
          if (response && response.facility) {
            this.establishmentId = establishmentId;
            this.establishmentForm.setValue({
              location: response.facility.location,
              city: response.facility.city,
              name: response.facility.name,
              description: response.facility.description,
              owner: response.facility.owner,
              photo: '',
              public: ''
            });
          }
        },
        error: (error) => {
          this.toastController.create({
            message: error.error.message,
            header: 'Erro ao carregar estabelecimento!',
            color: 'danger',
            duration: 3000,
          }).then(toast => toast.present())
        }
      })

      this.carregarUsuario();

    }
  }

  ngOnInit() { }

  arquivoSelecionado(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;

        this.establishmentForm.get('photo')?.setValue(base64String);
      };

      reader.readAsDataURL(file);
    }
  }

  async carregarUsuario() {
    try {
      const dadosUsuario = await this.authService.getUserData();
      this.user = dadosUsuario.user;
    } catch (err) {
      console.error('Erro ao carregar dados do usuário', err);
    }
  }

  save() {
    let { value } = this.establishmentForm;

    if (this.user?.role != 'ADMIN') {
      value.public = 'PRIVATE';
    } else {
      value.public = 'PUBLIC';
    }

    this.establishmentService.save({
      ...value,
      id: this.establishmentId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Estabelecimento salvo com sucesso!',
          duration: 3000,
          position: 'bottom',
          cssClass: 'toast-design'
        }).then(toast => toast.present());

        if (this.establishmentId) {
          if (this.origin === 'admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user']);
          }
        } else {
          this.router.navigate(['/establishment']);
        }
      },
      error: (error) => {
        console.log(value);
        this.toastController.create({
          message: error.error.message,
          header: 'Erro ao salvar o estabelecimento ' + value.name + '!',
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