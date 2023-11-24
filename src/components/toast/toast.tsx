import { useSelector } from "react-redux"
import { State } from "../../redux/state"

export const Toast = () =>
{
    const { toastDisplay, toastMessage } = useSelector( ( state: State ) => state.editor )

    return (

        <div className={ `toast ${ toastDisplay ? `show` : `` }` }>

            { toastMessage }

        </div>

    )
}