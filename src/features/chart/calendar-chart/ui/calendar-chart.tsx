import { TimeRange } from '@nivo/calendar'
import type { ReactNode } from 'react'
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

export { CalendarChart }
