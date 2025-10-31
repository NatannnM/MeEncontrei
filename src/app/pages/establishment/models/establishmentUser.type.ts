import { User } from "../../user/models/user.type"
import { Establishment } from "./establishment.type"

export type EstablishmentUser = {
    id_user: string,
    id_facility: string,
    creator: boolean,
    facility: Establishment,
    user: User,
}