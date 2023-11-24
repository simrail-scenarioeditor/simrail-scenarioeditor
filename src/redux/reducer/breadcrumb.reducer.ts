import { createReducer } from "@reduxjs/toolkit"
import { BreadcrumbState } from "../state"
import { PushBreadcrumb, SetBreadcrumb } from "../action/breadcrumb"

const initialState: BreadcrumbState = {

    items: []

}

export const breadcrumbReducer = createReducer( initialState, builder => {

    builder.addCase( PushBreadcrumb, ( state, action ) => {

        state.items.push( { ... action.payload.item, iconType: action.payload.item.url.split( `/` )[ 1 ] as any } )

    } )

    builder.addCase( SetBreadcrumb, ( state, action ) => {

        const items = action.payload.items.map( item => ({ caption: item.caption, url: item.url, iconType: item.url.split( `/` )[ 1 ] as any }) )
        state.items = [ ... items ]

    } )

} )