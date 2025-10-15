import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Event } from '../models/event.type';
import { eventsService } from '../event-services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule, RouterModule]
})
export class EventDetailsComponent  implements OnInit {
  
  event!: Event;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: eventsService,
    private toastController: ToastController,
    private router: Router
  ) { }

  abrir_mapa(){
    this.router.navigate(['../establishment-maps']);
  }

  ngOnInit() {
    const eventId = this.activatedRoute.snapshot.params['id'];
    this.eventsService.getById(eventId).subscribe({
      next: (response) => {
        this.event = response.event;
      },
      error: (error) => {
        this.toastController.create({
          message: error.error.message,
          header: 'Erro ao carregar o evento!',
          color: 'danger',
          position: 'top',
          duration: 3000,
          }).then(toast => toast.present())
          console.error(error);
          console.error(error.error.details);
      }
    })
  }

}
