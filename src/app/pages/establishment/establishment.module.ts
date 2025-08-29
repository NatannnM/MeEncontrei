import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { EstablishmentPage } from './establishment.page';
import { MaskitoDirective } from '@maskito/angular';
import { EstablishmentPageRoutingModule } from './establishment-routing.module';
import { EstablishmentDetailsComponent } from './establishment-details/establishment-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule,
    EstablishmentPageRoutingModule
  ],
  declarations: [
    EstablishmentPage
  ]
})
export class EstablishmentPageModule { }
