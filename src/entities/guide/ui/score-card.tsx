import type { ReactNode } from 'react'

type ScoreCardProps = {
    title: string
    children: ReactNode
}

function ScoreCard({ title, children }: ScoreCardProps): ReactNode {
    return (
        <div className="h-full grid grid-flow-col grid-rows-2 items-start p-8 gap-8 bg-gray-100 rounded-xl grid-cols-subgrid">
            <h4 className="text-lg md:text-xl lg:text-base font-bold">
                {title}
            </h4>
            <p className="text-4xl md:text-5xl lg:text-6xl text-gray-800 font-bold">
                {children}
            </p>
        </div>
    )
}

export { ScoreCard }
