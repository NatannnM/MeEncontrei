import { Component } from "@angular/core";
import { User } from "../user/models/user.type";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "./alert-services/alert.service";
import { ModalController, ToastController } from "@ionic/angular";

@Component({
    selector: 'app-alert-form-event',
    template: `
        <ion-header>
          <ion-toolbar>
            <ion-title>Enviar Aviso</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="dismiss()">Fechar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <form [formGroup]="alertForm" (ngSubmit)="save()">
            <ion-item>
              <ion-label position="floating">Título</ion-label>
              <ion-input formControlName="title" required></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Descrição</ion-label>
              <ion-textarea formControlName="description" required></ion-textarea>
            </ion-item>

            <ion-item>
                <ion-input formControlName="begin_date" labelPlacement="floating" label="Data de início do alerta: "
                    type="date" />
            </ion-item>

            <ion-item>
              <ion-input formControlName="end_date" labelPlacement="floating" label="Data do fim do alerta: " type="date" />
            </ion-item>

            <ion-button expand="full" type="submit" [disabled]="alertForm.invalid">
              Enviar Alerta
            </ion-button>
          </form>
        </ion-content>
    `,
    styleUrls: ['./alert-form-event.component.scss'],
    standalone: false
})

export class AlertFormEventComponent{
    user: User | null = null;
    eventId!: '';

    alertForm: FormGroup = new FormGroup ({
        title: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]),
        description: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
        begin_date: new FormControl('', [Validators.required]),
        end_date: new FormControl('', [Validators.required]),
        id_user: new FormControl(''),
        id_event: new FormControl(''),
    })

    constructor(
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService,
        private toastController: ToastController,
        private modalController: ModalController
    ){
        this.eventId = this.activatedRoute.snapshot.params['id_event'];
        this.carregarUsuario();
    }

    dismiss(){
        this.modalController.dismiss();
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
        let { value } = this.alertForm;
        value.id_user = this.user?.id;
        value.id_event = this.eventId;
        this.alertService.save({
            ...value
        }).subscribe({
            next:() => {
              this.toastController.create({
                message: 'Alerta enviado com sucesso!',
                duration: 3000,
                position: 'bottom',
                cssClass: 'toast-design'
              }).then(toast => toast.present());
              this.dismiss();
            },
            error: (error) => {
              console.log(value);
              this.toastController.create({
                message: error.error.message,
                header: 'Erro ao enviar o alerta!',
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
}