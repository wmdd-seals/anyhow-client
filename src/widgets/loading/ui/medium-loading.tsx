import type { ReactElement } from 'react'

function MediumLoading(): ReactElement {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <img src="/book-bouncing.gif" className="w-32 h-32" alt="loading" />
        </div>
    )
}

export { MediumLoading }
