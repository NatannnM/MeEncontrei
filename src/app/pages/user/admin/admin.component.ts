import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.type';
import { AuthService } from 'src/app/services/auth.service';
import { ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { userService } from '../user-services/user.service';
import { Establishment } from '../../establishment/models/establishment.type';
import { EstablishmentService } from '../../establishment/establishment-services/establishment.service';
import { eventsService } from '../../event/event-services/event.service';
import { Event } from '../../event/models/event.type';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: false,
})
export class AdminComponent  implements OnInit, ViewWillEnter {
  currentUser: User | undefined;
  listUser: User[] = [];
  listEstablishment: Establishment[] = [];
  listEvent: Event[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: userService,
    private establishmentService: EstablishmentService,
    private eventService: eventsService
  ) { }

  async ionViewWillEnter(): Promise<void> {
    await this.carregarUsuario();
    if(!this.currentUser){
      console.log("Administrador não está logado");
      this.router.navigate(['/login']);
      return;
    }

    this.carregarUsuarios();

    this.establishmentService.getList().subscribe({
      next: (response) => {
        this.listEstablishment = response.facility;
      },
      error: (error) => {
        alert('Erro ao carregar lista de estabelecimentos');
        console.error(error);
      }  
    });
    this.eventService.getList().subscribe({
      next: (response) => {
        this.listEvent = response.event;
      },
      error: (error) => {
        alert('Erro ao carregar lista de eventos');
        console.error(error);
      }  
    });
  }

  async carregarUsuario(){
     try {
      const dadosUsuario = await this.authService.getUserData();
      this.currentUser = dadosUsuario.user;
      if (!this.currentUser) {
        console.log('Administrador não está logado.');
        this.router.navigate(['/login']);
        return;
      }
    } catch (err) {
      console.error('Erro ao carregar administrador:', err);
    }
  }
  
  async carregarUsuarios(){
    this.userService.getList().subscribe({
      next: (response) => {
        this.listUser = response;
      },
      error: (error) => {
        alert('Erro ao carregar lista de Usuários');
        console.error(error);
      }  
    });
  }

  ngOnInit() {}

}
