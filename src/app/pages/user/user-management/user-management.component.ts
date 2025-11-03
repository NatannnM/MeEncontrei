import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Establishment } from '../../establishment/models/establishment.type';
import { EstablishmentService } from '../../establishment/establishment-services/establishment.service';
import { ModalController, ToastController, ViewDidEnter } from '@ionic/angular';
import { EstablishmentUserService } from '../../establishment/establishment-services/establishmentUser.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user.type';
import { EstablishmentUser } from '../../establishment/models/establishmentUser.type';
import { firstValueFrom } from 'rxjs';
import { alertFormComponent } from '../../alert/alert-form.component';
import { UserAlertComponent } from '../../alert/user-alert.component';
import { EventUser } from '../../event/models/eventUser.type';
import { eventsService } from '../../event/event-services/event.service';
import { EventUserService } from '../../event/event-services/eventUser.service';
import { UserAlertEventComponent } from '../../alert/user-alert-event.component';
import { AlertFormEventComponent } from '../../alert/alert-form-event.component';

interface EstablishmentData {
  id_facility: string;
  id_user: string;
  name: string;
  image: string;
  creator: boolean;
}

interface EventData{
  id_event: string;
  id_user: string;
  name: string;
  image: string;
  creator: boolean;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  standalone: false
})

export class UserManagementComponent  implements OnInit, ViewDidEnter {

  alertData= {
    title: '',
    description: '',
    begin_date: '',
    end_data: ''
  }
  
  user!: User;
  opcao: string = '';

  establishmentList: EstablishmentData[] = [];
  pesquisaEstablishment: EstablishmentData[] = [];
  establishmentUser: EstablishmentUser[] | undefined = [];

  eventList: EventData[] = [];
  pesquisaEvent: EventData[] = [];
  eventUser: EventUser[] | undefined = []

  termoPesquisado: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private establishmentService: EstablishmentService,
    private establishmentOnUsersService: EstablishmentUserService,
    private eventService: eventsService,
    private EventOnUsersService: EventUserService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private modalController: ModalController
  ) {
    this.opcao = this.activatedRoute.snapshot.params['opcao'];
   }

  async ionViewDidEnter(): Promise<void> {
    try{
      const isLoggedIn = await firstValueFrom(this.authService.isAuthenticated());
      
      if(isLoggedIn){
        await this.carregarUsuario();
        if(this.user){
          if(this.opcao === 'estabelecimento'){
            const establishmentUser = await firstValueFrom(this.establishmentOnUsersService.getByUserId(this.user.id));
            this.establishmentUser = establishmentUser;
          } else {
            const eventUser = await firstValueFrom(this.EventOnUsersService.getByUserId(this.user.id));
            this.eventUser = eventUser;
          }
        }else{
          console.log('Usuário não encontrado');
        }
      } else {
        this.user = undefined as any;
      }
      if(this.opcao === 'estabelecimento'){
        if(this.establishmentUser){
          this.establishmentList = this.establishmentUser.map(establishment => ({
            id_facility: establishment.id_facility,
            id_user: establishment.id_user,
            name: establishment.facility.name,
            image: establishment.facility.photo,
            creator: establishment.creator
          }));
          if(this.establishmentList){
            this.pesquisaEstablishment = [...this.establishmentList];
          } else{
            console.log('Lista vazia');
          }
        }
      } else {
        if(this.eventUser){
          this.eventList = this.eventUser.map(event => ({
            id_event: event.id_event,
            id_user: event.id_user,
            name: event.event.name,
            image: event.event.photo,
            creator: event.creator
          }));
          if(this.eventList){
            this.pesquisaEvent = [...this.eventList];
          } else {
            console.log('Lista Vazia');
          }
        }
      }
    } catch(error){
        console.log(error);
        this.establishmentList = [];
        this.eventList = [];
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

  pesquisa() {
    const termo = this.termoPesquisado.toLowerCase().trim();
    if(this.opcao === 'estabelecimento'){
      if(termo === '' ){
        this.pesquisaEstablishment = [...this.establishmentList];
        return;
      } 

      this.pesquisaEstablishment = this.establishmentList.filter((est) => 
        est.name.toLowerCase().includes(termo)
      );
    } else{
      if(termo === '' ){
        this.pesquisaEvent = [...this.eventList];
        return;
      } 

      this.pesquisaEvent = this.eventList.filter((evt) => 
        evt.name.toLowerCase().includes(termo)
      );
    }
    
  }

  async remove(establishmentId: string){
    if(this.opcao === 'estabelecimento'){
      const toast = await this.toastController.create({
        message: `Tem certeza que deseja apagar esse estabelecimento e todos os usuários e eventos vinculados a ele?`,
        position: 'bottom',
        buttons: [
          {
            side: 'end',
            text: 'confirmar',
            handler: () => {
              this.establishmentService.remove(establishmentId).subscribe({
                next: () => {
                  this.exibirToast('Estabelecimento excluído com sucesso!');
                  this.router.navigate(['user']);
                },
                error: (err) => {
                  this.exibirToast('Ocorreu um erro ao remover o estabelecimento.');
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
    } else {
      const toast = await this.toastController.create({
        message: `Tem certeza que deseja apagar esse evento e todos os usuários vinculados a ele?`,
        position: 'bottom',
        buttons: [
          {
            side: 'end',
            text: 'confirmar',
            handler: () => {
              this.eventService.remove(establishmentId).subscribe({
                next: () => {
                  this.exibirToast('Evento excluído com sucesso!');
                  this.router.navigate(['user']);
                },
                error: (err) => {
                  this.exibirToast('Ocorreu um erro ao remover o evento.');
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

  async openModalUsers(id: string) {
    if(this.opcao === 'estabelecimento'){
      const modal = await this.modalController.create({
        component: UserAlertComponent,
        componentProps: {
          establishmentId: id
        },
      });
      await modal.present();
    } else {
      const modal = await this.modalController.create({
        component: UserAlertEventComponent,
        componentProps: {
          eventId: id
        },
      });
      await modal.present();
    }
  }

  async openModal(id: string) {
    if(this.opcao === 'estabelecimento'){
    const modal = await this.modalController.create({
      component: alertFormComponent,
      componentProps: {
        alertData: this.alertData,
        establishmentId: id
      },
    });
    await modal.present();
    } else {
      const modal = await this.modalController.create({
        component: AlertFormEventComponent,
        componentProps: {
          alertData: this.alertData,
          eventId: id
        },
      });
      await modal.present();
    }
  }

  ngOnInit() {}

}
