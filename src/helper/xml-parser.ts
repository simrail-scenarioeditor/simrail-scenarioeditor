import { InvalidScenarioManifestException } from "../exception/editor"
import { WayPoint } from "../entity/editor"

interface Field
{
    name: string
    type: string
}

export class XmlParser
{
    static checkTag ( tag: Element | null, field: Field )
    {
        if ( tag === null )
        {
            throw new InvalidScenarioManifestException( `${ field.name } is required!` )
        }

        switch ( field.type )
        {
            case `date`:
                try
                {
                    new Date( tag.textContent! )
                }
                catch
                {
                    throw new InvalidScenarioManifestException( `${ field.name } is not a date!` )
                }
                break
            case `int`:
                if ( tag.textContent === null || isNaN( parseInt( tag.textContent ) ) )
                {
                    throw new InvalidScenarioManifestException( `${ field.name } is not an int!` )
                }
                break
            case `float`:
                if ( tag.textContent === null || isNaN( parseFloat( tag.textContent ) ) )
                {
                    throw new InvalidScenarioManifestException( `${ field.name } is not a float!` )
                }
                break
            case `int[]`:
                const ints = tag.querySelectorAll( `int` )
                ints.forEach( int => {
                    if ( int.textContent === null || isNaN( parseInt( int.textContent ) ) )
                    {
                        throw new InvalidScenarioManifestException( `${ field.name }'s elements are not int!` )
                    }
                } )
                break
            case `string[]`:
                const strings = tag.querySelectorAll( `string` )
                strings.forEach( str => {
                    if ( str.textContent === null )
                    {
                        throw new InvalidScenarioManifestException( `${ field.name }'s elements are not strings!` )
                    }
                } )
                break
            default:
        }

        return tag
    }

    static getValue ( tag: Element, type: string )
    {
        switch ( type )
        {
            case `date`:
                return new Date( tag.textContent! )
            case `int`:
                return parseInt( tag.textContent! )
            case `float`:
                return parseFloat( tag.textContent! )
            case `string[]`:
                const strings = tag.querySelectorAll( `string` )
                return Array.from( strings ).map( str => str.textContent! )
            case `int[]`:
                const ints = tag.querySelectorAll( `int` )
                return Array.from( ints ).map( int => parseInt( int.textContent! ) )
            case `waypoint[]`:
                const waypoints: WayPoint[] = []
                tag.querySelectorAll( `WayPointFromXml` ).forEach( el => waypoints.push( new WayPoint( el ) ) )
                return waypoints
            default:
                return tag.textContent!
        }
    }
}