import { useState } from "react"
import { v4 as uuid } from "uuid"

interface IdFieldProps
{
    id: string
    value: string
}

export const IdField = ( props: IdFieldProps ) =>
{
    const [ id ] = useState( `${ props.id }-${ uuid() }` )

    return (

        <div className="field field--id">

            <label htmlFor={ id }>$id</label>
            <input disabled id={ id } type="text" value={ props.value } />

        </div>

    )
}