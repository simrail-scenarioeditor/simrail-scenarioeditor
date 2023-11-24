import { createAction } from "@reduxjs/toolkit"

interface DeleteEntityPayload
{
    type: `action` | `condition` | `content` | `event` | `language-content` | `objective` | `resource` | `timer` | `train` | `trigger`
    $id: string
}

export const DeleteEntity = createAction<DeleteEntityPayload>( `SCENARIO__DELETE_ENTITY` )