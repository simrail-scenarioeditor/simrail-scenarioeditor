import { Modal } from "../modal"
import { Dropdown } from "../../dropdown"
import { Entity, Reference } from "../../../entity/scenario"
import { useState } from "react"

interface ReferencesModalProps
{
    collection: Entity[]
    value?: string
    onSelect: ( reference: Reference ) => void
    onClose: () => void
}

export const ReferencesModal = ( props: ReferencesModalProps ) =>
{
    const [ selected, setSelected ] = useState( props.value )

    const onCancel = () =>
    {
        props.onClose()
    }

    const onSelect = () =>
    {

        if ( selected !== undefined )
        {
            props.onSelect( new Reference( { $ref: selected } ) )
        }

        props.onClose()
    }

    return (

        <Modal className="references-modal" onClose={ props.onClose }>

            <div className="modal-title">Select reference</div>

            <Dropdown id="references-dropdown" items={ props.collection.map( ( entity: any ) => ( { value: entity.$id, caption: entity.getName() } ) ) } onChange={ setSelected } unselected={ true } />

            <footer>

                <button onClick={ onSelect }>Select</button>
                <button onClick={ onCancel }>Cancel</button>

            </footer>

        </Modal>

    )
}