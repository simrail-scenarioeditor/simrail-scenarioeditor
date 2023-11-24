import { MouseEvent, ReactNode } from "react"

interface ModalProps
{
    children: string | ReactNode | ReactNode[]
    className?: string
    onClose: () => void
}

export const Modal = ( props: ModalProps ) =>
{
    const onModalContainerClick = ( event: MouseEvent ) =>
    {
        if ( ( event.target as Element ).className.includes( `modal-container` ) )
        {
            props.onClose()
        }
    }

    return (

        <div className="modal-container" onClick={ onModalContainerClick }>

            <div className={ `modal ${ props.className }` }>

                { props.children }

            </div>

        </div>

    )
}