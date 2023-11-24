import { createAction } from "@reduxjs/toolkit"
import { MissionFile } from "../../../entity/editor"

interface LoadMissionFilePayload
{
    path: string
    missionFile: MissionFile
}

export const LoadMissionFile = createAction<LoadMissionFilePayload>( `EDITOR__LOAD_MISSION_FILE` )