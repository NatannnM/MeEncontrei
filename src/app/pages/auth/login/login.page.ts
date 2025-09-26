import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  fUser = false;
  fPass = false;

  username = '';
  password = '';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  onLogin() {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const {username, password} = this.loginForm.value;

    this.authService.login({username, password }).subscribe({
      next: () => {
        this.toastController.create({
          message: '✔️ Login efetuado com sucesso!',
          duration: 1000,
          position: 'bottom',
          cssClass: 'toast-design'
        }).then(toast => toast.present());
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastController.create({
          message: 'Usuário ou senha inválidos',
          duration: 1500,
          color: 'danger',
          position: 'bottom',
          }).then(toast => toast.present())
        console.error(err);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  hasError(field: string, error: string) {
    const control = this.loginForm.get(field);
    return control?.touched && control.hasError(error);
  }

}
