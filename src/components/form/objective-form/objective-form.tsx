import { useNavigate, useParams } from "react-router-dom"
import { Breadcrumb } from "../../breadcrumb"
import { DropdownField, EntityField, IdField, ListField, TextField } from "../../field"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { Event, Objective, Reference, Resource } from "../../../entity/scenario"
import { PushBreadcrumb } from "../../../redux/action/breadcrumb"
import { DeleteEntity, UpdateEntityField } from "../../../redux/action/scenario"
import { store } from "../../../redux/store"
import { moveDown, moveUp } from "../../../helper"

export const ObjectiveForm = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { events, objectives, resources } = useSelector( ( state: State ) => state.scenario )

    const objective = objectives.find( r => r.$id === params.id )

    if ( objective === undefined )
    {
        return <div className="form--objective" />
    }

    const update = ( field: string, value: any ) =>
    {
        dispatch( UpdateEntityField( { $id: params.id!, collection: `objectives`, field: field, value: value } ) )
    }

    const onEventAdd = () =>
    {
        const e = Event.create()
        update( `events`, [ ...objective.events, e ] )
        onEventEdit( e )
    }

    const onEventDelete = ( event: Event | Reference ) =>
    {
        if ( event.isReference() )
        {
            update( `events`, objective.events.filter( e => e.$id !== event.$id ) )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: event.$id, type: `event` } ) )
    }

    const onEventEdit = ( event: Event | Reference ) =>
    {
        dispatch( PushBreadcrumb( { item: { caption: event.getName(), url: `/event/${ event.$id }` } } ) )
        navigate( `/event/${ event.$id }` )
    }

    const onTextAdd = () =>
    {
        const r = Resource.create()
        update( `text`, r )
        onTextEdit()
    }

    const onTextDelete = () =>
    {
        if ( objective.text === null )
        {
            return
        }

        if ( objective.text.isReference() )
        {
            update( `text`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: objective.text.$id, type: `resource` } ) )
    }

    const onTextEdit = () =>
    {
        if ( !objective.text )
        {
            return
        }

        dispatch( PushBreadcrumb( { item: { caption: objective.text.getName(), url: `/resource/${ objective.text.$id }` } } ) )
        navigate( `/resource/${ objective.text.$id }` )
    }

    return (

        <div className="form--objective">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { objective.getName() }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ objective.$id } />

                <ListField type="event" label="Events" items={ objective.events } onNew={ onEventAdd } onEdit={ event => onEventEdit( event ) } onDelete={ event => onEventDelete( event ) } referenceCollection={ events } onReferenceAdd={ ref => update( `events`, [ ...objective.events, ref ] ) } onMoveUp={ index => update(  `events`, moveUp( objective.events, index ) ) } onMoveDown={ index => update(  `events`, moveDown( objective.events, index ) ) } />

                <TextField id="name" label="Name" value={ objective.name } onChange={ value => update( `name`, value ) } />

                <DropdownField id="state" items={ Objective.getStates().map( ( state, index ) => ({ caption: state, value: index.toString() }) ) } label="State" value={ objective.state.toString() } onChange={ value => update( `state`, parseInt( value ) ) } />

                <EntityField type="resource" label="Text" entity={ objective.text } onNew={ onTextAdd } onEdit={ onTextEdit } onDelete={ onTextDelete } referenceCollection={ resources } onReferenceChange={ ref => update( `objective`, ref ) } />

            </div>

        </div>

    )
}