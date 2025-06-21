import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartPage } from './start/start.page';

const routes: Routes = [
  { path: '', component: StartPage },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then(m => m.RegisterPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
