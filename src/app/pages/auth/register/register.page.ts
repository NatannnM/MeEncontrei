import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  onRegister() {
    this.authService.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: err => console.error('Erro no registro', err),
    });
  }

}
