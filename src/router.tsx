import { HashRouter, Route, Routes } from "react-router-dom"
import { ActionForm, ConditionForm, ContentForm, EventForm, LanguageContentForm, MissionForm, MissionFileForm, ObjectiveForm, ResourceForm, ScenarioManifestForm, TrainForm, TimerForm, TriggerForm, WelcomeScreen, TimeTableFileForm } from "./components"

export const Router = () =>
{
    return (

        <HashRouter>

            <Routes>

                <Route element={ <WelcomeScreen /> } path="/" />

                <Route element={ <ActionForm /> } path="/action/:id" />
                <Route element={ <ConditionForm /> } path="/condition/:id" />
                <Route element={ <ContentForm /> } path="/content/:id" />
                <Route element={ <EventForm /> } path="/event/:id" />
                <Route element={ <LanguageContentForm /> } path="/language-content/:id" />
                <Route element={ <MissionForm /> } path="/mission/:id" />
                <Route element={ <MissionFileForm /> } path="/mission-file" />
                <Route element={ <ObjectiveForm /> } path="/objective/:id" />
                <Route element={ <ResourceForm /> } path="/resource/:id" />
                <Route element={ <ScenarioManifestForm /> } path="/scenario-manifest" />
                <Route element={ <TimerForm /> } path="/timer/:id" />
                <Route element={ <TimeTableFileForm /> } path="/timetable-file" />
                <Route element={ <TrainForm /> } path="/train/:id" />
                <Route element={ <TriggerForm /> } path="/trigger/:id" />

            </Routes>

        </HashRouter>

    )
}