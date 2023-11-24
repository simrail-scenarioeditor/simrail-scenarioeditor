export abstract class Entity
{
    protected static maxId: string
    $id: string

    constructor ( json: any )
    {
        this.$id = json.$id
        if ( Entity.maxId === undefined || parseInt( json.$id ) > parseInt( Entity.maxId ) )
        {
            Entity.maxId = json.$id
        }
    }

    getName (): string
    {
        return `Entity#${ this.$id }`
    }

    isReference (): boolean
    {
        return false
    }

    static getNextId (): string
    {
        return ( parseInt( this.maxId ) + 1 ).toString()
    }

}