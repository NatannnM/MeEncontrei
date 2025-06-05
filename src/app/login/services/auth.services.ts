
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3333'; // URL do seu backend

  constructor(private http: HttpClient, private router: Router) {}

  login(valores: { username: string, password: string }) {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, valores);
  }

}