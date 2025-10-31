import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import {jwtDecode} from 'jwt-decode';

interface JWTPayload{
  id: string;
  username: string;
  email: string;
  created_at: Date;
  role: 'ADMIN' | 'USER';
  profile_pic: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private API_URL = env.apiURL;
  private storage: Storage | null = null;
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  
  constructor(
    private http: HttpClient,
    private ionicStorage: Storage
  ) {
    this.initStorage();
    this.checkToken();
  }

  async initStorage(){
    this.storage = await this.ionicStorage.create();
  }

  private async checkToken() {
    const token = await this.storage?.get('token');
    if(token){
      try{
        await this.getUserData();
        this.isLoggedIn$.next(true);
      } catch(err){
        await this.logout();
      }
    } else {
      this.isLoggedIn$.next(false);
    }
  }

  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, data);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(async res => {
        await this.storage?.set('token', res.token);
        this.isLoggedIn$.next(true);
      })
    );
  }

  async logout() {
    await this.storage?.remove('token');
    this.isLoggedIn$.next(false);
  }

  async getToken(): Promise<string | null> {
    return await this.storage?.get('token');
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  async getUserData(): Promise<any> {
    const token = await this.getToken();
    if(!token){
      throw new Error('Token não encontrado');
    }

    const decoded = jwtDecode<JWTPayload>(token);

    if(!decoded.id){
      throw new Error('Id não encontrado');
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URL}/users/${decoded.id}`, {headers}).toPromise();
  }

}