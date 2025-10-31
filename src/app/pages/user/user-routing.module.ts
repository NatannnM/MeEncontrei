import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';
import { UserFormComponent } from './user-form/user-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EstablishmentFormComponent } from '../establishment/establishment-form/establishment-form.component';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
  {
    path: 'edit/:id',
    component: UserFormComponent
  },
  {
    path: 'new',
    component: UserFormComponent
  },
  {
    path: 'management/:opcao',
    component: UserManagementComponent
  },
  {
    path: 'editEstablishment/:id_facility',
    component: EstablishmentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
