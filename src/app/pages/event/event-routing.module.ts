import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPage } from './event.page';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AdminManagementComponent } from '../user/admin-management/admin-management.component';

const routes: Routes = [
  {
    path: '',
    component: EventPage
  },
  {
    path: 'details/:id',
    component: EventDetailsComponent
  },
  {
    path: 'new',
    component: EventFormComponent
  },
  {
    path: 'adminManagement/:opcao',
    component: AdminManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule { }
