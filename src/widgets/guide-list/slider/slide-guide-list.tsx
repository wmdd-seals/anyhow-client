import { Card } from 'src/entities/guide'
import type { ReactNode } from 'react'
import { useQuery } from '@apollo/client'
import { Slider } from 'src/shared/ui'
import { graphql } from '@gqlgen'
import type { Guide } from '@gqlgen/graphql'
import { MediumLoading } from '@widgets/loading'

const GET_GUIDES_WITH_USER = graphql(`
    query SlideGuides {
        res: guides(published: true) {
            body
            description
            id
            title
            bookmark
            liked
            rating
            tags
            user {
                firstName
                lastName
            }
        }
    }
`)

export function SliderGuideList(): ReactNode {
    const { data, loading, error } = useQuery(GET_GUIDES_WITH_USER, {
        fetchPolicy: 'cache-and-network'
    })

    if (loading)
        return (
            <div className="h-full w-full flex items-center justify-center py-20">
                <MediumLoading />
            </div>
        )
    if (error || !data?.res || data.res.length === 0)
        return <div>Error: {error?.message}</div>

    return (
        <Slider
            desktopItems={4}
            smallDesktopItems={4}
            tabletItems={1}
            mobileItems={1}
        >
            {data.res.slice(0, 6).map((guide, index) => (
                <div
                    key={index}
                    className="my-16 flex justify-items-center justify-center w-fit mx-4"
                >
                    <Card guide={guide as Guide} />
                </div>
            ))}
        </Slider>
    )
}
