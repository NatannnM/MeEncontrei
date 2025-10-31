import { Component } from '@angular/core';
import { User } from './pages/user/models/user.type';
import { AuthService } from './services/auth.service';
import { MenuController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  user: User | null = null;
  menuVisivel = true;

  public appPages = [
    { title: 'Página Inicial', url: '/home', icon: 'home' },
    { title: 'Estabelecimentos', url: '/establishment', icon: 'business' },
    { title: 'Eventos', url: '/event', icon: 'calendar' },
  ];
  public actionPages = [
    { title: 'Administrador', url: '/admin', icon: 'shield-checkmark' },
    { title: 'Sair', url: 'auth/login', icon: 'exit' }
  ];

  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController,
    private router: Router
  ) {
    this.authService.isAuthenticated().subscribe(async isLoggedIn => {
      this.menuCtrl.enable(isLoggedIn);
      this.menuVisivel = isLoggedIn;
      if(isLoggedIn){
        await this.carregarUsuario();
      }else{
        this.user = undefined as any;
      }
    })

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.url;
      this.menuVisivel = !url.includes('/auth');
    });
  }

  async carregarUsuario(){
    try {
      const dadosUsuario = await this.authService.getUserData();
      this.user = dadosUsuario.user;
    } catch(err) {
      console.error('Erro ao carregar dados do usuário', err);
    }
  }

  async deslogar() {
    await this.authService.logout();
    this.router.navigate(['auth/login']);
  }

  goToUser(url: string){
    this.router.navigate([url]);
    this.menuCtrl.close();
  }
}
