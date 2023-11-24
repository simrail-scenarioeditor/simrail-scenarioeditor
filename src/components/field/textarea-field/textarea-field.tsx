import { useState } from "react"
import { v4 as uuid } from "uuid"

interface TextAreaFieldProps
{
    id: string
    label: string
    value: string | null

    onChange: ( value: string ) => void
}

export const TextAreaField = ( props: TextAreaFieldProps ) =>
{
    const [ id ] = useState( `${ props.id }-${ uuid() }` )

    return (

        <div className="field field--textarea">

            <label htmlFor={ id }>{ props.label }</label>
            <textarea id={ id } value={ props.value ?? `` } onChange={ e => props.onChange( e.target.value ) } spellCheck={ false } autoComplete="off" rows={ 3 } />

        </div>

    )
}