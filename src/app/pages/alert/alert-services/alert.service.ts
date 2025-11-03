import { Injectable } from "@angular/core";
import { Alert } from "../models/alert.type";
import { environment as env} from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AlertService {
    private readonly API_URL = `${env.apiURL}/alerts`;

    constructor(
        private http: HttpClient,
    ){}
    
    getByFacilityId(facility_id: string): Observable<Alert[]>{
        return this.http.get<Alert[]>(`${this.API_URL}/facility/${facility_id}`);
    }

    getByEventId(event_id: string): Observable<Alert[]>{
        return this.http.get<Alert[]>(`${this.API_URL}/event/${event_id}`);
    }
    
    save(alert: Alert){
        console.log(alert);
        return this.http.post<Alert>(this.API_URL, alert);
    }

    
}
