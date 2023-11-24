import { NumberField, TextField } from "../../field"
import { WayPoint } from "../../../entity/editor"

interface WayPointProps
{
    waypoint: WayPoint
    onChange: ( field: string, value: string | number ) => void
    onDelete: () => void
}

export const WayPointForm = ( props: WayPointProps ) =>
{
    const update = ( field: string, value: string | number ) =>
    {
        props.onChange( field, value )
    }

    return (

        <div className="form--waypoint">

            <TextField id="name-of-point" label="Name of point" value={ props.waypoint.NameOfPoint } onChange={ value => update( `NameOfPoint`,  value ) }  list="datalist-stations" />

            <TextField id="display-name" label="Display name" value={ props.waypoint.DisplayName } onChange={ value => update( `DisplayName`,  value ) } />

            <TextField id="stop-type" label="Stop type" value={ props.waypoint.StopType } onChange={ value => update( `StopType`,  value ) } />

            <TextField id="line" label="Line" value={ props.waypoint.Line.toString() } onChange={ value => update( `Line`,  value ) } />

            <NumberField id="mileage" label="Mileage" value={ props.waypoint.Mileage } onChange={ value => update( `Mileage`,  value ) } />

            <NumberField id="arrival-time" label="Arrival time" value={ props.waypoint.ArrivalTime } onChange={ value => update( `ArrivalTime`,  value ) } />

            <NumberField id="departure-time" label="Departure time" value={ props.waypoint.DepartureTime } onChange={ value => update( `DepartureTime`,  value ) } />

            <TextField id="train-type" label="Train type" value={ props.waypoint.TrainType } onChange={ value => update( `TrainType`,  value ) } />

            <TextField id="station-category" label="Station category" value={ props.waypoint.StationCategory } onChange={ value => update( `StationCategory`,  value ) } />

            <a className="warn" onClick={ props.onDelete }>Delete</a>

        </div>

    )
}