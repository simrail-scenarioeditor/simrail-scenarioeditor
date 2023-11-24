import { Entity } from "./entity"
import { store } from "../../redux/store"
import { CreateEntity } from "../../redux/action/scenario"
import { Objective } from "./objective"
import { Reference } from "./reference"
import { Train } from "./train"
import { Timer } from "./timer"
import { createEntityOrReference } from "../../helper"

export class Trigger extends Entity
{
    $type: string
    distance?: number                           // SimrailEvent.TrainSignalProximity
    maxSpeed?: number                           // SimrailEvent.TrainSignalProximity
    objective?: Objective | Reference | null    // SimrailEvent.ObjectiveStateTrigger
    signalName?: string                         // SimrailEvent.TrainSignalProximity
    state?: number                              // SimrailEvent.ObjectiveStateTrigger
    stationName?: string                        // SimrailEvent.TrainArrivedTrigger | SimrailEvent.TrainDepartureTimeTrigger
    time?: number                               // SimrailEvent.AfterTimeOnceTrigger | SimrailEvent.AtTimeTrigger
    timer?: Timer | Reference | null            // SimrailEvent.TimerFinishTrigger
    train?: Train | Reference | null            // SimrailEvent.TrainAnyDepartureTrigger | SimrailEvent.TrainArrivedTrigger | SimrailEvent.TrainDepartureTimeTrigger | SimrailEvent.TrainSignalProximity

    constructor ( json: any )
    {
        super( json )

        this.$type = json.$type

        if ( json.distance !== undefined ) this.distance = json.distance
        if ( json.maxSpeed !== undefined ) this.maxSpeed = json.maxSpeed
        if ( json.objective !== undefined ) this.objective = createEntityOrReference( json.objective, Objective ) as Objective | Reference | null
        if ( json.signalName !== undefined ) this.signalName = json.signalName
        if ( json.state !== undefined ) this.state = json.state
        if ( json.stationName !== undefined ) this.stationName = json.stationName
        if ( json.time !== undefined ) this.time = json.time
        if ( json.timer !== undefined ) this.timer = createEntityOrReference( json.timer, Objective ) as Timer | Reference | null
        if ( json.train !== undefined ) this.train = createEntityOrReference( json.train, Objective ) as Train | Reference | null

        store.dispatch( CreateEntity( { collection: `triggers`, entity: this } ) )
    }

    getName (): string
    {
        return `${ this.$type }#${ this.$id }`
    }

    static create (): Trigger
    {
        return new Trigger( {
            $id: Entity.getNextId(),
            $type: `SimrailEvent.PlayerCallTrigger`
        } )
    }

    static getTypes (): string[]
    {
        return [
            "SimrailEvent.ObjectiveStateTrigger",
            "SimrailEvent.TrainArrivedTrigger",
            "SimrailEvent.TimerFinishTrigger",
            "SimrailEvent.ImmediateOnceTrigger",
            "SimrailEvent.AtTimeTrigger",
            "SimrailEvent.PlayerCallTrigger",
            "SimrailEvent.TrainDepartureTimeTrigger",
            "SimrailEvent.TrainAnyDepartureTrigger",
            "SimrailEvent.TrainSignalProximity",
            "SimrailEvent.AfterTimeOnceTrigger"
        ]
    }
}