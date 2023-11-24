import { useParams } from "react-router-dom"
import { Breadcrumb } from "../../breadcrumb"
import { CheckBoxField, IdField, NumberField, TextAreaField, TextField } from "../../field"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { UpdateEntityField } from "../../../redux/action/scenario"

export const TrainForm = () =>
{
    const dispatch = useDispatch()
    const params = useParams()
    const { trains } = useSelector( ( state: State ) => state.scenario )

    const train = trains.find( r => r.$id === params.id )

    if ( train === undefined )
    {
        return <div className="form--train" />
    }

    const update = ( field: string, value: any ) =>
    {
        dispatch( UpdateEntityField( { $id: params.id!, collection: `trains`, field: field, value: value } ) )
    }

    return (

        <div className="form--train">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { train.getName() }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ train.$id } />

                <CheckBoxField id="braked" label="Braked" value={ train.braked } onChange={ value => update( `braked`, value ) } />

                <CheckBoxField id="cold" label="Cold" value={ train.cold } onChange={ value => update( `cold`, value ) } />

                <TextField id="name" label="Name" value={ train.name } onChange={ value => update( `name`, value ) } />

                <NumberField id="offset" label="Offset" value={ train.offset } onChange={ value => update( `offset`, value ) } />

                <CheckBoxField id="player" label="Player" value={ train.player } onChange={ value => update( `player`, value ) } />

                <CheckBoxField id="request-removal" label="Request Removal" value={ train.requestRemoval } onChange={ value => update( `requestRemoval`, value ) } />

                <CheckBoxField id="request-spawn" label="Request Spawn" value={ train.requestSpawn } onChange={ value => update( `requestSpawn`, value ) } />

                <CheckBoxField id="reversed" label="Reversed" value={ train.reversed } onChange={ value => update( `reversed`, value ) } />

                <CheckBoxField id="shunting" label="Shunting" value={ train.shunting } onChange={ value => update( `shunting`, value ) } />

                <NumberField id="speed" label="Speed" value={ train.speed } onChange={ value => update( `speed`, value ) } />

                <TextField id="timetable" label="Timetable" value={ train.timetable } onChange={ value => update( `timetable`, value ) } />

                <TextField id="track" label="Track" value={ train.track } onChange={ value => update( `track`, value ) } />

                <TextAreaField id="vehicles" label="Vehicles" value={ train.vehicles } onChange={ value => update( `vehicles`, value ) } />

            </div>

        </div>

    )
}