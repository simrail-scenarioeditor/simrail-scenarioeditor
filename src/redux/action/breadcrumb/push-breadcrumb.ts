import { createAction } from "@reduxjs/toolkit"

interface PushBreadcrumbPayload
{
    item: {
        caption: string
        url: string
    }
}

export const PushBreadcrumb = createAction<PushBreadcrumbPayload>( `BREADCRUMB__PUSH_BREADCRUMB` )