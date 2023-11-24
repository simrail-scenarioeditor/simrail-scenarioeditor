import { Breadcrumb } from "../../breadcrumb"
import { EntityField, IdField, ListField, TextField } from "../../field"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { DeleteEntity, UpdateEntityField } from "../../../redux/action/scenario"
import { Objective, Reference, Resource, Timer, Train } from "../../../entity/scenario"
import { store } from "../../../redux/store"
import { PushBreadcrumb } from "../../../redux/action/breadcrumb"
import { useNavigate, useParams } from "react-router-dom"
import { moveDown, moveUp } from "../../../helper"

export const MissionForm = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { missions, objectives, resources, timers, trains } = useSelector( ( state: State ) => state.scenario )

    const mission = missions.find( r => r.$id === params.id )

    if ( mission === undefined )
    {
        return <div className="form--mission"/>
    }

    const update = ( field: string, value: any ) =>
    {
        dispatch( UpdateEntityField( { $id: mission.$id, collection: `missions`, field: field, value: value } ) )
    }

    const onDescriptionDelete = () =>
    {
        if ( !mission.description )
        {
            return
        }

        if ( mission.description.isReference() )
        {
            update( `description`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: mission.description.$id, type: `resource` } ) )
    }

    const onDescriptionAdd = () =>
    {
        const r = Resource.create()
        update( `description`, r )
        onDescriptionEdit()
    }

    const onDescriptionEdit = () =>
    {
        if ( !mission.description )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: mission.description.getName(), url: `/resource/${ mission.description.$id }` } } ) )
        navigate( `/resource/${ mission.description.$id }` )
    }

    const onNameAdd = () =>
    {
        const r = Resource.create()
        update( `name`, r )
        onNameEdit()
    }

    const onNameDelete = () =>
    {
        if ( !mission.name )
        {
            return
        }

        if ( mission.name.isReference() )
        {
            update( `name`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: mission.name.$id, type: `resource` } ) )
    }

    const onNameEdit = () =>
    {
        if ( !mission.name )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: mission.name.getName(), url: `/resource/${ mission.name.$id }` } } ) )
        navigate( `/resource/${ mission.name.$id }` )
    }

    const onObjectiveAdd = () =>
    {
        const o = Objective.create()
        update( `objectives`, [ ...mission.objectives, o ] )
        onObjectiveEdit( o )
    }

    const onObjectiveDelete = ( objective: Objective | Reference ) =>
    {
        if ( objective.isReference() )
        {
            update( `objectives`, mission.objectives.filter( o => o.$id !== objective.$id ) )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: objective.$id, type: `objective` } ) )
    }

    const onObjectiveEdit = ( objective: Objective | Reference ) =>
    {
        store.dispatch( PushBreadcrumb( { item: { caption: objective.getName(), url: `/objective/${ objective.$id }` } } ) )
        navigate( `/objective/${ objective.$id }` )
    }

    const onTimerAdd = () =>
    {
        const t = Timer.create()
        update( `timers`, [ ...mission.timers, t ] )
        onTimerEdit( t )
    }

    const onTimerDelete = ( timer: Timer | Reference ) =>
    {
        if ( timer.isReference() )
        {
            update( `timers`, mission.timers.filter( t => t.$id !== timer.$id ) )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: timer.$id, type: `timer` } ) )
    }

    const onTimerEdit = ( timer: Timer | Reference ) =>
    {
        store.dispatch( PushBreadcrumb( { item: { caption: timer.getName(), url: `/timer/${ timer.$id }` } } ) )
        navigate( `/timer/${ timer.$id }` )
    }

    const onTrainAdd = () =>
    {
        const t = Train.create()
        update( `trains`, [ ...mission.trains, t ] )
        onTrainEdit( t )
    }

    const onTrainDelete = ( train: Train | Reference ) =>
    {
        if ( train.isReference() )
        {
            update( `trains`, mission.objectives.filter( t => t.$id !== train.$id ) )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: train.$id, type: `train` } ) )
    }

    const onTrainEdit = ( train: Train | Reference ) =>
    {
        store.dispatch( PushBreadcrumb( { item: { caption: train.getName(), url: `/train/${ train.$id }` } } ) )
        navigate( `/train/${ train.$id }` )
    }

    return (

        <div className="form--mission">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { mission.getName() }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ mission.$id } />

                <EntityField type="resource" label="Description" entity={ mission.description } onNew={ onDescriptionAdd } onEdit={ onDescriptionEdit } onDelete={ onDescriptionDelete } referenceCollection={ resources } onReferenceChange={ ref => update( `description`, ref ) } />

                <EntityField type="resource" label="Name" entity={ mission.name } onNew={ onNameAdd } onEdit={ onNameEdit } onDelete={ onNameDelete } referenceCollection={ resources } onReferenceChange={ ref => update( `name`, ref ) } />

                <ListField type="objective" label="Objectives" items={ mission.objectives } onNew={ onObjectiveAdd } onEdit={ objective => onObjectiveEdit( objective ) } onDelete={ objective => onObjectiveDelete( objective ) } referenceCollection={ objectives } onReferenceAdd={ ref => update( `objectives`, [ ...mission.objectives, ref ] ) } onMoveUp={ index => update(  `objectives`, moveUp( mission.objectives, index ) ) } onMoveDown={ index => update(  `objectives`, moveDown( mission.objectives, index ) ) } />

                <ListField type="timer" label="Timers" items={ mission.timers } onNew={ onTimerAdd } onEdit={ timer => onTimerEdit( timer ) } onDelete={ timer => onTimerDelete( timer ) } referenceCollection={ timers } onReferenceAdd={ ref => update( `timers`, [ ...mission.timers, ref ] ) } onMoveUp={ index => update(  `timers`, moveUp( mission.timers, index ) ) } onMoveDown={ index => update(  `timers`, moveDown( mission.timers, index ) ) } />

                <TextField id="train-number" label="Train number" value={ mission.trainNumber } onChange={ value => update( `trainNumber`,  value ) } />

                <ListField type="train" label="Trains" items={ mission.trains } onNew={ onTrainAdd } onEdit={ train => onTrainEdit( train ) } onDelete={ train => onTrainDelete( train ) } referenceCollection={ trains } onReferenceAdd={ ref => update( `trains`, [ ...mission.trains, ref ] ) } onMoveUp={ index => update(  `trains`, moveUp( mission.trains, index ) ) } onMoveDown={ index => update(  `trains`, moveDown( mission.trains, index ) ) } />

            </div>

        </div>

    )
}