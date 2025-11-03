import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, formatDateMask, maskitoElement, parseDateMask } from 'src/app/core/constants/mask.constants';
import { Establishment } from '../../establishment/models/establishment.type';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { eventsService } from '../event-services/event.service';
import { EstablishmentService } from '../../establishment/establishment-services/establishment.service';
import { User } from '../../user/models/user.type';
import { AuthService } from 'src/app/services/auth.service';

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
    info: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(800)]), 
    begin_date: new FormControl('', [Validators.required]), 
    end_date: new FormControl('', [Validators.required]),
    id_facility: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    photo: new FormControl('', Validators.required),
  })
  user: User | null = null;
  eventId!: string;
  origin!: string;

  constructor(
    private eventsService: eventsService,
    private establishmentService: EstablishmentService,
    private router: Router,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { 
    this.origin = this.activatedRoute.snapshot.params['origin'];
    this.eventId = this.activatedRoute.snapshot.params['id_event'];
    if(this.eventId){
      this.eventsService.getById(this.eventId).subscribe({
        next: (response) => {
          if(response && response.event){
            /*if(response.event.begin_date instanceof Date && response.event.end_date instanceof Date){
              response.event.begin_date = formatDateMask(response.event.begin_date);
              response.event.end_date = formatDateMask(response.event.end_date);
            }
            if(typeof response.event.begin_date === 'string' && typeof response.event.end_date === 'string'){
              const parsedBegin = parseDateMask(response.event.begin_date, 'yyyy/mm/dd');
              const parsedEnd = parseDateMask(response.event.end_date, 'yyyy/mm/dd');
              if(parsedBegin && parsedEnd){
                response.event.begin_date = formatDateMask(parsedBegin);
                response.event.end_date = formatDateMask(parsedEnd);
              }
            }*/
            this.eventsForm.setValue({
              owner: response.event.owner, 
              name: response.event.name, 
              address: response.event.address,
              city: response.event.city,
              info: response.event.info, 
              begin_date: '',//response.event.begin_date,
              end_date: '',//response.event.end_date, 
              id_facility: response.event.id_facility,
              price: response.event.price,
              photo: ''
            });
          }
        },
        error: (error) => {
          this.toastController.create({
            message: error.error.message,
            header: 'Erro ao carregar evento!',
            color: 'danger',
            duration: 3000,
          }).then(toast => toast.present())
        }
      })
      this.carregarUsuario()
    }
  }

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

  async carregarUsuario(){
    try {
      const dadosUsuario = await this.authService.getUserData();
      this.user = dadosUsuario.user;
    } catch(err) {
      console.error('Erro ao carregar dados do usuário', err);
    }
  }

  save(){
    let { value } = this.eventsForm;
    if(this.user?.role != 'ADMIN'){
      value.public = 'PRIVATE';
    } else{
      value.public = 'PUBLIC';
    }
    this.eventsService.save({
      ...value,
      id: this.eventId
    }).subscribe({
      next:() => {
        this.toastController.create({
          message: 'Evento salvo com sucesso!',
          duration: 3000,
          position: 'bottom',
          cssClass: 'toast-design'
        }).then(toast => toast.present());
        if(this.eventId){
          if(this.origin === 'admin'){
            this.router.navigate(['admin']);
          }else{
            this.router.navigate(['user']);
          }
        }else{
          this.router.navigate(['/event']);
        }
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