import type { ReactElement } from 'react'

function SmallLoading(): ReactElement {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <img
                src="/book-bouncing.gif"
                className="rounded-circle w-16 h-16"
                alt="loading"
            />
        </div>
    )
}

export { SmallLoading }
