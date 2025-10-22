import { Component, OnInit } from '@angular/core';
import { User } from './models/user.type';
import { AuthService } from 'src/app/services/auth.service';
import { ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router: Router
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

  ngOnInit() {
  }

}
