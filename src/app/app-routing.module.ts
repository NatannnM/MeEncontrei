import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/user/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'event',
    loadChildren: () =>
      import('./pages/event/event.module').then(m => m.EventPageModule)
  },
  {
    path: 'establishment',
    loadChildren: () =>
      import('./pages/establishment/establishment.module').then(m => m.EstablishmentPageModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'establishment-maps',
    loadComponent: () =>
      import('./pages/establishment/establishment-maps/establishment-maps.component').then(m => m.EstablishmentMapsComponent)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'admin',
    component: AdminComponent
  }


  // {
  //   path: 'home/:id',
  //   loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
