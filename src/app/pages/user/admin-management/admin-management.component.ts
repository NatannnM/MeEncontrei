import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController, ViewDidEnter } from '@ionic/angular';
import { EstablishmentService } from '../../establishment/establishment-services/establishment.service';
import { Establishment } from '../../establishment/models/establishment.type';
import { UserAlertComponent } from '../../alert/user-alert.component';
import { alertFormComponent } from '../../alert/alert-form.component';
import { eventsService } from '../../event/event-services/event.service';
import { Event } from '../../event/models/event.type';
import { UserAlertEventComponent } from '../../alert/user-alert-event.component';
import { AlertFormEventComponent } from '../../alert/alert-form-event.component';
import { User } from '../models/user.type';
import { userService } from '../user-services/user.service';


@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss'],
  standalone: false
})
export class AdminManagementComponent  implements OnInit, ViewDidEnter {

  alertData= {
    title: '',
    description: '',
    begin_date: '',
    end_data: ''
  }

  opcao: string = '';
  termoPesquisado: string = '';

  establishmentList: Establishment[] = [];
  pesquisaEstablishment: Establishment[] = [];
  establishment: Establishment = {} as Establishment;

  eventList: Event[] = [];
  pesquisaEvent: Event[] = [];
  event: Event = {} as Event;

  userList: User[] = [];
  pesquisaUser: User[] = [];
  user: User = {} as User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private establishmentService: EstablishmentService,
    private eventService: eventsService,
    private router: Router,
    private modalController: ModalController,
    private userService: userService
  ) { 
    this.opcao = this.activatedRoute.snapshot.params['opcao'];
  }

  ionViewDidEnter(): void {
    if(this.opcao === 'estabelecimento'){
      this.establishmentService.getList().subscribe({
        next: (response) => {
          this.establishmentList = response.facility;
          this.pesquisaEstablishment = [...this.establishmentList];
        },
        error: (error) => {
          this.toastController.create({
            message: error.error.message,
            header: 'Erro ao carregar lista de estabelecimentos',
            color: 'danger',
            position: 'top',
            duration: 3000
            }).then(toast => toast.present())
            console.error(error);
            console.error(error.error.details);
        }
      })
    } else if(this.opcao === 'evento'){
      this.eventService.getList().subscribe({
        next: (response) => {
          this.eventList = response.event;
          this.pesquisaEvent = [...this.eventList];
        },
        error: (error) => {
          this.toastController.create({
            message: error.error.message,
            header: 'Erro ao carregar lista de eventos',
            color: 'danger',
            position: 'top',
            duration: 3000
            }).then(toast => toast.present())
            console.error(error);
            console.error(error.error.details);
        }
      })
    } else {
      this.userService.getList().subscribe({
        next: (response) => {
          this.userList = response.user;
          this.pesquisaUser = [...this.userList];
        },
        error: (error) => {
          this.toastController.create({
            message: error.error.message,
            header: 'Erro ao carregar lista de usuários',
            color: 'danger',
            position: 'top',
            duration: 3000
          }).then(toast => toast.present())
          console.error(error);
          console.error(error.error.details);
        }
      })
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
    } else if(this.opcao === 'evento'){
      if(termo === '' ){
        this.pesquisaEvent = [...this.eventList];
        return;
      } 

      this.pesquisaEvent = this.eventList.filter((evt) => 
        evt.name.toLowerCase().includes(termo)
      );
    } else{
      if(termo === '' ){
        this.pesquisaUser = [...this.userList];
        return;
      } 

      this.pesquisaUser = this.userList.filter((user) => 
        user.username.toLowerCase().includes(termo)
      );
    }
  }

  async remove(id: string){
    if(this.opcao === 'estabelecimento'){
      const toast = await this.toastController.create({
        message: `Tem certeza que deseja apagar esse estabelecimento e todos os usuários e eventos vinculados a ele?`,
        position: 'bottom',
        buttons: [
          {
            side: 'end',
            text: 'confirmar',
            handler: () => {
              this.establishmentService.remove(id).subscribe({
                next: () => {
                  this.exibirToast('Estabelecimento excluído com sucesso!');
                  this.router.navigate(['admin']);
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
    } else if(this.opcao === 'evento'){
      const toast = await this.toastController.create({
      message: `Tem certeza que deseja apagar esse evento e todos os usuários vinculados a ele?`,
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          text: 'confirmar',
          handler: () => {
            this.eventService.remove(id).subscribe({
              next: () => {
                this.exibirToast('Evento excluído com sucesso!');
                this.router.navigate(['admin']);
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
    } else{
      const toast = await this.toastController.create({
      message: `Tem certeza que deseja apagar esse Usuário e todos os seus vínculos?`,
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          text: 'confirmar',
          handler: () => {
            this.userService.remove(id).subscribe({
              next: () => {
                this.exibirToast('Usuário excluído com sucesso!');
                this.router.navigate(['admin']);
              },
              error: (err) => {
                this.exibirToast('Ocorreu um erro ao remover o usuário.');
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
    } else if(this.opcao === 'evento'){
      const modal = await this.modalController.create({
        component: UserAlertEventComponent,
        componentProps: {
          eventId: id
        },
      });
      await modal.present();
    }
  }

  async aprovar(publics: string, id: string){
    if(this.opcao === 'estabelecimento'){
      this.establishment.id = id;
      if(publics === 'PRIVATE'){
        this.establishment.public = 'PUBLIC';

      } else{
        this.establishment.public = 'PRIVATE';
      }
      this.establishmentService.save({
        ...this.establishment
      }).subscribe({
        next:() => {
          if(this.establishment.public === 'PRIVATE'){
            this.toastController.create({
            message: 'Estabelecimento rejeitado com sucesso!',
            duration: 3000,
            position: 'bottom',
            cssClass: 'toast-design'
          }).then(toast => toast.present());
              this.router.navigate(['admin']);
          } else {
            this.toastController.create({
            message: 'Estabelecimento aprovado com sucesso!',
            duration: 3000,
            position: 'bottom',
            cssClass: 'toast-design'
          }).then(toast => toast.present());
              this.router.navigate(['admin']);
          }

        },
        error: (error) => {
          this.toastController.create({
            message: error.error.message,
            header: 'Erro ao aprovar o estabelecimento ' + this.establishment.name + '!',
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
    } else if(this.opcao === 'evento'){
      this.event.id = id;
      if(publics === 'PRIVATE'){
        this.event.public = 'PUBLIC';

      } else{
        this.event.public = 'PRIVATE';
      }
      this.eventService.save({
        ...this.event
      }).subscribe({
        next:() => {
          if(this.event.public === 'PRIVATE'){
            this.toastController.create({
            message: 'Evento rejeitado com sucesso!',
            duration: 3000,
            position: 'bottom',
            cssClass: 'toast-design'
          }).then(toast => toast.present());
              this.router.navigate(['admin']);
          } else {
            this.toastController.create({
            message: 'Evento aprovado com sucesso!',
            duration: 3000,
            position: 'bottom',
            cssClass: 'toast-design'
          }).then(toast => toast.present());
              this.router.navigate(['admin']);
          }

        },
        error: (error) => {
          this.toastController.create({
            message: error.error.message,
            header: 'Erro ao aprovar o evento ' + this.event.name + '!',
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
    } else if(this.opcao === 'evento'){
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
