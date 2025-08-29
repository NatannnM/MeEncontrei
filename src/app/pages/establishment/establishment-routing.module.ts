import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstablishmentPage } from './establishment.page';
import { EstablishmentDetailsComponent } from './establishment-details/establishment-details.component';
import { EstablishmentMapsComponent } from './establishment-maps/establishment-maps.component';

const routes: Routes = [
  {
    path: '',
    component: EstablishmentPage
  },
  {
    path:'details',
    component: EstablishmentDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstablishmentPageRoutingModule { }
