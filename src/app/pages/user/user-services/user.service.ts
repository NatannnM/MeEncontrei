import { Injectable } from "@angular/core";
import { User } from "../models/user.type";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment as env } from "src/environments/environment";
import { AuthService } from "src/app/services/auth.service";
import { from, Observable } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import { Storage } from "@ionic/storage-angular";

interface usersResponse {
    user: User[];
}

interface userResponse {
    user: User;
}


@Injectable({
  providedIn: 'root'
})

export class userService{
    private readonly API_URL = `${env.apiURL}/users`;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private storage: Storage
    ){}

    getById(userId: string): Observable<userResponse>{
        return from(this.authService.getToken()).pipe(
            switchMap(token => {
                const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);    
                return this.http.get<userResponse>(`${this.API_URL}/${userId}`, {headers});
            })
        )        
    }

    getList(): Observable<User[]> {
        return from(this.authService.getToken()).pipe(
            switchMap(token => {
                if(!token){
                    throw new Error('Token não foi encontrado');
                }
                const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

                return this.http.get<usersResponse>(this.API_URL, {headers});
            }),
            map(response => response.user)
        );
    }

    private add(user: User): Observable<any>{
        return from(this.authService.getToken()).pipe(
            switchMap(token => {
                if(!token){
                    throw new Error('Token não foi encontrado');
                }
                const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

                return this.http.post<any>(this.API_URL, {headers} );
            })
        )
    }

    private update(user: User): Observable<any>{
        return from(this.authService.getToken()).pipe(
            switchMap(token => {
                if(!token){
                    throw new Error('Token não foi encontrado');
                }
                const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

                return this.http.patch<any>(`${this.API_URL}/${user.id}`, user, {headers} );
            })
        )
    }

    save(user: User){
        return user.id ? this.update(user) : this.add(user);
    }

    remove(user: User): Observable<any>{
        return from(this.authService.getToken()).pipe(
            switchMap(token => {
                const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
                return this.http.delete<any>(`${this.API_URL}/${user.id}`, { headers });
            })
        ) 
    }


   

}