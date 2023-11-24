import { Entity } from "./entity"
import { store } from "../../redux/store"
import { CreateEntity } from "../../redux/action/scenario"
import { Reference } from "./reference"
import { createEntityOrReference } from "../../helper"
import { LanguageContent } from "./language-content"

export class Content extends Entity
{
    en: LanguageContent | Reference | null
    pl: LanguageContent | Reference | null

    constructor ( json: any )
    {
        super( json )

        this.en = createEntityOrReference( json.en, LanguageContent ) as LanguageContent | Reference
        this.pl = createEntityOrReference( json.pl, LanguageContent ) as LanguageContent | Reference

        store.dispatch( CreateEntity( { collection: `contents`, entity: this } ) )
    }

    getName (): string
    {
        return `Content#${ this.$id }`
    }

    static create (): Content
    {
        return new Content( {
            $id: Entity.getNextId(),
            en: null
        } )
    }
}