import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'
import type { ReactNode } from 'react'
import { Card } from 'src/entities/guide/ui'

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

export function PanelGuideList(): ReactNode {
    const { data } = useQuery(GET_GUIDES)

    if (data?.res.length === 0) return null

    return (
        <>
            {data?.res.map((guide, index) => (
                <div key={index}>
                    <Card
                        id={guide!.id}
                        key={index}
                        imageUrl={'https://example.com/${index}.jpg'}
                        title={guide!.title}
                        description={guide!.description}
                        tags={guide!.tags as string[]} // TODO: fix the type
                    />
                </div>
            ))}
        </>
    )
}
