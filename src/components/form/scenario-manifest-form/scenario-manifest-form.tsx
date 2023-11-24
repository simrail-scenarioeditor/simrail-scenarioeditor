import { useDispatch, useSelector } from "react-redux"
import { Breadcrumb } from "../../breadcrumb"
import { MissionFileField, NumberField, TextAreaField, TextField } from "../../field"
import { UpdateScenarioManifestField } from "../../../redux/action/editor"
import { State } from "../../../redux/state"
import { Space } from "../../space"
import { TimetableFileField } from "../../field/timetable-file-field"

export const ScenarioManifestForm = () =>
{
    const dispatch = useDispatch()
    const { scenarioManifest } = useSelector( ( state: State ) => state.editor )

    if ( scenarioManifest === null )
    {
        return <div className="form form--scenario-manifest" />
    }

    return (

        <div className="form form--scenario-manifest">

            <header className="form__header">

                <Breadcrumb />

                <div className="title">

                    { scenarioManifest.Scenario_Name }

                </div>

            </header>

            <div className="form__body">

                <TextField id="scenario-name" label="Scenario name" value={ scenarioManifest.Scenario_Name } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `Scenario_Name`, value: value } ) ) } />

                <TextField id="header-text" label="Header text" value={ scenarioManifest.HeaderText } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `HeaderText`, value: value } ) ) } />

                <TextField id="sub-header-text" label="Sub header text" value={ scenarioManifest.SubHeaderText } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `SubHeaderText`, value: value } ) ) } />

                <TextAreaField id="description" label="Description" value={ scenarioManifest.Description } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `Description`, value: value } ) ) } />

                <Space />

                <NumberField id="required-level" label="Required level" value={ scenarioManifest.Required_Level } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `Required_Level`, value: value } ) ) } />

                <TextField id="train-type" label="Train type" value={ scenarioManifest.Train_Type } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `Train_Type`, value: value } ) ) } />

                <TextField id="scenario-start-time" label="Scenario start time" value={ scenarioManifest.Scenario_Start_Time.toISOString() } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `Scenario_Start_Time`, value: value } ) ) } />

                <NumberField id="scenario-length" label="Scenario length" value={ scenarioManifest.Scenario_Lenght } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `Scenario_Lenght`, value: value } ) ) } />

                <TextField id="season-of-the-year" label="Season of the year" value={ scenarioManifest.SeasonOfTheYear } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `SeasonOfTheYear`, value: value } ) ) } />

                <NumberField id="difficulty" label="Difficulty" value={ scenarioManifest.Difficulty } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `Difficulty`, value: value } ) ) } />

                <NumberField id="track-length" label="Track length (m)" value={ scenarioManifest.TrackLenghtInMeters } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `TrackLenghtInMeters`, value: value } ) ) } />

                <Space />

                <TextField id="map-file" label="Map file" value={ scenarioManifest.MapFile } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `MapFile`, value: value } ) ) } />

                <TextField id="main-thumbnail-path" label="Main thumbnail path" value={ scenarioManifest.MainThumbnailPath } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `MainThumbnailPath`, value: value } ) ) } />

                <TextField id="mini-thumbnail-path-1" label="Mini thumbnail path" value={ scenarioManifest.MiniThumbnailPath1 } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `MiniThumbnailPath1`, value: value } ) ) } />

                <TextField id="mini-thumbnail-path-2" label="Mini thumbnail path" value={ scenarioManifest.MiniThumbnailPath2 } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `MiniThumbnailPath2`, value: value } ) ) } />

                <TextField id="mini-thumbnail-path-3" label="Mini thumbnail path" value={ scenarioManifest.MiniThumbnailPath3 } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `MiniThumbnailPath3`, value: value } ) ) } />

                <MissionFileField id="mission-file" label="Mission file" value={ scenarioManifest.MissionFile } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `MissionFile`, value: value } ) ) } />

                <TimetableFileField id="timetable-file" label="Time table file" value={ scenarioManifest.TimeTableFile } onChange={ value => dispatch( UpdateScenarioManifestField( { field: `TimeTableFile`, value: value } ) ) } />

            </div>

        </div>

    )
}