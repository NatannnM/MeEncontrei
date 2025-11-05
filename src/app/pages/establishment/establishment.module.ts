import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { EstablishmentPage } from './establishment.page';
import { MaskitoDirective } from '@maskito/angular';
import { EstablishmentPageRoutingModule } from './establishment-routing.module';
import { EstablishmentDetailsComponent } from './establishment-details/establishment-details.component';
import { EstablishmentFormComponent } from './establishment-form/establishment-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MapasPageModule } from '../mapas/mapas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule,
    EstablishmentPageRoutingModule,
    HttpClientModule,
    MapasPageModule
  ],
  declarations: [
    EstablishmentPage,
    EstablishmentFormComponent,
  ]
})
export class EstablishmentPageModule { }
