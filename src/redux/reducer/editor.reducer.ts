import { createReducer } from "@reduxjs/toolkit"
import { LoadMissionFile, LoadScenarioManifest, LoadTimetableFile, ToastMessage, UpdateMissionFileField, UpdateScenarioManifestField, UpdateTimeTableFileField } from "../action/editor"
import { EditorState } from "../state"
import { SelectEntity } from "../action/editor/select-entity"
import { DeleteEntity } from "../action/scenario"
import { store } from "../store.ts"

const initialState: EditorState = {

    missionFile: null,
    missionFilePath: null,
    scenarioManifest: null,
    scenarioManifestPath: null,
    timetableFile: null,
    timetableFilePath: null,
    selectedEntity: null,
    toastDisplay: false,
    toastMessage: null

}

export const editorReducer = createReducer( initialState, builder => {

    builder.addCase( DeleteEntity, ( state, action ) => {

        if ( action.payload.type === `resource` && state.missionFile )
        {
            state.missionFile = { ... state.missionFile, resources: state.missionFile.resources.filter( r => r.$id !== action.payload.$id ) }
        }

    } )


    builder.addCase( LoadMissionFile, ( state, action) => {

        state.missionFile = action.payload.missionFile
        state.missionFilePath = action.payload.path

    } )

    builder.addCase( LoadScenarioManifest, ( state, action) => {

        state.scenarioManifest = action.payload.scenarioManifest
        state.scenarioManifestPath = action.payload.path

    } )

    builder.addCase( LoadTimetableFile, ( state, action) => {

        state.timetableFile = action.payload.timeTableFile
        state.timetableFilePath = action.payload.path

    } )

    builder.addCase( SelectEntity, ( state, action ) => {

        state.selectedEntity = action.payload.$id

    } )

    builder.addCase( UpdateMissionFileField, ( state, action) => {

        if ( state.missionFile === null )
        {
            return
        }

        state.missionFile = { ... state.missionFile, [ action.payload.field ]: action.payload.value }

    } )

    builder.addCase( UpdateScenarioManifestField, ( state, action) => {

        if ( state.scenarioManifest === null )
        {
            return
        }

        state.scenarioManifest = { ... state.scenarioManifest, [ action.payload.field ]: action.payload.value }

    } )

    builder.addCase( UpdateTimeTableFileField, ( state, action) => {

        if ( state.timetableFile === null )
        {
            return
        }

        if ( action.payload.field === `StartRadioChannels` )
        {
            state.timetableFile = { ... state.timetableFile, StartRadioChannels: [ action.payload.value as number ] }
            return
        }

        state.timetableFile = { ... state.timetableFile, [ action.payload.field ]: action.payload.value }

    } )

    builder.addCase( ToastMessage, ( state, action) => {

        state.toastDisplay = action.payload.message !== null

        if ( action.payload.message !== null )
        {
            state.toastMessage = action.payload.message
            setTimeout( () => {
                store.dispatch( ToastMessage( { message: null } ) )
            }, 6000 )
        }

    } )

} )