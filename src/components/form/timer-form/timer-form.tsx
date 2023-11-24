import { useParams } from "react-router-dom"
import { Breadcrumb } from "../../breadcrumb"
import { CheckBoxField, IdField, NumberField, TextField } from "../../field"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { UpdateEntityField } from "../../../redux/action/scenario"

export const TimerForm = () =>
{
    const dispatch = useDispatch()
    const params = useParams()
    const { timers } = useSelector( ( state: State ) => state.scenario )

    const timer = timers.find( r => r.$id === params.id )

    if ( timer === undefined )
    {
        return <div className="form--timer" />
    }

    const update = ( field: string, value: any ) =>
    {
        dispatch( UpdateEntityField( { $id: params.id!, collection: `timers`, field: field, value: value } ) )
    }

    return (

        <div className="form--timer">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { timer.getName() }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ timer.$id } />

                <NumberField id="current" label="Current" value={ timer.current } onChange={ value => update( `current`, value ) } />

                <NumberField id="max" label="Max" value={ timer.max } onChange={ value => update( `max`, value ) } />

                <TextField id="name" label="Name" value={ timer.name } onChange={ value => update( `name`, value ) } />

                <CheckBoxField id="oneshot" label="One shot" value={ timer.oneshot } onChange={ value => update( `oneshot`, value ) } />

                <CheckBoxField id="running" label="Running" value={ timer.running } onChange={ value => update( `running`, value ) } />

            </div>

        </div>

    )
}