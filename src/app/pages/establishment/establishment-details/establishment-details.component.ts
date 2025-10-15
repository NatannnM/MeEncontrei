import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Establishment } from '../models/establishment.type';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EstablishmentService } from '../establishment-services/establishment.service';

@Component({
  selector: 'app-establishment-details',
  templateUrl: './establishment-details.component.html',
  styleUrls: ['./establishment-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class EstablishmentDetailsComponent  implements OnInit {
  
  establishment!: Establishment;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private establishmentService: EstablishmentService
  ) { 
    
  }

  abrir_mapa(){
    this.router.navigate(['../establishment-maps']);
  }

  ngOnInit() {
    const establishmentId = this.activatedRoute.snapshot.params['id'];
    this.establishmentService.getById(establishmentId).subscribe({
      next: (response) => {
        this.establishment = response.facility;
      },
      error: (error) => {
        this.toastController.create({
          message: error.error.message,
          header: 'Erro ao carregar o estabelecimento!',
          color: 'danger',
          position: 'top',
          duration: 3000,
          }).then(toast => toast.present())
          console.error(error);
          console.error(error.error.details);
      }  
    });
  }

}
