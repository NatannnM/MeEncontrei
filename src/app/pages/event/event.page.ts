import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Event } from './models/event.type';
import { eventsService } from './event-services/event.service';
import { LocationService } from 'src/app/services/location.service';
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
    private locSv: LocationService
  ) { }


  ionViewDidLeave(): void {
  }
  ionViewWillLeave(): void {
  }
  async ionViewDidEnter(): Promise<void> {
    await this.detectCity();
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
    this.loading = true;
    this.error = null;
    try {
      const city = await this.locSv.getCityFromBrowser(12000); // Pega a cidade
      this.city = city;
      console.log('CIDADE RECUPERADA:' + this.city);
      if (!this.city) {
        this.error = 'Não foi possível identificar a cidade a partir das coordenadas.';
      }
    } catch (err: any) {
      console.error(err);
      if (err?.code === 1) this.error = 'Permissão negada para acessar localização.';
      else if (err?.code === 3) this.error = 'Tempo de obtenção esgotado (timeout).';
      else this.error = err?.message ?? 'Erro ao obter localização.';
    } finally {
      this.loading = false;
    }
  }

}
