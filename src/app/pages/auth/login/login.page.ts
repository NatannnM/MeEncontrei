import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => console.error('Erro no login', err),
    });
  }

}
