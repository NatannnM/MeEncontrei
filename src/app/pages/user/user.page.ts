import { Component, OnInit } from '@angular/core';
import { User } from './models/user.type';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { userService } from './user-services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: false
})
export class UserPage implements OnInit, ViewWillEnter {
  currentUser: User | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: userService,
    private toastController: ToastController
  ) { }

  async ionViewWillEnter(): Promise<void> {
    this.carregarUsuario();
  }

  async carregarUsuario(){
     try {
      const dadosUsuario = await this.authService.getUserData();
      this.currentUser = dadosUsuario.user;
      if (!this.currentUser) {
        console.log('Usuário não está logado.');
        this.router.navigate(['/login']);
        return;
      }
    } catch (err) {
      console.error('Erro ao carregar usuário:', err);
    }
  }

  async remove(user: User){
    const toast = await this.toastController.create({
      message: `${user.username}, tem certeza que deseja apagar sua conta?`,
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          text: 'confirmar',
          handler: () => {
            this.userService.remove(user.id).subscribe({
              next: () => {
                this.exibirToast('Conta excluída com sucesso!');
                this.router.navigate(['../auth']);
              },
              error: (err) => {
                this.exibirToast('Ocorreu um erro ao remover usuário.');
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

  ngOnInit() {
  }

}
