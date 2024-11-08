import { useEffect, useState, type ReactNode } from 'react'
import { adjustDateRange } from 'src/shared/lib'
import { TimeRange } from '@nivo/calendar'
import { ResponsiveWrapper } from '@nivo/core'
import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'
import { ArrowLeft, ArrowRight } from 'react-feather'

type CalendarChartProps = {
    from: Date
    to: Date
    data: {
        day: string
        value: number
    }[]
}

const GUIDE_COMPLETED_COUNTS = graphql(`
    query GuideCompletedCounts($input: GuideCompletedDateRange) {
        res: guideCompletedCounts(input: $input) {
            count
            date
        }
    }
`)

function CalendarChart({ from, to, data }: CalendarChartProps): ReactNode {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const handleResize = (): void => {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)

        return (): void => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <ResponsiveWrapper>
            {({ width, height }) => (
                <TimeRange
                    data={data}
                    from={from}
                    to={to}
                    weekdayTicks={isMobile ? [] : [0, 1, 2, 3, 4, 5, 6]}
                    weekdayLegendOffset={isMobile ? 0 : 70}
                    height={height}
                    width={width}
                    align="center"
                    // dayBorderWidth={2}
                    // dayBorderColor="#dedede"
                    square={true}
                    minValue={0}
                    maxValue={8}
                    dayRadius={5}
                    daySpacing={4}
                    colors={[
                        '#dedede',
                        '#CEF0CD',
                        '#99FF99',
                        '#5AD859',
                        '#259D23',
                        '#092608'
                    ]}
                    margin={{
                        top: isMobile ? 120 : 90,
                        right: 10,
                        bottom: 10,
                        left: 10
                    }}
                    legends={[
                        {
                            anchor: 'top-right',
                            direction: 'row',
                            itemCount: 4,
                            itemWidth: 45,
                            itemHeight: 36,
                            itemsSpacing: -20,
                            translateY: -80,
                            itemTextColor: 'transparent',
                            toggleSerie: true
                        }
                    ]}
                />
            )}
        </ResponsiveWrapper>
    )
}

function ContributionCalendarChart(): ReactNode {
    const today = new Date()
    const [to, setTo] = useState<number>(today.getTime())
    const [from, setFrom] = useState<number>(
        new Date(today.setDate(today.getDate() - 60)).getTime()
    )
    const { data: counts } = useQuery(GUIDE_COMPLETED_COUNTS, {
        variables: {
            input: {
                start: new Date(from).toISOString().split('T')[0],
                end: new Date(to).toISOString().split('T')[0]
            }
        },
        fetchPolicy: 'network-only'
    })

    const handlePrev = (): void => {
        const [newFrom, newTo] = adjustDateRange(from, to, -60)
        setTo(newTo)
        setFrom(newFrom)
    }

    const handleNext = (): void => {
        const [newFrom, newTo] = adjustDateRange(from, to, 60)
        setTo(newTo)
        setFrom(newFrom)
    }

    if (!counts) return null

    return (
        <div className="relative flex flex-col items-center gap-2 border-solid rounded-md p-4 h-96 shadow-lg">
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
            <label className="text-2xl w-full text-left absolute left-5 top-5 font-bold">
                Learning
            </label>
            <div className="w-11/12 mx-auto max-w-[350px] md:max-w-[450px] h-full">
                <CalendarChart
                    from={new Date(from)}
                    to={new Date(to)}
                    data={counts.res.map(item => ({
                        day: item.date || '',
                        value: item.count || 0
                    }))}
                />
            </div>
        </div>
    )
}

export { ContributionCalendarChart }
