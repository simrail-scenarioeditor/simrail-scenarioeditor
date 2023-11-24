import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { breadcrumbReducer, editorReducer, scenarioReducer } from "./reducer"

export const store = configureStore( {
    middleware: (getDefaultMiddleware) => getDefaultMiddleware( { serializableCheck: false } ),
    reducer: combineReducers( {
        breadcrumb: breadcrumbReducer,
        editor: editorReducer,
        scenario: scenarioReducer
    } )
} )