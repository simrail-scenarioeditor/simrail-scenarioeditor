import { useState } from "react"
import { v4 as uuid } from "uuid"

interface NumberFieldProps
{
    id: string
    label: string
    value: number

    onChange: ( value: number ) => void
}

export const NumberField = ( props: NumberFieldProps ) =>
{
    const [ id ] = useState( `${ props.id }-${ uuid() }` )

    return (

        <div className="field field--number">

            <label htmlFor={ id }>{ props.label }</label>
            <input id={ id } type="number" value={ props.value } onChange={ e => props.onChange( parseFloat( e.target.value ) ) } spellCheck={ false } autoComplete="off" />

        </div>

    )
}