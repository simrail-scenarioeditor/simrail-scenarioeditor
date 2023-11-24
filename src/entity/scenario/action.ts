import { Entity } from "./entity"
import { store } from "../../redux/store"
import { CreateEntity } from "../../redux/action/scenario"
import { Resource } from "./resource"
import { Reference } from "./reference"
import { Train } from "./train"
import { Objective } from "./objective"
import { Timer } from "./timer"
import { createEntityOrReference } from "../../helper"

export class Action extends Entity
{
    $type: string
    action?: number                             // SimrailEvent.TimerAction
    commandText?: string                        // SimrailEvent.TrafficCommand
    delay?: number                              // SimrailEvent.CoroutineDelayAction
    humidity?: number                           // SimrailEvent.WeatherCommand
    instant?: boolean                           // SimrailEvent.WeatherCommand
    objective?: Objective | Reference | null    // SimrailEvent.SetObjectiveState
    position?: number                           // SimrailEvent.SetCabPaper
    pressure?: number                           // SimrailEvent.WeatherCommand
    res?: Resource | Reference | null           // SimrailEvent.PostNotify | SimrailEvent.SetCabPaper
    requestSpawn?: boolean                      // SimrailEvent.SetTrainState
    requestRemoval?: boolean                    // SimrailEvent.SetTrainState
    state?: number                              // SimrailEvent.SetObjectiveState
    temperature?: number                        // SimrailEvent.WeatherCommand
    timeout?: number                            // SimrailEvent.PostNotify
    timer?: Timer | Reference | null            // SimrailEvent.TimerAction
    train?: Train | Reference | null            // SimrailEvent.SetTrainState | SimrailEvent.VehicleStartupTutorial
    tutorial?: number                           // SimrailEvent.VehicleStartupTutorial
    until?: boolean                             // SimrailEvent.CoroutineDelayAction
    visibility?: number                         // SimrailEvent.WeatherCommand
    weatherCode?: number                        // SimrailEvent.WeatherCommand
    windDeg?: number                            // SimrailEvent.WeatherCommand
    windSpeed?: number                          // SimrailEvent.WeatherCommand
    willFinish?: Objective | Reference | null   // SimrailEvent.VehicleStartupTutorial

    constructor ( json: any )
    {
        super( json )

        this.$type = json.$type

        if ( json.action !== undefined ) this.action = json.action
        if ( json.commandText !== undefined ) this.commandText = json.commandText
        if ( json.delay !== undefined ) this.delay = json.delay
        if ( json.humidity !== undefined ) this.humidity = json.humidity
        if ( json.instant !== undefined ) this.instant = json.instant
        if ( json.objective !== undefined ) this.objective = createEntityOrReference( json.objective, Objective ) as Objective | Reference
        if ( json.position !== undefined ) this.position = json.position
        if ( json.pressure !== undefined ) this.pressure = json.pressure
        if ( json.res !== undefined ) this.res = createEntityOrReference( json.res, Resource ) as Resource | Reference
        if ( json.state !== undefined ) this.state = json.state
        if ( json.temperature !== undefined ) this.temperature = json.temperature
        if ( json.timeout !== undefined ) this.timeout = json.timeout
        if ( json.timer !== undefined ) this.timer = createEntityOrReference( json.timer, Timer ) as Timer | Reference
        if ( json.train !== undefined ) this.train = createEntityOrReference( json.train, Train ) as Train | Reference
        if ( json.tutorial !== undefined ) this.tutorial = json.tutorial
        if ( json.until !== undefined ) this.until = json.until
        if ( json.visibility !== undefined ) this.visibility = json.visibility
        if ( json.weatherCode !== undefined ) this.weatherCode = json.weatherCode
        if ( json.windDeg !== undefined ) this.windDeg = json.windDeg
        if ( json.windSpeed !== undefined ) this.windSpeed = json.windSpeed
        if ( json.willFinish !== undefined ) this.willFinish = createEntityOrReference( json.willFinish, Objective ) as Objective | Reference

        store.dispatch( CreateEntity( { collection: `actions`, entity: this } ) )
    }

