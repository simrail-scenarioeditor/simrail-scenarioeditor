import { dialog, invoke } from "@tauri-apps/api"
import { MissionFile, ScenarioManifest, TimeTableFile } from "../entity/editor"
import { store } from "../redux/store"
import { LoadMissionFile, LoadScenarioManifest, LoadTimetableFile } from "../redux/action/editor"
import { SetBreadcrumb } from "../redux/action/breadcrumb"
import { ClearScenario } from "../redux/action/scenario"
import { join } from "@tauri-apps/api/path"


export const openScenario = async () =>
{
    const xmlParser = new DOMParser()

    const scenarioManifestPath = await dialog.open( { directory: false, filters: [ { extensions: [ `xml` ], name: `ScenarioManifest.xml` } ], multiple: false } ) as string | null
    if ( !scenarioManifestPath )
    {
        return
    }

    const content = await invoke( `read_file`, { path: scenarioManifestPath } ) as string
    if ( !content )
    {
        return
    }

    store.dispatch( ClearScenario() )
    const scenarioManifest = new ScenarioManifest( xmlParser.parseFromString( content, `application/xml` ) )
    store.dispatch( LoadScenarioManifest( { scenarioManifest, path: scenarioManifestPath } ) )

    // --- mission file ---

    const missionFilePath = await join( scenarioManifestPath!, `..`, scenarioManifest.MissionFile )
    const missionFileContent = await invoke( `read_file`, { path: missionFilePath } ) as string
    if ( !missionFileContent )
    {
        return
    }

    const missionFile = new MissionFile( JSON.parse( missionFileContent ) )
    store.dispatch( LoadMissionFile( { missionFile, path: missionFilePath } ) )

    // --- mission file ---

    const timetableFilePath = await join( scenarioManifestPath!, `..`, scenarioManifest.TimeTableFile )
    const timetableFileContent = await invoke( `read_file`, { path: timetableFilePath } ) as string
    if ( !timetableFileContent )
    {
        return
    }

    const timeTableFile = new TimeTableFile( xmlParser.parseFromString( timetableFileContent, `application/xml` ) )
    store.dispatch( LoadTimetableFile( { timeTableFile, path: timetableFilePath } ) )


    store.dispatch( SetBreadcrumb( { items: [ { caption: scenarioManifest.Scenario_Name, url: `/scenario-manifest` } ] } ) )

}