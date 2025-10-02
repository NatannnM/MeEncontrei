import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  username = '';
  email = '';
  password = '';

  fUser = false;
  fEmail = false;
  fPass = false;

  usuarioForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastController: ToastController
  ) { }


  ngOnInit() { }

  onRegister() {
    if(this.usuarioForm.invalid){
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const {username, email, password} = this.usuarioForm.value;
    this.authService.register({username, email, password}).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Registrado com sucesso!',
          duration: 1000,
          position: 'bottom',
          cssClass: 'toast-design'
        }).then(toast => toast.present());
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.toastController.create({
          message: 'Ocorreu um erro ao se registrar, verifique os campos e tente novamente.',
          duration: 3000,
          color: 'danger',
          position: 'bottom',
        }).then(toast => toast.present())
        console.error(err);
      }
    });
  }

}