    getName (): string
    {
        return `${ this.$type }#${ this.$id }`
    }

    static create (): Action
    {
        return new Action( {
            $id: Entity.getNextId(),
            $type: `SimrailEvent.FinishAction`
        } )
    }

    static getTypes (): string[]
    {
        return [
            "SimrailEvent.PostNotify",
            "SimrailEvent.VehicleStartupTutorial",
            "SimrailEvent.SetTrainState",
            "SimrailEvent.SetObjectiveState",
            "SimrailEvent.SetCabPaper",
            "SimrailEvent.TrafficCommand",
            "SimrailEvent.FinishAction",
            "SimrailEvent.TimerAction",
            "SimrailEvent.CoroutineDelayAction",
            "SimrailEvent.WeatherCommand"
        ]
    }

    static getWeatherCodes ()
    {
        return [
            { caption: `ThunderstormWithLightRain`, value: `200` },
            { caption: `ThunderstormWithRain`, value: `201` },
            { caption: `ThunderstormWithHeavyRain`, value: `202` },
            { caption: `LightThunderstorm`, value: `210` },
            { caption: `Thunderstorm`, value: `211` },
            { caption: `HeavyThunderstorm`, value: `212` },
            { caption: `RaggedThunderstorm`, value: `221` },
            { caption: `ThunderstormWithLightDrizzle`, value: `230` },
            { caption: `ThunderstormWithDrizzle`, value: `231` },
            { caption: `ThunderstormWithHeavyDrizzle`, value: `232` },
            { caption: `LightIntensityDrizzle`, value: `300` },
            { caption: `Drizzle`, value: `301` },
            { caption: `HeavyIntensityDrizzle`, value: `302` },
            { caption: `LightIntensityDrizzleRain`, value: `310` },
            { caption: `DrizzleRain`, value: `311` },
            { caption: `HeavyIntensityDrizzleRain`, value: `312` },
            { caption: `ShowerRainAndDrizzle`, value: `313` },
            { caption: `HeavyShowerRainAndDrizzle`, value: `314` },
            { caption: `ShowerDrizzle`, value: `321` },
            { caption: `LightRain`, value: `500` },
            { caption: `ModerateRain`, value: `501` },
            { caption: `HeavyIntensityRain`, value: `502` },
            { caption: `VeryHeavyRain`, value: `503` },
            { caption: `ExtremeRain`, value: `504` },
            { caption: `FreezingRain`, value: `511` },
            { caption: `LightIntensityShowerRain`, value: `520` },
            { caption: `ShowerRain`, value: `521` },
            { caption: `HeavyIntensityShowerRain`, value: `522` },
            { caption: `RaggedShowerRain`, value: `531` },
            { caption: `LightSnow`, value: `600` },
            { caption: `Snow`, value: `601` },
            { caption: `HeavySnow`, value: `602` },
            { caption: `Sleet`, value: `611` },
            { caption: `LightShowerSleet`, value: `612` },
            { caption: `ShowerSleet`, value: `613` },
            { caption: `LightRainAndSnow`, value: `615` },
            { caption: `RainAndSnow`, value: `616` },
            { caption: `LightShowerSnow`, value: `620` },
            { caption: `ShowerSnow`, value: `621` },
            { caption: `HeavyShowerSnow`, value: `622` },
            { caption: `Mist`, value: `701` },
            { caption: `Smoke`, value: `711` },
            { caption: `Haze`, value: `721` },
            { caption: `SandDustWhirls`, value: `731` },
            { caption: `Fog`, value: `741` },
            { caption: `Sand`, value: `751` },
            { caption: `Dust`, value: `761` },
            { caption: `VolcanicAsh`, value: `762` },
            { caption: `Squalls`, value: `771` },
            { caption: `Tornado`, value: `781` },
            { caption: `ClearSky`, value: `800` },
            { caption: `FewClouds`, value: `801` },
            { caption: `ScatteredClouds`, value: `802` },
            { caption: `BrokenClouds`, value: `803` },
            { caption: `OvercastClouds`, value: `804` },
        ]
    }
}