import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/notification.service';

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

  usernameHasValue = false;
  passwordHasValue = false;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) { }

  ngOnInit() { }

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.toastService.show("teste");
      },
      error: (err) =>{
        console.error('Erro no login', err);
        this.toastService.show("testa");
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  checkValue(event: any, field: 'username' | 'password') {
    const value = event.detail.value;

    if (field === 'username') {
      this.usernameHasValue = value && value.length > 0;
    } else if (field === 'password') {
      this.passwordHasValue = value && value.length > 0;
    }
  }

}
