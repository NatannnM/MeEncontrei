import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MaskitoDirective } from '@maskito/angular';

import { EventPageRoutingModule } from './event-routing.module';
import { EventPage } from './event.page';
import { EventFormComponent } from './event-form/event-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MapasPageModule } from '../mapas/mapas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    EventPageRoutingModule,
    HttpClientModule,
    MapasPageModule
  ],
  declarations: [
    EventPage,
    EventFormComponent
  ]
})
export class EventPageModule { }
