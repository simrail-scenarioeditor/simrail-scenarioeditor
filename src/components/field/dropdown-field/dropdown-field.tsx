import { Dropdown } from "../../dropdown"
import { useState } from "react"
import { v4 as uuid } from "uuid"

interface DropdownItem
{
    caption: string
    value: string
}

interface DropdownFieldProps
{
    id: string
    items: DropdownItem[]
    label: string
    value?: string

    onChange: ( value: string ) => void
}

export const DropdownField = ( props: DropdownFieldProps ) =>
{
    const [ id ] = useState( `${ props.id }-${ uuid() }` )

    return (

        <div className="field field--dropdown">

            <label htmlFor={ id }>{ props.label }</label>
            <Dropdown id={ id } items={ props.items } value={ props.value } onChange={ props.onChange } />

        </div>

    )
}