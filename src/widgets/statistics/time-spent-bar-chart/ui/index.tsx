import { useState, type ReactNode } from 'react'
import { adjustDateRange } from 'src/shared/lib'
import { ResponsiveBar } from '@nivo/bar'

import { barChartData } from '../sample-data'

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

function TimeSpentBarChart(): ReactNode {
    const today = new Date()
    const [to, setTo] = useState<number>(today.getTime())
    const [from, setFrom] = useState<number>(
        new Date(today.setDate(today.getDate() - 7)).getTime()
    )
    const filteredData = barChartData.filter(data => {
        const dataDate = new Date(data.day).getTime()
        return dataDate >= from && dataDate <= to
    })

    const averageTimeSpent = Math.floor(
        filteredData.reduce((acc, curr) => acc + curr.value, 0) /
            filteredData.length
    )

    const handlePrev = (): void => {
        const [newFrom, newTo] = adjustDateRange(from, to, -7)
        setTo(newTo)
        setFrom(newFrom)
    }

    const handleNext = (): void => {
        const [newFrom, newTo] = adjustDateRange(from, to, 7)
        setTo(newTo)
        setFrom(newFrom)
    }

    return (
        <div className="relative flex flex-col items-center gap-2 border-solid border-2 border-gray-300 rounded-md p-4 h-96">
            <button
                onClick={handlePrev}
                className="bg-blue-500 text-white absolute left-0 top-1/3"
            >
                ←
            </button>
            <button
                onClick={handleNext}
                className="bg-blue-500 text-white absolute right-0 top-1/3"
            >
                →
            </button>
            <div className="text-2xl text-gray-500 w-full text-left absolute left-5 top-5">
                <label>Average</label>
                <p>{averageTimeSpent} min</p>
                <p></p>
            </div>
            <BarChart data={filteredData} keys={['value']} indexBy="day" />
        </div>
    )
}

export { TimeSpentBarChart }
