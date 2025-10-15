import { Injectable } from "@angular/core";
import { Event } from "../models/event.type";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

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
    
    constructor(private http: HttpClient){}

    getList(){
        return this.http.get<eventsResponse>(this.API_URL);
    }
    
    getById(eventId: string){
        return this.http.get<eventResponse>(`${this.API_URL}/${eventId}`)
    }
    
    private add(event: Event){
        return this.http.post<Event>(this.API_URL, event);
    }
    
    save(event: Event){
        return this.add(event);
    }

}