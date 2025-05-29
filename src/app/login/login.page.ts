import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit, ViewWillEnter, ViewWillLeave {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(
    private menuControl: MenuController
  ) { }
  ionViewWillEnter(): void {
    this.menuControl.enable(false);
  }
  ionViewWillLeave(): void {
    this.menuControl.enable(true);
  }

  ngOnInit() {
  }

}
