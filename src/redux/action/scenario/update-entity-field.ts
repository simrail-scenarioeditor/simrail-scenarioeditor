import { createAction } from "@reduxjs/toolkit"

interface UpdateEntityFieldPayload
{
    $id: string
    collection: string
    field: string
    value: string | number
}

export const UpdateEntityField = createAction<UpdateEntityFieldPayload>( `EDITOR__UPDATE_ENTITY_FIELD` )