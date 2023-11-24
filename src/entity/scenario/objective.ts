import { Entity } from "./entity"
import { store } from "../../redux/store"
import { Event } from "./event"
import { createEntityOrReference } from "../../helper"
import { CreateEntity } from "../../redux/action/scenario"
import { Reference } from "./reference"
import { Resource } from "./resource"

export class Objective extends Entity
{
    name: string
    events: ( Event | Reference )[]
    state: number
    text: Resource | Reference | null

    constructor ( json: any )
    {
        super( json )

        this.events = json.events.map( ( event: any ) => createEntityOrReference( event, Event ) )
        this.name = json.name
        this.state = json.state
        this.text = createEntityOrReference( json.text, Resource ) as Resource | Reference

        store.dispatch( CreateEntity( { collection: `objectives`, entity: this } ) )
    }

    getName (): string
    {
        return this.name
    }

    static create (): Objective
    {
        return new Objective( {
            $id: Entity.getNextId(),
            events: [],
            name: `New objective`,
            state: 0,
            text: null
        } )
    }

    static getStates (): string[]
    {
        return [
            `Inactive`,
            `Hidden`,
            `Visible`,
            `Completed`
        ]
    }
}