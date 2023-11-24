import { createAction } from "@reduxjs/toolkit"

interface ToastMessagePayload
{
    message: string | null
}

export const ToastMessage = createAction<ToastMessagePayload>( `EDITOR__TOAST_MESSAGE` )