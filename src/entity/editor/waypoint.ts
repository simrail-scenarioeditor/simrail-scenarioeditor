import { XmlParser } from "../../helper"

const fields = [
    { name: `NameOfPoint`, type: `string` },
    { name: `DisplayName`, type: `string` },
    { name: `StopType`, type: `string` },
    { name: `Line`, type: `int` },
    { name: `Mileage`, type: `float` },
    { name: `ArrivalTime`, type: `int` },
    { name: `DepartureTime`, type: `int` },
    { name: `TrainType`, type: `string` },
    { name: `StationCategory`, type: `string` }
]

export class WayPoint
{
    NameOfPoint!: string
    DisplayName!: string
    StopType!: string
    Line!: number
    Mileage!: number
    ArrivalTime!: number
    DepartureTime!: number
    TrainType!: string
    StationCategory!: string

    constructor ( xml: Element )
    {
        for ( const field of fields )
        {
            const tag = XmlParser.checkTag( xml.querySelector( field.name ), field );
            ( this as any )[ field.name ] = XmlParser.getValue( tag, field.type )
        }
    }

    static create ()
    {
        const element = document.createElement( `WayPointFromXml` )
        element.innerHTML = `<NameOfPoint>Będzin</NameOfPoint><DisplayName>Będzin</DisplayName><StopType>commercialStop</StopType><Line>1</Line><Mileage>0</Mileage><ArrivalTime>0</ArrivalTime><DepartureTime>0</DepartureTime><TrainType>ROJ</TrainType><StationCategory>B</StationCategory>`
        return new WayPoint( element )
    }

    static toXML ( waypoint: WayPoint )
    {
        let xml = `    <WayPointFromXml>\n`

        for ( const field of fields )
        {
            xml += `      <${ field.name }>${ ( waypoint as any )[ field.name ] }</${ field.name }>\n`
        }

        xml += `    </WayPointFromXml>`
        return xml
    }
}