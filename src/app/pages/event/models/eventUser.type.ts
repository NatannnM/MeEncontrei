import { User } from "../../user/models/user.type";
import { Event } from "./event.type";

export type EventUser = {
    id_user: string,
    id_event: string,
    creator: boolean,
    event: Event,
    user: User,
}