import { XmlParser } from "../../helper"
import { WayPoint } from "./waypoint"

const fields = [
    { name: `TrainName`, type: `string` },
    { name: `TrainNumber`, type: `string` },
    { name: `LineNumber`, type: `string` },
    { name: `From`, type: `string` },
    { name: `To`, type: `string` },
    { name: `WayPoints`, type: `waypoint[]` },
    { name: `StartSpeedLimit`, type: `int` },
    { name: `StartGlobalSpeedLimit`, type: `int` },
    { name: `StartRadioChannels`, type: `int[]` }
]

export class TimeTableFile
{
    TrainName!: string
    TrainNumber!: string
    LineNumber!: string
    From!: string
    To!: string
    WayPoints!: WayPoint[]
    StartSpeedLimit!: number
    StartGlobalSpeedLimit!: number
    StartRadioChannels!: number[]

    constructor ( xml: Document )
    {
        for ( const field of fields )
        {
            const tag = XmlParser.checkTag( xml.querySelector( field.name ), field );
            ( this as any )[ field.name ] = XmlParser.getValue( tag, field.type )
        }
    }

    static toXML ( timeTableFile: TimeTableFile )
    {
        let xml = `<?xml version="1.0" encoding="utf-8"?>\n<TimeTableStorage xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n`

        for ( const field of fields )
        {
            switch ( field.type )
            {
                case `int[]`:
                    if ( ( ( timeTableFile as any )[ field.name ] as number[] ).length === 0 )
                    {
                        xml += `  <${ field.name } />\n`
                    }
                    else
                    {
                        xml += `  <${ field.name }>\n${ ( ( timeTableFile as any )[ field.name ] as number[] ).map( n => `    <int>${ n }</int>` ).join( `\n` ) }\n  </${ field.name }>\n`
                    }
                    break
                case `waypoint[]`:
                    if ( ( ( timeTableFile as any )[ field.name ] as WayPoint[] ).length === 0 )
                    {
                        xml += `  <${ field.name } />\n`
                    }
                    else
                    {
                        xml += `  <${ field.name }>\n${ ( ( timeTableFile as any )[ field.name ] as WayPoint[] ).map( waypoint => WayPoint.toXML( waypoint ) ).join( `\n` ) }\n  </${ field.name }>\n`
                    }
                    break
                default:
                    xml += `  <${ field.name }>${ ( timeTableFile as any )[ field.name ] }</${ field.name }>\n`
            }
        }

        xml += `</TimeTableStorage>`

        return xml
    }
}