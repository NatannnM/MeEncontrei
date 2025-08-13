import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPage } from './event.page';
import { EventFormComponent } from './event-form/event-form.component';

const routes: Routes = [
  {
    path: '',
    component: EventPage
  },
  {
    path: 'new',
    component: EventFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule { }
