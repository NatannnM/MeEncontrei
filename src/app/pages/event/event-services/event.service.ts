import { Injectable } from "@angular/core";
import { Event } from "../models/event.type";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/services/auth.service";
import { from, switchMap } from "rxjs";

interface eventsResponse{
    event: Event[];
}

interface eventResponse{
    event: Event;
}

@Injectable({
    providedIn: 'root'
})

export class eventsService {
    private readonly API_URL = `${environment.apiURL}/events`;
    
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ){}

    getList(){
        return this.http.get<eventsResponse>(this.API_URL);
    }
    
    getById(eventId: string){
        return this.http.get<eventResponse>(`${this.API_URL}/${eventId}`)
    }
    
    private add(event: Event, userId: string){
        const eventComId = { ...event, userId};
        return this.http.post<Event>(this.API_URL, eventComId);
    }
    
    save(event: Event){
        return from(this.authService.getUserData()).pipe(
            switchMap(userData => {
                const userId = userData.user.id;
                return this.add(event, userId);
            })
        )
    }

}