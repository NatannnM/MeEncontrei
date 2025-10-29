import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { Establishment } from "../models/establishment.type";
import { AuthService } from "src/app/services/auth.service";
import { from, switchMap } from "rxjs";

interface facilitiesResponse {
    facility: Establishment[];
}

interface facilityResponse{
    facility: Establishment;
}

@Injectable({
  providedIn: 'root'
})

export class EstablishmentService {
    private readonly API_URL = `${env.apiURL}/facilities`;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ){}

    getList(){
        return this.http.get<facilitiesResponse>(this.API_URL);
    }

    getById(establishmentId: string){
        return this.http.get<facilityResponse>(`${this.API_URL}/${establishmentId}`)
    }

    private add(establishment: Establishment, userId: string){
        const establishmentComId = { ...establishment, userId};
        return this.http.post<Establishment>(this.API_URL, establishmentComId);
    }

    save(establishment: Establishment){
        return from(this.authService.getUserData()).pipe(
            switchMap(userData => {
                const userId = userData.user.id;
                return this.add(establishment, userId);
            })
        )
    }
}