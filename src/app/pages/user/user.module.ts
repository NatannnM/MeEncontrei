import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonModal } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { alertPageModule } from '../alert/alert.module';
import { AdminManagementComponent } from './admin-management/admin-management.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserPageRoutingModule,
    HttpClientModule,
    alertPageModule
  ],
  declarations: [
    UserPage,
    AdminComponent,
    UserFormComponent,
    UserManagementComponent,
    AdminManagementComponent
  ]
})
export class UserPageModule { }
