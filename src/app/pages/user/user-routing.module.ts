import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';
import { UserFormComponent } from './user-form/user-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EstablishmentFormComponent } from '../establishment/establishment-form/establishment-form.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AdminComponent } from './admin/admin.component';
import { EstablishmentDetailsComponent } from '../establishment/establishment-details/establishment-details.component';
import { EventDetailsComponent } from '../event/event-details/event-details.component';
import { EventFormComponent } from '../event/event-form/event-form.component';

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
    path: 'newUser/:origin',
    component: UserFormComponent
  },
  {
    path: 'management/:opcao',
    component: UserManagementComponent
  },
  {
    path: 'editEstablishment/:id_facility/:origin',
    component: EstablishmentFormComponent
  },
  {
    path: 'editEvent/:id_event/:origin',
    component: EventFormComponent
  },
  {
    path: 'editUser/:id/:origin',
    component: UserFormComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'managementAdmin/:opcao',
    component: AdminManagementComponent
  },
  {
    path: 'establishmentDetails/:id/:origin',
    component: EstablishmentDetailsComponent
  },
  {
    path: 'eventDetails/:id/:origin',
    component: EventDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
