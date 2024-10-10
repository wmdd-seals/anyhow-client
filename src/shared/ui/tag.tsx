import React from 'react'

interface TagProps {
    children: React.ReactNode
}

function Tag({ children }: TagProps): JSX.Element {
    return (
        <span className="gap-1.5 self-stretch px-2 py-1 rounded bg-slate-300">
            {children}
        </span>
    )
}

export { Tag }
