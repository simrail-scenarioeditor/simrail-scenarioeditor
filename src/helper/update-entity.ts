import { Action, Condition, Trigger } from "../entity/scenario"

const updateAction = ( action: Action, value: string ): any =>
{
    for ( const key of Object.keys( action ) )
    {
        if ( key === `$id` || key === `$type` )
        {
            continue
        }
        ( action as any )[ key ] = undefined
    }

    switch ( value )
    {
        case `SimrailEvent.TimerAction`:
            action.action = 0
            action.timer = null
            break
        case `SimrailEvent.TrafficCommand`:
            action.commandText = `~03|~02|~0C||~15|~00~00~00~00~00~00~00~00||- Id: 1062415651~0D~0A  Start: ~0D~0A  End: ~0D~0A  Type: Poci~C4~85gowy~0D~0A  Points: []~0D~0A  Options: []~0D~0A`
            break
        case `SimrailEvent.CoroutineDelayAction`:
            action.delay = 0
            action.until = false
            break
        case `SimrailEvent.WeatherCommand`:
            action.humidity = 0
            action.instant = false
            action.pressure = 0
            action.temperature = 0
            action.visibility = 0
            action.weatherCode = 0
            action.windDeg = 0
            action.windSpeed = 0
            break
        case `SimrailEvent.SetObjectiveState`:
            action.objective = null
            action.state = 0
            break
        case `SimrailEvent.SetCabPaper`:
            action.position = 0
            action.res = null
            break
        case `SimrailEvent.PostNotify`:
            action.res = null
            action.timeout = 0
            break
        case `SimrailEvent.SetTrainState`:
            action.train = null
            action.requestRemoval = false
            action.requestSpawn = false
            break
        case `SimrailEvent.VehicleStartupTutorial`:
            action.train = null
            action.tutorial = 0
            action.willFinish = null
            break
    }
}

const updateCondition = ( condition: Condition, value: string ): any =>
{
    for ( const key of Object.keys( condition ) )
    {
        if ( key === `$id` || key === `$type` )
        {
            continue
        }
        ( condition as any )[ key ] = undefined
    }

    switch ( value )
    {
        case `SimrailEvent.ObjectiveStateCondition`:
            condition.objective = null
            condition.state = 0
            break
    }
}

const updateTrigger = ( trigger: Trigger, value: string ): any =>
{
    for ( const key of Object.keys( trigger ) )
    {
        if ( key === `$id` || key === `$type` )
        {
            continue
        }
        ( trigger as any )[ key ] = undefined
    }

    switch ( value )
    {
        case `SimrailEvent.TrainSignalProximity`:
            trigger.distance = 0
            trigger.maxSpeed = 0
            trigger.signalName = ``
            trigger.train = null
            break
        case `SimrailEvent.ObjectiveStateTrigger`:
            trigger.objective = null
            trigger.state = 0
            break
        case `SimrailEvent.TrainArrivedTrigger`:
            trigger.stationName = ``
            trigger.train = null
            break
        case `SimrailEvent.TrainDepartureTimeTrigger`:
            trigger.stationName = ``
            trigger.train = null
            break
        case `SimrailEvent.AfterTimeOnceTrigger`:
            trigger.time = 0
            break
        case `SimrailEvent.AtTimeTrigger`:
            trigger.time = 0
            break
        case `SimrailEvent.TimerFinishTrigger`:
            trigger.timer = null
            break
        case `SimrailEvent.TrainAnyDepartureTrigger`:
            trigger.train = null
            break
    }
}

export const updateEntity = ( entity: Action | Condition | Trigger, collection: string, value: string ) =>
{
    switch ( collection )
    {
        case `actions`:
            return updateAction( entity as Action, value )
        case `conditions`:
            return updateCondition( entity as Condition, value )
        case `triggers`:
        default:
            return updateTrigger( entity as Trigger, value )
    }
}