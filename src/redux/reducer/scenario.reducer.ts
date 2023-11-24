import { createReducer } from "@reduxjs/toolkit"
import { ScenarioState } from "../state"
import { ClearScenario, CreateEntity, DeleteEntity, UpdateEntityField } from "../action/scenario"
import { updateEntity } from "../../helper"
import { Action, Condition, Trigger } from "../../entity/scenario"

const initialState: ScenarioState = {

    actions: [],
    conditions: [],
    contents: [],
    events: [],
    languageContents: [],
    missions: [],
    objectives: [],
    resources: [],
    timers: [],
    trains: [],
    triggers: []

}

export const scenarioReducer = createReducer( initialState, builder => {

    builder.addCase( ClearScenario, ( state ) => {

        state.actions = []
        state.conditions = []
        state.contents = []
        state.events = []
        state.languageContents = []
        state.missions = []
        state.objectives = []
        state.resources = []
        state.timers = []
        state.trains = []
        state.triggers = []

    } )

    builder.addCase( CreateEntity, ( state, action ) => {

        ( state as any )[ action.payload.collection ].push( action.payload.entity )

    } )

    builder.addCase( DeleteEntity, ( state, action ) => {

        switch ( action.payload.type )
        {
            case `action`:
                state.events.forEach( event => event.actions = event.actions.filter( a => a.$id !== action.payload.$id ) )
                state.actions = state.actions.filter( a => a.$id !== action.payload.$id )
                return
            case `condition`:
                state.events.forEach( event => event.conditions = event.conditions.filter( c => c.$id !== action.payload.$id ) )
                state.conditions = state.conditions.filter( c => c.$id !== action.payload.$id )
                return
            case `content`:
                state.resources.forEach( r => { if ( r.content && r.content.$id === action.payload.$id ) { r.content = null } } )
                state.contents = state.contents.filter( c => c.$id !== action.payload.$id )
                return
            case `event`:
                state.objectives.forEach( o => o.events = o.events.filter( e => e.$id !== action.payload.$id ) )
                state.events = state.events.filter( e => e.$id !== action.payload.$id )
                return
            case `language-content`:
                state.contents.forEach( c => { if ( c.en && c.en.$id === action.payload.$id ) { c.en = null } } )
                state.languageContents = state.languageContents.filter( l => l.$id !== action.payload.$id )
                return
            case `objective`:
                state.actions.forEach( a => {
                    if ( a.objective && a.objective.$id === action.payload.$id ) { a.objective = null }
                    if ( a.willFinish && a.willFinish.$id === action.payload.$id ) { a.willFinish = null }
                } )
                state.conditions.forEach( c => { if ( c.objective && c.objective.$id === action.payload.$id ) { c.objective = null } } )
                state.missions.forEach( m => { m.objectives = m.objectives.filter( o => o.$id !== action.payload.$id ) } )
                state.triggers.forEach( t => { if ( t.objective && t.objective.$id === action.payload.$id ) { t.objective = null } } )
                state.objectives = state.objectives.filter( o => o.$id !== action.payload.$id )
                return
            case `resource`:
                state.actions.forEach( a => { if ( a.res && a.res.$id === action.payload.$id ) { a.res = null } } )
                state.objectives.forEach( o => { if (o.text && o.text.$id === action.payload.$id ) { o.text = null } } )
                state.missions.forEach( m => {
                    if ( m.name && m.name.$id === action.payload.$id ) { m.name = null }
                    if ( m.description && m.description.$id === action.payload.$id ) { m.description = null }
                } )
                state.resources = state.resources.filter( r => r.$id !== action.payload.$id )
                return
            case `timer`:
                state.actions.forEach( a => { if ( a.timer && a.timer.$id === action.payload.$id ) { a.timer = null } } )
                state.missions.forEach( m => { m.timers = m.timers.filter( t => t.$id !== action.payload.$id ) } )
                state.triggers.forEach( t => { if ( t.timer && t.timer.$id === action.payload.$id ) { t.timer = null } } )
                state.timers = state.timers.filter( t => t.$id !== action.payload.$id )
                return
            case `train`:
                state.actions.forEach( a => { if ( a.train && a.train.$id === action.payload.$id ) { a.train = null } } )
                state.missions.forEach( m => { m.trains = m.trains.filter( t => t.$id !== action.payload.$id ) } )
                state.triggers.forEach( t => { if ( t.train && t.train.$id === action.payload.$id ) { t.train = null } } )
                state.trains = state.trains.filter( t => t.$id !== action.payload.$id )
                return
            case `trigger`:
                state.events.forEach( e => { if ( e.trigger && e.trigger.$id === action.payload.$id ) { e.trigger = null } } )
                state.triggers = state.triggers.filter( t => t.$id !== action.payload.$id )
                return
        }

    } )

    builder.addCase( UpdateEntityField, ( state, action ) => {

        const entities = ( state as any )[ action.payload.collection ]

        for ( let entity of entities )
        {
            if ( entity.$id === action.payload.$id )
            {
                entity[ action.payload.field ] = action.payload.value

                if ( action.payload.field === `$type` )
                {
                    entity = updateEntity( entity as Action | Condition | Trigger, action.payload.collection, action.payload.value as string )
                }
            }
        }

        ( state as any )[ action.payload.collection ] = [ ...entities ]

    } )

} )