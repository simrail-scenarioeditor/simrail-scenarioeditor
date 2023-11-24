interface EntityIconProps
{
    type: `action` | `condition` | `content` | `language-content` | `event` | `mission` | `objective` | `resource` | `timer` | `train` | `trigger`
}

const iconValues = {
    action: { caption: `A`, color: `#FFFFFF`, firstColor: `#2D778F`, secondColor: `#2D8F45` },
    condition: { caption: `Cd`, color: `#FFFFFF`, firstColor: `#762D8F`, secondColor: `#452D8F` },
    content: { caption: `Ct`, color: `#FFFFFF`, firstColor: `#8000FF`, secondColor: `#FF007F` },
    'language-content': { caption: `L`, color: `#000000`, firstColor: `#FF00FF`, secondColor: `#FF8000` },
    event: { caption: `E`, color: `#FFFFFF`, firstColor: `#2D778F`, secondColor: `#2D468F` },
    mission: { caption: `M`, color: `#000000`, firstColor: `#FF5733`, secondColor: `#FFC300` },
    objective: { caption: `O`, color: `#000000`, firstColor: `#80FF00`, secondColor: `#00FF7F` },
    resource: { caption: `R`, color: `#000000`, firstColor: `#00FFFF`, secondColor: `#0080FF` },
    timer: { caption: `Ti`, color: `#000000`, firstColor: `#00FFFF`, secondColor: `#00FF80` },
    train: { caption: `Tr`, color: `#FFFFFF`, firstColor: `#7F00FF`, secondColor: `#FF0000` },
    trigger: { caption: `Tg`, color: `#FFFFFF`, firstColor: `#8F762D`, secondColor: `#2D8F76` }
}

export const EntityIcon = ( props: EntityIconProps ) =>
{
    const params = iconValues[ props.type ]
    if ( params === undefined )
    {
        return ``
    }

    return (
        <div className="entity-icon" style={{ background: `linear-gradient( 135deg, ${ params.firstColor }, ${ params.secondColor } )`, color: params.color }}>

            { iconValues[ props.type ].caption }

        </div>
    )
}