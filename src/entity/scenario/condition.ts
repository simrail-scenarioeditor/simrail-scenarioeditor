import { Entity } from "./entity"
import { store } from "../../redux/store"
import { CreateEntity } from "../../redux/action/scenario"
import { Objective } from "./objective"
import { Reference } from "./reference"
import { createEntityOrReference } from "../../helper"

export class Condition extends Entity
{
    $type: string
    invert: boolean
    objective?: Objective | Reference | null    // SimrailEvent.ObjectiveStateCondition
    state?: number                              // SimrailEvent.ObjectiveStateCondition

    constructor ( json: any )
    {
        super( json )

        this.$type = json.$type
        this.invert = json.invert
        if ( json.objective !== undefined ) this.objective = createEntityOrReference( json.objective, Objective ) as Objective | Reference
        if ( json.state !== undefined ) this.state = json.state

        store.dispatch( CreateEntity( { collection: `conditions`, entity: this } ) )
    }

    getName (): string
    {
        return `${ this.$type }#${ this.$id }`
    }

    static create (): Condition
    {
        return new Condition( {
            $id: Entity.getNextId(),
            $type: `SimrailEvent.ObjectiveStateCondition`,
            invert: false,
            objective: null,
            state: 0
        } )
    }

    static getTypes (): string[]
    {
        return [
            "SimrailEvent.ObjectiveStateCondition",
            "SimrailEvent.ExecOnceCondition"
        ]
    }

}