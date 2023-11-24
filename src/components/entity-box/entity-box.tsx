import { ListOfEntities, Reference } from "../../entity/scenario"
import { EntityIcon } from "../entity-icon"

interface EntityBoxProps<T>
{
    entity: T | Reference | null

    type: `action` | `condition` | `content` | `language-content` | `event` | `mission` | `objective` | `resource` | `timer` | `train` | `trigger`

    showMoveButtons?: boolean
    onMoveUp?: () => void
    onMoveDown?: () => void

    onDelete: () => void
    onEdit: () => void
    onEditReference?: () => void
    onNew?: () => void
    onSetReference?: () => void
}

export const EntityBox = <T extends ListOfEntities>( props: EntityBoxProps<T> ) =>
{
    return (

        <div className="entity-box">

            <EntityIcon type={ props.type } />
            <div className="entity-name">{ props.entity ? props.entity.getName() : <i>empty field</i> }</div>
            <div className="actions">

                { props.showMoveButtons ? (

                    <>

                        <a className={ props.onMoveUp ? `` : `disabled` } onClick={ props.onMoveUp }>Up</a>
                        <a className={ props.onMoveDown ? `` : `disabled` } onClick={ props.onMoveDown }>Down</a>

                    </>

                ) : null }

                { props.entity ? (
                    <>
                        <a onClick={ props.onEdit }>Edit</a>
                        { props.entity.isReference() && props.onEditReference !== undefined ? (
                            <a onClick={ props.onEditReference }>Edit ref</a>
                        ) : null }
                        <a className="warn" onClick={ props.onDelete }>Delete</a>
                    </>
                ) : (
                    <>
                        <a onClick={ props.onNew }>New</a>
                        <a className={ props.onSetReference === undefined ? `disabled` : `` } onClick={ props.onSetReference }>Set ref</a>
                    </>
                ) }

            </div>

        </div>

    )
}