import { Entity } from "./entity"
import { Content } from "./content"
import { createEntityOrReference } from "../../helper"
import { store } from "../../redux/store"
import { CreateEntity } from "../../redux/action/scenario"
import { Reference } from "./reference"

export class Resource extends Entity
{
    name: string
    associatedLocation: string
    radio: boolean
    content: Content | Reference | null
    langCode: string

    constructor ( json: any )
    {
        super( json )

        this.associatedLocation = json.associatedLocation
        this.content = createEntityOrReference( json.content, Content ) as Content | Reference
        this.langCode = json.langCode
        this.name = json.name
        this.radio = json.radio

        store.dispatch( CreateEntity( { collection: `resources`, entity: this } ) )
    }

    getName(): string
    {
        return this.name
    }

    static create (): Resource
    {
        return new Resource( {
            $id: Entity.getNextId(),
            content: null,
            langCode: ``,
            name: `New resource`,
            radio: false
        } )
    }
}