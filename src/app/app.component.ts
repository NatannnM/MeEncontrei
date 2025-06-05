import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Página Inicial', url: '/folder/inbox', icon: 'home' },
    { title: 'Estabelecimentos', url: '/folder/outbox', icon: 'business' },
    { title: 'Eventos', url: '/folder/favorites', icon: 'calendar' },
    { title: 'Sair', url: '../login', icon: 'exit' }
  ];
  constructor() {}
}
