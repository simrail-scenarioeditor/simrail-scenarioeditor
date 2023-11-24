import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import "./assets/global.scss"
import { store } from "./redux/store"
import { Router } from "./router"
import { invoke } from "@tauri-apps/api"
import { openScenario } from "./helper"
import { ToastMessage } from "./redux/action/editor"
import { Toast } from "./components"
import { ScenarioManifest, TimeTableFile } from "./entity/editor"
import { DataLists } from "./components/datalists"

const onSave = async () =>
{
    await invoke( `write_file`, { path: store.getState().editor.missionFilePath, content: JSON.stringify( store.getState().editor.missionFile, null, 2 ) } )
    await invoke( `write_file`, { path: store.getState().editor.scenarioManifestPath, content: ScenarioManifest.toXML( store.getState().editor.scenarioManifest ) } )
    await invoke( `write_file`, { path: store.getState().editor.timetableFilePath, content: TimeTableFile.toXML( store.getState().editor.timetableFile ) } )
    store.dispatch( ToastMessage( { message: `Scenario saved successfully!` } ) )
}

const onOpen = async () =>
{

    await openScenario()
    location.href = `#/scenario-manifest`

}

window.addEventListener( `keypress`, async event => {

    if ( event.code === `KeyS` && event.ctrlKey )
    {
        await onSave()
    }

    if ( event.code === `KeyO` && event.ctrlKey )
    {
        await onOpen()
    }

} )

ReactDOM.createRoot( document.body ).render(
    <React.StrictMode>
        <Provider store={ store }>
            <Router />
            <Toast />
            <DataLists />
        </Provider>
    </React.StrictMode>
)