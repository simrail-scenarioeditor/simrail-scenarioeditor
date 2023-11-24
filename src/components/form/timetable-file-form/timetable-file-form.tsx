import { useDispatch, useSelector } from "react-redux"
import { Breadcrumb } from "../../breadcrumb"
import { NumberField, TextField } from "../../field"
import { UpdateTimeTableFileField } from "../../../redux/action/editor"
import { State } from "../../../redux/state"
import { Space } from "../../space"
import { WayPointForm } from "../waypoint-form"
import { WayPoint } from "../../../entity/editor"

export const TimeTableFileForm = () =>
{
    const dispatch = useDispatch()
    const { timetableFile, timetableFilePath } = useSelector( ( state: State ) => state.editor )

    if ( timetableFile === null || timetableFilePath === null )
    {
        return <div className="form form--timetable-file" />
    }

    const onWayPointChange = ( index: number, field: string, value: string | number ) =>
    {
        ( timetableFile.WayPoints as any )[ index ][ field ] = value
        dispatch( UpdateTimeTableFileField( { field: `WayPoints`, value: timetableFile.WayPoints } ) )
    }

    const onWayPointDelete = ( index: number ) =>
    {
        const waypoints = [ ... timetableFile.WayPoints ]
        waypoints.splice( index, 1 )
        dispatch( UpdateTimeTableFileField( { field: `WayPoints`, value: [ ... waypoints ] } ) )
    }

    const onWayPointCreate = () =>
    {
        dispatch( UpdateTimeTableFileField( { field: `WayPoints`, value: [ ... timetableFile.WayPoints, WayPoint.create() ] } ) )
    }

    return (

        <div className="form form--timetable-file">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { timetableFilePath.substring( timetableFilePath.lastIndexOf( `\\` ) + 1 ) }

                </div>

            </header>

            <div className="form__body">

                <TextField id="train-name" label="Train name" value={ timetableFile.TrainName } onChange={ value => dispatch( UpdateTimeTableFileField( { field: `TrainName`, value: value } ) ) } />

                <TextField id="train-number" label="Train number" value={ timetableFile.TrainNumber } onChange={ value => dispatch( UpdateTimeTableFileField( { field: `TrainNumber`, value: value } ) ) } />

                <TextField id="line-number" label="Line number" value={ timetableFile.LineNumber } onChange={ value => dispatch( UpdateTimeTableFileField( { field: `LineNumber`, value: value } ) ) } />

                <TextField id="from" label="From" value={ timetableFile.From } onChange={ value => dispatch( UpdateTimeTableFileField( { field: `From`, value: value } ) ) } list="datalist-stations" />

                <TextField id="to" label="To" value={ timetableFile.To } onChange={ value => dispatch( UpdateTimeTableFileField( { field: `To`, value: value } ) ) } list="datalist-stations" />

                <Space />

                <div className="field field--text">

                    <label>Waypoints</label>
                    <div>

                        { timetableFile.WayPoints.map( ( waypoint, index ) => (

                            <WayPointForm waypoint={ waypoint } onChange={ ( field, value ) => onWayPointChange( index, field, value ) } onDelete={ () => onWayPointDelete( index ) } />

                        ) ) }

                        <a onClick={ onWayPointCreate }>Add waypoint</a>

                    </div>

                </div>


                <Space />

                <NumberField id="start-speed-limit" label="Start speed limit" value={ timetableFile.StartSpeedLimit } onChange={ value => dispatch( UpdateTimeTableFileField( { field: `StartSpeedLimit`, value: value } ) ) } />

                <NumberField id="start-global-speed-limit" label="Start global speed limit" value={ timetableFile.StartGlobalSpeedLimit } onChange={ value => dispatch( UpdateTimeTableFileField( { field: `StartGlobalSpeedLimit`, value: value } ) ) } />

                <NumberField id="start-global-speed-limit" label="Start radio channel" value={ timetableFile.StartRadioChannels[ 0 ] } onChange={ value => dispatch( UpdateTimeTableFileField( { field: `StartRadioChannels`, value: value } ) ) } />

            </div>

        </div>

    )
}