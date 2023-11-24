import { Mission, Reference, Resource } from "../scenario"
import { createEntityOrReference } from "../../helper"

export class MissionFile
{
    $id: string
    resources: ( Resource | Reference )[]
    externalResourcePrefix: string
    mission: Mission | Reference | null

    constructor ( json: any )
    {
        this.$id = json.$id
        this.externalResourcePrefix = json.externalResourcePrefix
        this.mission = createEntityOrReference( json.mission, Mission ) as Mission | Reference
        this.resources = json.resources.map( ( resourceJson: any ) => createEntityOrReference( resourceJson, Resource ) )
    }
}