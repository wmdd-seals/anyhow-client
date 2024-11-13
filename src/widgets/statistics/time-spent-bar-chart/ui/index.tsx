import { useState, type ReactNode } from 'react'
import { adjustDateRange } from 'src/shared/lib'
import { ResponsiveBar } from '@nivo/bar'

import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'
import { ArrowLeft, ArrowRight } from 'react-feather'

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

const GUIDE_VIEWED_COUNTS = graphql(`
    query GuideViewCountInDateRange($input: GuideViewCountInDateRangeInput!) {
        res: guideViewCountInDateRange(input: $input) {
            count
            date
        }
    }
`)

function BarChart({ data, keys, indexBy }: BarChartProps): ReactNode {
    return (
        <ResponsiveBar
            colors={['#32D430']}
            keys={keys}
            data={data}
            indexBy={indexBy}
            borderRadius={5}
            enableLabel={false}
            enableGridX={false}
            enableGridY={false}
            axisLeft={null}
            margin={{ top: 90, right: 10, bottom: 30, left: 10 }}
        />
    )
}

function TimeSpentBarChart({
    isCreator = false
}: {
    isCreator: boolean
}): ReactNode {
    const today = new Date(new Date().getTime())
    const [to, setTo] = useState<number>(today.getTime())
    const [from, setFrom] = useState<number>(
        new Date(today.setDate(today.getDate() - 6)).getTime()
    )
    const { data: counts, loading } = useQuery(
        isCreator ? GUIDE_VIEWED_COUNTS : GUIDE_COMPLETED_COUNTS,
        {
            variables: {
                input: {
                    start: new Date(from).toISOString().split('T')[0],
                    end: new Date(to).toISOString().split('T')[0]
                }
            },
            fetchPolicy: 'network-only'
        }
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
        <div className="relative flex flex-col items-center gap-2 border-solid rounded-md p-4 h-96 shadow-md shadow-lg">
            {loading || !counts?.res.length ? (
                <div className="w-full h-full flex items-center justify-center">
                    <p>Loading</p>
                </div>
            ) : (
                <>
                    <button
                        onClick={handlePrev}
                        className="text-[#2D3648] absolute left-[10px] top-1/2"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="text-[#2D3648] absolute right-[10px] top-1/2"
                    >
                        <ArrowRight size={20} />
                    </button>
                    <div className="text-2xl w-full text-left absolute left-5 top-5 font-bold">
                        <label>
                            {isCreator
                                ? 'View Count on Guides'
                                : 'Completed Guides'}
                        </label>
                        <p className="text-base">{`${new Date(from).toLocaleDateString()} - ${new Date(to).toLocaleDateString()}`}</p>
                    </div>
                    <div className="w-11/12 mx-auto max-w-[350px] md:max-w-[450px] h-full">
                        <BarChart
                            data={counts.res.map(item => ({
                                date: item.date
                                    ? item.date.split('-')[1] +
                                      '/' +
                                      item.date.split('-')[2]
                                    : '',
                                count: item.count || 0
                            }))}
                            keys={['count']}
                            indexBy="date"
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export { TimeSpentBarChart }
