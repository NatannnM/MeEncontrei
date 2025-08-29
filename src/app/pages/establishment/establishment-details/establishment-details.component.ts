import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Establishment } from '../models/establishment.type';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-establishment-details',
  templateUrl: './establishment-details.component.html',
  styleUrls: ['./establishment-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class EstablishmentDetailsComponent  implements OnInit {
  
  establishmentList: Establishment[] = [];

  constructor(
    private router: Router
  ) { 
    
  }

  abrir_mapa(){
    this.router.navigate(['../establishment-maps']);
  }

  ngOnInit() {}

}
