interface DropdownItem
{
    caption: string
    value: string
}

interface DropdownProps
{
    id: string
    items: DropdownItem[]
    value?: string
    onChange: ( value: string ) => void
    unselected?: boolean
}

export const Dropdown = ( props: DropdownProps ) =>
{
    return (

        <div className="dropdown">

            <select id={ props.id } value={ props.value } onChange={ e => props.onChange( e.target.value ) }>

                { props.unselected ? (

                    <option disabled selected></option>

                ) : null }

                { props.items.map( item => (

                    <option key={ item.value } value={ item.value }>{ item.caption }</option>

                ) ) }

            </select>

        </div>

    )
}