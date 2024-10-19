import { useState, type ReactNode } from 'react'
import { calendarChartData } from '../sample-data'
import { adjustDateRange } from 'src/shared/lib'
import { TimeRange } from '@nivo/calendar'
import { ResponsiveWrapper } from '@nivo/core'

type CalendarChartProps = {
    from: Date
    to: Date
    data: {
        day: string
        value: number
    }[]
}

function CalendarChart({ from, to, data }: CalendarChartProps): ReactNode {
    return (
        <ResponsiveWrapper>
            {({ width, height }) => (
                <TimeRange
                    data={data}
                    from={from}
                    to={to}
                    weekdayTicks={[0, 1, 2, 3, 4, 5, 6]}
                    height={height}
                    width={width}
                    square={false}
                    dayRadius={5}
                    daySpacing={3}
                    colors={[
                        '#FFFFFF',
                        '#CCFFCC',
                        '#99FF99',
                        '#66FF66',
                        '#33FF33',
                        '#00FF00'
                    ]}
                    margin={{ top: 90, right: 10, bottom: 10, left: 30 }}
                    legends={[
                        {
                            anchor: 'top-right',
                            direction: 'row',
                            itemCount: 4,
                            itemWidth: 42,
                            itemHeight: 36,
                            itemsSpacing: 14,
                            translateY: -80
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
        new Date(today.setDate(today.getDate() - 30)).getTime()
    )

    const handlePrev = (): void => {
        const [newFrom, newTo] = adjustDateRange(from, to, -30)
        setTo(newTo)
        setFrom(newFrom)
    }

    const handleNext = (): void => {
        const [newFrom, newTo] = adjustDateRange(from, to, 30)
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
            <label className="text-2xl text-gray-500 w-full text-left absolute left-5 top-5">
                {new Date().toLocaleDateString('en-US', { month: 'long' })}
            </label>
            <CalendarChart
                from={new Date(from)}
                to={new Date(to)}
                data={calendarChartData}
            />
        </div>
    )
}

export { ContributionCalendarChart }
