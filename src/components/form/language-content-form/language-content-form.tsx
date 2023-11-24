import { useParams } from "react-router-dom"
import { Breadcrumb } from "../../breadcrumb"
import { IdField, TextField } from "../../field"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { UpdateEntityField } from "../../../redux/action/scenario"

export const LanguageContentForm = () =>
{
    const dispatch = useDispatch()
    const params = useParams()
    const { languageContents } = useSelector( ( state: State ) => state.scenario )

    const languageContent = languageContents.find( r => r.$id === params.id )

    if ( languageContent === undefined )
    {
        return <div className="form--language-content" />
    }

    const update = ( field: string, value: any ) =>
    {
        dispatch( UpdateEntityField( { $id: params.id!, collection: `languageContents`, field: field, value: value } ) )
    }

    return (

        <div className="form--language-content">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { languageContent.getName() }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ languageContent.$id } />

                <TextField id="audio-file" label="Audio file" value={ languageContent.audioFile } onChange={ value => update( `audioFile`,  value ) } />

                <TextField id="text" label="Text" value={ languageContent.text } onChange={ value => update( `text`,  value ) } />

            </div>

        </div>

    )
}