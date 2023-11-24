import { Entity } from "./entity"
import { store } from "../../redux/store"
import { CreateEntity } from "../../redux/action/scenario"

export class Train extends Entity
{
    name: string
    timetable: string
    reversed: boolean
    player: boolean
    track: string
    vehicles: string
    offset: number
    speed: number
    braked: boolean
    shunting: boolean
    cold: boolean
    requestSpawn: boolean
    requestRemoval: boolean

    constructor ( json: any )
    {
        super( json )

        this.braked = json.braked
        this.cold = json.cold
        this.name = json.name
        this.offset = json.offset
        this.player = json.player
        this.requestRemoval = json.requestRemoval
        this.requestSpawn = json.requestSpawn
        this.reversed = json.reversed
        this.shunting = json.shunting
        this.speed = json.speed
        this.timetable = json.timetable
        this.track = json.track
        this.vehicles = json.vehicles

        store.dispatch( CreateEntity( { collection: `trains`, entity: this } ) )
    }

    getName (): string
    {
        return this.name
    }

    static create (): Train
    {
        return new Train( {
            $id: Entity.getNextId(),
            braked: false,
            cold: false,
            name: `New train`,
            offset: 0,
            player: false,
            requestRemoval: false,
            requestSpawn: false,
            reversed: false,
            shunting: false,
            speed: 0,
            timetable: ``,
            track: ``,
            vehicles: ``
        } )
    }
}