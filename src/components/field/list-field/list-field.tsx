import { Entity, ListOfEntities, Reference } from "../../../entity/scenario"
import { EntityBox } from "../../entity-box"
import { ReferencesModal } from "../../modal"
import { useState } from "react"

interface ListFieldProps<T>
{
    label: string
    items: ( T | Reference )[]
    referenceCollection: Entity[]

    type: `action` | `condition` | `content` | `language-content` | `event` | `mission` | `objective` | `resource` | `timer` | `train` | `trigger`

    onMoveUp: ( index: number ) => void
    onMoveDown: ( index: number ) => void

    onDelete: ( item: T | Reference ) => void
    onEdit: ( item: T | Reference ) => void
    onNew: () => void
    onReferenceAdd: ( reference: Reference ) => void
}

export const ListField = <T extends ListOfEntities>( props: ListFieldProps<T> ) =>
{
    const [ showModal, setShowModal ] = useState( false )

    const onAddReference = () => {

        return () => setShowModal( true )

    }

    const onMoveUp = ( index: number ) =>
    {
        if ( index === 0 )
        {
            return undefined
        }
        return () => props.onMoveUp( index )
    }

    const onMoveDown = ( index: number ) =>
    {
        if ( index === props.items.length - 1 )
        {
            return undefined
        }
        return () => props.onMoveDown( index )
    }

    return (

        <div className="field field--list">

            <div className="left">

                <label>{ props.label }</label>

                <div className="actions">

                    <a onClick={ props.onNew }>Create</a>
                    <a onClick={ onAddReference() }>Add ref</a>

                </div>

            </div>

            <div className="list">

                { props.items.length > 0 ?
                    props.items.map( ( item, index ) => {
                        return <EntityBox<T> key={ item.$id } entity={ item } onDelete={ () => props.onDelete( item ) } onEdit={ () => props.onEdit( item ) } showMoveButtons={ true } onMoveUp={ onMoveUp( index ) } onMoveDown={ onMoveDown( index ) } type={ props.type } />
                    } ) :
                    <i>empty list</i>
                }

            </div>

            { showModal ? (

                <ReferencesModal collection={ props.referenceCollection.filter( e => props.items.find( i => i.$id === e.$id ) === undefined ) } onSelect={ props.onReferenceAdd } onClose={ () => setShowModal( false ) } />

            ) : null }

        </div>

    )
}