import { useNavigate, useParams } from "react-router-dom"
import { Breadcrumb } from "../../breadcrumb"
import { CheckBoxField, DropdownField, EntityField, IdField, NumberField, TrafficCommandField } from "../../field"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { store } from "../../../redux/store"
import { PushBreadcrumb } from "../../../redux/action/breadcrumb"
import { DeleteEntity, UpdateEntityField } from "../../../redux/action/scenario"
import { Action, Objective, Resource, Timer, Train } from "../../../entity/scenario"

export const ActionForm = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { actions, objectives, resources, timers, trains } = useSelector( ( state: State ) => state.scenario )

    const action = actions.find( r => r.$id === params.id )

    if ( action === undefined )
    {
        return <div className="form--action" />
    }

    const update = ( field: string, value: any ) =>
    {
        dispatch( UpdateEntityField( { $id: params.id!, collection: `actions`, field: field, value: value } ) )
    }

    const onObjectiveAdd = () =>
    {
        const o = Objective.create()
        update( `objective`, o )
        onObjectiveEdit()
    }

    const onObjectiveDelete = () =>
    {
        if ( !action.objective )
        {
            return
        }

        if ( action.objective.isReference() )
        {
            update( `objective`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: action.objective.$id, type: `objective` } ) )
    }

    const onObjectiveEdit = () =>
    {
        if ( !action.objective )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: action.objective.getName(), url: `/objective/${ action.objective.$id }` } } ) )
        navigate( `/objective/${ action.objective.$id }` )
    }

    const onResAdd = () =>
    {
        const r = Resource.create()
        update( `res`, r )
        onResEdit()
    }

    const onResDelete = () =>
    {
        if ( !action.res )
        {
            return
        }

        if ( action.res.isReference() )
        {
            update( `res`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: action.res.$id, type: `resource` } ) )
    }

    const onResEdit = () =>
    {
        if ( !action.res )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: action.res.getName(), url: `/resource/${ action.res.$id }` } } ) )
        navigate( `/resource/${ action.res.$id }` )
    }

    const onTimerAdd = () =>
    {
        const t = Timer.create()
        update( `timer`, t )
        onTimerEdit()
    }

    const onTimerDelete = () =>
    {
        if ( !action.timer )
        {
            return
        }

        if ( action.timer.isReference() )
        {
            update( `timer`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: action.timer.$id, type: `timer` } ) )
    }

    const onTimerEdit = () =>
    {
        if ( !action.timer )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: action.timer.getName(), url: `/timer/${ action.timer.$id }` } } ) )
        navigate( `/timer/${ action.timer.$id }` )
    }

    const onTrainAdd = () =>
    {
        const t = Train.create()
        update( `train`, t )
        onTrainEdit()
    }

    const onTrainDelete = () =>
    {
        if ( !action.train )
        {
            return
        }

        if ( action.train.isReference() )
        {
            update( `train`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: action.train.$id, type: `train` } ) )
    }

    const onTrainEdit = () =>
    {
        if ( !action.train )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: action.train.getName(), url: `/train/${ action.train.$id }` } } ) )
        navigate( `/train/${ action.train.$id }` )
    }

    const onWillFinishAdd = () =>
    {
        const o = Objective.create()
        update( `willFinish`, o )
        onWillFinishEdit()
    }

    const onWillFinishDelete = () =>
    {
        if ( !action.willFinish )
        {
            return
        }

        if ( action.willFinish.isReference() )
        {
            update( `willFinish`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: action.willFinish.$id, type: `objective` } ) )
    }

    const onWillFinishEdit = () =>
    {
        if ( !action.willFinish )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: action.willFinish.getName(), url: `/objective/${ action.willFinish.$id }` } } ) )
        navigate( `/objective/${ action.willFinish.$id }` )
    }

    return (

        <div className="form--action">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { action.getName() }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ action.$id } />

                <DropdownField id="$type" items={ Action.getTypes().map( type => ({ value: type, caption: type }) ) } label="Type" onChange={ value => update( `$type`, value ) } value={ action.$type } />

                { action.action !== undefined ? (
                    <NumberField id="action" label="Action" value={ action.action } onChange={ value => update( `action`, value ) } />
                ) : null }

                { action.commandText !== undefined ? (
                    <>
                        <TrafficCommandField label="Command text" value={ action.commandText } onChange={ value => update( `commandText`, value ) } />
                    </>
                ) : null }

                { action.delay !== undefined ? (
                    <NumberField id="delay" label="Delay" value={ action.delay } onChange={ value => update( `delay`, value ) } />
                ) : null }

                { action.humidity !== undefined ? (
                    <NumberField id="humidity" label="Humidity" value={ action.humidity } onChange={ value => update( `humidity`, value ) } />
                ) : null }

                { action.instant !== undefined ? (
                    <CheckBoxField id="instant" label="Instant" value={ action.instant } onChange={ value => update( `instant`, value ) } />
                ) : null }

                { action.objective !== undefined ? (
                    <EntityField type="objective" label="Objective" entity={ action.objective } onNew={ onObjectiveAdd } onEdit={ onObjectiveEdit } onDelete={ onObjectiveDelete } referenceCollection={ objectives } onReferenceChange={ ref => update( `objective`, ref ) } />
                ) : null }

                { action.position !== undefined ? (
                    <NumberField id="position" label="Position" value={ action.position } onChange={ value => update( `position`, value ) } />
                ) : null }

                { action.pressure !== undefined ? (
                    <NumberField id="pressure" label="Pressure" value={ action.pressure } onChange={ value => update( `pressure`, value ) } />
                ) : null }

                { action.res !== undefined ? (
                    <EntityField type="resource" label="Res" entity={ action.res } onNew={ onResAdd } onEdit={ onResEdit } onDelete={ onResDelete } referenceCollection={ resources } onReferenceChange={ ref => update( `res`, ref ) } />
                ) : null }

                { action.requestRemoval !== undefined ? (
                    <CheckBoxField id="request-removal" label="Request removal" value={ action.requestRemoval } onChange={ value => update( `requestRemoval`, value ) } />
                ) : null }

                { action.requestSpawn !== undefined ? (
                    <CheckBoxField id="request-spawn" label="Request spawn" value={ action.requestSpawn } onChange={ value => update( `requestSpawn`, value ) } />
                ) : null }

                { action.state !== undefined ? (
                    <DropdownField id="state" items={ Objective.getStates().map( ( state, index ) => ({ caption: state, value: index.toString() }) ) } label="State" value={ action.state.toString() } onChange={ value => update( `state`, parseInt( value ) ) } />
                ) : null }

                { action.temperature !== undefined ? (
                    <NumberField id="temperature" label="Temperature" value={ action.temperature } onChange={ value => update( `temperature`, value ) } />
                ) : null }

                { action.timeout !== undefined ? (
                    <NumberField id="timeout" label="Timeout" value={ action.timeout } onChange={ value => update( `timeout`, value ) } />
                ) : null }

                { action.timer !== undefined ? (
                    <EntityField type="timer" label="Timer" entity={ action.timer } onNew={ onTimerAdd } onEdit={ onTimerEdit } onDelete={ onTimerDelete } referenceCollection={ timers } onReferenceChange={ ref => update( `timer`, ref ) } />
                ) : null }

                { action.train !== undefined ? (
                    <EntityField type="train" label="Train" entity={ action.train } onNew={ onTrainAdd } onEdit={ onTrainEdit } onDelete={ onTrainDelete } referenceCollection={ trains } onReferenceChange={ ref => update( `train`, ref ) } />
                ) : null }

                { action.tutorial !== undefined ? (
                    <NumberField id="tutorial" label="Tutorial" value={ action.tutorial } onChange={ value => update( `tutorial`, value ) } />
                ) : null }

                { action.until !== undefined ? (
                    <CheckBoxField id="until" label="Until" value={ action.until } onChange={ value => update( `until`, value ) } />
                ) : null }

                { action.visibility !== undefined ? (
                    <NumberField id="visibility" label="Visibility" value={ action.visibility } onChange={ value => update( `visibility`, value ) } />
                ) : null }

                { action.weatherCode !== undefined ? (
                    <DropdownField id="weather-code" label="Weather code" value={ action.weatherCode.toString() } onChange={ value => update( `weatherCode`, value ) } items={ Action.getWeatherCodes() } />
                ) : null }

                { action.windDeg !== undefined ? (
                    <NumberField id="wind-deg" label="Wind deg" value={ action.windDeg } onChange={ value => update( `windDeg`, value ) } />
                ) : null }

                { action.windSpeed !== undefined ? (
                    <NumberField id="wind-speed" label="Wind speed" value={ action.windSpeed } onChange={ value => update( `windSpeed`, value ) } />
                ) : null }

                { action.willFinish !== undefined ? (
                    <EntityField type="objective" label="Will finish" entity={ action.willFinish } onNew={ onWillFinishAdd } onEdit={ onWillFinishEdit } onDelete={ onWillFinishDelete } referenceCollection={ objectives } onReferenceChange={ ref => update( `willFinish`, ref ) } />
                ) : null }

            </div>

        </div>

    )
}