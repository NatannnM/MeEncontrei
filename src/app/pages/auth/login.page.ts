import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit, ViewWillEnter, ViewWillLeave {

  error = '';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private menuControl: MenuController,
    private authService: AuthService,
    private router: Router
  ) { }

  ionViewWillEnter(): void {
    this.menuControl.enable(false);
  }
  ionViewWillLeave(): void {
    this.menuControl.enable(true);
  }

  logar() {
    let { value } = this.loginForm;
    console.log(value.username,"-", value.password);
    this.authService.login({ username: value.username, password: value.password })
      .subscribe({
        next: (res) => {
          this.router.navigate(['folder/:id']); // redirecione para página principal
          this.loginForm.reset();
        },
        error: (err) => {
          this.error = 'Credenciais inválidas';
        }
      });
  }

  hasError(field: string, error: string) {
    const formControl = this.loginForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  ngOnInit() {
  }

}
