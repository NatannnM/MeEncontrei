import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthRoutingModule } from './auth-routing.module';
import { StartPage } from './start/start.page';

@NgModule({
  declarations: [StartPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
