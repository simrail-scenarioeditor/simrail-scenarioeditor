import { XmlParser } from "../../helper"

const fields = [
    { name: `Required_Level`, type: `int` },
    { name: `Train_Type`, type: `string` },
    { name: `Scenario_Name`, type: `string` },
    { name: `Train_Engine_Names`, type: `string[]` },
    { name: `Train_Car_Names`, type: `string[]` },
    { name: `Scenario_Start_Time`, type: `date` },
    { name: `Scenario_Lenght`, type: `int` },
    { name: `SeasonOfTheYear`, type: `string` },
    { name: `Difficulty`, type: `int` },
    { name: `TrackLenghtInMeters`, type: `int` },
    { name: `HeaderText`, type: `string` },
    { name: `SubHeaderText`, type: `string` },
    { name: `MapFile`, type: `string` },
    { name: `MainThumbnailPath`, type: `string` },
    { name: `MiniThumbnailPath1`, type: `string` },
    { name: `MiniThumbnailPath2`, type: `string` },
    { name: `MiniThumbnailPath3`, type: `string` },
    { name: `Description`, type: `string` },
    { name: `MissionFile`, type: `string` },
    { name: `TimeTableFile`, type: `string` }
]

export class ScenarioManifest
{
    Required_Level!: number
    Train_Type!: string
    Scenario_Name!: string
    Train_Engine_Names!: string[]
    Train_Car_Names!: string[]
    Scenario_Start_Time!: Date
    Scenario_Lenght!: number
    SeasonOfTheYear!: string
    Difficulty!: number
    TrackLenghtInMeters!: number
    HeaderText!: string
    SubHeaderText!: string
    MapFile!: string
    MainThumbnailPath!: string
    MiniThumbnailPath1!: string
    MiniThumbnailPath2!: string
    MiniThumbnailPath3!: string
    Description!: string
    MissionFile!: string
    TimeTableFile!: string
    
    constructor ( xml: Document )
    {
        for ( const field of fields )
        {
            const tag = XmlParser.checkTag( xml.querySelector( field.name ), field );
            ( this as any )[ field.name ] = XmlParser.getValue( tag, field.type )
        }
    }

    static toXML ( scenarioManifest: ScenarioManifest )
    {
        let xml = `<?xml version="1.0" encoding="utf-8"?>\n<ScenarioManifest xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n`

        for ( const field of fields )
        {
            switch ( field.type )
            {
                case `string[]`:
                    if ( ( ( scenarioManifest as any )[ field.name ] as string[] ).length === 0 )
                    {
                        xml += `  <${ field.name } />\n`
                    }
                    else
                    {
                        xml += `  <${ field.name }>\n${ ( ( scenarioManifest as any )[ field.name ] as string[] ).map( s => `    <string>${ s }</string>` ).join( `\n` ) }\n  </${ field.name }>\n`
                    }
                    break
                case `date`:
                    xml += `  <${ field.name }>${ ( ( scenarioManifest as any )[ field.name ] as Date ).toISOString() }</${ field.name }>\n`
                    break
                default:
                    xml += `  <${ field.name }>${ ( scenarioManifest as any )[ field.name ] }</${ field.name }>\n`
            }
        }

        xml += `</ScenarioManifest>`

        return xml
    }
}