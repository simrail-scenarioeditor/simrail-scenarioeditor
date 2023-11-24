import { Action, Condition, Content, Event, LanguageContent, Mission, Objective, Resource, Timer, Train, Trigger } from "../../entity/scenario"

export interface ScenarioState
{
    actions: Action[]
    conditions: Condition[]
    contents: Content[]
    events: Event[]
    languageContents: LanguageContent[]
    missions: Mission[]
    objectives: Objective[]
    resources: Resource[]
    timers: Timer[]
    trains: Train[]
    triggers: Trigger[]
}