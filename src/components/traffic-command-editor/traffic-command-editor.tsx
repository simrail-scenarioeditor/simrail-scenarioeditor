import { TrafficCommand } from "./traffic-command"

interface TrafficCommandProps
{
    commandText: string
    onChange: ( commandText: string ) => void
}

export const TrafficCommandEditor = ( props: TrafficCommandProps ) =>
{
    const onAdd = () =>
    {
        const existingCommands = props.commandText === `` ? [] : props.commandText.split( `\n` )
        const defaultCommand = `~03|~02|~02|B_A|~15|~00~00~00~00~00~00~00~${ existingCommands.length.toString( 16 ).padStart( 2, `0` ) }|B_K2`

        if ( props.commandText === `` )
        {
            props.onChange( defaultCommand )
            return
        }

        const commands = [ ...existingCommands , defaultCommand ]
        props.onChange( commands.join( `\n` ) )
    }

    const onChange = ( index: number, value: string ) =>
    {
        const commands = props.commandText.split( `\n` )
        commands[ index ] = value
        props.onChange( commands.join( `\n` ) )
    }

    const onDelete = ( index: number ) =>
    {
        if ( props.commandText.split( `\n` ).length === 1 )
        {
            props.onChange( `` )
            return
        }

        const commands = props.commandText.split( `\n` ).filter( ( _, i ) => i !== index )
        props.onChange( commands.join( `\n` ) )
    }

    return (

        <div className="traffic-command-editor">

            { props.commandText !== `` ? props.commandText.split( `\n` ).map( ( command, index ) => (

                <TrafficCommand key={ index } command={ command } onChange={ value => onChange( index, value ) } onDelete={ () => onDelete( index ) } />

            ) ) : null }

            <footer>

                <a onClick={ onAdd }>Add</a>

            </footer>

        </div>

    )
}