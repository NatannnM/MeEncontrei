import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Event } from '../models/event.type';
import { eventsService } from '../event-services/event.service';
import { Alert } from '../../alert/models/alert.type';
import { AlertService } from '../../alert/alert-services/alert.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule, RouterModule]
})
export class EventDetailsComponent  implements OnInit {
  alerts: Alert[] = [];
  event!: Event;
  origin: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: eventsService,
    private toastController: ToastController,
    private router: Router,
    private alertService: AlertService
  ) { }

  abrir_mapa(){
    this.router.navigate(['../establishment-maps']);
  }

  ngOnInit() {
    const eventId = this.activatedRoute.snapshot.params['id'];
    this.origin = this.activatedRoute.snapshot.params['origin'];
    
    this.eventsService.getById(eventId).pipe(
      switchMap((response) => {
        this.event = response.event;
        return this.alertService.getByEventId(eventId);
      })
    ).subscribe({
      next: (data) => {
        this.alerts = data;

        const currentDate = new Date();

        this.alerts.forEach(alert => {
          const endDate = new Date(alert.end_date);
          
          if(endDate >= currentDate){
            this.toastController.create({
              message: `${alert.title} - ${alert.description}`,
              position: 'bottom',
              cssClass: 'toast-design',
              buttons: [
                { text: 'X', role: 'cancel' }
              ]
            }).then(toast => toast.present());
          }
        });
      },
      error: (err) => {
        console.log('Erro ao recuperar Alertas:', err);
      }
    });
  }

}
