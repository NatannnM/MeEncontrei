import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { MaskitoDirective } from "@maskito/angular";
import { alertFormComponent } from "./alert-form.component";
import { UserAlertComponent } from "./user-alert.component";
import { UserAlertEventComponent } from "./user-alert-event.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    alertFormComponent,
    UserAlertComponent,
    UserAlertEventComponent
  ],
  exports: [alertFormComponent, UserAlertComponent]
})
export class alertPageModule { }
