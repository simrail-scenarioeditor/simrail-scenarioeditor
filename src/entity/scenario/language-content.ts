import { Entity } from "./entity"
import { store } from "../../redux/store"
import { CreateEntity } from "../../redux/action/scenario"

export class LanguageContent extends Entity
{
    text: string
    audioFile: string

    constructor ( json: any )
    {
        super( json )

        this.audioFile = json.audioFile
        this.text = json.text

        store.dispatch( CreateEntity( { collection: `languageContents`, entity: this } ) )
    }

    getName (): string
    {
        return `LanguageContent#${ this.$id }`
    }

    static create (): LanguageContent
    {
        return new LanguageContent( {
            $id: Entity.getNextId(),
            audioFile: ``,
            text: ``
        } )
    }
}