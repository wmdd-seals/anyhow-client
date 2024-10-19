import { useState, type ReactNode } from 'react'
import { CalendarChart } from '@widgets/statistics/chart/calendar-chart'
import { calendarChartData } from '../sample-data'
import { adjustDateRange } from 'src/shared/lib'

function ContributionCalendarChart(): ReactNode {
    const today = new Date()
    const [to, setTo] = useState<number>(today.getTime())
    const [from, setFrom] = useState<number>(
        new Date(today.setDate(today.getDate() - 30)).getTime()
    )

    const handlePrev = (): void => {
        const { from: newFrom, to: newTo } = adjustDateRange(from, to, -30)
        setTo(newTo)
        setFrom(newFrom)
    }

    const handleNext = (): void => {
        const { from: newFrom, to: newTo } = adjustDateRange(from, to, 30)
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
