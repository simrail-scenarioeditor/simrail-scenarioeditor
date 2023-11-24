import { Entity, ListOfEntities, Reference } from "../../../entity/scenario"
import { EntityBox } from "../../entity-box"
import { ReferencesModal } from "../../modal"
import { useState } from "react"

interface EntityFieldProps<T>
{
    label: string
    entity: T | Reference | null
    referenceCollection: Entity[]

    type: `action` | `condition` | `content` | `language-content` | `event` | `mission` | `objective` | `resource` | `timer` | `train` | `trigger`

    onDelete: () => void
    onEdit: () => void
    onNew: () => void
    onReferenceChange: ( reference: Reference ) => void
}

export const EntityField = <T extends ListOfEntities>( props: EntityFieldProps<T> ) =>
{
    const [ showModal, setShowModal ] = useState( false )

    const onEditReference = () =>
    {
        return () => setShowModal( true )
    }

    const onSetReference = () =>
    {
        return () => setShowModal( true )
    }

    return (

        <div className="field field--entity">

            <label>{ props.label }</label>
            <EntityBox entity={ props.entity } onNew={ props.onNew } onEdit={ props.onEdit } onDelete={ props.onDelete } onEditReference={ onEditReference() } onSetReference={ onSetReference() } type={ props.type } />

            { showModal ? (

                <ReferencesModal collection={ props.referenceCollection } onSelect={ props.onReferenceChange } onClose={ () => setShowModal( false ) } />

            ) : null }

        </div>

    )
}