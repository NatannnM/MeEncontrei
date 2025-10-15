import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Event } from './models/event.type';
import { eventsService } from './event-services/event.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: false
})
export class EventPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave {
  eventList: Event[] = [];
  pesquisaEvent: Event[] = [];
  termoPesquisado: string = '';
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private eventService: eventsService
  ) { }


  ionViewDidLeave(): void {
  }
  ionViewWillLeave(): void {
  }
  ionViewDidEnter(): void {
    this.eventService.getList().subscribe({
      next: (response) => {
        this.eventList = response.event;
        this.pesquisaEvent = [...this.eventList];
      },
      error: (error) => {
        alert('Erro ao carregar lista de estabelecimentos');
        console.error(error);
      }  
    });
  }
  ionViewWillEnter(): void {
  }

  pesquisaEventos() {
    const termo = this.termoPesquisado.toLowerCase().trim();

    if(termo === '' ){
      this.pesquisaEvent = [...this.eventList];
      return;
    } 

    this.pesquisaEvent = this.eventList.filter((evt) => 
      evt.name.toLowerCase().includes(termo)
    );
  }

  ngOnInit() { }



}
