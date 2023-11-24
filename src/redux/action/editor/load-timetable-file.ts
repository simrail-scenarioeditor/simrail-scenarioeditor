import { createAction } from "@reduxjs/toolkit"
import { TimeTableFile } from "../../../entity/editor"

interface LoadTimetableFilePayload
{
    path: string
    timeTableFile: TimeTableFile
}

export const LoadTimetableFile = createAction<LoadTimetableFilePayload>( `EDITOR__LOAD_TIMETABLE_FILE` )