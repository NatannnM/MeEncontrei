import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapasPage } from './mapas.page';
import { EstablishmentPage } from '../establishment/establishment.page';
import { EstablishmentDetailsComponent } from '../establishment/establishment-details/establishment-details.component';

const routes: Routes = [
  {
    path: '',
    component: MapasPage
  },
  {
    path: 'establishment/:id',
    component: EstablishmentDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapasPageRoutingModule {}
