import { useNavigate, useParams } from "react-router-dom"
import { Breadcrumb } from "../../breadcrumb"
import { DropdownField, EntityField, IdField, NumberField } from "../../field"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../redux/state"
import { store } from "../../../redux/store"
import { PushBreadcrumb } from "../../../redux/action/breadcrumb"
import { DeleteEntity, UpdateEntityField } from "../../../redux/action/scenario"
import { Condition, Objective } from "../../../entity/scenario"

export const ConditionForm = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { conditions, objectives } = useSelector( ( state: State ) => state.scenario )

    const condition = conditions.find( r => r.$id === params.id )

    if ( condition === undefined )
    {
        return <div className="form--condition" />
    }

    const update = ( field: string, value: any ) =>
    {
        dispatch( UpdateEntityField( { $id: params.id!, collection: `conditions`, field: field, value: value } ) )
    }

    const onObjectiveAdd = () =>
    {
        const o = Objective.create()
        update( `objective`, o )
        onObjectiveAdd()
    }

    const onObjectiveDelete = () =>
    {
        if ( !condition.objective )
        {
            return
        }

        if ( condition.objective.isReference() )
        {
            update( `objective`, null )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: condition.objective.$id, type: `objective` } ) )
    }

    const onObjectiveEdit = () =>
    {
        if ( !condition.objective )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: condition.objective.getName(), url: `/objective/${ condition.objective.$id }` } } ) )
        navigate( `/objective/${ condition.objective.$id }` )
    }

    return (

        <div className="form--condition">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { condition.getName() }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ condition.$id } />

                <DropdownField id="$type" items={ Condition.getTypes().map( type => ({ value: type, caption: type }) ) } label="Type" onChange={ value => update( `$type`, value ) } value={ condition.$type } />

                { condition.objective !== undefined ? (
                    <EntityField type="objective" label="Objective" entity={ condition.objective } onNew={ onObjectiveAdd } onEdit={ onObjectiveEdit } onDelete={ onObjectiveDelete } referenceCollection={ objectives } onReferenceChange={ ref => update( `objective`, ref ) } />
                ) : null }

                { condition.state !== undefined ? (
                    <NumberField id="state" label="State" value={ condition.state } onChange={ value => update( `state`, value ) } />
                ) : null }

            </div>

        </div>

    )
}