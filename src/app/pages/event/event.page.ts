import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Event } from './models/event.type';
import { eventsService } from './event-services/event.service';
import { LocationService } from 'src/app/services/location.service';
import { Storage } from '@ionic/storage-angular';
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
  city: string | null = null;
  loading = false;
  error: string | null = null;


  constructor(
    private authService: AuthService,
    private router: Router,
    private eventService: eventsService,
    private storage: Storage
  ) { }


  ionViewDidLeave(): void {
  }
  ionViewWillLeave(): void {
  }
  async ionViewDidEnter(): Promise<void> {
    this.city = await this.detectCity();
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

    if (termo === '') {
      this.pesquisaEvent = [...this.eventList];
      return;
    }

    this.pesquisaEvent = this.eventList.filter((evt) =>
      evt.name.toLowerCase().includes(termo)
    );
  }

  ngOnInit() { }

  async detectCity() {
    const city = await this.storage.get('city');
    if (city) {
      console.log('Cidade recuperada do storage:', city);
      return city;
    } else {
      console.log('Cidade não encontrada no storage.');
      return null;
    }
  }

}
