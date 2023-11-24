import { createAction } from "@reduxjs/toolkit"
import { WayPoint } from "../../../entity/editor"

interface UpdateTimeTableFileFieldPayload
{
    field: string
    value: string | number | WayPoint[]
}

export const UpdateTimeTableFileField = createAction<UpdateTimeTableFileFieldPayload>( `EDITOR__UPDATE_TIMETABLE_FILE_FIELD` )