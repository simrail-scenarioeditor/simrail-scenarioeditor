import { useNavigate, useParams } from "react-router-dom"
import { Breadcrumb } from "../../breadcrumb"
import { EntityField, IdField } from "../../field"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { store } from "../../../redux/store"
import { PushBreadcrumb } from "../../../redux/action/breadcrumb"
import { DeleteEntity, UpdateEntityField } from "../../../redux/action/scenario"
import { LanguageContent } from "../../../entity/scenario"

export const ContentForm = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { contents, languageContents } = useSelector( ( state: State ) => state.scenario )

    const content = contents.find( r => r.$id === params.id )

    if ( content === undefined )
    {
        return <div className="form--content" />
    }

    const update = ( field: string, value: any ) =>
    {
        dispatch( UpdateEntityField( { $id: params.id!, collection: `contents`, field: field, value: value } ) )
    }

    const onEnglishAdd = () =>
    {
        const l = LanguageContent.create()
        update( `en`, l )
        onEnglishEdit()
    }

    const onEnglishDelete = () =>
    {
        if ( content.en === null )
        {
            return
        }

        if ( content.en.isReference() )
        {
            update( `en`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: content.en.$id, type: `language-content` } ) )
    }

    const onEnglishEdit = () =>
    {
        if ( !content.en )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: content.en.getName(), url: `/language-content/${ content.en.$id }` } } ) )
        navigate( `/language-content/${ content.en.$id }` )
    }

    return (

        <div className="form--content">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { content.getName() }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ content.$id } />

                <EntityField type="language-content" label="English" entity={ content.en } onNew={ onEnglishAdd } onEdit={ onEnglishEdit } onDelete={ onEnglishDelete } onReferenceChange={ reference => update( `en`, reference ) } referenceCollection={ languageContents } />

            </div>

        </div>

    )
}