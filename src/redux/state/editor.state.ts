import { MissionFile, ScenarioManifest, TimeTableFile } from "../../entity/editor"

export interface EditorState
{
    missionFile: MissionFile | null
    missionFilePath: string | null
    scenarioManifest: ScenarioManifest | null
    scenarioManifestPath: string | null
    selectedEntity: string | null
    timetableFile: TimeTableFile | null,
    timetableFilePath: string | null,
    toastDisplay: boolean
    toastMessage: string | null
}