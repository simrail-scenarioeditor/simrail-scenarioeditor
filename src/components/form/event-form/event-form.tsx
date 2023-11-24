import { useNavigate, useParams } from "react-router-dom"
import { Breadcrumb } from "../../breadcrumb"
import { EntityField, IdField, ListField, NumberField } from "../../field"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { DeleteEntity, UpdateEntityField } from "../../../redux/action/scenario"
import { store } from "../../../redux/store"
import { PushBreadcrumb } from "../../../redux/action/breadcrumb"
import { Action, Condition, Reference, Trigger } from "../../../entity/scenario"
import { moveDown, moveUp } from "../../../helper"

export const EventForm = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { actions, conditions, events, triggers } = useSelector( ( state: State ) => state.scenario )

    const event = events.find( r => r.$id === params.id )

    if ( event === undefined )
    {
        return <div className="form--event" />
    }

    const update = ( field: string, value: any ) =>
    {
        dispatch( UpdateEntityField( { $id: params.id!, collection: `events`, field: field, value: value } ) )
    }

    const onActionAdd = () =>
    {
        const a = Action.create()
        update( `actions`, [ ... event.actions, a ] )
        onActionEdit( a )
    }

    const onActionDelete = ( action: Action | Reference ) =>
    {
        if ( action.isReference() )
        {
            update( `actions`, event.actions.filter( a => a.$id !== action.$id ) )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: action.$id, type: `action` } ) )
    }

    const onActionEdit = ( action: Action | Reference ) =>
    {
        store.dispatch( PushBreadcrumb( { item: { caption: action.getName(), url: `/action/${ action.$id }` } } ) )
        navigate( `/action/${ action.$id }` )
    }

    const onConditionAdd = () =>
    {
        const c = Condition.create()
        update( `conditions`, [ ...event.conditions, c ] )
        onConditionEdit( c )
    }

    const onConditionDelete = ( condition: Condition | Reference ) =>
    {
        if ( condition.isReference() )
        {
            update( `conditions`, event.conditions.filter( c => c.$id !== condition.$id ) )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: condition.$id, type: `condition` } ) )
    }

    const onConditionEdit = ( condition: Condition | Reference ) =>
    {
        store.dispatch( PushBreadcrumb( { item: { caption: condition.getName(), url: `/condition/${ condition.$id }` } } ) )
        navigate( `/condition/${ condition.$id }` )
    }

    const onTriggerDelete = () =>
    {
        if ( !event.trigger )
        {
            return
        }

        if ( event.trigger.isReference() )
        {
            update( `trigger`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: event.trigger.$id, type: `trigger` } ) )
    }

    const onTriggerAdd = () =>
    {
        const t = Trigger.create()
        update( `trigger`, t )
        onTriggerEdit()
    }

    const onTriggerEdit = () =>
    {
        if ( !event.trigger )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: event.trigger.getName(), url: `/trigger/${ event.trigger.$id }` } } ) )
        navigate( `/trigger/${ event.trigger.$id }` )
    }

    return (

        <div className="form--event">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { event.getName() }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ event.$id } />

                <ListField type="action" label="Actions" items={ event.actions } onNew={ onActionAdd } onEdit={ action => onActionEdit( action ) } onDelete={ action => onActionDelete( action ) } referenceCollection={ actions } onReferenceAdd={ ref => update( `actions`, [ ...event.actions, ref ] ) } onMoveUp={ index => update(  `actions`, moveUp( event.actions, index ) ) } onMoveDown={ index => update(  `actions`, moveDown( event.actions, index ) ) } />

                <ListField type="objective" label="Children" items={ event.children } onNew={ () => {} } onEdit={ () => {} } onDelete={ () => {} } referenceCollection={ [] } onReferenceAdd={ () => {} } onMoveUp={ () => {} } onMoveDown={ () => {} } />

                <ListField type="condition" label="Conditions" items={ event.conditions } onNew={ onConditionAdd } onEdit={ condition => onConditionEdit( condition ) } onDelete={ condition => onConditionDelete( condition ) } referenceCollection={ conditions } onReferenceAdd={ ref => update( `conditions`, [ ...event.conditions, ref ] ) } onMoveUp={ index => update(  `conditions`, moveUp( event.conditions, index ) ) } onMoveDown={ index => update(  `conditions`, moveDown( event.conditions, index ) ) } />

                <NumberField id="mode" label="Mode" value={ event.mode } onChange={ value => update( `mode`,  value ) } />

                <EntityField type="trigger" label="Trigger" entity={ event.trigger } onNew={ onTriggerAdd } onEdit={ onTriggerEdit } onDelete={ onTriggerDelete } referenceCollection={ triggers } onReferenceChange={ ref => update( `trigger`, ref ) } />

            </div>

        </div>

    )
}