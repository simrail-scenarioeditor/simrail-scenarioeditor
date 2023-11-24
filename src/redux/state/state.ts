import { EditorState } from "./editor.state"
import { BreadcrumbState } from "./breadcrumb.state"
import { ScenarioState } from "./scenario.state"

export interface State
{
    breadcrumb: BreadcrumbState
    editor: EditorState
    scenario: ScenarioState
}