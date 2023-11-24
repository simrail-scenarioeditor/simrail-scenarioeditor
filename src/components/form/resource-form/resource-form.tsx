import { useNavigate, useParams } from "react-router-dom"
import { Breadcrumb } from "../../breadcrumb"
import { CheckBoxField, EntityField, IdField, TextField } from "../../field"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { DeleteEntity, UpdateEntityField } from "../../../redux/action/scenario"
import { store } from "../../../redux/store"
import { PushBreadcrumb } from "../../../redux/action/breadcrumb"
import { Content } from "../../../entity/scenario"

export const ResourceForm = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { contents, resources } = useSelector( ( state: State ) => state.scenario )

    const resource = resources.find( r => r.$id === params.id )

    if ( resource === undefined )
    {
        return <div className="form--resource" />
    }

    const update = ( field: string, value: any ) =>
    {
        dispatch( UpdateEntityField( { $id: params.id!, collection: `resources`, field: field, value: value } ) )
    }

    const onContentAdd = () =>
    {
        const c = Content.create()
        update( `content`, c )
        onContentEdit()
    }

    const onContentDelete = () =>
    {
        if ( resource.content === null )
        {
            return
        }

        if ( resource.content.isReference() )
        {
            update( `content`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: resource.content.$id, type: `content` } ) )
    }

    const onContentEdit = () =>
    {
        if ( resource.content === null )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: resource.content.getName(), url: `/content/${ resource.content.$id }` } } ) )
        navigate( `/content/${ resource.content.$id }` )
    }

    return (

        <div className="form--resource">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { resource.getName() }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ resource.$id } />

                <TextField id="associated-location" label="Associated location" list="datalist-stations" value={ resource.associatedLocation } onChange={ value => update( `associatedLocation`,  value ) } />

                <EntityField type="content" label="Content" entity={ resource.content } onNew={ onContentAdd } onEdit={ onContentEdit } onDelete={ onContentDelete } referenceCollection={ contents } onReferenceChange={ ref => update( `content`, ref ) } />

                <TextField id="lang-code" label="Lang code" value={ resource.langCode } onChange={ value => update( `langCode`,  value ) } />

                <TextField id="name" label="Name" value={ resource.name } onChange={ value => update( `name`,  value ) } />

                <CheckBoxField id="radio" label="Radio" value={ resource.radio } onChange={ value => update( `radio`,  value ) } />

            </div>

        </div>

    )
}