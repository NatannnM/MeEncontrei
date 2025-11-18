import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Establishment } from '../establishment/models/establishment.type';
import { EstablishmentService } from '../establishment/establishment-services/establishment.service';
import { ViewDidEnter } from '@ionic/angular';
import { Event } from '../event/models/event.type';
import { eventsService } from '../event/event-services/event.service';
import { LocationService } from 'src/app/services/location.service';
import { Storage } from '@ionic/storage-angular';

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
  city: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private establishmentService: EstablishmentService,
    private eventService: eventsService,
    private locSv: LocationService,
    private storage: Storage
  ) {
  
   }

  async ionViewDidEnter(): Promise<void> {
    this.city = await this.storage.get('city');
    if(!this.city){
      await this.detectCity();
    } else {
      console.log('Cidade recuperada do storage:', this.city);
    }
    
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

  async detectCity() {
    this.loading = true;
    this.error = null;
    try {
      const city = await this.locSv.getCityFromBrowser(12000); // Pega a cidade
      this.city = city;
      console.log('CIDADE RECUPERADA:'+this.city);
      if (!this.city) {
        this.error = 'Não foi possível identificar a cidade a partir das coordenadas.';
      }else{
        await this.storage.set('city', this.city);
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