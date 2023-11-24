import { ChangeEvent } from "react"

interface TrafficCommandProps
{
    command: string
    onChange: ( command: string ) => void
    onDelete: () => void
}

const sectionFields = [
    { name: `start`, startsWith: `Start: ` },
    { name: `startStation`, startsWith: `StartStation: ` },
    { name: `startLineNumber`, startsWith: `StartLineNumber: ` },
    { name: `startTrackNumber`, startsWith: `StartTrackNumber: ` },
    { name: `startMainDir`, startsWith: `StartMainDir: ` },
    { name: `end`, startsWith: `End: ` },
    { name: `endStation`, startsWith: `EndStation: ` },
    { name: `endLineNumber`, startsWith: `EndLineNumber: ` },
    { name: `endTrackNumber`, startsWith: `EndTrackNumber: ` },
    { name: `endMainDir`, startsWith: `EndMainDir: ` },
    { name: `type`, startsWith: `Type: `, def: `Poci~C4~85gowy` },
    { name: `points`, startsWith: `Points: `, def: `[]` },
    { name: `options`, startsWith: `Options: `, def: `[]` },
    { name: `activeIsolateds`, startsWith: `ActiveIsolateds: ` }
]

export const TrafficCommand = ( props: TrafficCommandProps ) =>
{
    const sections = props.command.split( `~0D~0A  ` )
    let [ commandStr, commandId ] = sections[ 0 ].split( `|- Id: ` )
    const command = commandStr.split( `|` )

    const onChange = () =>
    {
        if ( command[ 6 ] === `` )
        {
            command.splice( 6, 1 )
        }
        if ( commandId === `` || commandId === undefined )
        {
            sections[ 0 ] = command.join( `|` )
        }
        else
        {
            sections[ 0 ] = [ command.join( `|` ), commandId ].join( `|- Id: ` )
        }
        props.onChange( sections.join( `~0D~0A  ` ) )
    }


    const section = ( field: string ) =>
    {
        const param = sectionFields.find( sectionField => sectionField.name === field )

        if ( param === undefined )
        {
            return ``
        }

        const section = sections.find( section => section.startsWith( param.startsWith ) )

        if ( section === undefined )
        {
            return ``
        }

        return section.substring( param.startsWith.length, section.length )
    }

    const updateSection = ( field: string ) =>
    {

        return ( e: ChangeEvent<HTMLInputElement> ) => {

            const param = sectionFields.find( sectionField => sectionField.name === field )
            if ( param === undefined )
            {
                return
            }

            let found = false
            for ( let i = 0; i < sections.length; i++ )
            {
                if ( sections[ i ].startsWith( param.startsWith ) )
                {
                    found = true
                    if ( e.target.value.length === 0 )
                    {
                        sections.splice( i, 1 )
                    }
                    else
                    {
                        sections[ i ] = `${ param.startsWith }${ e.target.value }`
                    }
                }
            }
            if ( !found && e.target.value.length > 0 )
            {
                sections.push( `${ param.startsWith }${ e.target.value }` )
            }
            onChange()

        }

    }

    const updateCommand = ( n: number ) =>
    {
        return ( e: ChangeEvent<HTMLInputElement> ) => {
            command[ n ] = e.target.value
            onChange()
        }
    }

    const updateCommandId = () =>
    {
        return ( e: ChangeEvent<HTMLInputElement> ) => {
            commandId = e.target.value
            onChange()
        }
    }

    return (

        <div className="traffic-command">

            <div className="command">

                <div className="input">

                    <label></label>
                    <input className="short" type="text" value={ command[ 0 ] } onChange={ updateCommand( 0 ) } />

                </div>

                <div className="input">

                    <label></label>
                    <input className="short" type="text" value={ command[ 1 ] } onChange={ updateCommand( 1 ) } />

                </div>

                <div className="input">

                    <label>C. type</label>
                    <input className="short" type="text" value={ command[ 2 ] } onChange={ updateCommand( 2 ) } list="datalist-commandTypes" />

                </div>

                <div className="input">

                    <label>{ [ `~03`, `~04` ].includes( command[ 4 ] ) ? `Switch` : `Start signal` }</label>
                    <input type="text" value={ command[ 3 ] } onChange={ updateCommand( 3 ) } list="datalist-signals" />

                </div>

                <div className="input">

                    <label>Cmd.</label>
                    <input className="short" type="text" value={ command[ 4 ] } onChange={ updateCommand( 4 ) } list="datalist-commands" />

                </div>

                <div className="input">

                    <label>Sequence</label>
                    <input className="sequence" type="text" value={ command[ 5 ] } onChange={ updateCommand( 5 ) } />

                </div>

                <div className="input">

                    <label>{ [ `~03`, `~04`, `~17`, `~19`, `~1C` ].includes( command[ 4 ] ) ? `` : `End signal` }</label>
                    <input type="text" value={ command[ 6 ] } onChange={ updateCommand( 6 ) } list="datalist-signals" />

                </div>

                <div className="input">

                    <label>Id</label>
                    <input type="text" value={ commandId } onChange={ updateCommandId() } />

                </div>

            </div>

            <div className="params">

                <div className="input">

                    <label>Start</label>
                    <input className="long" type="text" value={ section( `start` ) } onChange={ updateSection( `start` ) } list="datalist-signals" />

                </div>

                <div className="input">

                    <label>End</label>
                    <input className="long" type="text" value={ section( `end` ) } onChange={ updateSection( `end` ) } list="datalist-signals" />

                </div>

                <div className="input">

                    <label>Start station</label>
                    <input className="long" type="text" value={ section( `startStation` ) } onChange={ updateSection( `startStation` ) }  />

                </div>

                <div className="input">

                    <label>End station</label>
                    <input className="long" type="text" value={ section( `endStation` ) } onChange={ updateSection( `endStation` ) }  />

                </div>

            </div>

            <div className="params">

                <div className="input">

                    <label>Start line number</label>
                    <input className="long" type="text" value={ section( `startLineNumber` ) } onChange={ updateSection( `startLineNumber` ) }  />

                </div>

                <div className="input">

                    <label>End line number</label>
                    <input className="long" type="text" value={ section( `endLineNumber` ) } onChange={ updateSection( `endLineNumber` ) }  />

                </div>

                <div className="input">

                    <label>Start track number</label>
                    <input className="long" type="text" value={ section( `startTrackNumber` ) } onChange={ updateSection( `startTrackNumber` ) }  />

                </div>

                <div className="input">

                    <label>End track number</label>
                    <input className="long" type="text" value={ section( `endTrackNumber` ) } onChange={ updateSection( `endTrackNumber` ) }  />

                </div>

            </div>

            <div className="params">

                <div className="input">

                    <label>Start main direction</label>
                    <input className="long" type="text" value={ section( `startMainDir` ) } onChange={ updateSection( `startMainDir` ) }  />

                </div>

                <div className="input">

                    <label>End main direction</label>
                    <input className="long" type="text" value={ section( `endMainDir` ) } onChange={ updateSection( `endMainDir` ) }  />

                </div>

                <div className="input">

                    <label>Type</label>
                    <input className="long" type="text" value={ section( `type` ) } onChange={ updateSection( `type` ) } list="datalist-types" />

                </div>

                <div className="input">

                    <label>Points</label>
                    <input className="long" type="text" value={ section( `points` ) } onChange={ updateSection( `points` ) }  />

                </div>

            </div>

            <div className="params">

                <div className="input">

                    <label>Options</label>
                    <input className="long" type="text" value={ section( `options` ) } onChange={ updateSection( `options` ) }  />

                </div>

                <div className="input">

                    <label>Active isolateds</label>
                    <input className="long" type="text" value={ section( `activeIsolateds` ) } onChange={ updateSection( `activeIsolateds` ) }  />

                </div>

                <div className="link">

                    <a className="warn" onClick={ props.onDelete }>Delete</a>

                </div>

            </div>

        </div>

    )
}