import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Establishment } from './models/establishment.type';
import { EstablishmentService } from 'src/app/services/establishment.service';
@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.page.html',
  styleUrls: ['./establishment.page.scss'],
  standalone: false
})
export class EstablishmentPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  establishmentList: Establishment[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private establishmentService: EstablishmentService
  ) {
    this.establishmentList = establishmentService.getList();
   }


  ionViewDidLeave(): void {
  }
  ionViewWillLeave(): void {
  }
  ionViewDidEnter(): void {
  }
  ionViewWillEnter(): void {
  }

  ngOnInit() { }



}
