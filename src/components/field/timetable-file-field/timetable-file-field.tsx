import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { PushBreadcrumb } from "../../../redux/action/breadcrumb"
import { useState } from "react"
import { v4 as uuid } from "uuid"

interface TimetableFileFieldProps
{
    id: string
    label: string
    value: string

    onChange: ( value: string ) => void
}

export const TimetableFileField = ( props: TimetableFileFieldProps ) =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { timetableFilePath } = useSelector( ( state: State ) => state.editor )

    const [ id ] = useState( `${ props.id }-${ uuid() }` )

    const openTimetableFile = async () =>
    {

        if ( !timetableFilePath )
        {
            return
        }

        dispatch( PushBreadcrumb( { item: { caption: timetableFilePath.substring( timetableFilePath.lastIndexOf( `\\`) + 1 ), url: `/timetable-file` } } ) )
        navigate( `/timetable-file` )

    }

    return (

        <div className="field field--timetable-file">

            <label htmlFor={ id }>{ props.label }</label>
            <input id={ id } type="text" value={ props.value } onChange={ e => props.onChange( e.target.value ) } spellCheck={ false } autoComplete="off" />

            <div className="actions">

                <a onClick={ openTimetableFile }>Timetable editor</a>

            </div>

        </div>

    )
}