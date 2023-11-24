import { TrafficCommandEditor } from "../../traffic-command-editor"

interface TrafficCommandFieldProps
{
    label: string
    value: string | null

    onChange: ( value: string ) => void
}

export const TrafficCommandField = ( props: TrafficCommandFieldProps ) =>
{

    return (

        <div className="field field--text">

            <label>{ props.label }</label>
            <TrafficCommandEditor commandText={ props.value ?? `` } onChange={ value => props.onChange( value ) } />

        </div>

    )
}