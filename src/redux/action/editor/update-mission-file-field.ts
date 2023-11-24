import { createAction } from "@reduxjs/toolkit"
import { Reference, Resource } from "../../../entity/scenario"

interface UpdateMissionFileFieldPayload
{
    field: string
    value: string | number | ( Resource | Reference )[]
}

export const UpdateMissionFileField = createAction<UpdateMissionFileFieldPayload>( `EDITOR__UPDATE_MISSION_FILE_FIELD` )