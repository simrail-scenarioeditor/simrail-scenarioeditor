import { Entity } from "./entity"
import { store } from "../../redux/store"
import { CreateEntity } from "../../redux/action/scenario"
import { Reference } from "./reference"
import { Action } from "./action"
import { Condition } from "./condition"
import { Trigger } from "./trigger"
import { createEntityOrReference } from "../../helper"

export class Event extends Entity
{
    trigger: Trigger | Reference | null
    conditions: ( Condition | Reference )[]
    mode: number
    children: never[]
    actions: ( Action | Reference )[]

    constructor ( json: any )
    {
        super( json )

        this.actions = json.actions.map( ( action: any ) => createEntityOrReference( action, Action ) )
        this.children = json.children
        this.conditions = json.conditions.map( ( condition: any ) => createEntityOrReference( condition, Condition ) )
        this.mode = json.mode
        this.trigger = createEntityOrReference( json.trigger, Trigger ) as Trigger | Reference

        store.dispatch( CreateEntity( { collection: `events`, entity: this } ) )
    }

    getName (): string
    {
        return `Event#${ this.$id }`
    }

    static create (): Event
    {
        return new Event( {
            $id: Entity.getNextId(),
            actions: [],
            children: [],
            conditions: [],
            mode: 0,
            trigger: null
        } )
    }
}