import { createAction } from "@reduxjs/toolkit"

interface UpdateScenarioManifestFieldPayload
{
    field: string
    value: string | number
}

export const UpdateScenarioManifestField = createAction<UpdateScenarioManifestFieldPayload>( `EDITOR__UPDATE_SCENARIO_MANIFEST_FIELD` )