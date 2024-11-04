import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'
import type { Guide } from '@gqlgen/graphql'
import type { ReactNode } from 'react'
import { Card } from 'src/entities/guide'

const GET_GUIDES_WITH_USER = graphql(`
    query Guides {
        res: guides {
            body
            description
            id
            title
            tags
            user {
                firstName
                lastName
            }
        }
    }
`)

export function PanelGuideList(): ReactNode {
    const { data, loading, error } = useQuery(GET_GUIDES_WITH_USER)

    if (loading) return <div>Loading...</div>
    if (error || !data?.res || data.res.length === 0)
        return <div>Error: {error?.message}</div>

    return (
        <>
            {data.res.map((guide, index) => (
                <div key={index}>
                    <Card key={index} guide={guide as Guide} />
                </div>
            ))}
        </>
    )
}
