import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'
import type { Guide } from '@gqlgen/graphql'
import { type ReactNode, useState } from 'react'
import { useAuth } from '@shared/lib'
import { Card } from 'src/entities/guide'
import { getGuideProgress } from 'src/entities/guide'
import { ChevronDown } from 'react-feather'
import { MediumLoading } from '@widgets/loading'

const GET_GUIDES_WITH_USER = graphql(`
    query PanelGuides {
        res: guides(published: true) {
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
    }
`)

type PanelGuideListProps = {
    filter?: 'bookmarked' | 'all'
}

export function PanelGuideList({ filter }: PanelGuideListProps): ReactNode {
    const { isAuthenticated } = useAuth()
    const { data, loading, error } = useQuery(GET_GUIDES_WITH_USER)

    const [sortOption, setSortOption] = useState<string>('Newest First')

    const guidesWithReadingTime = data?.res?.map(guide => ({
        ...guide,
        readingTime: Math.ceil((getGuideProgress(guide?.body || '') * 60) / 100)
    }))

    const sortedGuides = guidesWithReadingTime?.sort((a, b) => {
        switch (sortOption) {
            case 'Newest First':
                return (
                    new Date(b.createdAt as string).getTime() -
                    new Date(a.createdAt as string).getTime()
                )
            case 'Oldest First':
                return (
                    new Date(a.createdAt as string).getTime() -
                    new Date(b.createdAt as string).getTime()
                )
            case 'Longest Reading Time':
                return b.readingTime - a.readingTime
            case 'Shortest Reading Time':
                return a.readingTime - b.readingTime

            // make the guide with no ("null") rating to be at the end
            case 'Highest Rated':
                return (b.rating ?? -1) - (a.rating ?? -1)

            // make the guide with no ("null") rating to be at the beginning
            case 'Lowest Rated':
                return (a.rating ?? -1) - (b.rating ?? -1)
            default:
                return 0
        }
    })

    const filteredGuides =
        filter === 'bookmarked'
            ? sortedGuides?.filter(guide => guide.bookmark)
            : sortedGuides

    if (loading)
        return (
            <div className="h-full w-full flex items-center justify-center py-20">
                <MediumLoading />
            </div>
        )
    if (error || !data?.res || data.res.length === 0)
        return <div>Error: {error?.message}</div>

    return (
        <>
            {/* dropdown menu for sorting*/}
            <div className="container px-6 md:px-0 mx-auto flex flex-col gap-5">
                <div className="flex justify-end">
                    <span className="relative">
                        <select
                            className="border border-black rounded-3xl px-7 py-2 appearance-none cursor-pointer text-center"
                            value={sortOption}
                            onChange={e => setSortOption(e.target.value)}
                        >
                            <option value="Newest First">Newest First</option>
                            <option value="Oldest First">Oldest First</option>
                            <option value="Longest Reading Time">
                                Longest Reading Time
                            </option>
                            <option value="Shortest Reading Time">
                                Shortest Reading Time
                            </option>
                            <option value="Highest Rated">Highest Rated</option>
                            <option value="Lowest Rated">Lowest Rated</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-10">
                    {filteredGuides?.map((guide, index) => (
                        <Card
                            isAuthenticated={isAuthenticated}
                            key={index}
                            guide={guide as Guide}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
