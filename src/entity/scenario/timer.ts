import { Entity } from "./entity"
import { store } from "../../redux/store"
import { CreateEntity } from "../../redux/action/scenario"

export class Timer extends Entity
{
    name: string
    max: number
    running: boolean
    oneshot: boolean
    current: number

    constructor ( json: any )
    {
        super( json )

        this.current = json.current
        this.max = json.max
        this.name = json.name
        this.oneshot = json.oneshot
        this.running = json.running

        store.dispatch( CreateEntity( { collection: `timers`, entity: this } ) )
    }

    getName (): string
    {
        return this.name
    }

    static create (): Timer
    {
        return new Timer( {
            $id: Entity.getNextId(),
            current: 0,
            max: 0,
            name: `New timer`,
            oneshot: false,
            running: false
        } )
    }
}