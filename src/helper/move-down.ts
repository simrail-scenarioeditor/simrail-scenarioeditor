export const moveDown = ( arr: any[], index: number ) =>
{
    if ( index === arr.length - 1 )
    {
        return arr
    }

    const out = []
    for ( let i = 0; i < arr.length; i++ )
    {
        if ( i === index + 1 )
        {
            out[ i ] = arr[ index ]
        }
        else if ( i === index )
        {
            out[ i ] = arr[ index + 1 ]
        }
        else
        {
            out[ i ] = arr[ i ]
        }
    }
    return out
}