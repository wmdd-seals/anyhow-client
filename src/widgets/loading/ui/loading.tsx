import type { ReactElement } from 'react'

function Loading(): ReactElement {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <img
                src="/book-bouncing.gif"
                className="img-fluid rounded-circle w-32"
                alt="loading"
            />
        </div>
    )
}

export { Loading }
