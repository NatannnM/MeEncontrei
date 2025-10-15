import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Establishment } from '../establishment/models/establishment.type';
import { EstablishmentService } from '../establishment/establishment-services/establishment.service';
import { ViewDidEnter } from '@ionic/angular';
import { Event } from '../event/models/event.type';
import { eventsService } from '../event/event-services/event.service';

interface CardItem {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements ViewDidEnter {

  establishmentList: Establishment[] = [];
  eventList: Event[] = []

  constructor(
    private router: Router,
    private establishmentService: EstablishmentService,
    private eventService: eventsService
  ) { }

  ionViewDidEnter(): void {
    this.establishmentService.getList().subscribe({
      next: (response) => {
        this.establishmentList = response.facility;
      },
      error: (error) => {
        alert('Erro ao carregar lista de estabelecimentos');
        console.error(error);
      }  
    });
    this.eventService.getList().subscribe({
      next: (response) => {
        this.eventList = response.event;
      },
      error: (error) => {
        alert('Erro ao carregar lista de eventos');
        console.error(error);
      }  
    });
  }

  goToEstablishments() {
    this.router.navigateByUrl('/establishment');
  }

  goToEvents() {
    this.router.navigateByUrl('/event');
  }
}