import { useDispatch, useSelector } from "react-redux"
import { Breadcrumb } from "../../breadcrumb"
import { State } from "../../../redux/state"
import { IdField, TextField, ListField, EntityField } from "../../field"
import { UpdateMissionFileField } from "../../../redux/action/editor"
import { Reference, Resource } from "../../../entity/scenario"
import { store } from "../../../redux/store"
import { PushBreadcrumb } from "../../../redux/action/breadcrumb"
import { useNavigate } from "react-router-dom"
import { DeleteEntity } from "../../../redux/action/scenario"
import { moveDown, moveUp } from "../../../helper"

export const MissionFileForm = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { missionFile, missionFilePath } = useSelector( ( state: State ) => state.editor )
    const { resources } = useSelector( ( state: State ) => state.scenario )

    if ( missionFile === null || missionFilePath === null )
    {
        return <div className="form--mission-file" />
    }

    const onMissionAdd = () =>
    {}

    const onMissionDelete = () =>
    {}

    const onMissionReferenceChange = () =>
    {}

    const onMissionEdit = () =>
    {
        if ( !missionFile.mission )
        {
            return
        }

        store.dispatch( PushBreadcrumb( { item: { caption: missionFile.mission.getName(), url: `/mission/${ missionFile.mission.$id }` } } ) )
        navigate( `/mission/${ missionFile.mission.$id }` )
    }

    const onResourceAdd = () =>
    {
        const r = Resource.create()
        dispatch( UpdateMissionFileField( { field: `resources`, value: [ ...missionFile.resources, r ] } ) )
        onResourceEdit( r )
    }

    const onResourceDelete = ( resource: Resource | Reference ) =>
    {
        if ( resource.isReference() )
        {
            dispatch( UpdateMissionFileField( { field: `resources`, value: missionFile.resources.filter( r => r.$id !== resource.$id ) } ) )
            return
        }

        /* if ( !confirm( `Are you sure? This will delete every reference to this object too!` ) )
        {
            return
        }*/

        store.dispatch( DeleteEntity( { $id: resource.$id, type: `resource` } ) )
    }

    const onResourceEdit = ( resource: Resource | Reference ) =>
    {
        store.dispatch( PushBreadcrumb( { item: { caption: resource.getName(), url: `/resource/${ resource.$id }` } } ) )
        navigate( `/resource/${ resource.$id }` )
    }

    return (

        <div className="form--mission-file">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { missionFilePath.substring( missionFilePath.lastIndexOf( `\\` ) + 1 ) }

                </div>

            </header>

            <div className="form__body">

                <IdField id="$id" value={ missionFile.$id } />

                <TextField id="external-resource-prefix" label="External Resource Prefix" onChange={ value => dispatch( UpdateMissionFileField( { field: `externalResourcePrefix`, value: value } ) ) } value={ missionFile.externalResourcePrefix } />

                <EntityField type="mission" label="Mission" entity={ missionFile.mission } onNew={ onMissionAdd } onEdit={ onMissionEdit } onDelete={ onMissionDelete } referenceCollection={ [] } onReferenceChange={ onMissionReferenceChange } />

                <ListField type="resource" label="Resources" items={ missionFile.resources } onNew={ onResourceAdd } onEdit={ onResourceEdit } onDelete={ onResourceDelete } referenceCollection={ resources } onReferenceAdd={ ref => dispatch( UpdateMissionFileField( { field: `resources`, value: [ ...missionFile.resources, ref ] } ) ) } onMoveUp={ index => dispatch( UpdateMissionFileField( { field: `resources`, value: moveUp( missionFile.resources, index ) } ) ) } onMoveDown={ index => dispatch( UpdateMissionFileField( { field: `resources`, value: moveDown( missionFile.resources, index ) } ) ) } />

            </div>

        </div>

    )
}