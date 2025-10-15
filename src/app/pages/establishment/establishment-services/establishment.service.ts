import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { Establishment } from "../models/establishment.type";

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

    constructor(private http: HttpClient){}

    getList(){
        return this.http.get<facilitiesResponse>(this.API_URL);
    }

    getById(establishmentId: string){
        return this.http.get<facilityResponse>(`${this.API_URL}/${establishmentId}`)
    }

    private add(establishment: Establishment){
        return this.http.post<Establishment>(this.API_URL, establishment);
    }

    save(establishment: Establishment){
        return this.add(establishment);
    }
}