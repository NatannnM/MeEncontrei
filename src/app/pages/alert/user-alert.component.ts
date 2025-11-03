import { Component } from "@angular/core";
import { EstablishmentUserService } from "../establishment/establishment-services/establishmentUser.service";
import { User } from "../user/models/user.type";
import { ModalController, ToastController, ViewWillEnter } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { firstValueFrom } from "rxjs";
import { EstablishmentUser } from "../establishment/models/establishmentUser.type";
import { ActivatedRoute } from "@angular/router";
import { userService } from "../user/user-services/user.service";
import { FormControl, FormGroup } from "@angular/forms";

interface EstablishmentData {
    id_facility: string;
    id_user: string;
    username: string;
    profile_pic: string;
    creator: boolean;
}

@Component({
    selector: 'app-user-alert',
    template: `
                  
            <ion-header>
                <ion-toolbar>
                    <ion-title>Usuários vinculados</ion-title>
                    <ion-buttons slot="end">
                        <ion-button (click)="dismiss()">Fechar</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content [fullscreen]="true" class="ion-padding">
                <ion-list *ngFor="let user of userList">
                    <ion-item>
                        <ion-avatar slot="start">
                            <ion-img [alt]="user.username" [src]="user.profile_pic"></ion-img>
                        </ion-avatar>
                        <ion-label>
                            <h2>{{ user.username }}</h2>   
                        </ion-label>
                        <ion-button *ngIf="user.creator !== true" size="small" (click)="remove(user.id_user, user.id_facility)" >
                            <ion-icon name="trash" slot="start" ></ion-icon>
                        </ion-button>
                    </ion-item>
                </ion-list>
                <form [formGroup]="userForm" (ngSubmit)="save()">
                    <ion-list>
                        <ion-item>
                            <ion-label slot="start">Add outros Usuários</ion-label>
                            <ion-select formControlName="id_user" interface="popover">
                                <ion-select-option *ngFor="let userSelect of userSelectListFilter" [value]="userSelect.id_user">{{ userSelect.username }}</ion-select-option>                                    
                            </ion-select>
                        </ion-item>
                        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                            <ion-fab-button [disabled]="userForm.invalid" (click)="save()">
                                <ion-icon name="checkmark"></ion-icon>
                            </ion-fab-button>
                        </ion-fab>
                    </ion-list>
                </form>
            </ion-content>
        
    `,
    styleUrls: ['./user-alert.component.scss'],
    standalone: false
})

export class UserAlertComponent implements ViewWillEnter {
    currentUser: User | undefined;
    establishmentId!: '';
    userList: EstablishmentData[] = [];
    userEstablishment: EstablishmentUser[] | undefined = [];
    userSelectList: EstablishmentData[] = [];
    userSelectListFilter: EstablishmentData[] = [];

    userForm: FormGroup = new FormGroup({
        id_user: new FormControl(''),
    })

    constructor(
        private establishmentOnUsersService: EstablishmentUserService,
        private authService: AuthService,
        private toastController: ToastController,
        private modalController: ModalController,
        private activatedRoute: ActivatedRoute,
        private userService: userService
    ) {
        this.establishmentId = this.activatedRoute.snapshot.params['establishmentId'];
    }

    async ionViewWillEnter(): Promise<void> {
        try{
            if(this.establishmentId){
                const userEstablishment = await firstValueFrom(this.establishmentOnUsersService.getByFacilityId(this.establishmentId));
                this.userEstablishment = userEstablishment;
            }else{
                console.log('Estabelecimento não encontrado');
            }

            if(this.userEstablishment){
                this.userList = this.userEstablishment.map(user => ({
                    id_facility: user.id_facility,
                    id_user: user.id_user,
                    username: user.user.username,
                    profile_pic: user.user.profile_pic,
                    creator: user.creator
                }));
            }
            await this.carregarUsuario();
            await this.carregarUserSelectList();
            await this.filtrarUsuarios();    
        } catch(error){
            console.log(error);
            this.userList = [];
        }
    }

    async carregarUsuario() {
        try {
            const dadosUsuario = await this.authService.getUserData();
            this.currentUser = dadosUsuario.user;
            if (!this.currentUser) {
                return;
            }
        } catch (err) {
            console.error('Erro ao carregar usuário:', err);
        }
    }

    async carregarUserSelectList() {
        return new Promise<void>((resolve, reject) => {
            this.userService.getList().subscribe({
                next: (data) => {
                    this.userSelectList = data.user.map(user => ({
                        id_facility: '',
                        id_user: user.id,
                        username: user.username,
                        profile_pic: user.profile_pic,
                        creator: false,
                    }));
                    console.log('UserSelectList: '+this.userSelectList);
                    resolve();
                },
                error: (error) => {
                    alert('Erro ao carregar os usuários.');
                    console.error(error);
                    reject(error);
                },
            }); 
        });
    }

    filtrarUsuarios(){
        this.userSelectListFilter = this.userSelectList.filter(user => {
                return this.currentUser && !this.userList.some(vinculo => vinculo.id_user === user.id_user);
            }
        )
        console.log("Lista filtrada: "+ this.userSelectListFilter);
    }

    async remove(userId: string, establishmentId: string){
        const toast = await this.toastController.create({
            message: `Tem certeza que deseja desvincular esse usuário?`,
            position: 'bottom',
            buttons: [
                {
                    side: 'end',
                    text: 'confirmar',
                    handler: () => {
                        this.establishmentOnUsersService.delete(userId, establishmentId).subscribe({
                            next: () => {
                                this.exibirToast('Usuário desvinculado com sucesso!');
                                this.dismiss();
                            },
                            error: (err) => {
                                this.exibirToast('Ocorreu um erro ao desvincular o usuário.');
                            }
                        });
                    }
                },
                {
                    side: 'end',
                    text: 'cancelar',
                    role: 'cancel'
                }
            ]
        });

        await toast.present();
    }

    dismiss() {
        this.modalController.dismiss();
    }

    async exibirToast(message: string){
        const toast = await this.toastController.create({
            message,
            duration: 3000,
            position: 'bottom',
            cssClass: 'toast-design'
        });
        toast.present();
    }

    save(){
        let { value } = this.userForm;
        value.id_facility = this.establishmentId;
        value.creator = false;
        this.establishmentOnUsersService.save({
            ...value
        }).subscribe({
            next:() => {
                this.toastController.create({
                    message: 'Usuário vinculado com sucesso!',
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
                header: 'Erro ao vincular o usuário!',
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