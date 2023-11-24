import { createAction } from "@reduxjs/toolkit"

interface SelectEntityPayload
{
    $id: string | null
}

export const SelectEntity = createAction<SelectEntityPayload>( `EDITOR__SELECT_ENTITY` )