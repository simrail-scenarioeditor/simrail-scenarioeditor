import { createAction } from "@reduxjs/toolkit"
import { Entity } from "../../../entity/scenario"

interface CreateEntityPayload
{
    collection: string
    entity: Entity
}

export const CreateEntity = createAction<CreateEntityPayload>( `SCENARIO__CREATE_ENTITY` )