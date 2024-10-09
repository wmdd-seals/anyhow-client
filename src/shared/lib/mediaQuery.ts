import { useEffect, useState } from 'react'

export const mediaQuery = {
    sp: 'width < 752px',
    tablet: '752px <= width < 1122px',
    pc: '1122px <= width'
}

export const useMediaQuery = (query: string): boolean => {
    const formattedQuery = `(${query})`
    const [match, setMatch] = useState(matchMedia(formattedQuery).matches)

    useEffect(() => {
        const mql = matchMedia(formattedQuery)

        if (mql.media === 'not all' || mql.media === 'invalid') {
            console.error(`useMediaQuery Error: Invalid media query`)
        }

        mql.onchange = (e): void => {
            setMatch(e.matches)
        }

        return (): void => {
            mql.onchange = null
        }
    }, [formattedQuery, setMatch])

    return match
}
