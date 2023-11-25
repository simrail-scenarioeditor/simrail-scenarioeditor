import commands from "../../assets/json/commands.json"
import signals from "../../assets/json/signals.json"
import stations from "../../assets/json/stations.json"

export const DataLists = () =>
{
    return (
        <>
            <datalist id="datalist-stations">
                { stations.map( station => (
                    <option key={ station } value={ station }>{ station }</option>
                ) ) }
            </datalist>

            <datalist id="datalist-signals">
                { signals.map( signal => (
                    <option key={ signal } value={ signal }>{ signal }</option>
                ) ) }
            </datalist>

            <datalist id="datalist-commands">
                { commands.map( ( command: { caption: string, value: string } ) => (
                    <option key={ command.value } value={ command.value }>{ command.caption }</option>
                ) ) }
            </datalist>

            <datalist id="datalist-types">
                <option value="Poci~C4~85gowy">Pociągowy / Normal route</option>
                <option value="Manewrowy">Manewrowy / Shunting route</option>
                <option value="Sygna~C5~82Zast~C4~99pczy">SygnałZastępczy / Substitute signal</option>
            </datalist>

            <datalist id="datalist-commandTypes">
                <option value="~02">~02</option>
                <option value="~0C">~0C</option>
            </datalist>

            <datalist id="datalist-stopTypes">
                <option value="Commercial Stop / ph">commercialStop</option>
                <option value="Technical Stop / pt">technicalStop</option>
                <option value="Drive through">noStopover</option>
                <option value="Departure">departure</option>
            </datalist>
        </>
    )
}