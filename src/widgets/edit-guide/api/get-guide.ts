import { graphql } from '@gqlgen'

export const GET_GUIDE_QUERY = graphql(`
    query GetGuide($id: ID!) {
        res: guide(id: $id) {
            id
            title
            body
            tags
            quiz {
                id
            }
        }
    }
`)
