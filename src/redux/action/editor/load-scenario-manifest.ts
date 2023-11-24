import { createAction } from "@reduxjs/toolkit"
import { ScenarioManifest } from "../../../entity/editor"

interface LoadScenarioManifestPayload
{
    path: string
    scenarioManifest: ScenarioManifest
}

export const LoadScenarioManifest = createAction<LoadScenarioManifestPayload>( `EDITOR__LOAD_SCENARIO_MANIFEST` )