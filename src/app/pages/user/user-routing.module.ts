import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';
import { RegisterPage } from '../auth/register/register.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
  {
    path: 'edit/:id',
    component: RegisterPage 
  },
  {
    path: 'new',
    component: RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
