import { EntityType, Reference } from "../entity/scenario"

export const createEntityOrReference = ( json: any, entityType: EntityType ) => {

    if ( json === undefined )
    {
        return undefined
    }

    if ( json === null )
    {
        return null
    }

    if ( json.$ref )
    {
        return new Reference( json )
    }

    return new entityType( json )
}