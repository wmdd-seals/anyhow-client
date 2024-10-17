import { ResponsiveBar } from '@nivo/bar'
import type { ReactNode } from 'react'

type BarChartProps = {
    data: {
        day: string
        value: number
    }[]
    keys: string[]
    indexBy: string
}

function BarChart({ data, keys, indexBy }: BarChartProps): ReactNode {
    return (
        <ResponsiveBar
            colors={['grey']}
            keys={keys}
            data={data}
            indexBy={indexBy}
            enableGridX={false}
            enableGridY={false}
            axisLeft={null}
            margin={{ top: 90, right: 10, bottom: 30, left: 30 }}
        />
    )
}

export { BarChart }
