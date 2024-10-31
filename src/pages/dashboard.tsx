import { useState, type ReactNode } from 'react'
import { TimeSpentBarChart } from 'src/widgets/statistics/time-spent-bar-chart'
import { ContributionCalendarChart } from 'src/widgets/statistics/contribution-calendar-chart'
import { ScoreCard } from 'src/entities/guide/ui/score-card'
import { Card } from 'src/entities/guide/ui/card'
import { Header } from 'src/widgets/header'
import { Footer } from 'src/widgets/footer/ui/footer'
import { graphql } from '@gqlgen'
import { useQuery } from '@apollo/client'

const GUIDE_COMPLETED_COUNTS = graphql(`
    query GuideCompletedCounts($input: GuideCompletedDateRange) {
        res: guideCompletedCounts(input: $input) {
            count
            date
        }
    }
`)

const Dashboard = (): ReactNode => {
    const [firstName] = useState('John')
    const { data } = useQuery(GUIDE_COMPLETED_COUNTS, {
        variables: {
            input: {
                start: '2000/01/01',
                end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split('T')[0]
                    .replaceAll('-', '/')
            }
        }
    })
    const totalGuideCount =
        data?.res.reduce((acc, curr) => acc + (curr.count || 0), 0) || 0
    return (
        <div className="flex flex-col gap-4 ">
            <Header />
            <main className="flex flex-col gap-10 px-10">
                <section className="flex flex-col gap-4">
                    <h2 className="text-5xl leading-tight font-bold mb-5">
                        Welcome back! <br />
                        {firstName}
                    </h2>
                </section>
                <section className="flex flex-col gap-4">
                    <h3 className="text-3xl font-bold">Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <ScoreCard title="Total learning hours">
                            {`${totalGuideCount * 30} minutes`}
                        </ScoreCard>
                        {/* <ScoreCard title="Quiz taken">10</ScoreCard> */}
                        <ScoreCard title="Study guides completed">
                            {totalGuideCount} guide
                            {totalGuideCount > 1 ? 's' : ''}
                        </ScoreCard>
                    </div>
                </section>
                <section className="flex flex-col gap-4">
                    <h3 className="text-3xl font-bold">Activity</h3>
                    <div className="flex gap-4 w-full flex-col md:flex-row">
                        <div className="flex flex-col gap-4  md:w-1/2">
                            <TimeSpentBarChart />
                        </div>
                        <div className="flex flex-col gap-4  md:w-1/2">
                            <ContributionCalendarChart />
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-4">
                    <h3 className="text-3xl font-bold">My learning history</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Card
                                id={index.toString()}
                                key={index}
                                imageUrl="https://via.placeholder.com/150"
                                title="Total Time Spent"
                                description="description"
                                tags={['tag1', 'tag2', 'tag3']}
                                cardType="simple"
                            />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export { Dashboard }
