import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { PushBreadcrumb } from "../../../redux/action/breadcrumb"
import { useState } from "react"
import { v4 as uuid } from "uuid"

interface MissionFileFieldProps
{
    id: string
    label: string
    value: string

    onChange: ( value: string ) => void
}

export const MissionFileField = ( props: MissionFileFieldProps ) =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { missionFilePath } = useSelector( ( state: State ) => state.editor )

    const [ id ] = useState( `${ props.id }-${ uuid() }` )

    const openMissionFile = async () =>
    {

        if ( !missionFilePath )
        {
            return
        }

        dispatch( PushBreadcrumb( { item: { caption: missionFilePath.substring( missionFilePath.lastIndexOf( `\\`) + 1 ), url: `/mission-file` } } ) )
        navigate( `/mission-file` )

    }

    return (

        <div className="field field--mission-file">

            <label htmlFor={ id }>{ props.label }</label>
            <input id={ id } type="text" value={ props.value } onChange={ e => props.onChange( e.target.value ) } spellCheck={ false } autoComplete="off" />

            <div className="actions">

                <a onClick={ openMissionFile }>Mission editor</a>

            </div>

        </div>

    )
}