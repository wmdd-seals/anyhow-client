import type { ReactNode } from 'react'

type ScoreCardProps = {
    title: string
    children: ReactNode
}

function ScoreCard({ title, children }: ScoreCardProps): ReactNode {
    return (
        <div className="grid grid-flow-col grid-rows-2 items-start p-8 gap-8 bg-gray-200 rounded-md grid-cols-subgrid">
            <h4 className="text-xs md:text-sm lg:text-base font-normal text-gray-500">
                {title}
            </h4>
            <p className="text-4xl md:text-5xl lg:text-6xl text-gray-800 font-bold">
                {children}
            </p>
        </div>
    )
}

export { ScoreCard }
