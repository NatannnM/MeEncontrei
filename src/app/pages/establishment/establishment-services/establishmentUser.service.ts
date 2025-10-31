import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env} from "src/environments/environment";
import { EstablishmentUser } from "../models/establishmentUser.type";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EstablishmentUserService{
    private readonly API_URL = `${env.apiURL}/facilities-on-users`;

    constructor(
        private http: HttpClient,
    ){}

    getList(){
        return this.http.get<EstablishmentUser[]>(this.API_URL);
    }

    getByUserId(user_id: string): Observable<EstablishmentUser[]>{
        return this.http.get<EstablishmentUser[]>(`${this.API_URL}/user/${user_id}`);
    }

    getByFacilityId(facility_id: string): Observable<EstablishmentUser[]>{
        return this.http.get<EstablishmentUser[]>(`${this.API_URL}/${facility_id}`);
    }   

    save(establishmentUser: EstablishmentUser): Observable<EstablishmentUser>{
        return this.http.post<EstablishmentUser>(this.API_URL, establishmentUser);
    }

    delete(user_id: string, facility_id: string): Observable<void>{
        return this.http.delete<void>(`${this.API_URL}/${user_id}/${facility_id}`);
    }

    deleteByUserId(user_id: string): Observable<void>{
        return this.http.delete<void>(`${this.API_URL}/${user_id}`);
    }

    deleteByEstablishmentId(facility_id: string): Observable<void>{
        return this.http.delete<void>(`${this.API_URL}/${facility_id}`);
    }
}