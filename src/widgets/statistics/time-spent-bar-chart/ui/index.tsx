import { useState, type ReactNode } from 'react'
import { adjustDateRange } from 'src/shared/lib'
import { ResponsiveBar } from '@nivo/bar'

import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'
type BarChartProps = {
    data: {
        date: string
        count: number
    }[]
    keys: string[]
    indexBy: string
}

const GUIDE_COMPLETED_COUNTS = graphql(`
    query GuideCompletedCounts($input: GuideCompletedDateRange) {
        res: guideCompletedCounts(input: $input) {
            count
            date
        }
    }
`)

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
    const { data: counts } = useQuery(GUIDE_COMPLETED_COUNTS, {
        variables: {
            input: {
                start: new Date(from)
                    .toISOString()
                    .split('T')[0]
                    .replaceAll('-', '/'),
                end: new Date(to)
                    .toISOString()
                    .split('T')[0]
                    .replaceAll('-', '/')
            }
        },
        fetchPolicy: 'network-only'
    })

    if (!counts?.res.length) return null

    const averageTimeSpent =
        Math.floor(
            counts.res.reduce((acc, curr) => acc + (curr.count || 0), 0) /
                counts.res.length
        ) * 30

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
                <p>{averageTimeSpent} minutes</p>
                <p></p>
            </div>
            <BarChart
                data={counts.res.map(item => ({
                    date: item.date || '',
                    count: item.count || 0
                }))}
                keys={['count']}
                indexBy="date"
            />
        </div>
    )
}

export { TimeSpentBarChart }
