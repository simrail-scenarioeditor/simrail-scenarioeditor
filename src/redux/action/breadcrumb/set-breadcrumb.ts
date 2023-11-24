import { createAction } from "@reduxjs/toolkit"

interface SetBreadcrumbPayload
{
    items: {
        caption: string
        url: string
    }[]
}

export const SetBreadcrumb = createAction<SetBreadcrumbPayload>( `BREADCRUMB__SET_BREADCRUMB` )