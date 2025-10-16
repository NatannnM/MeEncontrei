import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {


  public appPages = [
    { title: 'Página Inicial', url: '/home', icon: 'home' },
    { title: 'Estabelecimentos', url: '/establishment', icon: 'business' },
    { title: 'Eventos', url: '/event', icon: 'calendar' },
  ];
  public actionPages = [
    { title: 'Administrador', url: '/admin', icon: 'shield-checkmark' },
    { title: 'Configurações', url: '/settings', icon: 'settings' },
    { title: 'Sair', url: 'auth/login', icon: 'exit' }
  ];

  public userProfile = {
    name: 'joaozinho silva',
    role: ' Administrador'
  };
  constructor() { }
}
