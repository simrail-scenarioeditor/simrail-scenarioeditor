import { useState } from "react"
import { v4 as uuid } from "uuid"

interface TextFieldProps
{
    id: string
    label: string
    list?: string
    value: string | null

    onChange: ( value: string ) => void
}

export const TextField = ( props: TextFieldProps ) =>
{
    const [ id ] = useState( `${ props.id }-${ uuid() }` )

    return (

        <div className="field field--text">

            <label htmlFor={ id }>{ props.label }</label>
            <input id={ id } list={ props.list } type="text" value={ props.value ?? `` } onChange={ e => props.onChange( e.target.value ) } spellCheck={ false } autoComplete="off" />

        </div>

    )
}