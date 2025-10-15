import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { EstablishmentDetailsComponent } from '../establishment/establishment-details/establishment-details.component';
import { EventDetailsComponent } from '../event/event-details/event-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'establishmentDetails/:id',
    component: EstablishmentDetailsComponent
  },
  {
    path: 'eventDetails/:id',
    component: EventDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
