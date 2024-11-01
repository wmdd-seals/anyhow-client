import { type ReactNode } from 'react'
import { TimeSpentBarChart } from 'src/widgets/statistics/time-spent-bar-chart'
import { ContributionCalendarChart } from 'src/widgets/statistics/contribution-calendar-chart'
import { ScoreCard } from 'src/entities/guide/ui/score-card'
import { Card } from 'src/entities/guide/ui/card'
import { Header } from 'src/widgets/header'
import { Footer } from 'src/widgets/footer/ui/footer'
import { graphql } from '@gqlgen'
import { useQuery } from '@apollo/client'
import { Slider } from '@shared/ui'

const GUIDE_COMPLETED_COUNTS = graphql(`
    query GuideCompletedCounts($input: GuideCompletedDateRange) {
        res: guideCompletedCounts(input: $input) {
            count
            date
        }
    }
`)

const GUIDE_COMPLETED_HISTORY = graphql(`
    query GuideCompletedList {
        res: guideCompletedList {
            guide {
                description
                id
                tags
                title
            }
            createdAt
            id
            guideId
        }
    }
`)

const FETCH_USER = graphql(`
    query User {
        user {
            email
            favoriteTopics
            firstName
            id
            lastName
            middleName
        }
    }
`)

const Dashboard = (): ReactNode => {
    const { data: user } = useQuery(FETCH_USER)
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

    const { data: historyData, loading } = useQuery(GUIDE_COMPLETED_HISTORY)
    console.log({ historyData })

    const totalGuideCount =
        data?.res.reduce((acc, curr) => acc + (curr.count || 0), 0) || 0

    if (loading) return <div>Loading...</div>
    return (
        <div className="flex flex-col gap-4 ">
            <Header />
            <main className="flex flex-col gap-10 px-10">
                <section className="flex flex-col gap-4 p-8 rounded-3xl bg-gradient-to-r from-blue-950 from-60% to-90% to-green-800">
                    <section className="flex flex-col gap-4">
                        <h2 className="text-5xl leading-tight font-bold mb-5 text-white">
                            Welcome back! <br />
                            {`${user?.user.firstName} ${user?.user.lastName}`}
                        </h2>
                    </section>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-3xl font-bold text-white">
                            Overview
                        </h3>
                        <Slider
                            desktopItems={2}
                            tabletItems={1}
                            mobileItems={1}
                            showDots={false}
                            itemClass="p-4"
                        >
                            <ScoreCard title="Total learning hours">
                                {`${totalGuideCount * 30} minutes`}
                            </ScoreCard>
                            {/* <ScoreCard title="Quiz taken">10</ScoreCard> */}
                            <ScoreCard title="Study guides completed">
                                {totalGuideCount} guide
                                {totalGuideCount > 1 ? 's' : ''}
                            </ScoreCard>
                        </Slider>
                    </div>
                </section>
                <section className="flex flex-col gap-4">
                    <h3 className="text-3xl font-bold">Activity</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full ">
                        <div className="col-span-1">
                            <TimeSpentBarChart />
                        </div>
                        <div className="col-span-1">
                            <ContributionCalendarChart />
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-4">
                    <h3 className="text-3xl font-bold">My learning history</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {historyData?.res.map((h, index) => (
                            <Card
                                id={h.guideId || ''}
                                key={index}
                                imageUrl={`${import.meta.env.VITE_API_URL}/images/${h.guide?.id}`}
                                title={h.guide?.title || ''}
                                description={h.guide?.description || ''}
                                tags={h.guide?.tags as string[]}
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
