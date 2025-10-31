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

interface EstablishmentData {
  id_facility: string;
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
  termoPesquisado: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private establishmentService: EstablishmentService,
    private establishmentOnUsersService: EstablishmentUserService,
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
          const establishmentUser = await firstValueFrom(this.establishmentOnUsersService.getByUserId(this.user.id));
          this.establishmentUser = establishmentUser;
        }else{
          console.log('Usuário não encontrado');
        }
      } else {
        this.user = undefined as any;
      }
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
    } catch(error){
        console.log(error);
        this.establishmentList = [];
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

  pesquisaEstabelecimentos() {
    const termo = this.termoPesquisado.toLowerCase().trim();

    if(termo === '' ){
      this.pesquisaEstablishment = [...this.establishmentList];
      return;
    } 

    this.pesquisaEstablishment = this.establishmentList.filter((est) => 
      est.name.toLowerCase().includes(termo)
    );
  }

  async remove(establishmentId: string){
    const toast = await this.toastController.create({
      message: `Tem certeza que deseja apagar esse estabelecimento?`,
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          text: 'confirmar',
          handler: () => {
            this.establishmentService.remove(establishmentId).subscribe({
              next: () => {
                this.exibirToast('Estabelecimento excluído com sucesso!');
                this.router.navigate(['user/user-management']);
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

  async openModalUsers(establishmentId: string) {
    const modal = await this.modalController.create({
      component: UserAlertComponent,
      componentProps: {
        establishmentId: establishmentId
      },
    });
    await modal.present();
  }

  async openModal(establishmentId: string) {
    const modal = await this.modalController.create({
      component: alertFormComponent,
      componentProps: {
        alertData: this.alertData,
        establishmentId: establishmentId
      },
    });
    await modal.present();
  }

  ngOnInit() {}

}
