import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env} from "src/environments/environment";
import { EventUser } from "../models/eventUser.type";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EventUserService{
    private readonly API_URL = `${env.apiURL}/events-on-users`;

    constructor(
        private http: HttpClient,
    ){}

    getList(){
        return this.http.get<EventUser[]>(this.API_URL);
    }

    getByUserId(user_id: string): Observable<EventUser[]>{
        return this.http.get<EventUser[]>(`${this.API_URL}/user/${user_id}`);
    }

    getByEventId(id_event: string): Observable<EventUser[]>{
        return this.http.get<EventUser[]>(`${this.API_URL}/event/${id_event}`);
    }   

    save(eventUser: EventUser): Observable<EventUser>{
        return this.http.post<EventUser>(this.API_URL, eventUser);
    }

    delete(user_id: string, id_event: string): Observable<void>{
        return this.http.delete<void>(`${this.API_URL}/${user_id}/${id_event}`);
    }

    deleteByUserId(user_id: string): Observable<void>{
        return this.http.delete<void>(`${this.API_URL}/${user_id}`);
    }

    deleteByEventId(id_event: string): Observable<void>{
        return this.http.delete<void>(`${this.API_URL}/${id_event}`);
    }
}