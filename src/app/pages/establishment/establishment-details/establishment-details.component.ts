import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, ViewDidEnter } from '@ionic/angular';
import { Establishment } from '../models/establishment.type';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EstablishmentService } from '../establishment-services/establishment.service';
import { AlertService } from '../../alert/alert-services/alert.service';
import { Alert } from '../../alert/models/alert.type';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-establishment-details',
  templateUrl: './establishment-details.component.html',
  styleUrls: ['./establishment-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class EstablishmentDetailsComponent  implements OnInit, ViewDidEnter {
  alerts: Alert[] = [];
  establishment!: Establishment;
  origin: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private establishmentService: EstablishmentService,
    private alertService: AlertService,
  ) { 
    
  }

  ionViewDidEnter(): void {
    const establishmentId = this.activatedRoute.snapshot.params['id'];
    this.origin = this.activatedRoute.snapshot.params['origin'];

    this.establishmentService.getById(establishmentId).pipe(
      switchMap((response) => {
        this.establishment = response.facility;
        return this.alertService.getByFacilityId(establishmentId);
      })
    ).subscribe({
      next: (data) => {
        this.alerts = data;

        const currentDate = new Date();

        this.alerts.forEach(alert => {
          const endDate = new Date(alert.end_date);

          if(endDate >= currentDate){
            this.toastController.create({
              message: `${alert.title} — ${alert.description}`,
              position: 'bottom',
              cssClass: 'toast-design',
              buttons: [
                { text: 'X', role: 'cancel'}
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

  abrir_mapa(){
    this.router.navigate(['../establishment-maps']);
  }

  ngOnInit() {}

}
