import { useNavigate, useParams } from "react-router-dom"
import { Breadcrumb } from "../../breadcrumb"
import { DropdownField, EntityField, IdField, NumberField, TextField } from "../../field"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { DeleteEntity, UpdateEntityField } from "../../../redux/action/scenario"
import { store } from "../../../redux/store"
import { PushBreadcrumb } from "../../../redux/action/breadcrumb"
import { Objective, Timer, Train, Trigger } from "../../../entity/scenario"

export const TriggerForm = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { objectives, timers, trains, triggers } = useSelector( ( state: State ) => state.scenario )

    const trigger = triggers.find( r => r.$id === params.id )

    if ( trigger === undefined )
    {
        return <div className="form--trigger" />
    }

    const update = ( field: string, value: any ) =>
    {
        dispatch( UpdateEntityField( { $id: params.id!, collection: `triggers`, field: field, value: value } ) )
    }

    const onObjectiveAdd = () =>
    {
        const o = Objective.create()
        update( `objective`, o )
        onObjectiveEdit()
    }

    const onObjectiveDelete = () =>
    {
        if ( !trigger.objective )
        {
            return
        }

        if ( trigger.objective.isReference() )
        {
            update( `objective`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: trigger.objective.$id, type: `objective` } ) )
    }

    const onObjectiveEdit = () =>
    {
        if ( !trigger.objective )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: trigger.objective.getName(), url: `/trigger/${ trigger.objective.$id }` } } ) )
        navigate( `/trigger/${ trigger.objective.$id }` )
    }

    const onTimerAdd = () =>
    {
        const t = Timer.create()
        update( `timer`, t )
        onTimerEdit()
    }

    const onTimerDelete = () =>
    {
        if ( !trigger.timer )
        {
            return
        }

        if ( trigger.timer.isReference() )
        {
            update( `timer`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: trigger.timer.$id, type: `timer` } ) )
    }

    const onTimerEdit = () =>
    {
        if ( !trigger.timer )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: trigger.timer.getName(), url: `/timer/${ trigger.timer.$id }` } } ) )
        navigate( `/timer/${ trigger.timer.$id }` )
    }

    const onTrainAdd = () =>
    {
        const t = Train.create()
        update( `train`, t )
        onTrainEdit()
    }

    const onTrainDelete = () =>
    {
        if ( !trigger.train )
        {
            return
        }

        if ( trigger.train.isReference() )
        {
            update( `train`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: trigger.train.$id, type: `train` } ) )
    }

    const onTrainEdit = () =>
    {
        if ( !trigger.train )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: trigger.train.getName(), url: `/train/${ trigger.train.$id }` } } ) )
        navigate( `/train/${ trigger.train.$id }` )
    }

    return (

        <div className="form--trigger">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { trigger.getName() }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ trigger.$id } />

                <DropdownField id="$type" items={ Trigger.getTypes().map( type => ({ value: type, caption: type }) ) } label="Type" onChange={ value => update( `$type`, value ) } value={ trigger.$type } />

                { trigger.distance !== undefined ? (
                    <NumberField id="distance" label="Distance" value={ trigger.distance } onChange={ value => update( `distance`, value ) } />
                ) : null }

                { trigger.maxSpeed !== undefined ? (
                    <NumberField id="max-speed" label="Max speed" value={ trigger.maxSpeed } onChange={ value => update( `maxSpeed`, value ) } />
                ) : null }

                { trigger.objective !== undefined ? (
                    <EntityField type="objective" label="Objective" entity={ trigger.objective } onNew={ onObjectiveAdd } onEdit={ onObjectiveEdit } onDelete={ onObjectiveDelete } referenceCollection={ objectives } onReferenceChange={ ref => update( `objective`, ref ) } />
                ) : null }

                { trigger.signalName !== undefined ? (
                    <TextField id="signal-name" label="Signal name" list="datalist-signals" value={ trigger.signalName } onChange={ value => update( `signalName`, value ) } />
                ) : null }

                { trigger.state !== undefined ? (
                    <NumberField id="state" label="State" value={ trigger.state } onChange={ value => update( `state`, value ) } />
                ) : null }

                { trigger.stationName !== undefined ? (
                    <TextField id="station-name" label="Station name" list="datalist-stations" value={ trigger.stationName } onChange={ value => update( `stationName`, value ) } />
                ) : null }

                { trigger.time !== undefined ? (
                    <NumberField id="time" label="Time" value={ trigger.time } onChange={ value => update( `time`, value ) } />
                ) : null }

                { trigger.timer !== undefined ? (
                    <EntityField type="timer" label="Timer" entity={ trigger.timer } onNew={ onTimerAdd } onEdit={ onTimerEdit } onDelete={ onTimerDelete } referenceCollection={ timers } onReferenceChange={ ref => update( `timer`, ref ) } />
                ) : null }

                { trigger.train !== undefined ? (
                    <EntityField type="train" label="Train" entity={ trigger.train } onNew={ onTrainAdd } onEdit={ onTrainEdit } onDelete={ onTrainDelete } referenceCollection={ trains } onReferenceChange={ ref => update( `train`, ref ) } />
                ) : null }

            </div>

        </div>

    )
}