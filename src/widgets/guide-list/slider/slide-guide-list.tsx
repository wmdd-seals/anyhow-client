import { Card } from 'src/entities/guide/ui'
import type { ReactNode } from 'react'
import { useQuery } from '@apollo/client'
import { Slider } from 'src/shared/ui'
import { graphql } from '@gqlgen'

const GET_GUIDES = graphql(`
    query Guides {
        res: guides {
            description
            title
            id
            tags
        }
    }
`)

export function SliderGuideList(): ReactNode {
    const { data } = useQuery(GET_GUIDES)

    if (data?.res.length === 0) return <div>No guides found</div>
    return (
        <Slider desktopItems={4} tabletItems={2} mobileItems={1}>
            {data?.res.map((guide, index) => (
                <div
                    key={index}
                    className="my-16 flex justify-items-center justify-center mx-auto w-[250px]"
                >
                    <Card
                        key={guide!.id}
                        imageUrl={'https://example.com/${index}.jpg'}
                        title={guide!.title!}
                        description={guide!.description!}
                        tags={guide!.tags as string[]}
                    />
                </div>
            ))}
            <p>test</p>
        </Slider>
    )
}
