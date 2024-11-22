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
import type { Guide } from '@gqlgen/graphql'
import { useLocation } from 'react-router-dom'
import { CardStrip, getGuideProgress } from 'src/entities/guide'
import { getTimeSpentOnCreatingGuide } from 'src/entities/guide/lib/get-time-spent-on-creating-guide'
import { useAuth } from '@shared/lib'
import { Loading } from '@widgets/loading'
import { PanelGuideList } from '@widgets/guide-list'

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
                body
                createdAt
                description
                id
                bookmark
                liked
                rating
                tags
                title
                user {
                    firstName
                    lastName
                }
            }
            createdAt
            id
            guideId
        }
    }
`)

const QUIZ_ANSWERS_BY_USER = graphql(`
    query QuizAnswersByUser {
        quizAnswersByUser {
            id
        }
    }
`)

const GUIDES_CREATED = graphql(`
    query GuidesCreated($userId: ID) {
        res: guides(userId: $userId) {
            description
            id
            published
            rating
            title
            body
            createdAt
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

const Dashboard = (): ReactNode => {
    const { user, isAuthenticated } = useAuth()

    const location = useLocation()
    const isCreator =
        (location.state as { isCreator: boolean }).isCreator || false
    const { data } = useQuery(
        isCreator ? GUIDE_VIEWED_COUNTS : GUIDE_COMPLETED_COUNTS,
        {
            variables: {
                input: {
                    start: '2023-01-01',
                    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split('T')[0]
                }
            }
        }
    )

    const {
        data: guidesCreated,
        refetch,
        loading: loadingGuidesCreated
    } = useQuery(GUIDES_CREATED, {
        variables: { userId: user?.id }
    })

    const { data: quizAnswersByUser } = useQuery(QUIZ_ANSWERS_BY_USER)

    const { data: historyData, loading } = useQuery(GUIDE_COMPLETED_HISTORY, {
        fetchPolicy: 'network-only'
    })

    function totalCount(
        data: { count: number; data: string }[] | undefined
    ): number {
        return data?.reduce((acc, curr) => acc + (curr.count || 0), 0) || 0
    }

    if (loading || loadingGuidesCreated) return <Loading />
    return (
        <div className="flex flex-col gap-10 ">
            <Header />
            <main className="container mx-auto flex flex-col gap-10 px-10 gap-y-16">
                <section className="flex flex-col gap-4 p-8 rounded-3xl bg-gradient-to-r from-blue-950 from-60% to-90% to-green-800">
                    <section className="flex flex-col gap-4">
                        <h2 className="text-5xl leading-tight font-bold mb-5 text-white">
                            Welcome back! <br />
                            {`${user?.firstName} ${user?.lastName}`}
                        </h2>
                    </section>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-3xl font-bold text-white">
                            Overview
                        </h3>
                        {isCreator ? (
                            <Slider
                                desktopItems={2}
                                smallDesktopItems={2}
                                tabletItems={1}
                                mobileItems={1}
                                showDots={false}
                                itemClass="p-4"
                            >
                                <ScoreCard title="Total hours spent on guides creation">
                                    {Number(
                                        guidesCreated?.res?.reduce(
                                            (acc, curr) => {
                                                return (
                                                    acc +
                                                    getTimeSpentOnCreatingGuide(
                                                        getGuideProgress(
                                                            curr!.body || ''
                                                        )
                                                    )
                                                )
                                            },
                                            0
                                        )
                                    ).toFixed(2)}{' '}
                                    hrs
                                </ScoreCard>
                                <ScoreCard title="Total guides created">
                                    {guidesCreated?.res?.length}
                                </ScoreCard>
                            </Slider>
                        ) : (
                            <Slider
                                desktopItems={3}
                                smallDesktopItems={3}
                                tabletItems={1}
                                mobileItems={1}
                                showDots={false}
                                itemClass="p-4"
                            >
                                <ScoreCard title="Total learning hours">
                                    {`${totalCount(data?.res as { count: number; data: string }[]) * 30} minutes`}
                                </ScoreCard>
                                <ScoreCard title="Quizzes taken">
                                    {
                                        quizAnswersByUser?.quizAnswersByUser
                                            .length
                                    }
                                </ScoreCard>
                                <ScoreCard title="Study guides completed">
                                    {totalCount(
                                        data?.res as {
                                            count: number
                                            data: string
                                        }[]
                                    )}{' '}
                                    guide
                                    {totalCount(
                                        data?.res as {
                                            count: number
                                            data: string
                                        }[]
                                    ) > 1
                                        ? 's'
                                        : ''}
                                </ScoreCard>
                            </Slider>
                        )}
                    </div>
                </section>
                <section className="flex flex-col gap-4">
                    <h3 className="text-3xl font-bold">Activity</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full ">
                        <div className="col-span-1">
                            <TimeSpentBarChart isCreator={isCreator} />
                        </div>
                        <div className="col-span-1">
                            <ContributionCalendarChart isCreator={isCreator} />
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-4">
                    <h3 className="text-3xl font-bold">
                        {isCreator ? 'My study guides' : 'My learning history'}
                    </h3>
                    {isCreator ? (
                        <div className="flex flex-col gap-y-3 md:gap-y-0">
                            {guidesCreated?.res?.map((h, index) => (
                                <CardStrip
                                    refetch={refetch}
                                    key={index}
                                    guide={
                                        h as Omit<Guide, 'createdAt'> & {
                                            createdAt: string
                                        }
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {historyData?.res.map((h, index) => (
                                <Card
                                    key={index}
                                    guide={h.guide as Guide}
                                    isAuthenticated={isAuthenticated}
                                />
                            ))}
                        </div>
                    )}
                </section>
                {!isCreator && (
                    <section className="flex flex-col gap-4">
                        <h3 className="text-3xl font-bold">
                            Bookmarked guides
                        </h3>
                        <PanelGuideList filter="bookmarked" />
                    </section>
                )}
            </main>
            <Footer />
        </div>
    )
}

export { Dashboard }
