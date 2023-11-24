import { useState } from "react"
import { v4 as uuid } from "uuid"

interface TextFieldProps
{
    id: string
    label: string
    value: boolean

    onChange: ( value: boolean ) => void
}

export const CheckBoxField = ( props: TextFieldProps ) =>
{
    const [ id ] = useState( `${ props.id }-${ uuid() }` )

    return (

        <div className="field field--checkbox">

            <label htmlFor={ id }>{ props.label }</label>
            <input id={ id } type="checkbox" checked={ props.value } onChange={ e => props.onChange( e.target.checked ) } />

        </div>

    )
}