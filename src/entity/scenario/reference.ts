import { store } from "../../redux/store"

export class Reference
{
    $ref: string

    constructor ( json: any )
    {
        this.$ref = json.$ref
    }

    get $id (): string
    {
        return this.$ref
    }

    getReferenced ()
    {
        const state = store.getState().scenario

        const entities = [ ...state.actions, ...state.conditions, ...state.contents, ...state.events, ...state.languageContents, ...state.missions, ...state.objectives, ...state.resources, ...state.timers, ...state.trains, ...state.triggers ]

        return entities.find( entity => entity.$id === this.$ref )
    }

    getName (): string
    {
        return `Ref: ${ this.getReferenced()?.getName() }`
    }

    isReference (): boolean
    {
        return true
    }

}