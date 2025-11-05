import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstablishmentPage } from './establishment.page';
import { EstablishmentDetailsComponent } from './establishment-details/establishment-details.component';
import { EstablishmentMapsComponent } from './establishment-maps/establishment-maps.component';
import { EstablishmentFormComponent } from './establishment-form/establishment-form.component';
import { AdminManagementComponent } from '../user/admin-management/admin-management.component';
import { MapasPageModule } from '../mapas/mapas.module';
import { MapasPage } from '../mapas/mapas.page';

const routes: Routes = [
  {
    path: '',
    component: EstablishmentPage
  },
  {
    path:'details/:id',
    component: EstablishmentDetailsComponent
  },
  {
    path: 'new',
    component: EstablishmentFormComponent
  },
  {
    path: 'adminManagement/:opcao',
    component: AdminManagementComponent
  },
  {
    path: 'mapas/:id_establishment/:modo',
    component: MapasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstablishmentPageRoutingModule { }
