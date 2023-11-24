import { useDispatch, useSelector } from "react-redux"
import { State } from "../../redux/state"
import { useNavigate } from "react-router-dom"
import { SetBreadcrumb } from "../../redux/action/breadcrumb"
import { EntityIcon } from "../entity-icon"

export const Breadcrumb = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { items } = useSelector( ( state: State ) => state.breadcrumb )

    const jump = ( { caption, url }: { caption: string, url: string } ) =>
    {
        const breadcrumb: { caption: string, url: string }[] = []
        for ( const item of items )
        {
            breadcrumb.push( item )
            if ( item.url === url && item.caption === caption )
            {
                dispatch( SetBreadcrumb( { items: breadcrumb } ) )
                navigate( item.url )
                return
            }
        }
    }

    return (

        <div className="breadcrumb">

            { items.map( item => (

                <a className="no-decor" key={ item.url } onClick={ () => jump( item ) }>

                    <EntityIcon type={ item.iconType } />
                    <span>{ item.caption }</span>

                </a>

            ) ) }

        </div>

    )
}