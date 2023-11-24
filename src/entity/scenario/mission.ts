import { Entity } from "./entity"
import { createEntityOrReference } from "../../helper"
import { Objective } from "./objective"
import { store } from "../../redux/store"
import { Reference } from "./reference"
import { Timer } from "./timer"
import { Train } from "./train"
import { Resource } from "./resource"
import { CreateEntity } from "../../redux/action/scenario"

export class Mission extends Entity
{
    name: Resource | Reference | null
    description: Resource | Reference | null
    trainNumber: string
    timers: ( Timer | Reference )[]
    vars: never[]
    objectives: ( Objective | Reference )[]
    trains: ( Train | Reference )[]

    constructor ( json: any )
    {
        super( json )

        this.description = createEntityOrReference( json.description, Resource ) as Resource | Reference
        this.name = createEntityOrReference( json.name, Resource ) as Resource | Reference
        this.objectives = json.objectives.map( ( objective: any ) => createEntityOrReference( objective, Objective ) )
        this.timers = json.timers.map( ( timer: any ) => createEntityOrReference( timer, Timer ) )
        this.trainNumber = json.trainNumber
        this.trains = json.trains.map( ( train: any ) => createEntityOrReference( train, Train ) )
        this.vars = json.vars

        store.dispatch( CreateEntity( { collection: `missions`, entity: this } ) )
    }

    getName (): string
    {
        return `Mission#${ this.$id }`
    }
}